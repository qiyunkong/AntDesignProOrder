
export interface User{
    _id:string,
    nickName:string,
    email:string,
    phome:string,
    passowrd?:string,
    avatar?:string,
    createTime:string,
    status?:string,
    roleId?:string
}


export interface UserListItem{
  _id:string,
  nickName:string,
  email:string,
  phome:string,
  password?:string,
  avatar?:string,
  createTime:string,
  status?:string,
  roleId?:string
}
