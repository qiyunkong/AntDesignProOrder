import { Button} from 'antd';
import React,{useState} from 'react';
import {UserListItem} from '@/types';
import { PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormSelect } from '@ant-design/pro-form';
import Mock from 'mockjs';

export const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};


const columns: ProColumns<UserListItem>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'index',
  },
  {
    //用户表头编写
    title: '昵称',
    dataIndex: 'nickName',
    search: false
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  },
  {
    title: '手机号',
    dataIndex: 'phome',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    search: false
  },
  {
    title: '角色',
    dataIndex: 'roleId',
  },
  {
    title: '操作',
    key: 'option',
    width: 120,
    valueType: 'option',
    render: (_, row, index, action) => [
      <a
        key="a"
        onClick={() => {
        }}
      >
        编辑
      </a>,
        <a
        key="a"
        onClick={() => {
        }}
      >
        删除
      </a>,
    ],
  },
];


const UserListPage:React.FC = () => {
    /** 新建窗口的弹窗 */
    const [createModalVisible, handleModalVisible] = useState<boolean>(false);


  return (
      <>
        <ProTable<UserListItem>
          columns={columns}
          rowKey="_id"
          headerTitle="样式类"
          toolBarRender={() => [
            <Button
              type="primary"
              key="primary"
              onClick={() => {
                //显示模块框
                handleModalVisible(true);
              }}
            >
              <PlusOutlined /> 新建数据
            </Button>,
          ]}
        />









        <ModalForm
          title="新建用户"
          width="500px"
          layout="horizontal"
          wrapperCol={{span:20}}
          visible={createModalVisible}
          onVisibleChange={handleModalVisible}
          labelCol={{span:4}}
          onFinish={async (value) => {
            console.log(value)
          }}
        >
          <ProFormText
            label="用户名称"
            rules={[
              {
                required: true,
                message:"用户名称为必填项",
              },
            ]}
            width="md"
            name="nickName"
          />
          <ProFormText
            label="用户邮箱"
            rules={[
              {
                required: true,
                message:"用户邮箱为必填项",
              },
            ]}

            width="md"
            name="email"
          />
          <ProFormText
            label="手机号"
            rules={[
              {
                required: true,
                message:"手机号为必填项",
              },
            ]}

            width="md"
            name="phome"
          />
          <ProFormText
            label="密码"
            rules={[
              {
                required: true,
                message:"密码为必填项",
              },
            ]}

            width="md"
            name="password"
          />
          <ProFormSelect
            name="roleId"
            label="角色"
            showSearch
            key="roleId"
            request={async ({ keyWords }) => {
              await waitTime(1000);
              return [
                { key:'1', label: '厨师', value: 'all' },
                { key:'2',label: '老板', value: 'open' },
                { key:'3',label: '服务员', value: 'closed' },
                { key:'4',label: '管理员', value: 'processing' },
              ]
            }}
            width="md"
            placeholder="Please select a country"
            rules={[{ required: true, message: 'Please select your country!' }]}
          />
        </ModalForm>
      </>
    )
};

export default UserListPage;
