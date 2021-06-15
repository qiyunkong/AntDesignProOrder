import ProCard from '@ant-design/pro-card';
import { useState, useEffect} from 'react';
import ImageUpload from './components/ImageUpload';
import { message, Form, Cascader,Space} from 'antd';
import { CategoryListItem, CascaderItem } from '@/types';
import { PageHeaderWrapper } from '@ant-design/pro-layout'; // 布局配置
import { addProduct, getCategory} from '@/services/ganfanhun';
import ProForm, { ProFormSelect , ProFormText , ProFormList, ProFormDigit, ProFormTextArea } from '@ant-design/pro-form';



/** 格式转化的方法 */
const getCascader = (data:CategoryListItem[],isLeaf:boolean) =>{
  const options = data.map((item:CategoryListItem)=>{
    return {
      value:item._id,
      label:item.name,
      isLeaf,
    }
  })
  return options
}


/** 递归下标 死递归 */
const getCascaderIndex = (value:string,options:any) => {
  if(options.length == 0) return -1;
  //查找第一层
  let index = options.findIndex(((item:CascaderItem)=>item.value === value));
  //查找N层
  if(index == -1){
    for(let i = 0; options.length-1; i++){
      if(options[i]?.children){
       index = getCascaderIndex(value,options[i]?.children)
      }
    }
  }else{
    return index
  }
  return index
}



/**表单提交 */
const onFinish = async (values:any) =>{
  console.log(values)
  values.imageList =  getImageList(values.imageList)
  console.log(values.imageList )
  const reult =  await addProduct(values)
  console.log(reult,values);
  message.success('提交成功');
}


/** 图片数组格式 */
const getImageList = (fileList:any)=>{
  fileList = fileList.map((item:any)=>{
    let {imgUrl} = item;
    return {imgUrl}
  })
  return fileList
}






const ProductAdd  = () => {
  /** 设置内容 */
  const [stateValue, setStateValue] = useState({});
  /** 图片列表列 */
  const [uploadFileList,setUploadFileList] = useState<FileList[]>([]);
  /** 分类数组 */
  const [options, setOptions] = useState<CascaderItem[]>([]);
  /** 标签的数组 */
  const [spcsList,setspcsList] = useState<any>([
    {
      name: '口味',
      tags:[
        { label: '麻辣', value: 'all' },
        { label: '香辣', value: 'open' },
        { label: '微辣', value: 'closed' },
        { label: '不辣', value: 'processing' },
      ]
    }
  ])


  /** 钩子函数 */
  useEffect(()=>{
    getCategory({
      parentId:'0'
    }).then((result)=>{
      const {data} = result;
      const _options =  getCascader(data,false)
      setOptions([..._options])
    })
  },[])



	/** 点击第一级选项时 触发 selecedOptions 是对应点击项 */
  const onChange = (value:any, selectedOptions:any) => {
    console.log('onChange===>',value, selectedOptions);
  };

  /** 加载数据 */
  const loadData = async (selectedOptions:any) => {
    //点中的元素
    const targetOption = selectedOptions[selectedOptions.length - 1];
    let _options = options;
    targetOption.loading = true;
    //请求子叶子
    const {data}  = await getCategory({
      parentId:targetOption.value
    })
    //是否还有子节点
    if(data.length != 0){
      //格式转换
      const children =  getCascader(data,false);
      //添加全部叶子
      targetOption.children = [...children];
      //更新树杈状态
      targetOption.loading = false;
    }else{
      //设置树杈没有子叶
      targetOption.isLeaf = true;
      //关闭Loading
      targetOption.loading = false;

    }
    //更新DOM
    setOptions([..._options])
  };

  /** 获取spcsList */
  const handTags = (tags:[]) => {

  }

  return (
    <PageHeaderWrapper
    title={
      <Space>
        商品添加
      </Space>
    }
  >
    <ProCard>
     <ProForm
        wrapperCol={{span:10}}
        layout="horizontal"
        labelCol={{span:4}}
        onFinish={onFinish}
      >
        <ProFormText
          label="商品名称"
          name="name"
          rules={[{required:true,message:'请填写商品名称'}]}
        />
        <ProFormDigit label="商品价格" name="price" min={1} max={100} />
        <Form.Item
          label='商品分类'
          name="categoryId"
          rules={[{ required: true, message: '请选择分类' }]}
        >
          <Cascader
            options={options}
            loadData={loadData}
            onChange={onChange}
            placeholder="请选中对应的分类"
            changeOnSelect
          />
				</Form.Item>
        <ProFormList
          name="spcsList"
          label="规格名称"
          initialValue={spcsList}
          creatorButtonProps={{
            position: 'bottom',
          }}
          {...stateValue}
        >
          <ProForm.Group size={8}>
            <ProFormText name="name" rules={[{required:true,message:'请填规格名称'}]} />
            <ProFormSelect.SearchSelect
              name="tags"
              fieldProps={{
                labelInValue: true,
              }}
              options={spcsList.tags}
              request={async ({ keyWords }) => {
                return spcsList.tags.filter(({ value }:any) => value.includes(keyWords));
              }}
            />
          </ProForm.Group>
        </ProFormList>
        <ImageUpload
          onChange={(fileList:any)=>{
            console.log(fileList)
            fileList = fileList.map((file:any)=>{
              return {
                uid:file.uid,
                url:file.imgUrl
              }
            })
            setUploadFileList(fileList);
          }}
          value={uploadFileList}
          name="imageList"
          label="商品图片"
          max={3}
          title="商品图片上传"
        />
        <ProFormTextArea
          label="商品描述"
          name="desc"
          rules={[{required:true,message:'请填写商品描述'}]}
        />
      </ProForm>
    </ProCard>
    </PageHeaderWrapper>
  );
};

export default ProductAdd
