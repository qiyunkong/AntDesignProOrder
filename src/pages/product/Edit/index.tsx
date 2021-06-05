import React from 'react';
import { message } from 'antd';
import ProForm, { ProFormText, ProFormUploadButton,ProFormDigit, ProFormTextArea,ProFormSwitch,ProFormSelect} from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};


/**表单提交 */
const onFinish = async (values:any) =>{
  const reult =  await waitTime(200)
  console.log(reult,values);
  message.success('提交成功');
}
const ProductEdit  = () => {
  return (
    <ProCard>
     <ProForm
        wrapperCol={{span:10}}
        layout="horizontal"
        labelCol={{span:4}}
        onFinish={onFinish}
      >
        <ProFormText
          label="商品名称"
          name="title"
          rules={[{required:true,message:'请填写商品名称'}]}
        />
        <ProFormDigit label="商品价格" name="price" min={1} max={10} />
        <ProFormText
          label="商品分类"
          name="name"
          rules={[{required:true,message:'商品分类'}]}
        />
        <ProFormSwitch name="switch" label="是否销空" />
        <ProFormText
          label="英文名称"
          name="eName"
        />
         <ProFormSelect.SearchSelect
          name="spec"
          label="规格"
          options={[
            { label: '大份', value: 'all' },
            { label: '中份', value: 'open' },
            { label: '小份', value: 'closed' },
            { label: '特大份', value: 'processing' },
          ]}
        />
         <ProFormSelect.SearchSelect
          name="flavor"
          label="口味"
          options={[
            { label: '甜辣', value: 'all' },
            { label: '微辣', value: 'open' },
            { label: '麻辣', value: 'closed' },
            { label: '特辣', value: 'processing' },
          ]}
        />
        <ProFormTextArea
          label="商品描述"
          name="webDesc"
          rules={[{required:true,message:'请填写商品描述'}]}
        />
      </ProForm>
    </ProCard>
  );
};

export default ProductEdit
