<?php
    //允许跨域
    header("Access-Control-Allow-Origin:*");

    include("../db.php");
    $username = $_REQUEST['username'];
    $password = $_REQUEST['password'];

    //去和数据库对比；
    $sql = "select * from userinfo where username = '$username' && password = '$password'";
    
    $res = mysql_query($sql);

    //判断
    if(mysql_num_rows($res)){
        $arr = array('res_code' => 1,'res_message' => "用户存在");
        echo json_encode($arr);
    }else{
        $arr = array('res_code' => 0,'res_message' => "用户不存在");
        echo json_encode($arr);
    }
?>