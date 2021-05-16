import className from 'classnames'
import {StatisticItem} from '.'
import style from './index.less'

//参数类型
interface StatisticInfoProps{
    statisticArray?:StatisticItem[]
    numberSize?:number  
    spacingSize?:number 
}

//统计组件
export default function StatisticInfo(props:StatisticInfoProps){
    //结构问题what?
   // const {numberSize,spacingSize} = props;
    //const {statisticArray} = props;
    return(
        <>
            {props.statisticArray?props.statisticArray.map((item,index)=>{
                return (
                    <div
                        className={className(
                            style.statisticItem,
                            style.rightBorder,
                            item.floatRight ? style.textRight : '',
                        )}
                        style={{padding:props.spacingSize ?  `0 ${props.spacingSize} px` : undefined}}
                        key={index.toString()}
                    >
                        <div className={className(style.desc)}>{item.desc}</div>
                        <div className={className(style.number)}>
                            {item.value.toLocaleString()}
                        </div>
                    </div>
                )
            }):''}

        </>
    )
}
