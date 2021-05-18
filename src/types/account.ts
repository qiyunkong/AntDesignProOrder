
export interface AccountLoginParameter{
    username:string,
    password:string,
    autoLogin?: boolean;
    type?: string;
}


export interface AccountLoginResult {
    nickName:string,
    email:string,
    role:string,
    avatar:string,
    _id:string,
    createTime:Date,
    status?:number,
}