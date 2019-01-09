//引入需要的模块
require(["config"],function(){
      require(["jquery","header","footer","bootstrap","scroll"],function($){
          function Home(){
            this.carousel();
            this.data();
            this.addListener();
          };

          Home.prototype = {
            constructor:Home,
            //ajax获取数据
            data:function(){
                $.ajax("http://rap2api.taobao.org/app/mock/123115/api/index")
                    .done($.proxy(this.handleData,this))
            },

            //处理数据
            handleData:function(res){
                let data = res.res_body.data;
            
                let str = "";
                for(var i = 0;i < data.length;i++){
                    
                    str += `
                    <li>
                        <span>热卖</span>
                        <div class="li-center">
                        <h5>彩妆热卖</h5>
                        <img src="${data[i].bigimg}" alt="" id="bigimg"/>
                        <p id="ptitle">${data[i].title}</p>
                        <p>${data[i].desc}</p>
                        
                        <div id="allColors">
                            
                            <ol >
                                <img src="${data[i].imgs[0].img}" alt="" id="firstOl">
                            </ol>
                            <ol >
                                <img src="${data[i].imgs[1].img}" alt=""  class="ol">
                            </ol>
                            <ol >
                                    <img src="${data[i].imgs[2].img}" alt="" class="ol">
                            </ol>
                            <ol >
                                    <img src="${data[i].imgs[3].img}" alt="" class="ol">
                            </ol>
                            <ol >
                                    <img src="${data[i].imgs[4].img}" alt="" class="ol">
                            </ol>
                            <ol >
                                    <img src="${data[i].imgs[5].img}" alt="" class="ol">
                            </ol>
                                
                        </div>
                        <div id="stars"></div>
                        <div id="boxb">
                            <div class="box1">￥${data[i].price}</div>
                            <div class="box2">立即购买</div>
                        </div>
                        </div>
                    
                     </li>
                    `;
                    $("#ul").html(str);
    
                     //滑动改变高度
                        $(".ol").on("mouseenter",function(){
                            this.style.height = "26px";
                        })
                        $(".ol").on("mouseleave",function(){
                            this.style.height = "13px";
                        })
                }
            },

            //轮播
            carousel:function(){
                $('.carousel').carousel({
                    interval: 2000
                })
            },
            //事件监听
            addListener:function(){
                //鼠标滑入，淡入淡出效果
                $("#video-left-top").on("mouseenter",$.proxy(this.viederIn,this))
                //鼠标滑出
                $("#video-left-top").on("mouseleave",$.proxy(this.viederOut,this));
                //点击播放按钮
                $("#video-left-top").on("click",$.proxy(this.videoBtn,this));
                //X关闭
                $("#X").on("click",$.proxy(this.close,this));
            },
            //鼠标滑入，淡入淡出效果事件
            viederIn:function(){
                $(".video-hide").show();
                $(".video-show").hide();
            },
            //鼠标滑出
            viederOut:function(){
                $(".video-show").show();
                $(".video-hide").hide();
            },
            //播放按钮事件
            videoBtn:function(event){
                var target = event.target;
                if(target.className === "videoBtn" ){
                    $("#videoBox").toggle();
                    $("#opcatityBox").toggle();
                }
            },
            //X关闭事件
            close:function(){
                $("#videoBox").toggle();
                $("#opcatityBox").toggle();
            }
          };

          new Home();

    })
})