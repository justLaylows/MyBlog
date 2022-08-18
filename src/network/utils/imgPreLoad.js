function loadImage(src){
    return new Promise(function(resolve,reject){
      let img=new Image();
      img.onload=function(){//加载时执行resolve函数
        resolve(img);
      }
      img.onerror=function(){
        reject(src);
      }
      img.src=src;
    })
  }

  export  function preLoad(images){
    let loadimg=[];
    images.forEach( async item=>{
         await loadImage(item.imgUrl).then(res=>{
            loadimg.push(res)
            
        });
        
        
    })
    return loadimg;
  }

  