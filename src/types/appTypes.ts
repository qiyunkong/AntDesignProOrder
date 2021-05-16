export interface App{
    id:number
    categoryId?:number
    categoryName?:string
    description?:string
    disabled?:boolean
    eName?:string
    icon?:string
    name?:string
    version?: string
    admins?: AppAdmin[]
    modules?: AppModule[]
    logo?: string

}

export interface AppSettings {
  name:string,
  eName:string,
  staticServer:string,  //静态服务域名 
  adminServer:string,   // 
  urlScheme:string,
  authType:AuthType,
  logo:string,
  shortName:string
}

export type AuthType = 'password' | 'qyweixin' | 'weishao' | 'wechat' | 'campushoy' | 'ids7'


export interface AppAdmin {
    id: number
    userId: number
    appId: number
  }
  export interface AppModule {
    id: number
    moduleId: number
    appId: number
  }
  export interface AppParameter {
    searchKey?: string
    categoryId?: number
  }