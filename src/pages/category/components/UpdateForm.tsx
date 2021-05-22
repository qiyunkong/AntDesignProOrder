import React from 'react';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import {CategoryListItem} from '@/types'

export type FormValueType = {
  _id: string;
  desc?: string;
  name: string;
  createTime?: string;
  status?: number;
  parentId?:string;
} & Partial<CategoryListItem>;

export type UpdateFormProps = {
  onCancel: ()=>void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<CategoryListItem>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  console.log(props.values);
  return (
    <ModalForm
        width={440}
        title="分类配置"
        visible={props.updateModalVisible}
        onFinish={props.onSubmit}
       
    >
        <ProFormText
          name="name"
          label="分类名称"
          width="md"
          initialValue={ props.values.name}
          rules={[
            {
              required: true,
              message:"请输入规则名称！",
            },
          ]}
        />
        <ProFormTextArea
          name="desc"
          width="md"
          label="分类描述"
          placeholder="请输入至少五个字符!"
          initialValue = {props.values.desc}
          rules={[
            {
              required: true,
              message:"请输入至少五个字符的规则描述！",
              min: 5,
            },
          ]}
        />
    </ModalForm>
);







};

export default UpdateForm;
