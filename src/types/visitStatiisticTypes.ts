import {VisitStatisticType} from '@/utils/dict'
import {IPage} from './commonTypes'

export interface VisitRank{
    name?:string
    value?:number
}

export interface VisitAppRank extends VisitRank{
    appId?:number,
    eName?:string
    icon?:string
}

export interface VisitStatisticParameter extends IPage {
    BeginDate?: string
    EndDate?: string
    CreateTime?: string
    Type?: VisitStatisticType
    appId?: number
    top?: number
  }