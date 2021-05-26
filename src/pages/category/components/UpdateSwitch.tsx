import React, { useState} from 'react';
import { Switch} from 'antd';

//定义参数格式
export type UpdateFormProps = {
  defaultChecked?:boolean
  checkedChildren?:string
  unCheckedChildren?:string
}


const UpdataSwitch: React.FC<UpdateFormProps> = (porps) =>{
    const {checkedChildren,defaultChecked,unCheckedChildren} = porps;
    const [loading,setLoading] = useState<boolean>(false)

    return (
      <Switch checkedChildren={checkedChildren} loading={loading} unCheckedChildren={unCheckedChildren} onChange={() => {
        setLoading(true)

        setLoading(false)
       }
      }   defaultChecked={defaultChecked} />
    )
}

export default UpdataSwitch
