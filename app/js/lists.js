//引入模块
require(["config"],function(){
    require(["jquery","header","footer","scroll"],function($){
        function List(){
            this.data();
        };

        List.prototype = {
            constructor:List,
            //ajax请求数据
            data:function(){
                $.ajax("http://rap2api.taobao.org/app/mock/123115/api/lists")
                    .done($.proxy(this.handleData,this))
            },

            //处理数据
            handleData:function(res){
                let data = res.res_body.data;
                let str = "";
                for(let i = 0;i<=3;i++){
                    str+=`
                     <div id="wrap-box-right-list">
                         <span class="stockout"></span>
                         <img src="${data[i].img}" class="pic">
                         <p class="desc">${data[i].title}</p>
                         <p class="price">￥${data[i].price}</p>
                         <div class="colors"></div>
                     </div>
                    `
                }
                $("#wrap-box-right").html(str);
     
                str ='';
                for(let i = 4;i<=7;i++){
                 str+=`
                  <div id="wrap-box-right-list">
                      <span class="stockout"></span>
                      <img src="${data[i].img}" class="pic">
                      <p class="desc">${data[i].title}</p>
                      <p class="price">￥${data[i].price}</p>
                      <div class="colors"></div>
                  </div>
                 `
                }
                $(".box2").html(str);
                  //点击图片进入相应商品的详情页；
                 //利用事件冒泡来绑定事件
                $("#wrap-box-right").on("click","img",function(){
                    for(let i = 0;i<data.length;i++){
                         if(this.src === data[i].img){
                             var id = data[i].id
                            window.location.href = "/html/details.html?"+"id="+id; 
                         }
                    }
                   
                })
     
            }
        };

        return new List();


    })
})