import {request} from './request'
export function uploadImg(imgFile,user){
   return  request({
    headers:{
     Author:user
    },
    url:'/uploadImg',
    method:'post',
    data:imgFile
    })
}