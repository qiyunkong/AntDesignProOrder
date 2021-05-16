import MxIcon from '@/components/Business/Icon'
import usePrefix from '@/hooks/usePrefix'
import useRequest from '@/hooks/useRequest'
import {Card,Col,Row} from 'antd'
import React from 'react'
import {Link,useModel} from 'umi'

export default function GlobalIndexPage(){
    const {getAppRank} = useModel('useVisitStatistic')
    const {bem} =  usePrefix('welocme')
    const {loading,data} = useRequest(()=> getAppRank({top:8}))

    return (
        <Card title="访问量排名" loading={loading}>
            <Row gutter={24}>
                {data?.map((item,index) =>{
                    <Col span={6} key={index.toString()}>
                        <div className={bem('pv-item')}>
                            <div className={bem('pv-index')}>
                                <span className="text">{index + 1}</span>
                            </div>
                        </div>
                        <div className={bem('pv-child')}>
                            <div className="left">
                                <MxIcon icon={item.icon} size={48} />
                            </div>
                        </div>
                        <div className="right">
                            <div className="name">
                                <Link to={`/${item.eName}/`}>{item.name}</Link>
                            </div>
                            <div className="desc">
                                访问量<span>{item.value}</span>
                            </div>
                        </div>
                    </Col>
                })}
            </Row>
        </Card>

    )
}