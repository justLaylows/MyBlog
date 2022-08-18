import {request} from '../request'
export function login(msg){
   return  request({
    url:'/login',
    params:{
        user:`${msg.user}`,
        password:`${msg.password}`
    }
    })
}