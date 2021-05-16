//GlobalObject what
type Mod = string | GlobalObject
type Mods = Mod | Mod[]
//what?
function gen(name:string,mode?:Mods): string{
    if(!mode) return '' 
    if(typeof mode === 'string'){ // 如果是字符串类型
        return `${name}--${mode}` //字符串格式为:  name--mode
    }
    if(Array.isArray(mode)){
        return mode.reduce<string>((ret,item)=>ret + gen(name,item),'')
    }
    return Object.keys(mode).reduce((ret,key)=>ret + (mode[key] ? gen(name,key):''),'')
}

export function createBEM(name:string){
    // 
    const genCls = (el?:Mods,mode?:Mods) =>{
        if(el && typeof el !== 'string'){
            mode = el
            el = ''
        }
        //
        el = el ? `${name}_${el}`:name
        return `${el}${gen(el,mode)}`
    }
    return genCls
}