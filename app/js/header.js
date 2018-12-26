//定义header模块
// define(["jquery"],function($){
//     $.ajax({
//         type:"get",
//         url:"/html/include/header.html",
//         success:function(data){
//             $('header').html(data);
//         }
//     });
// });


    $(function(){
        $(".header").load("../html/include/header.html",function(){
                //tab切换
                let lis = document.getElementsByClassName('a');
                let divs = document.getElementsByClassName("b");
               
                //循环
                lis = Array.from(lis);
                divs = Array.from(divs);

               

                for(let i in lis){
                    
                    lis[i].index = i
                    lis[i].onmousemove= function(){
                        
                        for(let i in lis){
                            divs[i].style.display = "none"
                        
                        }
                    divs[this.index].style.display = "block";
                    }
                    for(let m in divs){
                        divs[m].style.display = "none"
                    }
                    lis[i].onmouseleave = function(){
                        divs[i].style.display = "none";
                    }
                    
                }
            //点击登录注册页面进去登录页面
            $("#login-regist").click(function(){
                window.location.href="http://localhost:3000/html/login.html";
            })
            //把名字换了
            var mesg= localStorage.getItem("userinfo");
            mesg = (mesg.split("&&")[0]).split("=")[1];
            
            if(mesg){
                $("#login-regist").text("欢迎您"+mesg)
            }
            
        });

        
    })
    
    


