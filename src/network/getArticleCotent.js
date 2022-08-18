import {request} from './request'
export function getArticleCotent(id){
   return  request({
    url:'/getsinglearticle',
    params:{
        id
    }
    })
}