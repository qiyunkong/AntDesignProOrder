
export interface System{
  _id?:string,
  logo?:string | '',
  name?:string,
  title?:string,
  eName?:string,
  webDesc?:string,
  staticSrc?:string
  menuRoute?:[]
}


export interface FileList{
 uid:number,
 name:string,
 status:string | 'error' | 'success' | 'done' | 'uploading' | 'removed',
 url:string
}
