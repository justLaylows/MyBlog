import {request} from './request'
export function getbaseinfo(path){
   return  request({
    url:path
    })
}