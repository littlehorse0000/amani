//引入模块
require(["config"],function(){
    require(["jquery","header","footer"],function($){
        function Login(){
            this.addListener();
        };

        Login.prototype = {
            constructor:Login,
            //事件监听
            addListener:function(){
                $("#loginBtn").on("click",$.proxy(this.loginEvent,this))
            },
            //点击登录按钮事件
            loginEvent:function(){
                
                var username = $('#login-inputusername').val(),
                    password = $('#login-inputPassword').val(),
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
                            window.location.href = "http://localhost:3000/";
                            localStorage.setItem("userinfo",str);
                        }
                    }
                }
                }
            }

        };

        new Login();

    })
})