import {Category,CategoryParams,JSONResult,PageList} from '@/types'
import {request} from 'umi'
import {useState} from 'react'

export default function useCategory(){
  const [category,setCategory] = useState<Category>()
  const [categorys,setCategorys] = useState<PageList<Category>>()


  const getCategoryList = async (params:CategoryParams,options?:{[key:string]:any}) => {
    const res = await request<JSONResult<PageList<Category>>>('/api/category',{
      method:'GET',
      params:{
        ...params
      },
      ...(options || {})
    })
    setCategorys(res.data);
    return res
  }

  const putCategory = async (body:Category,options?:{[key:string]:any}) =>{
    const res = await request('/api/caregory',{
      data:body,
      method:'PUT',
      ...(options || {})
    })
    setCategory(res);

  }

  const addCategory = async (body:Category,options?:{[key:string]:any}) =>{
    return request('/api/caregory',{
      data:body,
      method:'POST',
      ...(options ||{} )
    })
  }

  const delCategory = async (body:{},options?:{[key:string]:any}) =>{
    return request('/api/caregory',{
      data:body,
      method:'DELETE',
      ...(options ||{} )
    })
  }


  return {
    category,
    categorys,
    putCategory,
    addCategory,
    delCategory,
    getCategoryList,
  }
}

