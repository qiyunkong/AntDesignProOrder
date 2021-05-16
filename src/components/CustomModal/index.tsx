import {Modal} from 'antd'
import { ModalProps } from 'antd/lib/modal' //what?
import React,{ReactElement,ReactNode,useEffect,useState} from 'react'

export interface CustomModalProps extends Omit<ModalProps,'visible' | 'onOk'>{
    trigger?:ReactElement | ReactNode
    visible?:()=> boolean 
    onOk: () => boolean | Promise<boolean>  //what | 意思
    children?:ReactNode
    onOpen?:()=> void
}

export default function CustomModal(props:CustomModalProps){

    const [visibleState,setVisibleState] = useState(props.visible)
    
    const { trigger, onOk, okText, cancelText, visible, onCancel, onOpen, ...rest } = props

    const handleOk = async ()=>{
        if(onOk){
            if(await onOk){
                setVisibleState(false)
            }
        }
    }

    const handleOpen = () =>{
        setVisibleState(false)
        onOpen?.()
    }

    const handleCancel = (e:React.MouseEvent<HTMLElement,MouseEvent>)=>{
        setVisibleState(false)
        if(onCancel){
            onCancel(e)
        }
    }
    
    //生命周期函数
    useEffect(()=>{
        setVisibleState(visible)
    },[visible])

    return (
        <>
            {trigger? <span onClick={handleOpen}>{trigger}</span> : null}
            <Modal
                {...rest}
                visible={visibleState}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={okText || '确定'}
                cancelText={cancelText || '取消'}
            >
                {props.children}
            </Modal>
        </>
    )
}