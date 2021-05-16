//组件
import MxAvater from '@/components/Business/Avatar'
import StatisticInfo from '@/components/HeaderContent/statistic'
//方法
import useParameter from '@/hooks/useParameter'
import usePrefix from '@/hooks/usePrefix'
//类型
import {App,UserOrganization,VisitStatisticParameter} from '@/types'
//模块
import {Col,Row,Space} from 'antd'
import moment from 'moment'
import {useEffect,useState} from 'react'
import {useModel} from 'umi'
//样式
import './index.less'

export default function HeaderContent(){
    //css前缀方法
    const {bem} = usePrefix('welcome')
    const parameter = useParameter<VisitStatisticParameter>()
    const {getVisitStatisticTotal} = useModel('useVisitStatistic')
    const {getApps} = useModel('useApp')
    const {getUserTotal, getUserAuthorizationTotal, getUserOrganization }= useModel('useUser')

    //hook 变量
    const [VisitStatisticsTotal, setVisitStatisticsTotal] = useState<number>()
    const [apps, setApps] = useState<App[]>([])
    const [userTotal, setUserTotal] = useState<number>()
    const [userAuthorizationTotal, setUserAuthorizationTotal] = useState()
    const [userOrganization, setUserOrganization] = useState<UserOrganization>()
    const currentUser = useModel('@@initialState').initialState?.currentUser
    

    //hook 生命周期函数
    useEffect(()=>{
        
        //获取日访问量
        getVisitStatisticTotal({
            ...parameter,
            CreateTime:moment().format('YYYY-MM-DD'),
        }).then((res)=>{
            setVisitStatisticsTotal(typeof res === 'number'? res:0)
        })

        //获取应用数量
        getApps({}).then((res:any) =>{
            setApps(res)
        })
        //获取总共用户数量
        getUserTotal({}).then((res) => {
            setUserTotal(res)
        })
        //获取激活用户数量
        getUserAuthorizationTotal({}).then((res) => {
            setUserAuthorizationTotal(res)
        })
        
        //组织架构
        getUserOrganization({}).then((res) => {
            setUserOrganization(res)
        })

    },[])

    
    const meg = [
        { desc: '应用数量', value: apps?.length || 0 },
        { desc: '日访问量', value: String(VisitStatisticsTotal || 0) },
        { desc: '激活用户', value: String(userAuthorizationTotal || 0) },
        { desc: '总用户量', value: String(userTotal || 0), floatRight: true },
    ]

    return (
        <div className={bem('header')}>
            <Row justify="space-between" gutter={[0,8]}>
                <Col>
                    <div className={bem('user')}>
                        <div>
                            <MxAvater userId={currentUser?.id || 0} size={72}/> 
                        </div>
                        <div>
                            <div className={bem('weblcome-txt')}>您好{currentUser?.name}祝您快乐每一天!</div>
                            <div className={bem('position-line')}>
                                <Space size={10}>
                                    <span className={bem('position-desc')}>
                                        {userOrganization?.orgName || "What happened? "}
                                    </span>
                                </Space>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xl={{span:14}} sm={{span:24}} style={{textAlign:'right'}}>
                    <div className={bem('statistic')}>
                        {/* 统计模块 */}
                        <StatisticInfo numberSize={30} spacingSize={40} statisticArray={meg} />
                    </div>
                </Col>
            </Row>
        </div>
    )
}


