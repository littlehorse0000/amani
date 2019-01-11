//配置短名称
require.config({
    baseUrl:'/',
    paths: {
        "jquery":"libs/jquery/jquery-1.12.4.min",
        "header":"js/header",
        "footer":"js/footer",
        "bootstrap":"libs/bootstrap/js/bootstrap.min",
        "scroll":"js/scroll",
        "cookie":"libs/jquery-plugins/jquery.cookie",
        "template":"libs/art-template/template-web",
        "zoom":"libs/jquery-plugins/jquery.elevatezoom"
    },
    shim:{
        "bootstrap" : {
			deps:["jquery"]
        },
        "cookie" : {
            deps:["jquery"]
        },
        "zoom": {
            deps:["jquery"]
        }
    }
})