import { useState } from 'react';
import ProCard from '@ant-design/pro-card';
import { PageHeaderWrapper } from '@ant-design/pro-layout'; // 布局配置
import {SettingOutlined,SaveOutlined} from '@ant-design/icons'; //图标库
import { Button, Form, Input, message, Select, Space} from 'antd';
import ProForm,{  ProFormUploadButton,ProFormText } from '@ant-design/pro-form';
// import React,{useEffect} from 'react'
// import {useModel} from 'umi'





export default  function SystemSetting(){
    const [voucherImg,SetVoucherImg] = useState<string>()
    const [previewImage,setPreviewImage] = useState<string>()
    const [form] = Form.useForm()
    const { Option } = Select;
    const onFinish = async(values:any) =>{
        //await saveSystemConfig({...values})
        message.success("操作成功!")
    }
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
              wrapperCol={{span:10}}
              layout="horizontal"
              labelCol={{span:4}}
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
                name="EName"
              />
              <ProFormUploadButton
                name="upload"
                label="Upload"
                max={1}
                fieldProps={{
                  name: 'image',
                  listType: 'picture-card',
                }}
                action="/api/img/upload"
                accept="image/*"
                extra="longgggggggggggggggggggggggggggggggggg"
                onChange={(e) => {
            　　　　if (e.file.status == 'removed') { //移除图片时；
            　　　　　　SetVoucherImg('')
            　　　　} else if (e.file.status == 'done') { //上传完成时
                        console.log(e)
            　　　　　　if (e.file.response.code == 200) {
            　　　　　　　　SetVoucherImg(e.file.response.data)
                          message.success(e.file.response.content)
            　　　　　　} else {
            　　　　　　　　message.error(e.file.response.Content ?? '上传失败')
            　　　　　　}
            　　　　} else if (e.file.status == 'error') { //上传错误时
            　　　　　　message.error('上传失败')
            　　　　}
            　　　　//status状态：'error' | 'success' | 'done' | 'uploading' | 'removed';
            　　}}
              />
              <ProFormText
                label="SEO标题"
                name="title"
                rules={[{required:true,message:'请填写SEO标题'}]}
              />
            </ProForm>
        </ProCard>
      </PageHeaderWrapper>
    )

}
