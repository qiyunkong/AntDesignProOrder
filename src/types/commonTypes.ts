import { PureSettings } from '@ant-design/pro-layout/lib/defaultSettings'
import React from 'react'


//接口-当前分页
export interface IPage {
    current?:number,    //当前页数
    pageSize?:number    //总页数
}

//接口-分页集合
export  interface PageList<T> extends IPage{
    total:number,
    data:T[]
}

//接口-
export interface AppSettings{
    name:string,
    eName:string,
    staticServer:string,
    urlScheme:string,
    authType:AuthType,
    logo:string,
    shorName:string,
}

export type AuthType = 'password' 
    | 'qyweixin' 
    | 'weishao' 
    | 'wechat' 
    | 'campushoy' 
    | 'ids7'

export type Compare = 
    | 'Less'
    | 'lessOrEqual'
    | 'equal'
    | 'notEqual'
    | 'greater'
    | 'greaterOrEqual'
    | 'in'
    | 'out'
    | 'like'


//枚举-
export enum Comparison {
    less = '<',
    lessOrEqual = '<=',
    equal = '=',
    notEqual = '!=',
    greater = '>',
    greaterOrEqual = '>=',
    in = 'in',
    out = 'out',
    like = 'like',
}

//接口
export interface TableDescriber {
    table?:string,
    column?:string,
    fullName?:string
}

//接口
export interface  TableDescriber {
    table?:string,
    column?:string,
    fullName?:string,
}

//接口
export interface Conittion extends TableDescriber{
    id?:number | string
    value?:string | null | true | false
    compare?:Compare
    name?:string
}

//接口
export interface UISettings extends PureSettings{}

export type MenuInfo = {
    key:React.Key
    keyPath:React.Key[]
    item:React.ReactInstance
    domEvent:React.MouseEvent<HTMLElement>
}

export type MenuClickEventHandler = (info:MenuInfo,record?:any) => void