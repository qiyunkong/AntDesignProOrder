import { useState,useEffect } from 'react';
import ProCard from '@ant-design/pro-card';
import { PageHeaderWrapper } from '@ant-design/pro-layout'; // 布局配置
import {SettingOutlined} from '@ant-design/icons'; //图标库
import { Form, message, Space} from 'antd';
import ProForm,{  ProFormText,ProFormTextArea } from '@ant-design/pro-form';
import {getSetting, postSetting} from '@/services/ganfanhun';
import {FileList} from '@/types';
import ImageUpload from './components/ImageUpload';



const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};





function SystemSetting(){
  //图片列表
  const [uploadFileList,setUploadFileList] = useState<FileList[]>([])

  /** 表单对象 */
  const [form] = Form.useForm();




  /**表单提交 */
  const onFinish = async (values:any) =>{
    values.logo = uploadFileList[0].url?.toString()
    const reult =  await postSetting(values)
    console.log(reult,values);
    message.success('提交成功');
  }



  useEffect(()=>{
    getSetting().then((result)=>{
     form.setFieldsValue(result.data)
     setUploadFileList(
       [
        {
          uid:'-9',
          url:result?.data?.logo
         }
       ]
     )
    })
  },[])

  return (
    <PageHeaderWrapper
      title={
        <Space>
            <SettingOutlined/>
            系统配置
        </Space>
      }
    >
    <ProCard>
      <ProForm
        form={form}
        layout="horizontal"
        labelCol={{span:4}}
        onFinish={onFinish}
        wrapperCol={{span:10}}
        submitter={{
          searchConfig: {
            submitText: '保存',
          },
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            size: 'large',
            style: {
              marginLeft: '16%',
            },
          },
        }}
      >
        <ProFormText
        label="网站标题"
        name="title"
        rules={[{required:true,message:'请填写网站标题'}]}
        />
        <ProFormText
          label="系统简称"
          name="shortName"
          rules={[{required:true,message:'请填写系统简称'}]}
        />
        <ProFormText
          label="系统全名称"
          name="name"
          rules={[{required:true,message:'系统全名称'}]}
        />
        <ProFormText
          label="英文名称"
          name="eName"
        />
        <ImageUpload
          onChange={(fileList:any)=>{
            console.log(fileList)
            fileList = fileList.map((file:any)=>{
              return {
                uid:file.uid,
                url:file.imgUrl
              }
            })
            setUploadFileList(fileList);
          }}
          value={uploadFileList}
          name="uploadlogo"
          label="网站图标"
          max={1}
          title="logo上传"
        />
        <ProFormTextArea
          label="系统描述"
          name="webDesc"
          rules={[{required:true,message:'请填写系统描述'}]}
        />
      </ProForm>
    </ProCard>
  </PageHeaderWrapper>
  )

}



export default SystemSetting;

//https://www.cnblogs.com/yuyuan-bb/p/11478837.html  react 组件
