import {history} from 'umi';
import ProCard from '@ant-design/pro-card';
import { useState, useEffect} from 'react';
import ImageUpload from './components/ImageUpload';
import { message, Form, Cascader,Space} from 'antd';
import { CategoryListItem, CascaderItem } from '@/types';
import { PageHeaderWrapper } from '@ant-design/pro-layout'; // 布局配置
import { addProduct, getCategory,getProductInfo,putProduct} from '@/services/ganfanhun';
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

const getCascaderChild = (data:CategoryListItem[],isLeaf:boolean) =>{
  const options = data.map((item:CategoryListItem)=>{
    return {
      value:item._id,
      label:item.name,
      isLeaf,
      children:[]
    }
  })
  return options
}




/**表单修改 */
const onFinish = async (values:any) =>{
  console.log(values)
  values.imageList =  getImageList(values.imageList)
  console.log(values.imageList )
  const reult =  await putProduct(values)
  console.log(reult,values);
  message.success('提交成功');
}


/** 上传图片数组格式 */
const getImageList = (fileList:any)=>{
  fileList = fileList.map((item:any)=>{
    let {imgUrl} = item;
    return {imgUrl}
  })
  return fileList
}

/** 初始图片数组格式转化 */
const formatImageList = (fileList:any)=>{
  fileList = fileList.map((file:any)=>{
    return {
      uid:file.uid,
      url:file.imgUrl
    }
  })
  return fileList
}

/** 递归查询子节点  */
const recursiveChildren = async (targetOption:any,ids:any,i:number) => {
  if(ids.length === i) return targetOption;
  //拿出下一个树杈的id
  let id  = ids[i];
  //请求子叶
  const {data}  = await getCategory({
    parentId:ids[i-1]
  })
  console.log(i,data)
  //格式化
  const _data = getCascaderChild(data,false) 
  //不是最后一个元素 是否达道倒数第二个元素
  if(id!=(ids.length-2)){
    //通过id找出对应的树杈
    let _targetOption = _data.find((item:any)=>item.value == id);
    //通过id找出对应的树杈下标
    const index = _data.findIndex((item:any)=>item.value===_targetOption?.value);
    if(index != -1){  //查到就继续执行
      _data[index].children = await recursiveChildren( _data[index],ids,i++);
      targetOption.children = _data;
    }else{
      return targetOption;
    }
  }
  return targetOption;
}
   



const ProductAdd  = () => {
  /** 设置内容 */
  const [stateValue, setStateValue] = useState({});
  
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
  /** 图片列表列 */
  const [uploadFileList,setUploadFileList] = useState<FileList[]>([]);





  /** 表单对象 */
  const [form] = Form.useForm();

  /** 钩子函数 */
  useEffect(()=>{
    //获取分类
    getCategory({
      parentId:'0'
    }).then((result)=>{
      const {data} = result;
      const _options =  getCascader(data,false)
      setOptions([..._options])
    })  
  },[])

  useEffect(()=>{
    const id = history?.location.query?.id?.toString()
    //获取商品
    getProductInfo(id).then((result)=>{
      console.log(result.data)
      form.setFieldsValue(result.data)
      const imageList = formatImageList(result.data?.imageList)
      setUploadFileList(imageList)
      //cascaderChild(result.data?.categoryId)
    })
  },[])



	/** 点击第一级选项时 触发 selecedOptions 是对应点击项 */
  const onChange = (value:any, selectedOptions:any) => {
    console.log('onChange===>',value, selectedOptions);
  };



  //初始化页面 queryChild
  const cascaderChild = async (ids:any) => {
    //找父节点
    const targetOption = options.find(item=>item.value===ids[0])
    //找出index
    const index = options.findIndex(item=>item.value===targetOption?.value)
    //修改好的
    let _targetOption:any = recursiveChildren(targetOption,ids,1)
    let _options = options;
    _options[index] = _targetOption;
    console.log(_targetOption)    
    //更新DOM
    setOptions([..._options])
    

    //找父节点
    // const targetOption = options.find(item=>item.value===pCategoryId)
    // //找出index
    // const index = options.findIndex(item=>item.value===targetOption.value)
    // const result = await getCategory(targetOption.value)
    // let {data,status} = result
    // if(status===0){ //如果获取到二级分类
    //   // data = this.formateData(data,false)
    //   targetOption.children = this.getCascader(data,false)
    // }else{  //如果没有获取到二级分类 则该一级分类就是叶子
    //   targetOption.isLeaf = true;
    // }
    // this.setState({options})
  }





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
      message.warning(`${targetOption.label}没有子分类`);

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
        商品修改
      </Space>
    }
  >
    <ProCard>
     <ProForm
        form={form}
        wrapperCol={{span:10}}
        layout="horizontal"
        labelCol={{span:4}}
        onFinish={onFinish}

      >
        <ProFormText name="_id" hidden/>
        <ProFormText
          label="商品名称"
          name="name"
          rules={[{required:true,message:'请填写商品名称'}]}
        />
        <ProFormDigit label="商品价格" name="price" min={1} max={10} />
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
            console.log("===>",fileList)
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
          label="网站图标"
          max={3}
          title="logo上传"
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
