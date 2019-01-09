//加载gulp插件
const gulp = require("gulp");
const cleanCss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const connect = require('gulp-connect');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const htmlmin = require("gulp-htmlmin");

//压缩html
gulp.task("html", function(){
	//stream 流  读取
	//"app/**/*.html"  指的是app下面所有子目录的所有html文件
	gulp.src("app/**/*.html")
		.pipe(htmlmin({
			removeComments: true,//清除HTML注释
			collapseWhitespace: true,//压缩HTML
			collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
			removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
			removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
			removeStyleLinkTypeAttributes: true//删除<style>和<link>的type="text/css"
		}))
		.pipe(gulp.dest("dist"))
		.pipe(connect.reload());
});

gulp.task("module", function(){
	//stream 流  读取
	//"app/**/*.html"  指的是app下面所有子目录的所有html文件
	gulp.src("app/module/*.js")
	.pipe(gulp.dest("dist/module"))
	.pipe(connect.reload());
});

//编译、压缩css
gulp.task("css", function(){
	//app的css压缩，放到dist里面
	gulp.src("app/scss/**/*.scss")
	.pipe(sass())
	.pipe(cleanCss())
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());

})

//压缩JS
//ES6转ES5
gulp.task("js", function(){
	gulp.src(["app/js/**/*.js"])
	.pipe(babel({
		presets: ['env']
	}))
	//.pipe(uglify())
	.pipe(gulp.dest("dist/js"))
	.pipe(connect.reload());
});

gulp.task("server", function(){
	//开启一个服务
	connect.server({
        livereload: true,
        port: 3000,
        root:"dist"
    });
})

gulp.task("watch", function(){
	//第一个参数指要watch的文件，第二个参数文件内容改变之后分配的任务
	gulp.watch("app/js/*.js",["js"]);
	gulp.watch("app/css/**/*.css",["css"]);
	gulp.watch("app/**/*.html",["html"]);
	gulp.watch("app/scss/**/*.scss",["css"]);
	gulp.watch("app/module/**/*.js",["module"]);
	gulp.watch("app/libs/**/*",["libs"]);
	//监听任何文件变化，实时刷新页面
	gulp.watch("app/**/*.*").on('change',browserSync.reload);
	
});

//处理图片，位置迁移
gulp.task("img", function(){
	gulp.src("app/img/**/*")
	.pipe(gulp.dest("dist/img"));
});

//复制移动第三方js
gulp.task("libs", function(){
	gulp.src("app/libs/**/*.*")
	.pipe(gulp.dest("dist/libs"))
	.pipe(connect.reload());
	
});


//编辑默认任务
gulp.task("default",["server","html","js","css","watch","img","libs","module"]);



