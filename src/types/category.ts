import {IPage} from './common'

export interface CategoryListItem{
    _id:string,
    name:string,
    parentId?:string,
    desc?:string,
    status?:boolean,
    createTime?:Date,
}

export interface CategoryParams extends IPage {
  parentId?:string | '0'
}

export interface Category{
  _id:string,
  name:string,
  parentId?:string,
  desc?:string,
  status?:boolean,
  createTime?:Date
}




