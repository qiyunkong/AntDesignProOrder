import {IPage} from './common'

export interface ProductListItem{
    _id:string,
    name:string,
    parentId?:string,
    desc?:string,
    status?:boolean,
    createTime?:Date,
}

export interface ProductParams extends IPage {
  parentId?:string | '0'
}

export interface Product{
  _id:string,
  name:string,
  parentId?:string,
  desc?:string,
  status?:boolean,
  createTime?:Date
}
