import {  FormattedMessage } from 'umi';
import useRouter from '@/hooks/useRouter';
import ProTable from '@ant-design/pro-table';
import { Button, message, Drawer} from 'antd';
import React, { useState, useRef } from 'react';
import { IPage,ProductListItem} from '@/types';
import { PlusOutlined } from '@ant-design/icons';
import ProDescriptions from '@ant-design/pro-descriptions';
import {getProduct,delProduct} from '@/services/ganfanhun';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
/**
 * 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: ProductListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await delProduct({
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


const ProductListPage: React.FC = () => {
  const router = useRouter();
  /** 删除的弹框 */
  const [showDetail, setShowDetail] = useState<boolean>(false);
  /** 方法标记 */
  const actionRef = useRef<ActionType>();
  /** */
  const [currentRow, setCurrentRow] = useState<ProductListItem>();
  const [selectedRowsState, setSelectedRows] = useState<ProductListItem[]>([]);

  /** 表格规格 */
  const columns: ProColumns<ProductListItem,"text">[] = [
    {
      title: '商品ID',
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
      title: "商品名称",
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
      title: "价格",
      dataIndex: 'price',
      sorter: true,
      hideInForm: true,
      renderText: (val: string) =>
        `${val}元`,
    },
    {
      title: '图片',
      dataIndex: 'imageList',
      key: 'image',
      valueType: 'image',
      search:false,
      renderText: (val:any) =>{
        return  `http://127.0.0.1:3001${val[0]?.imgUrl}`
      }

    },
    {
      title: "创建时间",
      sorter: true,
      dataIndex: 'createTime',
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
            router.loadPage(`/server/product/Edit?id=${record._id}`)
          }}
        >
         更新
        </a>,
        <a key="subscribeAlert"
          onClick={() => {
          }}
        >
         删除
        </a>,
      ],
    },

  ];

  return (
    <PageContainer>
      <ProTable<ProductListItem, IPage>
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
                router.loadPage("/server/product/Add")
              }}
            >
            <PlusOutlined />新建商品
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
              已选择{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              项
              &nbsp;&nbsp;
              <span>
                {/* 商品总价为{selectedRowsState.reduce((pre, item) => {
                  console.log(pre,item)
                  return 0
                }, 0)}元 */}
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
            批量删除
          </Button>
          <Button type="primary">
            批量下架
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

export default ProductListPage;
