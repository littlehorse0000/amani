//配置短名称
require.config({
    baseUrl:'/',
    paths: {
        "jquery":"libs/jquery/jquery-1.12.4.min",
        "header":"js/header",
        "footer":"js/footer",
        "bootstrap":"libs/bootstrap/js/bootstrap.min"
    },
    shim:{
        "bootstrap" : {
			deps:["jquery"]
		}
    }
})