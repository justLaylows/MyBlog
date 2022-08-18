import {request} from './request'
export function saveArticle(msg){
   return  request({
    url:'/saveArticle',
    method:'post',
    data:msg
    })
}