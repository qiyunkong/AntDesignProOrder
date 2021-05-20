import { RequestInterceptor, RequestOptionsInit } from "@umijs/plugin-request/node_modules/umi-request";

export function setAuthority(payload:any) {
    localStorage.setItem('token', payload);
}

export const getAuthority = () => localStorage.getItem('token')

export const tokenIt:RequestInterceptor = (
    url:string,
    options:RequestOptionsInit
) =>{

    const token = `Bearer ${getAuthority()}`
    const o = options;
    o.headers = {
        ...options.headers,
        authorization:token
    }

    return {
        url,
        options:o
    }
}