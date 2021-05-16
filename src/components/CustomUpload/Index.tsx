import useFile from '@/hooks/useFile'
import useParameter from '@/hooks/useParameter'
import { UpdateFormProps } from '@/pages/TableList/components/UpdateForm'
import { File, UploadFileParamter } from '@/types'
import { getApiPath } from '@/utils/utils'
import { CloseCircleFilled, CloseOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Input, message, Upload } from 'antd'
import { RcFile } from 'antd/es/upload'
import { UploadChangeParam, UploadFile, UploadProps } from 'antd/lib/upload/interface'
import 'braft-editor/dist/index.css'
import qs from 'qs'
import React, { useEffect, useState } from 'react'
import './index.less'

//类型
declare type FileType = string | string[] | File | File[] | undefined


//接口
interface MxUploadProps extends Omit<UploadProps<FileType>,'fileList' | 'data' | 'action' | 'onChange'>{
    value?:FileType
    onChange?:(value:FileType) => void
    params?:UpdateFormProps
    mode?:'file' | 'image' | 'icon' | 'photo' // 'icon' | 'avatar' | 'photo'
    extra?:React.ReactNode
    size?:number
    className?:string
    children?:React.ReactNode
    removeAble?:boolean    
}

/***
 * 为Antd form 定制的input
 * @param props
 */

