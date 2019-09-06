/**
 * 通过meta.roles判断是否与当前用户权限匹配
 * @param roles 当前用户角色
 * @param permissionRoles 允许访问当前路由的角色
 */
export function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}
