import {request} from '../request'
export function register(msg){
   return  request({
    url:'/register',
    method:'post',
    data:msg
    })
}