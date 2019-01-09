//引入模块
require(["config"],function(){
    require(["jquery","header","footer","scroll","cookie"],function($){
      function Detail(){
          this.data();
          this.addListener();
      };

      Detail.prototype = {
        constructor:Detail,
        //ajax获取数据
        data:function(){
          $.ajax("http://rap2api.taobao.org/app/mock/123115/api/lists")
              .done($.proxy(this.handleData,this))
        },

        //处理数据
        handleData:function(res){
          var data = res.res_body.data;
           
          //截取url的id
          var id = (location.search).split("?")[1].split("=")[1];
         
          //渲染数据
          for(var i = 0;i < data.length;i++){
              if(id == data[i].id){
                 
                  var str = `
                  <div id="details-message-left">
                  <ul>
                    <li>
                      <img
                        src="https://www.giorgioarmanibeauty.cn/dw/image/v2/AARM_PRD/on/demandware.static/-/Sites-armani-master/default/dw6afb41ee/GAC0/01_20/GAC00003/506.png?sw=600&sh=600&sm=fit"
                        alt=""
                      />
                    </li>
                    <li>
                      <img
                        src="https://www.giorgioarmanibeauty.cn/dw/image/v2/AARM_PRD/on/demandware.static/-/Sites-armani-master/default/dw46c299b4/GAC0/01_20/GAC00003/506_2.png?sw=600&sh=600&sm=fit"
                        alt=""
                      />
                    </li>
                    <li>
                      <img
                        src="https://www.giorgioarmanibeauty.cn/dw/image/v2/AARM_PRD/on/demandware.static/-/Sites-armani-master/default/dw94319ceb/GAC0/01_20/GAC00003/DAY_4_SESSION_11_LIP_MAGNET_03_506_LIGHT_004.png?sw=600&sh=600&sm=fit&sfrm=jpg"
                        alt=""
                      />
                    </li>
                  </ul>
                </div>
                <div id="details-message-center">
                  <img
                    src="${data[i].img}"
                    alt=""
                  />
                </div>
                <div id="details-message-right">
                  <div id="title">${data[i].title}</div>
                  <h4>LIP MACNET</h4>
                  <div id="star"><span></span> <a href="">共150条评论</a></div>
                  <div id="desc">
                    <p>
                      阿玛尼小胖丁显色，轻薄，持久，能够打造时尚的致美持久哑光唇妆。涂抹后，水分的“渐进式挥发”令<span
                        >...</span
                      >
                    </p>
                    <a href="">查看更多 ></a>
                  </div>
                  <div id="colors">
                    <span><</span>
                    <ul>
                      <li><img src="" alt="" /></li>
                      <li><img src="" alt="" /></li>
                      <li><img src="" alt="" /></li>
                      <li><img src="" alt="" /></li>
                      <li><img src="" alt="" /></li>
                      <li><img src="" alt="" /></li>
                      <li><img src="" alt="" /></li>
                      <li><img src="" alt="" /></li>
                      <li><img src="" alt="" /></li>
                      <li><img src="" alt="" /></li>
                    </ul>
                    <span>></span>
                  </div>
                  <div id="colorSelect"></div>
                  <div id="details-message-right-bottom">
                    <div id="count">
                    <span>数量1</span>
                    <span id="arrows"></span>
                    <div id="detailSelects">
                    <ul>
                      <li>数量1</li>
                      <li>数量2</li>
                      <li>数量3</li>
                      <li>数量4</li>
                      <li>数量5</li>
                 </ul>
                    </div>
                    </div>
                   
                    <div id="price">￥${data[i].price}</div>
                    <div id="notice" class="addcart">立即购买</div>
                  </div>
                </div>
                  `;
                  $("#details-message").html(str)
              }
          }
        },

        //事件监听
        addListener : function(){
          //加入购物车
          $("#details-message").on("click",$.proxy(this.addcart,this))
          
        },

        //加入购物车
        addcart : function(event){
          let products = $.cookie("message")? JSON.parse($.cookie("message")):[];
         
          var target = event.target;
          if(target.className === "addcart"){
            var product = {};
               
            var detailsMessage = target.parentNode.parentNode.parentNode,
                img = detailsMessage.children[1].children[0],
                title = detailsMessage.children[2].children[0],
                price = detailsMessage.children[2].children[6].children[1].innerHTML,
                count =  detailsMessage.children[2].children[6].children[0].children[0].innerHTML;
            price = price.substr(1);
            count = count.substr(count.length-1,1);
         
            var id = (location.search).split("?")[1].split("=")[1]
           
            product.img = img.src;
            product.title = title.innerHTML;
            product.price = price;
            product.count = count;
            product.id = id;
            //判断id是否存在cookie,存在就count++;
             var has = products.some(function(item){
              if(item.id == id){
                item.count++;
                return true;
              }
              return false;
            })

            if(!has){products.push(product)}

            $.cookie.raw = true;
            products = JSON.stringify(products);
           
            console.log(products)
            $.cookie("message",products,{expires:10});
           
            
           
          }
        }

      };

      new Detail();

    })
})