import {request} from './request'
export function getAtlas(id){
   return  request({
    url:'/getatlas',
    params:{
        id
    }
    })
}