
export interface Menu{
  _id:string,
  name:string,
  icon:string,
  path:string,
  alias:string,
  sortNo:number,
  parentId:string,
  createTime?:Date,
}

export interface MenuListItem{
  _id:string,
  name:string,
  icon:string,
  path:string,
  alias:string,
  sortNo:number,
  parentId:string,
  createTime?:Date,
}