export default function MxUpload(props:MxUploadProps){
    //hook 变量
    const [fileList,setFileList] = useState<UploadFile<FileType>[]>([])
    const [uploadLoading,setUploadLoading] = useState<boolean>(false)


    const {getUrl} = useFile()
    const parameter = useParameter<{appId?:number}>()
    
    //
    const {value,onChange,params,mode,extra,removeAble,...rest} = props


    //
    const fileItemMapToUploadFile = (item:FileType) =>{

        if(typeof item === 'string'){
            return {
                uid:item || '',
                size:0,
                type:'image',
                name:item || '',
                status:'done',
                response:[{type:'image',fileId:item}]
            } as UploadFile<FileType>
        }
        const file = item as File
        return {
            uid:file?.id || '',
            name:file?.fileName || '',
            size:file?.size || 0,
            type:'image',
            status:'done',
            response:[file],
        } as UploadFile<FileType>
    }

    //生命周期
    useEffect(()=>{
        if(props.value){
            if(props.value instanceof Array){
                const newFileList:UploadFile<FileType>[] = []
                props.value.forEach((item:any)=>{
                    newFileList.push(fileItemMapToUploadFile(item))
                })
                setFileList(newFileList)
            }else{
                const file = fileItemMapToUploadFile(props.value)
                setFileList([file])
            }
        }
    },[props.value])


    //拼接图片上传接口     
    const initApiPath = (res:any) =>{
        const paiPath:string = `/api/file/?${qs.stringify(res)}`
        return paiPath
    }

    const handleFilesChange = (fileList:UploadFile<FileType>[])=>{
        const allComplete = fileList.every((file)=> file.status === 'done')
        if(allComplete){
            let returnValue:FileType = ''
            if(props.value instanceof Array){
                if(typeof props.value[0] === 'string'){
                    const ids:string[] = []
                    fileList.forEach((file:any)=>{
                        ids.push(file.response[0].fileId)
                    })
                    returnValue = ids;
                }else{
                    const files:File[] = []
                    fileList.forEach((file:any)=>{
                        files.push(file.response[0])
                    })
    
                    returnValue = files
                }
                
            }else if(typeof props.value === 'string'){
                const file = (fileList.length ? fileList[fileList.length - 1]?.response?.[0]:undefined) as File
                returnValue = file?.fileId || ''
            }else {
                returnValue = fileList.length ? fileList[fileList.length -1].response?.[0]:undefined
            }
            if(props.onChange){
                props.onChange(returnValue)
            }
        }
    }


    //删除操作
    const onRemove = (file: UploadFile) => {
        const index = fileList.indexOf(file)
        const newFileList = fileList.slice()
        newFileList.splice(index, 1)
        setFileList(newFileList)
        handleFilesChange(newFileList)
    }
    
    //上传前文件类型判断
    const beforeUpload = (file: RcFile) => {
        if (props.mode === 'image') {
          if (!(file.type === 'image/jpeg' || file.type === 'image/png')) {
            message.error('只能上传JPG/PNG的图片!')
            return false
          }
        }
        if (props.size && !(file.size / 1024 / 1024 < props.size)) {
          message.error(`上传的文件必须小于${props.size}MB!`)
          return false
        }
        return true
    }


    const handleChange: any = (info: UploadChangeParam<UploadFile<FileType>>) => {
        if (info.file.status === 'uploading') {
          setUploadLoading(true)
          setFileList([...info.fileList])
        }
        if (info.file.status === 'done') {
          setUploadLoading(false)
          message.success(`${info.file.name} 上传成功`)
          handleFilesChange(info.fileList.filter((item) => item.status === 'done'))
        } else if (info.file.status === 'error') {
          setUploadLoading(false)
          message.error(`${info.file.name} 上传失败.`)
        }
    }


     // 根据mode装载upload的listType 和 与之相关的 showUploadList
    const getUploadListType = () => {
        let { listType, showUploadList } = props
        switch (props.mode) {
        case 'image':
            listType = listType || 'picture-card'
            showUploadList = showUploadList || false
            break
        case 'icon':
            listType = listType || 'text'
            showUploadList = showUploadList || false
            break
        case 'photo':
            listType = listType || 'picture-card'
            showUploadList = showUploadList || true
            break
        default:
            listType = listType || 'text'
            showUploadList = showUploadList || true
            break
        }
        return { listType, showUploadList }
    }

    const handleIconRemove = (e: React.MouseEvent) => {
        e.stopPropagation()
        setFileList([])
        handleFilesChange([])
    }

     // 根据mode显示组件children的内容
  const getChildren = () => {
    if (props.children) return props.children

    if (props.mode === 'image') {
      return (
        <div style={{ flex: '1 1 auto' }}>
          {fileList.length > 0 && removeAble ? (
            <div
              onClick={handleIconRemove}
              style={{ position: 'absolute', right: '5px', top: '0', fontSize: '25px' }}
            >
              <CloseCircleFilled />
            </div>
          ) : null}
          {fileList.length > 0 && fileList[0] && fileList[0].status === 'done' ? (
            <>
              <img
                src={getUrl(props.mode, (fileList[0].response?.[0] as File)?.fileId)}
                alt="img"
                style={{ width: '100%', height: props.style?.height }}
              />
            </>
          ) : (
            <div>
              {uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
              <div style={{ marginTop: 8 }}>
                {props.size ? (
                  <>
                    只限上传<b>JPG/PNG</b>文件
                    <br />
                    且文件大小不超过<b>{props.size}MB</b>
                  </>
                ) : (
                  <>
                    只限上传<b>JPG/PNG</b>文件
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )
    }

    if (props.mode === 'photo') {
      return (
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>
            只限上传<b>JPG/PNG</b>文件
            <br />
            且文件大小不超过<b>{props.size}MB</b>
          </div>
        </div>
      )
    }

    return props.children
  }

  const inputTextChange = (e: any) => {
    const inputValue: string = e.target.value
    const inputName = e.target.name
    if (props.value instanceof Array) {
      props.value.forEach((item: any, index: number) => {
        if (inputName === item.fileId && props.value) {
          props.value[index].extra = inputValue
        }
      })
    }
  }

  const itemRender = (originNode: React.ReactNode, file: any) => {
    if (props.mode === 'photo') {
      return (
        <div className="upload-photo">
          <img
            className="upload-photo-img"
            src={getUrl(props.mode, file?.response[0].fileId)}
            alt="img"
          />
          <div>
            <CloseOutlined className="upload-close" onClick={() => onRemove(file)} />
          </div>
          <Input
            name={file?.response[0].fileId}
            onChange={inputTextChange}
            placeholder="上传图片标题"
            className="upload-extra"
          />
        </div>
      )
    }
    return originNode
  }

  return (
    <div className={`upload-block ${props.className} ${props.mode}`} style={props.style}>
      <Upload
        action={getApiPath(initApiPath({ appId: parameter?.appId, ...props.params }))}
        name="files"
        withCredentials
        onChange={handleChange}
        {...rest} // NOTE 注入用户传入的props
        {...getUploadListType()}
        fileList={fileList}
        itemRender={(originNode, file) => itemRender(originNode, file)}
        onRemove={onRemove}
        beforeUpload={beforeUpload}
      >
        {getChildren()}
      </Upload>
    </div>
  )

}