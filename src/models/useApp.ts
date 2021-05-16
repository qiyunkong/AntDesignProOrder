import { AppParameter } from "@/types";
import { request, useModel } from 'umi'

export default function useApp(){
    const {initialState,setInitialState} = useModel('@@initialState')
    const getApps = async (parameter:AppParameter)=>{
        let list = initialState?.apps
        if(list){
            if(parameter.categoryId){
                list = list?.filter((e:any)=>e.categoryId === parameter.categoryId)
            }
            if(parameter.searchKey){
                list = list?.filter((e:any)=> e.name && e.name?.indexOf(parameter.searchKey || '') > -1)
            }
        }
        return list
    }

    return {
        getApps
    }
}