import {request} from './request'
export function updateMessage(msg){
   return  request({
    url:'/messageBoard',
    method:'post',
    data:msg
    })
}


