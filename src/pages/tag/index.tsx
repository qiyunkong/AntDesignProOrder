import {TagListItem} from '@/types';
import ProTable from '@ant-design/pro-table';
import { Button, message, Drawer,Form} from 'antd';
import React, { useState, useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import {getTag,putTag,delTag,addTag} from '@/services/ganfanhun';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';




/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields: TagListItem) => {

  const hide = message.loading('正在添加');
  try {
    const result =  await addTag({ ...fields });
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
const handleUpdate = async (fields: TagListItem) => {
  const hide = message.loading('正在配置');
  try {
    await putTag({...fields});
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
const handleRemove = async (selectedRows: TagListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await delTag({
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


const TagList: React.FC = () => {

  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /** 分布更新窗口的弹窗 */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  /** 授权新窗口 */


  /** 删除的弹框 */
  const [showDetail, setShowDetail] = useState<boolean>(false);
  /** 方法标记 */
  const actionRef = useRef<ActionType>();
  /** 选择中当前行 */
  const [currentRow, setCurrentRow] = useState<TagListItem>();
  const [selectedRowsState, setSelectedRows] = useState<TagListItem[]>([]);

  /** 分类节点ID*/
  const [parentId,setParentId] = useState<string>('0');

  
  //表单对象
  const [form] = Form.useForm();



    // useEffect(()=>{
    //   actionRef.current?.reload()
    // },[parentId])

  /** 表格规格 */
  const columns: ProColumns<TagListItem,"text">[] = [
    {
      title: '标签ID',
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
      title: "标签名称",
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
      title: "标签颜色",
      sorter: true,
      search:false,
      dataIndex: 'authName',
      valueType: 'dateTime',
    },
    {
      title:"描述",
      dataIndex:'desc',
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
            console.log("删除")
          }}
        >
         删除
        </a>,
      ],
    },

  ];

  return (
    <PageContainer>
      <ProTable<TagListItem>
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
        request={getTag}
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
        title="新建标签"
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          value.parentId = parentId
          const success = await handleAdd(value as TagListItem);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          label="标签名称"
          rules={[
            {
              required: true,
              message:"标签名称为必填项",
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormText label="标签颜色" width="md" name="color" />
        <ProFormTextArea label="描述" width="md" name="desc" />
      </ModalForm>

      <ModalForm
        title={`修改标签`}
        width="500px"
        layout="horizontal"
        form={form}
        labelCol={{span:4}}
        wrapperCol={{span:20}}
        visible={updateModalVisible}
        onVisibleChange={handleUpdateModalVisible}
        onFinish={async (value) => {
          const success = await handleUpdate(value as TagListItem);
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
							label="标签名称"
							rules={[
							{
									required: true,
									message:"标签名称为必填项",
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

export default TagList;
