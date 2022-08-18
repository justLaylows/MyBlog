export default {
    changecolorpath(conext,val){
        conext.commit('chagetheme',val)
    },
    updateHeadImg(conext,url){
        conext.commit('updateImg',url)
    },
    updateLoading(conext,val){
        conext.commit('updateLoading',val)
    }
        
}