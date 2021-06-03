
export interface Menu{
  _id:string,
  name:string,
  icon:string,
  path:string,
  alias:string,
  sortNo:number,
  createTime?:Date,
  children?:string,
}

export interface MenuListItem{
  _id:string,
  name:string,
  icon:string,
  path:string,
  alias:string,
  sortNo:number,
  createTime?:Date,
  children?:string,
}
