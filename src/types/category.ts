
export interface CategoryListItem{
    _id:string,
    name:string,
    parentId?:string,
    desc?:string,
    status?:boolean,
    createTime?:Date,
}



export interface Category{
  _id:string,
  name:string,
  parentId?:string,
  desc?:string,
  status?:boolean,
  createTime?:Date
}




