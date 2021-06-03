import { CategoryListItem, IPage, MenuListItem} from '@/types'
import {useState,useRef, useEffect} from 'react';
import { Button, message,} from 'antd';
import ProTable from '@ant-design/pro-table';
import {addMenu, getMenu} from '@/services/ganfanhun';
import { ModalForm, ProFormText,ProFormDigit } from '@ant-design/pro-form';
import type { ProColumns ,ActionType} from '@ant-design/pro-table';





const columns: ProColumns<MenuListItem,"text">[] = [
  {
    title:'id',
    dataIndex:'_id'
  },
  {
    title: '菜单名称',
    dataIndex: 'name',
  },
  {
    title: '菜单图标',
    dataIndex: 'icon',
  },
  {
    title: '菜单别名',

    dataIndex: 'alias',
  },
  {
    title: '菜单路由',

    dataIndex: 'path',
  },
  {
    title: "创建时间",
    dataIndex: 'createTime',
    valueType: 'date',
  },
  {
    title:"序号",
    dataIndex: 'sortNO',
  },
  {
    title: '操作',
    width: 164,
    key: 'option',
    valueType: 'option',
    render: () => [
      // <a key="2">修改</a>,
      // <a key="3">删除</a>,
      // <a key="1">创建子路由</a>
    ],
  },
];


/**
 * 添加节点
 *
 * @param fields
 */
 const handleAdd = async (fields:MenuListItem) => {

  const hide = message.loading('正在添加');

  try {
    const result =  await addMenu({ ...fields });
    hide();
    message.success('添加成功');
    console.log(result)
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};


const tableListDataSource: MenuListItem[] = [];


for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    name: `菜单名称${i}`,
    path: `/path/${i}`,
    icon:`icon${i}`,
    createTime: '2021-06-02T07:17:41.179Z',
    alias:`/alias/${i}`
  });
}

const expandedRowRender = () => {
  const data = [];
  for (let i = 0; i < 3; i += 1) {
    data.push({
      key: i,
      name: `菜单名称${i}`,
      path: `/path/${i}`,
      icon:`icon${i}`,
      createTime: `createTime${i}`,
      alias:`/alias/${i}`

    });
  }
  return (
    <ProTable
      columns={[
        { title: '菜单名称', dataIndex: 'name', key: 'name' },
        { title: '菜单图标', dataIndex: 'icon', key: 'icon' },
        { title: '菜单别名', dataIndex: 'alias', key: 'alias' },
        { title: '菜单路由', dataIndex: 'path', key:'path'},
        { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
        {
          title: '操作',
          dataIndex: 'operation',
          key: 'operation',
          valueType: 'option',
          render: () => [<a key="Pause">删除</a>, <a key="Stop">编辑</a>],
        },
      ]}
      headerTitle={false}
      search={false}
      options={false}
      dataSource={data}
      pagination={false}
    />
  );
};



const request = async () => [
  { name: '全部',  },
  { name: '未解决',},
  { name: '已解决',},
  { name: '解决中',},
];


const MenuList: React.FC = () => {






  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);

  /** 记录节点hook 变量 */
  const [children,setChildren] = useState<string>("0");


  /** 分类节点ID*/
  const [parentId,setParentId] = useState<string>('0');
  /** 方法标记 */
  const actionRef = useRef<ActionType>();


  const requestHandler = async (params:{
    pageSize?: number | undefined;
    current?: number | undefined;
    keyword?: string | undefined;
    children?:string,
  }) =>{
    console.log(params)
   const {data} = await getMenu(params)
   return {
     data:data,
     success: true,
   }
  }























  return (
    <>
    <ProTable<MenuListItem>
      columns={columns}
      rowKey="_id"
      pagination={{
        showQuickJumper: true,
      }}
      // expandable={{expandedRowRender}}
      // expandable={{ defaultExpandAllRows: true }}
      search={false}
      dateFormatter="string"
      headerTitle="菜单配置"
      options={false}
      toolBarRender={() => [
         <Button
         type="primary"
         key="primary"
         onClick={() => {
           //显示模块框
           handleModalVisible(true);
         }}
       >
         新建数据
       </Button>,
      ]}
      // request={getMenu}
      params={{
        children:children
      }}
      actionRef={actionRef}
    />


    <ModalForm
    title="新建菜单"
    width="400px"
    visible={createModalVisible}
    onVisibleChange={handleModalVisible}
    onFinish={async (value) => {
      value.children = children
      const success = await handleAdd(value as MenuListItem);
      if (success) {
        handleModalVisible(false);
        if (actionRef.current) {
          actionRef.current.reload();
        }
      }
    }}
  >
    <ProFormText
      label="菜单名称"
      rules={[
        {
          required: true,
          message:"菜单名称为必填项",
        },
      ]}
      width="md"
      name="name"
    />

     <ProFormText
      label="菜单图标"

      width="md"
      name="icon"
    />

    <ProFormText
      label="菜单别名"
      rules={[
        {
          required: true,
          message:"菜单名称为必填项",
        },
      ]}

      width="md"
      name="alias"
    />

    <ProFormText
      label="菜单路由"
      rules={[
        {
          required: true,
          message:"菜单名称为必填项",
        },
      ]}

      width="md"
      name="path"
    />
    <ProFormDigit label="InputNumber" name="sortNo" width="sm" min={1} max={10} />
  </ModalForm>
  </>
  );
};
export default MenuList;
