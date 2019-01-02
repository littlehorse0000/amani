//引入需要的模块
require(["config"],function(){
      require(["jquery","header","footer","bootstrap"],function($){
           $('.carousel').carousel({
            interval: 2000
        })
    })
})