export function array2tree (list, id, pId, children, parent) {
  if (!list || list.length === 0) {
    return []
  }

  id = id || 'id'
  pId = pId || 'pId'
  children = children || 'children'
  parent = parent || 'parent'

  let tree = [], tmp = []

  for (let i = 0, l = list.length; i < l; i++) {
    tmp[list[i][id]] = list[i]
  }
  for (let i = 0, l = list.length; i < l; i++) {
    if (tmp[list[i][pId]] && list[i][id] !== list[i][pId]) {
      if (!tmp[list[i][pId]][children]) {
        tmp[list[i][pId]][children] = []
      }
      tmp[list[i][pId]][children].push(list[i])
      list[i][parent] = tmp[list[i][pId]]
    } else {
      tree.push(list[i])
    }
  }
  return tree
}
