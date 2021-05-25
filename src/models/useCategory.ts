import {Category,PageList} from '@/types'
import {request} from 'umi'
import {useState} from 'react'

export default function useCategory(){
  const [categorys,setCategory] = useState<PageList<Category>>()

  const getCategory = (params:Category) => {
    const res = request('/api/category?parentId=0',{params})


  }

  const putCategory = (body:Category,options?:{[key:string]:any}) =>{
    const res = request('/api/caregory',{data:body,method:'PUT',...(options || {})})
  }

  const addCategory = (body:Category,options?:{[key:string]:any}) =>{
    const res  = request('/api/caregory',{data:body,method:'POST',...(options ||{} )})
  }

  const delCategory = (body:Category,options?:{[key:string]:any}) =>{
    const res = request('/api./caregory',{data:body,method:'DELETE',...(options ||{} )})
  }


  return {
    getCategory,
    putCategory,
    addCategory,
    delCategory
  }
}

