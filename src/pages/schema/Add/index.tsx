import { Button,message } from 'antd';
import React, { useState } from 'react';
import ProCard from '@ant-design/pro-card';
import ProField from '@ant-design/pro-field';
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import { addSchema } from '@/services/ganfanhun/schema';
import {TableSourceType,FormSourceType,SchemaDva} from '@/types';
import { StepsForm, ProFormText,ProFormList, ProFormSelect,ProFormGroup, ProFormTextArea, ProFormCheckbox,} from '@ant-design/pro-form';


const defaultData: TableSourceType[] = new Array(1).fill(1).map((_, index) => {
  return {
    title: '姓名',
    type:'String',
    required:'true',
    search:'false',
    dataIndex: 'name',
    decs: '请填写字段的描述',
    id: (Date.now() + index).toString(),
  };
});



/**
 * 添加节点
 *
 * @param fields
 */
 const handleAdd = async (fields: SchemaDva<TableSourceType>) => {
  console.log("handleAdd====>",fields);
  const hide = message.loading('正在添加');
  try {
    const result =  await addSchema({ ...fields });
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





const  SchemaAdd = () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    defaultData.map((item) => item.id),
  );

  const [position, setPosition] = useState<'bottom' | 'top'>('bottom');

  //第一步 表单数据存储
  const [formSource,setFormSource] =  useState<FormSourceType>();

  //第二步 表格数据存储
  const [dataSource, setDataSource] = useState<TableSourceType[]>(() => defaultData);




  const columns: ProColumns<TableSourceType>[] = [
    {
      title: '字段名称',
      dataIndex: 'dataIndex',
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
            min: 2,
            whitespace: true,
            message: '最小为 2 位',
          },
        ],
      },
    },
    {
      title: '表头名称',
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
            min: 2,
            whitespace: true,
            message: '最小为 2 位',
          },
        ],
      },
    },
    {
      title: '字段类型',
      key: 'type',
      dataIndex: 'type',
      valueType: 'select',
      valueEnum: {
        String: {
          text: 'String',
          status: 'String'
        },
        Number: {
          text: 'Number',
          status: 'Number',
        },
        Dete: {
          text: 'Dete',
          status: 'Dete',
        },
        Boolean: {
          text:'Boolean',
          status:'Boolean'
        },
        Array:{
          text:'Array',
          status:'Array'
        },
        enum:{
          text:'enum',
          status:'enum'
        }
      },
    },
    {
      title: '表单类型',
      key: 'valueType',
      dataIndex: 'valueType',
      valueType: 'select',
      valueEnum: {
        select: {
          text: 'select',
          status: 'select'
        },
        date: {
          text: 'date',
          status: 'date',
        },
        textarea: {
          text:'textarea',
          status:'textarea'
        },
      },
    },
    {
      title: '是否必选',
      key: 'required',
      dataIndex: 'required',
      valueType: 'select',
      valueEnum: {
        true: {
          text: 'true',
          status: 'true'
        },
        false: {
          text: 'false',
          status: 'false',
        }
      },
    },
    {
      title: '是否为搜索',
      key: 'search',
      dataIndex: 'search',
      valueType: 'select',
      valueEnum: {
        true: {
          text: 'true',
          status: 'true'
        },
        false: {
          text: 'false',
          status: 'false',
        }
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
            console.log(values,dataSource);
            let field = {
              name:formSource?.name,
              nameDva:formSource?.nameDva,
              dva:[...dataSource],
            }
            await handleAdd(field);
            return false;
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
          onFinish={async (values:FormSourceType) => {
            //这里判断模型是否存在 get api/model
            console.log(values)
            setFormSource(values)
            await waitTime(2000);
            return true;
          }}
        >
          <ProFormText
            name="name"
            width="md"
            label="数据表名称"
            tooltip="最长为 24 位，是模型的表名称"
            placeholder="请输入名称"
            rules={[{ required: true }]}
          />
          <ProFormText
            name="nameDva"
            width="md"
            label="表中文名称"
            tooltip="最长为 24 位，是模型的中文名称"
            placeholder="请输入名称"
            rules={[{ required: true }]}
          />
          <ProFormTextArea name="desc" label="备注" width="lg" placeholder="请输入备注" />
        </StepsForm.StepForm>


        <StepsForm.StepForm name="checkbox" title="设置字段">

          <EditableProTable<TableSourceType>
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

      <StepsForm.StepForm name="time" title="模型设置">
        <ProFormCheckbox.Group
          name="checkbox"
          label="关联模型"
          rules={[
            {
              required: false,
            },
          ]}
          options={['student', 'teacher', 'school']}
        />

        <ProFormList
          name="model"
          label="关联信息"
          rules={[
            {
              validator: async (_, value) => {
                console.log(value);
                if (value && value.length > 0) {
                  return;
                }
                throw new Error('至少要有一项！');
              },
            },
          ]}
          creatorButtonProps={{
            position,
          }}
          creatorRecord={{
            name: 'test',
          }}
          initialValue={[
            {
              name: 'name',
              search: 'true',
            },
          ]}
        >
          <ProFormGroup>
            <ProFormSelect
              rules={[
                {
                  required: true,
                },
              ]}
              name="name"
              label="字段"
              valueEnum={{
                name: 'name',
                sex: 'sex',
              }}
            />
            <ProFormSelect
              label="是否搜索"
              name="search"
              width="xs"
              valueEnum={{
                true: 'true',
                false: 'false',
              }}
            />
          </ProFormGroup>
        </ProFormList>
        <ProFormSelect
          label="是否为搜索项"
          width="md"
          initialValue='true'
          options={[
            {
              value: 'true',
              label: '是',
            },
            { value: 'false', label: '否' },
          ]}
        />
      </StepsForm.StepForm>
      </StepsForm>
     </ProCard>
    </>
  );
};
export default SchemaAdd
