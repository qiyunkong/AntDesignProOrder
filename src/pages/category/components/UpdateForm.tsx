import React,{useEffect,useState} from 'react';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import {CategoryListItem} from '@/types'
import { Form } from 'antd';

export type FormValueType = {
  _id: string;
  desc?: string;
  name: string;
  createTime?: string;
  status?: number;
  parentId?:string;
} & Partial<CategoryListItem>;

export type UpdateFormProps = {
  onVisibleChange:(visible: boolean) => void
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<CategoryListItem>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const {values,updateModalVisible,onSubmit,onVisibleChange} = props
  // const [initialValues, setinitialValues] = useState<Partial<CategoryListItem>>()
  const [form] = Form.useForm();
  // componentDidMount
  useEffect(() => {
     // 需要在 componentDidMount 执行的内容
     //console.log(values)
    form.setFieldsValue(values)
  }, [values]);

  return (
    <ModalForm
        width={440}
        title="分类配置"
        visible={updateModalVisible}
        onFinish={onSubmit}
        onVisibleChange={onVisibleChange}
        form={form}
    >
        <ProFormText
          name="name"
          label="分类名称"
          width="md"
          rules={[
            {
              required: true,
              message:"请输入规则名称！",
            },
          ]}
          initialValue={values.name}
        />
        <ProFormTextArea
          name="desc"
          width="md"
          label="分类描述"
          placeholder="请输入至少五个字符!"
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
