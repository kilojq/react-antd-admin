/**
 * REDIRECT_TO_FIRST_CHILD_ROUTE
 * @description 存在子集路由的节点，当路由匹配命中时，当前节点未定义redirect属性时，是否重定向到第一个子节点对应的路由
 */
export const REDIRECT_TO_FIRST_CHILD_ROUTE = true

const _constantRouters = [
  // { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  {
    path: '/401',
    component: () => import('@/views/401'),
    // meta: { title: 'unauthorized' },
    hidden: true
  },

  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/index'),
    meta: { title: 'Dashboard', icon: 'dashboard', noCache: true },
    // hidden: true // hidden：当设置为 true 的时候该路由不会在侧边栏出现
  },
  
  {
    path: '/lock',
    name: 'lock',
    component: () => import('@/views/menu/index'),
    meta: { title: 'lock', icon: 'lock', permission: ['admin'] }
  },

  {
    path: '/menu1',
    component: () => import('@/views/menu/index'),
    meta: { title: 'menu1', icon: 'user', noCache: true },
    // redirect: '/menu2/menu2-2/menu2-2-1',
    redirect: 'noRedirect', // redirect：重定向地址，在面包屑中点击会重定向去的地址，当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
    children: [
      {
        path: 'menu1-1',
        name: 'menu1-1',
        component: () => import('@/views/menu/index'),
        meta: { title: 'menu1-1', icon: 'user', noCache: true },
      },
      {
        path: 'menu1-2',
        name: 'menu1-2',
        component: () => import('@/views/menu/index'),
        meta: { title: 'menu1-2', icon: 'user', noCache: true },
        // hidden: true,
        children: [
          {
            path: 'menu1-2-1',
            name: 'menu1-2-1',
            component: () => import('@/views/menu/index'),
            meta: { title: 'menu1-2-1', icon: 'user', noCache: true }
          },
          {
            path: 'menu1-2-2',
            name: 'menu1-2-2',
            component: () => import('@/views/menu/index'),
            meta: { title: 'menu1-2-2', icon: 'user', noCache: true }
          }
        ]
      }
    ]
  },

  {
    path: '/menu2',
    component: () => import('@/views/menu/index'),
    meta: { title: 'menu2', icon: 'user', noCache: true },
    permission: ['admin'],
    children: [
      {
        path: 'menu2-1',
        name: 'menu2-1',
        component: () => import('@/views/menu/index'),
        meta: { title: 'menu2-1', icon: 'user', noCache: true },
        // hidden: true,
      },
      {
        path: 'menu2-2',
        name: 'menu2-2',
        component: () => import('@/views/menu/index'),
        meta: { title: 'menu2-2', icon: 'user', noCache: true },
        children: [
          {
            path: 'menu2-2-1',
            name: 'menu2-2-1',
            component: () => import('@/views/menu/index'),
            meta: { title: 'menu2-2-1', icon: 'user', noCache: true }
          },
          {
            path: 'menu2-2-2',
            name: 'menu2-2-2',
            component: () => import('@/views/menu/index'),
            meta: { title: 'menu2-2-2', icon: 'user', noCache: true }
          }
        ]
      }
    ]
  }
]

export const constantRouters = formatRoutes(_constantRouters)
// console.log(constantRouters)

export const routeMap = createRouteMap(constantRouters)
// console.log(routeMap)

export const routeList = unfoldRoutes(constantRouters)
// console.log(routeList)

function formatRoutes(routes) {
  function format(list, parent = {}) {
    list.forEach(item => {
      item.path = parent.path ? parent.path + '/' + item.path : item.path
      parent.path && (item.parent = parent)
      if (item.name) item.breadcrumbName = item.name
      if (item.children) format(item.children, item)
    })
    return list
  }
  return format(routes)
}

function createRouteMap(routes, routeMap = {}) {
  routes.forEach(item => {
    routeMap[item.path] = item
    if (item.children) createRouteMap(item.children, routeMap)
  })
  return routeMap
}

function unfoldRoutes(routes, routeList = []) {
  routes.forEach(item => {
    routeList.push(item)
    if (item.children) unfoldRoutes(item.children, routeList)
  })
  return routeList
}
