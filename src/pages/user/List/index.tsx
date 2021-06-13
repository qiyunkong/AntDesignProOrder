import { Button,message} from 'antd';
import React,{useState,useRef} from 'react';
import {UserListItem} from '@/types';
import ProTable from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import {getUser,getRole,addUser,delUser,putUser} from '@/services/ganfanhun';
import type { ProColumns , ActionType} from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { constant, result } from 'lodash';

export const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

//角色格式转换
const formatRoleList = (roles:any) =>{
  roles = roles.map(({_id,name}:any)=>({
    key:_id,
    label:name,
    value:_id,
  }))
  return roles
}



/**
 * 添加节点
 *
 * @param fields
 */
 const handleAdd = async (fields: UserListItem) => {

  const hide = message.loading('正在添加');
  let _content:any = ""
  try {
    const data =  await addUser({ ...fields });
    // _content = data.content
    // console.log(_content)
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    // console.log(_content)
    message.error(_content);
    return false;
  }
};

/**
 * 更新节点 异步函数
 *
 * @param fields
 */
const handleUpdate = async (fields: UserListItem) => {
  const hide = message.loading('正在配置');
  try {
    await putUser({...fields});
    hide();
    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    message.error('更新失败请重试！');
    return false;
  }
};

/**
 * 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: UserListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await delUser({
      id: selectedRows.map((row) => row._id),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
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
    dataIndex: 'roleName',
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
    /** 方法标记 */
    const actionRef = useRef<ActionType>();


  return (
      <>
        <ProTable<UserListItem>
          columns={columns}
          rowKey="_id"
          headerTitle="样式类"
          actionRef={actionRef}
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
          request={getUser}
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
            const success = await handleAdd(value as UserListItem);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }

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
              //请求全部角色
              const {data} =  await getRole({});
              const _data = formatRoleList(data)
              //格式转化
              return _data;
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
