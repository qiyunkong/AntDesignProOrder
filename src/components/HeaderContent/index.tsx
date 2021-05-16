import classNames from 'classnames'
import React from 'react'
import style from './index.less'
import StatisticList from  './statistic'

//接口
export interface StatisticItem{
    desc:string //统计信息的描述
    value:number | string //统计值
    floatRight?:boolean //是否向右浮动
}

export interface HeaderContentProps{
    pageContent:string //页面的副标题
    statisticArray:StatisticItem[] //统计信息数组
}

const HeaderContent:React.FC<HeaderContentProps> = (props) =>(
    <div className={classNames(style.headerBody)}>
        <div className={classNames(style.content)}>{props.pageContent}</div>
        <div className={classNames(style.rightBlock)}>
            <StatisticList statisticArray={props.statisticArray}/>
        </div>
    </div>

)

export default HeaderContent