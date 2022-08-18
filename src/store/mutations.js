export default{
     chagetheme(state,val){
      state.isSun=val
   },
   updateImg(state,url){
      state.headimg=url
   },
   updateLoading(state,val){
      state.isLoading=val
   }

}