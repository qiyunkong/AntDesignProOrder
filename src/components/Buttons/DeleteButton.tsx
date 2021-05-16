import {DeleteOutlined,DeleteTwoTone} from '@ant-design/icons'
import {Popconfirm} from 'antd'
import {PopconfirmProps} from 'antd/lib/popconfirm'
import React from 'react'


//接口
interface DeleteButtonProps extends Omit<PopconfirmProps,'title' | 'onConfirm' | 'overlay'>{
    onClick: (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => Promise<boolean>
    title?: string
    text?: string
    color?: string
}

export default function DeleteButton(props:DeleteButtonProps){
    const { onClick, text, icon, title, color, okText, cancelText, ...rest } = props
    const handleDelete = (e?: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e?.nativeEvent.stopImmediatePropagation()
        e?.stopPropagation()
        if (onClick) {
          onClick(e)
        }
      }
      return (
        <Popconfirm
          okText={okText || '确定'}
          cancelText={cancelText || '取消'}
          title={title || '你确定要删除吗？'}
          icon={<DeleteTwoTone />}
          {...rest}
          onConfirm={handleDelete}
        >
          {icon || <DeleteOutlined style={{ color: color || '#ff4d4f' }} />}
        </Popconfirm>
      )
}