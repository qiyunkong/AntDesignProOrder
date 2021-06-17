import {message} from 'antd';
import useRouter from '@/hooks/useRouter';
import ProCard from '@ant-design/pro-card';
import React, { useState ,useEffect} from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { BetaSchemaForm } from '@ant-design/pro-form';
import {getSchemaDva,addSchemaDva} from '@/services/ganfanhun';
import type { ProFormColumnsType, ProFormLayoutType } from '@ant-design/pro-form';

const valueEnum = {
  all: { text: '全部', status: 'Default' },
  open: {
    text: '未解决',
    status: 'Error',
  },
  closed: {
    text: '已解决',
    status: 'Success',
    disabled: true,
  },
  processing: {
    text: '解决中',
    status: 'Processing',
  },
};

type DataItem = {
  name: string;
  state: string;
};



export default (props:any) => {
  // const columns: ProFormColumnsType<DataItem>[] = [];
  const [columns,setColumns] = useState<ProFormColumnsType<DataItem>[]>([])

  //动态路由
  const [params,setParams] = useState<string>()

  //使用
  const router = useRouter();

  //生命周期
  useEffect(()=>{
    //1.获取动态路由参数
    const {view} = props.match.params
    setParams(view)
    // console.log(view, props.match.params)
    //2.获取表单模型
    getSchemaDva({},view).then((res:any)=>{
      console.log("===>",res)
      setColumns(res?.columnsForm)
    })
    //3.渲染模型
    
  },[])

  const [layoutType, setLayoutType] = useState<ProFormLayoutType>('Form');
  return (
     <PageContainer>
      <ProCard>
        <BetaSchemaForm<DataItem>
            trigger={<a>点击我</a>}
            layoutType={layoutType}
            onFinish={async (values) => {
                const hide = message.loading('正在添加');
                try {
                  const {data} =  await addSchemaDva(values,params as string);
                  hide();
                  message.success('添加成功');
                  router.loadPage(`/schema/${params}`)
                  console.log(data);
                } catch (error) {
                  hide();
                  message.error('添加失败请重试！');
                }

            }}
            columns={columns}
        />
      </ProCard>
      </PageContainer>
  );
};