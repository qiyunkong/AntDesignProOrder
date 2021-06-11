import {useState,useRef} from 'react';
import ProTable from '@ant-design/pro-table';
import {Form, Button, message,DatePicker} from 'antd';
import { CategoryListItem, MenuListItem} from '@/types';
import {addMenu, getMenu,putMenu} from '@/services/ganfanhun';
import ProCard from '@ant-design/pro-card';
import { ModalForm, ProFormText,ProFormDigit } from '@ant-design/pro-form';
import type { ProColumns ,ActionType} from '@ant-design/pro-table';




/**
 * 更新节点 异步函数
 *
 * @param fields
 */
const handleUpdate = async (fields: MenuListItem) => {
  const hide = message.loading('正在修改');
  try {
    await putMenu(fields);
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


const { RangePicker } = DatePicker;


const MenuList: React.FC = () => {

  /** 新建窗口的弹窗 */
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  /** 修改窗口的弹窗 */
  const [updateModalVisible,handleUpdateModalVisible] = useState<boolean>(false);
  /** 方法标记 */
  const actionRef = useRef<ActionType>();
  /** 表题 */
  const [titleModel,setTitleModel] = useState<string>('顶级')
  /** 记录父节点 */
  const [parentId,setParentId] = useState<string>('0')




  //表单对象
  const [form] = Form.useForm();


  const columns: ProColumns<MenuListItem,"text">[] = [
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
      dataIndex: 'sortNo',
      sorter: (a, b) => a.sortNo - b.sortNo,
      renderFormItem: () => {
        return <RangePicker />;
      },
    },
    {
      title: '操作',
      key: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a key="edit" onClick={()=>{
          handleUpdateModalVisible(true);
          console.log(record)
          form.setFieldsValue(record);
        }}>修改</a>,
        <a key="delete">删除</a>,
        <a key="addpath" onClick={() => {
          //显示模块框
          handleCreateModalVisible(true);
          setTitleModel(record.name)
          setParentId(record._id)
        }}>创建子路由</a>
      ],
    },
  ];

  /** 二级修改 */
  const expandedRowRender = (e:any) => {
    return (
      <ProTable
        columns={[
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
            dataIndex: 'sortNo',
            sorter: (a, b) => a.sortNo - b.sortNo,
            renderFormItem: () => {
              return <RangePicker />;
            },
          },
          {
            title: '操作',
            key: 'option',
            valueType: 'option',
            render: (_,record) => [
              <a key="edit" onClick={()=>{
                handleUpdateModalVisible(true);
                form.setFieldsValue(record);
              }}>修改</a>,
              <a key="delete">删除</a>,
            ],
          },
        ]}
        rowKey="_id"
        request={getMenu}
        params={{
          parentId:e._id
        }}
        headerTitle={false}
        search={false}
        options={false}
        pagination={false}
      />
    );
  }



  return (
    <>
    <ProCard>
    <ProTable<MenuListItem>
      columns={columns}
      rowKey="_id"
      pagination={false}
      search={false}
      dateFormatter="string"
      headerTitle="菜单配置"
      request={getMenu}
      expandable={{expandedRowRender}}
      params={{
        parentId:'0',
      }}
      toolBarRender={() => [
      <Button
         type="primary"
         key="primary"
         onClick={() => {
           //显示模块框
           handleCreateModalVisible(true);
           setTitleModel("顶级")
         }}
       >
         新建数据
       </Button>,

      ]}
      actionRef={actionRef}
    />


    <ModalForm
      title={`新建-${titleModel}-下的菜单路由`}
      width="500px"
      layout="horizontal"
      labelCol={{span:4}}
      wrapperCol={{span:20}}
      visible={createModalVisible}
      onVisibleChange={handleCreateModalVisible}
      onFinish={async (value) => {
        //保存父节点
        value.parentId = parentId
        const success = await handleAdd(value as MenuListItem);
        if (success) {
          handleCreateModalVisible(false);
          if (actionRef.current) {
            console.log("我执行了")
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
      <ProFormDigit label="序号" name="sortNo" width="md" min={1} max={10} />
    </ModalForm>


    <ModalForm
      title={`修改菜单路由`}
      width="500px"
      layout="horizontal"
      form={form}
      labelCol={{span:4}}
      wrapperCol={{span:20}}
      visible={updateModalVisible}
      onVisibleChange={handleUpdateModalVisible}
      onFinish={async (value) => {
        const success = await handleUpdate(value as MenuListItem);
        if (success) {
          handleUpdateModalVisible(false);
          if (actionRef.current) {
            actionRef.current.reload();
          }
        }
      }}
    >

    <ProFormText name="_id" hidden/>
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
      <ProFormDigit label="序号" name="sortNo" width="md" min={1} max={10} />
    </ModalForm>
  </ProCard>
  </>
  );
};
export default MenuList;
