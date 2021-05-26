
export interface IPage{
    current?:number
    pageSize?:number
    parentId?:string
}

export interface PageList<T> extends IPage{
    total:number
    data:T[]
}

export interface JSONResult<T>{
    code:number,
    msg:string,
    content:string,
    data?:T
}
