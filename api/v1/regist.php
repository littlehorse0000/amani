<?php
    //允许跨域
    header("Access-Control-Allow-Origin:*");

    include("../db.php");

    $username = $_REQUEST['username'];
    $password = $_REQUEST['password'];

    //不允许用户名重复

    $sqlSelect = "select * from userinfo where username='$username'";

    $res = mysql_query($sqlSelect);

    if(mysql_num_rows($res) > 0){
        $arr = array('res_code' => 0, 'res_message' => "用户名已存在");
        echo json_encode($arr);
    }else{
        //用户不存在，允许插入
        $sql = "insert into userinfo (username, password) values ('$username','$password')";

        $isSucc = mysql_query($sql);

        if($isSucc){
            $arr = array('res_code' => 1, 'res_message' => "注册成功");
            echo json_encode($arr);
        }else{
            $arr = array('res_code' => 0, 'res_message' => "数据库操作失败");
            echo json_encode($arr);
        }
    }
?>