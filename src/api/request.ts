
const BaseUrl :string = ''

interface HttpResponse<T> {
    code :number

    msg :string

    data :T
}


type HttpMethod = 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT'

const requestPromise = <T>(url,data:object,method :HttpMethod= 'GET'):Promise<HttpResponse<T>> => {
    return new Promise((resolve,reject) => {
        uni.request({
            url:BaseUrl + url,
            method,
            data,
            header:{
                'Content-Type':'application/json'
            },
            // 设置超时时间
            timeout:5 * 1000,
            success:res=>{
                if((res.data as any as HttpResponse<T>).code !== 0){
                    reject((res.data as any as HttpResponse<T>).msg || `可能服务器炸了,要不问问管理员吧`)
                }
                resolve(res.data as any)
            },fail:err=>reject('请求超时,可能服务器炸了')
        })
    })
}


export const get = <T>(url:string,data = {}) => {
    return requestPromise<T>(url,data = {},'GET')
}

export const post = <T>(url:string,data = {}) => {
    
    return requestPromise<T>(url,data,'POST')
}