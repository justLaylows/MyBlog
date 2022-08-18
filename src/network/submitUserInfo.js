import {request} from './request'
export function submitUserInfo(msg){
   return  request({
    url:'/modifyuser',
    method:'post',
    data:msg
    })
}