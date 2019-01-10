define(["jquery"],function($){
    $("#scrollBox").load("../html/include/scroll.html",function(){
        $(document).on("scroll",function(){
            var top = $(document).scrollTop();
           
             if(top>200){
                    $("#scrollBox-top").fadeIn("normal");
                    }else{
                    $("#scrollBox-top").fadeOut("normal");
                }

            if(top>300){
                $("#scrollBox-bottom").fadeIn("normal");
                    }else{
                $("#scrollBox-bottom").fadeOut("normal");
            }

            $("#scrollBox-bottom").on("click",function(){
                $(document).animate({scrollTop:0},"slow")
                //$(document).scrollTop(0)
            })
        })
    })
})