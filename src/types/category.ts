
export interface CategoryListItem{
    _id:string,
    name:string,
    parentId?:string,
    desc?:string,
    status:number,
    createTime:Date,
}
