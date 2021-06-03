

export interface RoleListItem{
  _id:string
  name:string
  createTime?:Date
  authName?:string
  authTime?:Date
  menus?:[]
  desc?:string
}
