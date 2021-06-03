import {history} from 'umi'
import {  FormattedMessage } from 'umi';
import ProCard from '@ant-design/pro-card';
import ProTable from '@ant-design/pro-table';
import {CategoryListItem, IPage} from '@/types'
import UpdateForm from './components/UpdateForm';
import { PlusOutlined } from '@ant-design/icons';
import UpdateSwitch from './components/UpdateSwitch';
import ProDescriptions from '@ant-design/pro-descriptions';
import React, { useState, useRef, useEffect } from 'react';
import { Button, message, Drawer,Switch,Breadcrumb} from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import {addCategory,getCategory,delCategory,putCategory,getMenu} from '@/services/ganfanhun'


/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields: CategoryListItem) => {

  const hide = message.loading('正在添加');
  try {
    const result =  await addCategory({ ...fields });
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
const handleUpdate = async (fields: CategoryListItem) => {
  const hide = message.loading('正在配置');
  try {
    await putCategory({
      _id: fields._id,
      name: fields.name,
      desc: fields.desc,
      status:fields.status
    });
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
const handleRemove = async (selectedRows: CategoryListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await delCategory({
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


const CategoryList: React.FC = () => {

  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /** 分布更新窗口的弹窗 */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  /** 删除的弹框 */
  const [showDetail, setShowDetail] = useState<boolean>(false);
  /** 方法标记 */
  const actionRef = useRef<ActionType>();
  const [link,setLink] = useState<CategoryListItem[]>();
  /** */
  const [currentRow, setCurrentRow] = useState<CategoryListItem>();
  const [selectedRowsState, setSelectedRows] = useState<CategoryListItem[]>([]);

  /** 分类节点ID*/
  const [parentId,setParentId] = useState<string>('0');


    // useEffect(()=>{
    //   actionRef.current?.reload()
    // },[parentId])

  /** 表格规格 */
  const columns: ProColumns<CategoryListItem,"text">[] = [
    {
      title: '分类ID',
      dataIndex: '_id',
      tip: '规则名称是唯一的 key',
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
      title: "分类名称",
      dataIndex: 'name',
    },
    {
      title: "描述",
      dataIndex: 'desc',
      copyable: true,
      ellipsis: true,
      tip: '标题过长会自动收缩',
      valueType: 'textarea',
    },
    {
      title: "创建时间",
      sorter: true,
      dataIndex: 'createTime',
      valueType: 'dateTime',
    },
    {
      title:"是否展示",
      dataIndex:'status',
      hideInForm:true,
      valueEnum:{
        'false':{
          text:"已关闭",
          status:'false',
        },
        'true':{
          text:"已开启",
          status:'true',
        }
      },
      render: (_, record) => (
        <Switch checkedChildren={"已展示"}  unCheckedChildren={"已关闭"} onChange={async (vaule) => {
          record.status = vaule
          const success = await handleUpdate(record);
          if (success) {
            setCurrentRow(undefined);
          }
         }
        }   defaultChecked={record.status} />
      )
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
          }}
        >
         更新
        </a>,
        <a key="subscribeAlert"
          onClick={() => {
            //设置父节点分类ID
            setParentId(record._id)
            //设置面包屑
            let _link =  link
            _link?.push(record)
            setLink(_link)
            // 清空选中项
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }}
        >
         查看子分类
        </a>,
      ],
    },

  ];

  return (
    <PageContainer>
      <ProCard>
      <Breadcrumb>
        {link?.length && (
          link.map(({name,_id})=>{
            return <Breadcrumb.Item onClick={()=>{
            }}>{name}</Breadcrumb.Item>
          })
        )}
        <Breadcrumb.Item onClick={()=>{
           //设置父节点分类ID
           setParentId('0')
            // 清空选中项
            if (actionRef.current) {
              actionRef.current.reload();
            }
            }}>回退</Breadcrumb.Item>
      </Breadcrumb>
      </ProCard>

      <ProTable<CategoryListItem, IPage>
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
        request={getCategory}
        params={{
          parentId:parentId
        }}
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
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="已选择" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
              &nbsp;&nbsp;
              <span>
                <FormattedMessage
                  id="pages.searchTable.totalServiceCalls"
                  defaultMessage="服务调用次数总计"
                />{' '}
                {selectedRowsState.reduce((pre, item) => 0, 0)}{' '}
                <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万" />
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage id="pages.searchTable.batchDeletion" defaultMessage="批量删除" />
          </Button>
          <Button type="primary">
            <FormattedMessage id="pages.searchTable.batchApproval" defaultMessage="批量审批" />
          </Button>
        </FooterToolbar>
      )}


      <ModalForm
        title="新建分类"
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          value.parentId = parentId
          const success = await handleAdd(value as CategoryListItem);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          label="分类名称"
          rules={[
            {
              required: true,
              message:"分类名称为必填项",
            },
          ]}

          width="md"
          name="name"
        />
        <ProFormTextArea label="描述" width="md" name="desc" />
      </ModalForm>

      <UpdateForm
        onSubmit={async (value) => {
          console.log(value);
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onVisibleChange={handleUpdateModalVisible}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      />

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

export default CategoryList;
