import ProCard from '@ant-design/pro-card'
import { PageHeaderWrapper } from '@ant-design/pro-layout' // 布局配置
import {SettingOutlined,SaveOutlined} from '@ant-design/icons' //图标库
import { Button, Form, Input, message, Select, Space} from 'antd'
import React,{useEffect} from 'react'
import {useModel} from 'umi'

export default  function SystemSetting(){
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
            <Form
                labelCol={{span:4}}
                colon={false}
                wrapperCol={{span:10}}
                form={form}
                onFinish={onFinish}
            >
                <Form.Item
                    label="系统简称"
                    name="ShortName"
                    rules={[{required:true,message:'请填写系统简称'}]}
                >
                    <Input placeholder="请填写名称"/>
                </Form.Item>
                <Form.Item
                    label="系统名称"
                    name="Name"
                    rules={[{required:true,message:'请填写系统名称'}]}
                >
                    <Input placeholder="请填写名称"/>
                </Form.Item>
                <Form.Item
                    label="英文名称"
                    name="EName"
                    rules={[{required:true,message:'请填写英文名称'}]}
                >
                    <Input placeholder="请填写英文名称"/>
                </Form.Item>
                <Form.Item
                    label="Logo"
                    name="Logo"
                >
                  
                </Form.Item>
                <Form.Item
                    label="SEO标题"
                    name="Title"
                    rules={[{required:true,message:'keywords'}]}
                >
                    <Input placeholder="请填写SEO标题"/>
                </Form.Item>
                <Form.Item
                    label="SEO关键字"
                    name="Keywords"
                >
                    <Input placeholder="请填写SEO关键字"/>
                </Form.Item>
                <Form.Item
                    label="SEO摘要"
                    name="Description"
                >
                    <Input placeholder="请填写SEO摘要" />
                </Form.Item>
                <Form.Item
                    name="DefaultDataPlatform"
                    label="组织架构默认平台"
                    rules={[{ required: true, message: '请选择组织架构默认平台' }]}
                >
                    <Select placeholder="请选择组织架构默认平台">
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="默认登录方式"
                    name="AuthType"
                    rules={[{ required: true, message: '请选择默认登录方式' }]}
                >
                     <Select placeholder="请选择默认登录方式">
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="消息发送方式"
                    name="MessagePlatforms"
                    rules={[{ required: true, message: '请选择消息发送方式' }]}
                >
                    <Select mode="multiple" >
                      
                    </Select>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 4 }}>
                    <Button type="primary" htmlType="submit">
                    <SaveOutlined />
                    保存
                    </Button>
                </Form.Item>
            </Form>

        </ProCard>
        </PageHeaderWrapper>

    )

}