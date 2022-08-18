import {request} from './request'
export function searchdata(data){
   return  request({
    url:'/searchdata',
     params:{
        sortway:`${data.sortway}`,
        choosed:`${data.choosed}`,
     }

    })
}