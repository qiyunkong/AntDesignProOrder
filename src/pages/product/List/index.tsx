import {  FormattedMessage } from 'umi';
import useRouter from '@/hooks/useRouter';
import ProTable from '@ant-design/pro-table';
import { Button, message, Drawer} from 'antd';
import React, { useState, useRef } from 'react';
import {CategoryListItem, IPage} from '@/types';
import { PlusOutlined } from '@ant-design/icons';
import ProDescriptions from '@ant-design/pro-descriptions';
import {getProduct,delCategory} from '@/services/ganfanhun';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
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


const ProductList: React.FC = () => {
  const router = useRouter();
  /** 删除的弹框 */
  const [showDetail, setShowDetail] = useState<boolean>(false);
  /** 方法标记 */
  const actionRef = useRef<ActionType>();
  /** */
  const [currentRow, setCurrentRow] = useState<CategoryListItem>();
  const [selectedRowsState, setSelectedRows] = useState<CategoryListItem[]>([]);

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
    },
    {
      title: "操作",
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            setCurrentRow(record);
          }}
        >
         更新
        </a>,
        <a key="subscribeAlert"
          onClick={() => {
          }}
        >
         查看子分类
        </a>,
      ],
    },

  ];

  return (
    <PageContainer>
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
                router.loadPage("/product/Edit")
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
        request={getProduct}
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

export default ProductList;
