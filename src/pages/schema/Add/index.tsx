import { Button,message } from 'antd';
import React, { useState } from 'react';
import ProCard from '@ant-design/pro-card';
import ProField from '@ant-design/pro-field';
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import ProForm, { StepsForm, ProFormText, ProFormDatePicker, ProFormDateTimePicker, ProFormSelect, ProFormTextArea, ProFormCheckbox,} from '@ant-design/pro-form';

type DataSourceType = {
  id: React.Key;
  title?: string;
  decs?: string;
  state?: string;
  created_at?: string;
  children?: DataSourceType[];
};

const defaultData: DataSourceType[] = new Array(5).fill(1).map((_, index) => {
  return {
    id: (Date.now() + index).toString(),
    title: `字段1${index}`,
    decs: '这个活动真好玩',
    state: 'open',
    created_at: '2020-05-26T09:42:56Z',
  };
});

export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    defaultData.map((item) => item.id),
  );

  const [dataSource, setDataSource] = useState<DataSourceType[]>(() => defaultData);

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '字段名称',
      dataIndex: 'title',
      width: '20%',
      formItemProps: {
        rules: [
          {
            required: true,
            whitespace: true,
            message: '此项是必填项',
          },
          {
            max: 16,
            whitespace: true,
            message: '最长为 16 位',
          },
          {
            min: 6,
            whitespace: true,
            message: '最小为 6 位',
          },
        ],
      },
    },
    {
      title: '类型',
      key: 'state',
      dataIndex: 'state',
      valueType: 'select',
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        open: {
          text: '未解决',
          status: 'Error',
        },
        closed: {
          text: '已解决',
          status: 'Success',
        },
      },
    },
    {
      title: '字段描述',
      dataIndex: 'decs',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 250,
      render: () => {
        return null;
      },
    },
  ];

  //定时器
  const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };


  return (
    <>
     <ProCard>
      <StepsForm
          onFinish={async (values) => {
            console.log(values);
            await waitTime(1000);
            message.success('提交成功');
          }}
          formProps={{
            validateMessages: {
              required: '此项为必填项',
            },
          }}
        >
        <StepsForm.StepForm
          name="base"
          title="创建模型"
          onFinish={async (values) => {
            console.log(values)
            await waitTime(2000);
            return true;
          }}
        >
          <ProFormText
            name="tableName"
            width="md"
            label="数据表名称"
            tooltip="最长为 24 位，用于标定的唯一 id"
            placeholder="请输入名称"
            rules={[{ required: true }]}
          />
          <ProFormTextArea name="remark" label="备注" width="lg" placeholder="请输入备注" />
        </StepsForm.StepForm>
          <StepsForm.StepForm name="checkbox" title="设置字段">

            <EditableProTable<DataSourceType>
              headerTitle="字段类型配置"
              columns={columns}
              rowKey="id"
              value={dataSource}
              onChange={setDataSource}
              recordCreatorProps={{
                newRecordType: 'dataSource',
                record: () => ({
                  id: Date.now(),
                }),
              }}
              editable={{
                type: 'multiple',
                editableKeys,
                actionRender: (row, config, defaultDoms) => {
                  return [defaultDoms.delete];
                },
                onValuesChange: (record, recordList) => {
                  setDataSource(recordList);
                },
                onChange: setEditableRowKeys,
              }}
          />
          {/* JSON数据 */}
            <ProCard title="表格数据" headerBordered collapsible defaultCollapsed>
              <ProField
                fieldProps={{
                  style: {
                    width: '100%',
                  },
                }}
                mode="read"
                valueType="jsonCode"
                text={JSON.stringify(dataSource)}
              />
            </ProCard>
        </StepsForm.StepForm>
        <StepsForm.StepForm name="time" title="生成模型">
          <ProFormCheckbox.Group
            name="checkbox"
            label="部署模型"
            rules={[
              {
                required: true,
              },
            ]}
            options={['部署模型1', '部署模型2', '部署模型3']}
          />
          <ProFormSelect
            label="部署分组策略"
            name="remark"
            rules={[
              {
                required: true,
              },
            ]}
            width="md"
            initialValue="1"
            options={[
              {
                value: '1',
                label: '策略一',
              },
              { value: '2', label: '策略二' },
            ]}
          />
          <ProFormSelect
            label="Pod 调度策略"
            name="remark2"
            width="md"
            initialValue="2"
            options={[
              {
                value: '1',
                label: '策略一',
              },
              { value: '2', label: '策略二' },
            ]}
          />
        </StepsForm.StepForm>
      </StepsForm>
     </ProCard>
    </>
  );
};
