import {  FormattedMessage } from 'umi';
import ProCard from '@ant-design/pro-card';
import useRouter from '@/hooks/useRouter';
import ProTable from '@ant-design/pro-table';
import {CategoryListItem, IPage} from '@/types'
import { PlusOutlined } from '@ant-design/icons';
import ProDescriptions from '@ant-design/pro-descriptions';
import React, { useState, useRef} from 'react';
import { Button, message, Drawer} from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import {getCategory,delCategory} from '@/services/ganfanhun';
import { useEffect } from 'react';
import {getSchemaDva,addSchemaDva} from '@/services/ganfanhun';



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


const SchemaList: React.FC = (props:any) => {
  /** 删除的弹框 */
  const [showDetail, setShowDetail] = useState<boolean>(false);
  /** 方法标记 */
  const actionRef = useRef<ActionType>();
  /** 标记现选择的行 */
  const [currentRow, setCurrentRow] = useState<CategoryListItem>();
  const [selectedRowsState, setSelectedRows] = useState<CategoryListItem[]>([]);
  /** 动态路由 */
  const [params,setParams] = useState<string>()
  /** 数据 */
  const [dataSource,setDataSource] = useState()
  /** 表结构 */
  const [columns,setColumns] = useState<ProColumns[]>( [
    {
      title: "操作",
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
           console.log("页面跳转")
          }}
        >
         更新
        </a>,
      ],
  }])

  const router = useRouter();
  /** 生命周期函数 */
  //生命周期
  useEffect(()=>{
    //1.获取动态路由参数
    const {view} = props.match.params
    setParams(view)
    // console.log(view, props.match.params)
    //2.获取表单模型
    getSchemaDva({},view).then((res:any)=>{
      console.log(res?.columnsTable)
      setColumns([
        ...res?.columnsTable,
        ...columns
      ])
      setDataSource(res?.data)
    })
    //3.渲染模型
    
  },[])





  /** 表格规格数据 */
  // const columns: ProColumns[] = [
  //   {
  //     title: "操作",
  //     dataIndex: 'option',
  //     valueType: 'option',
  //     render: (_, record) => [
  //       <a
  //         key="config"
  //         onClick={() => {
  //          console.log("页面跳转")
  //         }}
  //       >
  //        更新
  //       </a>,
  //     ],
  //   },

  // ];




  return (
    <PageContainer>
      <ProTable
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
              //条件到模型页面
              //console.log("链接跳转")
              router.loadPage(`/schema/${params}/Add`)

            }}
          >
            <PlusOutlined /> 新建数据
          </Button>,
        ]}
        columns={columns}
        dataSource={dataSource}
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

export default SchemaList;
