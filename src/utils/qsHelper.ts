import { parse } from 'qs'
import { ignoreCaseProxy } from './utils'

const keywords = {
  true: true,
  false: false,
  null: null,
  undefined,
}

//类型
const changeType = (value: string) => {
    if (value === '') { //如果是空值字符串返回undefined
      return undefined
    }
    if (parseFloat(value).toString() === value) { //如果浮动数字符串等于字符串
      return parseFloat(value)  //返回浮动数
    }
    if (value in keywords) {  //是否包含
      return keywords[value]  //就把值进行返回
    }
    return decodeURIComponent(value)  //decodeURIComponent() 对编码后的 URI 进行解码：
  }

//URL 查詢
export default function getQuery<T>(search?: string): T {
    //浏览器中URL字符串是否存在'?'字符
    const qsIndex = window?.location.href.indexOf('?')
    //qsIndex = -1 返回空字符串 反正之  返回'?'后的字符串 也就是参数
    const hashSearch = qsIndex !== -1 ? window?.location.href.split('?')[1] : ''
    // 如果是为false就往后走
    const queryString = search || hashSearch || ''
    //parse() 方法可解析一个日期时间字符串，并返回 1970/1/1 午夜距离该日期时间的毫秒数。
    let query = parse(queryString, {
      ignoreQueryPrefix: true, //忽略查询引用
      strictNullHandling: false, //严格的零处理
      decoder: changeType, //解码器
    })
    //返回一个被Proxy代理的对象 增删改查
    query = ignoreCaseProxy(query)
    //返回一个值 what?
    return (query as unknown) as T
  }


