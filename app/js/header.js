//定义header模块
define(["jquery"],function($){
    //异步加载html
    $(".header").load("../html/include/header.html",()=>{
        //构造函数创建header对象
        function Header(){
            this.addEventListener();
            this.tab();
            
        };

        

        //在prototype上写方法
        Header.prototype = {
            //指向Header
            constructor:Header,

            //事件监听
            addEventListener: function(){
                //$.proxy:强制执行this.regist的this的上下文
                $('.registBtn').on("click",$.proxy(this.regist,this));
                //登录
                $('.loginBtn').on("click",$.proxy(this.login,this));
                //吸顶
                $(document).on("scroll",$.proxy(this.ceiling,this));
                //搜索
                $("#header-red").on("click",$.proxy(this.search,this));
                //键盘
                $("#hongguansearch").on("input",$.proxy(this.input,this));
                //搜索点击
                $("#inputDiv").on("click",$.proxy(this.inputDiv,this))
            },

            //导航栏tab切换
            tab: function(){
                  let lis = document.getElementsByClassName('a');
                  let divs = document.getElementsByClassName("b");
                 
                  //循环
                  lis = Array.from(lis);
                  divs = Array.from(divs);
  
                  for(let i in lis){
                      lis[i].index = i
                      lis[i].onmouseenter= function(){
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
                          divs[i].onmouseenter = function(){
                              divs[i].style.display = "block";
                          }
                          divs[i].onmouseleave = function(){
                              divs[i].style.display = "none";
                          }
                      }
                      
                  }
            },

            //点击注册按钮事件
            regist : function(event){
                window.location.href="http://localhost:3000/html/regist.html";
            },

            //点击登录按钮事件
            login : function(event){
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
                                    
                                    localStorage.setItem("userinfo",str);
                                    var mesg= localStorage.getItem("userinfo");

                                    if(mesg){
                                        //把名字换了
                                    
                                    mesg = (mesg.split("&&")[0]).split("=")[1];
                                    $("#login-regist").text("欢迎您"+mesg)
                                        
                                    
                                        $("#close")[0].style.display='block';
                                        //点击退出，清空localStorage；
                                        $("#close").on("click",function(){
                                            localStorage.removeItem("userinfo");
                                            location.reload();
                                        })
                                }
                                }
                            }
                        }
                    }
            },

            //吸顶
            ceiling : function(){
                var topheader =  $(document).scrollTop();
                if(topheader>250){
                    $("nav").css({
                        "position":"fixed",
                        "top":"0px"
                    })
                }else {
                     $("nav").css({
                         "position":"absolute",
                         "top":"102.4px"
                     })
                }
            },

            //搜索
            search : function(){
                //搜索框按钮缓慢出现
                if( $("#header-search-div").css("display") === "none"){
                    $("#header-search-div").css({display:"block"})
                }else{
                    $("#header-search-div").css({display:"none"})
                }
                
            },

            //键盘事件，跨域请求数据
            input : function(){ 
                const word = $("#hongguansearch").val(),//从文本框中获取值
                      url = `https://suggest.taobao.com/sug?code=utf-8&q=${word}&callback=?`;//jsonp接口URL
                //jsonp跨域请求淘宝建议接口
                $.getJSON(url,(data)=>{
                    let html = "";
                    data.result.forEach((curr)=>{
                        html += `<div>${curr[0]}</div>`;
                    });
                    $("#inputDiv").html(html);
                    //this.inputDiv();
                });

            },

            //搜索点击事件
            inputDiv : function(event){
                var target = event.target;
                $("#hongguansearch").val(target.innerHTML)
                $("#inputDiv").hide();
            }

        };

        //创建header实例,并返回
        return new Header();
    }

)})