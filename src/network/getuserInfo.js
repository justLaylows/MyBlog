
import {request} from './request'
export function getuserInfo(id){
   return  request({
    url:'/userinfo',
    params:{
        id
    }
    })
}
