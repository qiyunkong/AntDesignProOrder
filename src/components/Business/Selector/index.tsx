import CustomModal, { CustomModalProps } from '@/components/CustomModal'
import {File, FileType } from '@/types';
import { PlusOutlined } from '@ant-design/icons';
import { message,Button } from 'antd';
import { useState } from 'react';
import MxIcon from '../Icon'


//继承
interface IconSelectModalProps extends Omit<CustomModalProps,'onOk'>{
    value?:string,
    onChange?:(path:string)=> void
    size?:number
    defaultIcon?:any
    type?:FileType
}

export default function IconSelect(props:IconSelectModalProps){
    const [icon,setIcon] = useState<File>()

    const handleSelectIcon = (record:File) =>{
        setIcon(record)
    }

    const handleOk = ()=>{
        if(!icon){
            message.info("没有选择任何图标")
            return false
        }
        if(props.onChange){
            props.onChange(icon.fileId || '')
        }
        return true
    }

    const defaultShow = () =>{
        if(props.defaultIcon){
            return <MxIcon icon={props.defaultIcon} isLocal size={props.size || 64} /> 
        }
        return <PlusOutlined/>
    }

    return (
        <>
            <CustomModal
                title="选择图标"
                onOk={handleOk}
                width={1000}
                trigger={
                    <Button
                        style={{height:props.size || 64, width:props.size || 64, padding:0, margin:0}}
                    >

                        {props.value ? <MxIcon icon={props.value} size={props.size || 64} />:defaultShow()}
                    </Button>
                }
            >    
                <PageContent type={props.type} onSelect={handleSelectIcon} useQueryString={false} />
            </CustomModal>
        </>
    )


}