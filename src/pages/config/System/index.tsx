import { useState,useEffect } from 'react';
import ProCard from '@ant-design/pro-card';
import { PageHeaderWrapper } from '@ant-design/pro-layout'; // 布局配置
import {SettingOutlined} from '@ant-design/icons'; //图标库
import { Form, message, Space} from 'antd';
import ProForm,{  ProFormUploadButton,ProFormText,ProFormTextArea } from '@ant-design/pro-form';
import {getSetting, postSetting} from '@/services/ganfanhun';
import {FileList} from '@/types'


const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};


export default  function SystemSetting(){

  //图片列表
  const [uploadFileList,setUploadFileList] = useState<FileList[]>([
    {
      uid:-3,
      name:"Alipay",
      status:'done',
      url: `http://127.0.0.1:3001/uploads/img/1622456682280.svg`,
    },
  ])

  //监听状态
  const [initFileList,setInItFileList] = useState<[]>([])

  //表单对象
  const [form] = Form.useForm();





  /**表单提交 */
  const onFinish = async (values:any) =>{
    const reult =  await postSetting(values)
    console.log(reult,values);
    message.success('提交成功');
  }

  useEffect(()=>{
    getSetting().then((result)=>{
      form.setFieldsValue(result.data)
      console.log(result.data);
      setUploadFileList([
        ...uploadFileList,
        {
          uid:-3,
          name:"Alipay",
          status:'done',
          url: `http://127.0.0.1:3001${result.data?.logo}`,
        },
      ])
      console.log(uploadFileList);
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
            wrapperCol={{span:10}}
            layout="horizontal"
            labelCol={{span:4}}
            onFinish={onFinish}
            form={form}
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
            <ProFormUploadButton
              name="uploadlogo"
              label="网站图标"
              max={2}
              initialValue={uploadFileList}
              fieldProps={{
                name: 'image',
                listType: 'picture-card',
              }}
              action="/api/img/upload"
              accept="image/*"
              extra="上传LOGO图标"
              onChange={({file,fileList}) => {
          　　　　if (file.status == 'removed') { //移除图片时；
                    setUploadFileList([
                      ...uploadFileList.slice(0,uploadFileList.length-1)
                    ])
          　　　　} else if (file.status == 'done') { //上传完成时
                     file = fileList[fileList.length-1];
                     const {content,code,data} = file.response
          　　　　　　if (code == 200) {
                      setUploadFileList([
                        ...uploadFileList,
                        {
                          uid:-uploadFileList.length,
                          name:data.name,
                          url:`http://127.0.0.1:3001${data?.logo}`,
                          status:'done'
                        }
                      ])
                      message.success(content)
                      file.name = data.name;
                      file.url = data.url;
          　　　　　　} else {
          　　　　　　　　message.error(file.response.Content ?? '上传失败')
          　　　　　　}
          　　　　} else if (file.status == 'error') { //上传错误时
          　　　　　　message.error('上传失败')
          　　　　}
          　　　　//status状态：'error' | 'success' | 'done' | 'uploading' | 'removed';
          　　}}
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
