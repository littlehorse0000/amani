require(["config"],function(){
    require(['jquery','template','cookie'],function($,template){
        function Cart(){
            this.products = null;
            this.getCookie();
            this.addListener();
            this.changnumber();
        };

        Cart.prototype = {
            constructor:Cart,
            //获取cookie里面的数据,并处理
            getCookie:function(){
                $.cookie.json = true;
                var data = this.products = $.cookie("message")||[];
               
                var html = template("cart-body-template",{data:data});
                $("tbody").html(html);
                //cookie为空时
                if(data.length === 0){
                    $('#cart-wrap').toggle();
                    $(".continueShop").toggle();
                }
            },
            //事件监听
            addListener:function(){
                //事件委托tbody
                $("tbody").on("click",$.proxy(this.arrows,this))
                //数量
                $("tbody").on("click",$.proxy(this.li,this))
                //删除
                $("tbody").on("click",$.proxy(this.delete,this))
                //复选框
                $(".checked").on("change",$.proxy(this.ischecked,this))
                //全选
                $(".checkall").on("change",$.proxy(this.checkall,this))
            },

            //点击下拉框
            arrows : function(event){
                var target = event.target;
                if(target.className === "arrows"){
                    $(target).next("#selecs").toggle();
                }
            },

            //点击ul li 显示 改变数量
            li : function(event){
                var target = event.target;
                if(target.className === "li"){  
                    var count = $(target).parents("#selecBox").children().eq(0);
                    count.html(target.innerHTML) ;
                   
                   //当前操作元素id
                  var id = $(target).parents("tr").find(".cart_id").html();
                  var currProduct = this.products.filter(prod => prod.id == id);
                  currProduct[0].count = target.innerHTML    
                  $.cookie("message",this.products,{expires:10,path:"/"})
                  this.trPrice(target);
                }
               
            },
            
            //删除
            delete : function(event){
                var target = event.target;
                if(target.className === "delete"){
                    var id = $(target).parents("tr").find(".cart_id").html();
                    var tr = $(target).parents("tr");
                    tr.remove();
                    this.products = this.products.filter(prod => prod.id !== id);
                    $.cookie("message",this.products,{expires:10,path:"/"})
                }
                
                
            },

            //全选
            checkall : function(event){
                var target = event.target
                 if(target.checked){
                    $(".checked").prop("checked",true);
                }else{
                    $(".checked").prop("checked",false);
                }
               this.totalPrice();
            },

            //复选框部分选中
            ischecked : function(event){
               var length =  $(".checked:checked").length;
               if(length == this.products.length){
                  $(".checkall").prop("checked",true)
               }else{
                $(".checkall").prop("checked",false)
               }    
               this.totalPrice();
            },

            //计算总价
            totalPrice:function(){
                var sum = 0;
                $(".checked:checked").each((index,element)=>{
                   sum +=Number(($(element).parents("tr").find("#totalPrice").html()).substr(1));
                })
                $(".prices").html(sum)

               
            },

            //当行价格
            trPrice : function(target){
                var trPrice = $(target).parents("tr").find("#totalPrice").html();
                var aprice =Number($(target).parents("tr").find(".aprice").html().substr(1));
                trPrice = Number(target.innerHTML)*aprice;
                $(target).parents("tr").find("#totalPrice").html("￥"+trPrice)
               
            },

            //改变数量
            changnumber: function(){
                $("#number").html(this.products.length);
               
            }
           
        };

        new Cart();
        
    })
})