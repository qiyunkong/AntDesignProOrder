import {IPage} from './commonTypes'


//文件类型
export type FileType = 'file' | 'image'| 'icon' | 'avater' | 'photo' | 'resource'

//接口-文件
export interface File {
    id?:number,
    infoId?:number,
    appId?:number,
    type:FileType,
    userId:number,
    categoryId?:number,
    fileId:string,
    fileName?:string,
    saveDirectory?:string,
    size?:number,
    createTime:Date,
    fileExt?:string
}

//接口-上传
export interface UploadFilParamter{
    type:FileType   //类型
    appId?:number   //ID值
    categoryId?:number //分类ID
}

//接口-
export interface FileParameter extends IPage{
    key?:string
    infoId?:number
    type:FileType
    appId?:number | number[]
    categoryId?:number
}