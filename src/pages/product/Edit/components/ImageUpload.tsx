import {useState,useEffect} from 'react';
import {  ProFormUploadButton } from '@ant-design/pro-form';
const ImageUpload = (props: any,ref:any)=> {

  const {max,title,label,name} = props;



  const [fileList, setFileList] = useState<any>([])      //展示默认值

  //子组初始化
  useEffect(() => {
    if (props.value) {
      let newFileList = props.value.map((item: any) => {
        return {
          uid: item.id || item.uid,
          status: 'done',
          url: `http://127.0.0.1:3001${item.url}`,
          imgUrl: item.url,
        }
      })
      setFileList(newFileList)
    }
  }, [props])

  //上传事件
  const handleChange = ({ file, fileList }: any) => {
    fileList = fileList.map((file: any) => {
      if (file.response) {
        file.id = file.uid;
        file.imgUrl = file.response.data.url;
      }
      return file;
    });
    if (file.status !== undefined) {
      if (file.status === 'done') {
        triggerChange(fileList);
      } else if (file.status === 'error') {
      } else if (file.status === 'removed') {
        if (typeof file.uid === 'string') {
          //请求接口，删除已经保存过的图片，并且成功之后triggerChange
          triggerChange(fileList);
        } else {
          //只是上传到了服务器，并没有保存，直接riggerChange
          triggerChange(fileList);
        }
      }
    }
    setFileList([...fileList]);
  }


  const triggerChange = (value: any) => {
    const onChange = props.onChange;
    if (onChange) {
      onChange(value);
    }
  };

  return <ProFormUploadButton
          name={name}
          label={label}
          max={max}
          title={title}
          fieldProps={{
            name: 'image',
            listType: 'picture-card',
            fileList:fileList
          }}
          onChange={handleChange}
          action="/api/img/upload"
          accept="image/*"
          extra="上传LOGO图标"/>
}

export default ImageUpload



//https://my.oschina.net/u/4382844/blog/4288244
