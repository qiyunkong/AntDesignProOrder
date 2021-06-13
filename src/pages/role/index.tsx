import {  FormattedMessage } from 'umi';
import ProCard from '@ant-design/pro-card';
import ProTable from '@ant-design/pro-table';
import React, { useState, useRef } from 'react';
import {RoleListItem, IPage} from '@/types';
import { PlusOutlined } from '@ant-design/icons';
import ProDescriptions from '@ant-design/pro-descriptions';
import { Button, message, Drawer,Tree,Form} from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import {getRole,putRole,delRole,addRole} from '@/services/ganfanhun';




const treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        disabled: true,
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
            disableCheckbox: true,
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [{ title: <span style={{ color: '#1890ff' }}>sss</span>, key: '0-0-1-0' }],
      },
    ],
  },
];


/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields: RoleListItem) => {

  const hide = message.loading('正在添加');
  try {
    const result =  await addRole({ ...fields });
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

/**
 * 更新节点 异步函数
 *
 * @param fields
 */
const handleUpdate = async (fields: RoleListItem) => {
  const hide = message.loading('正在配置');
  try {
    await putRole({...fields});
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
const handleRemove = async (selectedRows: RoleListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await delRole({
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


const RoleList: React.FC = () => {

  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /** 更新窗口的弹窗 */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  /** 授权新窗口 待开发 */


  /** 删除的弹框 */
  const [showDetail, setShowDetail] = useState<boolean>(false);
  /** 方法标记 */
  const actionRef = useRef<ActionType>();
  const [link,setLink] = useState<RoleListItem[]>();
  /** */
  const [currentRow, setCurrentRow] = useState<RoleListItem>();
  const [selectedRowsState, setSelectedRows] = useState<RoleListItem[]>([]);

  /** 分类节点ID*/
  const [parentId,setParentId] = useState<string>('0');







  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(['0-0-0', '0-0-1']);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(['0-0-0']);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  const onExpand = (expandedKeysValue: React.Key[]) => {
    console.log('onExpand', expandedKeysValue);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // 如果未将autoExpandParent设置为false，则如果子级已展开，则父级不能折叠。
    // or, you can remove all expanded children keys.
    // 或者，可以删除所有展开的子键。
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };


  const onCheck = (checkedKeys: {
    checked: React.Key[];
    halfChecked: React.Key[];
  }, info: any) => {
    console.log('onCheck', checkedKeys, info);
  };


  //选中
  const onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log('selected', selectedKeys, info);
  };


  //表单对象
  const [form] = Form.useForm();


  /** 表格规格 */
  const columns: ProColumns<RoleListItem,"text">[] = [
    {
      title: '角色ID',
      dataIndex: '_id',
      tip: '规则名称是唯一的 key',
      search:false,
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: "角色名称",
      dataIndex: 'name',
    },

    {
      title: "创建时间",
      sorter: true,
      search:false,
      dataIndex: 'createTime',
      valueType: 'dateTime',
    },
    {
      title: "授权时间",
      sorter: true,
      search:false,
      dataIndex: 'authTime',
      valueType: 'dateTime',
    },
    {
      title: "授权人",
      sorter: true,
      search:false,
      dataIndex: 'authName',
      valueType: 'dateTime',
    },
    {
      title: "操作",
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
            //初始化模块框的值
            form.setFieldsValue(record);
          }}
        >
         更新
        </a>,
        <a key="subscribeAlert"
          onClick={() => {
            console.log("授权")
          }}
        >
         授权
        </a>,
      ],
    },

  ];

  return (
    <PageContainer>
      <ProTable<RoleListItem>
        headerTitle='查询表格'
        actionRef={actionRef}
        rowKey="_id"
        search={{
          labelWidth: 120,
        }}
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
            <Button
              type="primary"
              key="primary"
              onClick={() => {
                //显示模块框
                // handleModalVisible(true);
              }}
            >
          <PlusOutlined />导入表单
          </Button>,
            <Button
            type="primary"
            key="primary"
            onClick={() => {
              //显示模块框
              //handleModalVisible(true);
            }}
        >
          <PlusOutlined /> 导出表单
        </Button>,
      ]}
      request={getRole}
      columns={columns}
      rowSelection={{
        onChange: (_, selectedRows) => {
          setSelectedRows(selectedRows);
        },
      }}
      pagination={{
        pageSize: 5,
      }}
    />





      {/* 短路运算符 如果false 后面不执行 */}
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择<a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>项
              &nbsp;&nbsp;
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              //重新渲染
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          <Button type="primary"
            onClick={async ()=>{

            }}
          >
            批量审批
          </Button>
        </FooterToolbar>
      )}


      <ModalForm
        title="新建角色"
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          value.parentId = parentId
          const success = await handleAdd(value as RoleListItem);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          label="角色名称"
          rules={[
            {
              required: true,
              message:"角色名称为必填项",
            },
          ]}

          width="md"
          name="name"
        />
        <ProFormTextArea label="描述" width="md" name="desc" />
        {/* https://ant.design/components/tree-cn/#API  */}
        <Tree
          checkable
          defaultExpandedKeys={['0-0-0', '0-0-1']}
          defaultSelectedKeys={['0-0-0', '0-0-1']}
          defaultCheckedKeys={['0-0-0', '0-0-1']}
          onSelect={onSelect}
          onCheck={onCheck}
          treeData={treeData}
        />
      </ModalForm>

          
      <ModalForm
        title={`修改角色`}
        width="500px"
        layout="horizontal"
        form={form}
        labelCol={{span:4}}
        wrapperCol={{span:20}}
        visible={updateModalVisible}
        onVisibleChange={handleUpdateModalVisible}
        onFinish={async (value) => {
          const success = await handleUpdate(value as RoleListItem);
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
        label="角色名称"
        rules={[
          {
            required: true,
            message:"角色名称为必填项",
          },
        ]}

        width="md"
        name="name"
      />
      <ProFormTextArea label="描述" width="md" name="desc" />
    </ModalForm>


      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>

    </PageContainer>
  );
};

export default RoleList;
