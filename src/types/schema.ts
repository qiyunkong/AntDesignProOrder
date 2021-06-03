import React from 'react';

export interface FormSourceType{
  name:string
  nameDva:string
  desc?:string //描述
}

export interface TableSourceType{
  id: React.Key;      //id
  title?: string;     //表头名称
  decs?: string;      //字段描述
  dataIndex?:string;  //字段名称 英文
  valueType?:string;  //表单类型
  required?:string;   //是否必填
  search?:string;     //是否搜索
}


export interface SchemaDva<T>{
  //表名称
  name?:string,
  nameDva?:string
  //表中文名称
  dva?:T[],
  //描述
  desc?:string
}



//列表
export interface SchemaListItem{
  //表名称
  name:string,
  //表中文名称
  Dva:string,
  //描述
  desc?:string
}
