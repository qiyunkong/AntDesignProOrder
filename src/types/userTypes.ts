import { IPage } from './commonTypes'

export type UserIdentity = 'student' | 'teacher' | 'parents' | 'other'
export interface UserOrganization{
    id?:number
    userId?:number
    OrganizztionId?:number
    IsLeaf?:boolean
    organizationIds?:number[]
    Role?:number
    orgName?:string
}

export interface UserAuthorizationParameter extends IPage{
    userIDs?:string[]
    userId?:number
}


export interface UserParameter extends IPage{
    userIds?:any[]
    organizationId?:number
    roleId?:number
    listId?:number
    searchKey?:string
    identity?:UserIdentity
}