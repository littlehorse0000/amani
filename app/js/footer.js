//定义footer模块
define(["jquery"], function($) {
    $("footer").load("../html/include/footer.html",()=>{
        function Footer(){

        };

        Footer.prototype = {
            consturctor:Footer,
        };

        return new Footer();
    })
    
});