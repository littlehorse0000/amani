define(["jquery"],function($){
    $("#scrollBox").load("../html/include/scroll.html",function(){
        $(document).on("scroll",function(){
            var top = $(document).scrollTop();
           
             if(top>200){
                    $("#scrollBox-top").show();
                    }else{
                    $("#scrollBox-top").hide();
                }

            if(top>300){
                $("#scrollBox-bottom").show(function(){
                   
                });
                    }else{
                $("#scrollBox-bottom").hide();
            }

            $("#scrollBox-bottom").on("click",function(){
                $(document).scrollTop(0)
            })
        })
    })
})