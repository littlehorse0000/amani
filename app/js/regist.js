//正则验证
var inputs = $('.regex');
inputs = Array.from(inputs);
var span = $('.red-span');
span = Array.from(span);


var myreg =/(^[\w.\-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$)|(^1[3|4|5|8]\d{9}$)/;

var passreg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;

for(let i in inputs){
    //绑定失去焦点事件
    inputs[i].onblur = function(){
        if(!myreg.test(inputs[0].value)){
            span[0].style.visibility= "visible";
            
        }else{
            span[0].style.visibility= "hidden";
        }
        
        if(!passreg.test(inputs[1].value)){
            span[1].style.visibility= "visible";
        }else{
            span[1].style.visibility= "hidden";
        }

        if(inputs[1].value !== inputs[2].value){
            span[2].style.visibility= "visible";
        }else{
            span[2].style.visibility= "hidden";
        }
    } 
}

//给按钮绑定点击事件
$("#sub").click(function(){
    //点击时，用户密码为空提示不能为空
    if(inputs[0].value === ''|| inputs[1].value === '' || inputs[2].value === '') {
        alert("请输入用户名密码")
    }else{
        var message = "";
        var username = $("#username").val(),
            password = $("#password").val();

        message += "username"+"="+username+"&&"+"password"+"="+password;
        console.log(message)
        //ajax异步提交数据
        var ajax = new XMLHttpRequest();
        ajax.open("POST","http://localhost/webProject/amani/api/v1/regist.php");
        ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        ajax.send(message);
        ajax.onreadystatechange = function(){
        if(ajax.readyState === 4 && ajax.status === 200){
                var res = JSON.parse(ajax.responseText);
                if(res.res_code === 0){
                    confirm("用户已存在")
                }else{
                    window.location.href="http://localhost:3000/html/login.html"
                }
                console.log(res)
            }
        }
    }

    


})