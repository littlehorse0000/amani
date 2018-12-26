// //定义footer模块
// define(['jquery'],function($){
//     $.ajax({
//         type:"get",
//         url:"../html/include/footer.html",
//         success:function(data){
//             $("footer").html(data);
//         }
//     })
// })


$(function(){
    $("footer").load("../html/include/footer.html")
})