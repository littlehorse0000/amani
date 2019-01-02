//定义header模块
define(["jquery"],function($){
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
            // //点击登录注册页面进去登录页面
            // $("#login-regist").click(function(){
            //     window.location.href="http://localhost:3000/html/login.html";
            // })
           
            //点击注册按钮进入注册页面
            $('.registBtn').on('click',function(){
                window.location.href="http://localhost:3000/html/regist.html";
            })
            
            //点击登录时按钮时判断用户名密码是否正确；
            $('.loginBtn').on('click',function(){
                var username = $('#inputusername').val(),
                    password = $('#inputPassword3').val(),
                    str = '';
        
    
                    str += "username"+"="+username+"&&"+"password"+"="+password;
                    if(username === ''|| password === ''){
                        alert('请输入用户名和密码')
                    }else{
                        
                    //ajax请求判断是否正确  
                    var ajax = new XMLHttpRequest();
                    ajax.open("POST","http://localhost/webProject/amani/api/v1/login.php");
                    ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                    ajax.send(str);
                    ajax.onreadystatechange = function(){
                        if(ajax.readyState === 4 && ajax.status === 200){
                            var res = JSON.parse(ajax.responseText);
                            
                            if(res.res_code === 0){
                                confirm("用户或密码错误");
                                return false;
                            }else{
                                //window.location.href = "http://localhost:3000/";
                                localStorage.setItem("userinfo",str);
                                var mesg= localStorage.getItem("userinfo");

                                if(mesg){
                                    //把名字换了
                                   
                                   mesg = (mesg.split("&&")[0]).split("=")[1];
                                   $("#login-regist").text("欢迎您"+mesg)
                                    
                                //    console.log($("#close")[0])
                                //    $("#close")[0].style.display='block';
            
                               }
                            }
                        }
                    }
                    }
                   
            })

           
            
        });

        
    })
    
    
});


    


