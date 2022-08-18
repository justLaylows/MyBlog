import {request} from './request'
export function addArticle(msg){
   return  request({
    url:'/addArticle',
    method:'post',
    data:msg
    })
}