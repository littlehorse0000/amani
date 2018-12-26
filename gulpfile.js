//加载gulp插件
var gulp = require("gulp");
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');
var concat = require("gulp-concat");
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

gulp.task("html", function(){
	//stream 流  读取
	//"app/**/*.html"  指的是app下面所有子目录的所有html文件
	gulp.src("app/**/*.html")
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

gulp.task("css", function(){
	//app的css压缩，放到dist里面
	gulp.src("app/css/**/*.css")
	.pipe(minifyCss())
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());

})

gulp.task("js", function(){
	gulp.src(["app/js/*.js"])
	.pipe(babel({
		presets: ['env']
	}))
	.pipe(gulp.dest("dist/js"))
	.pipe(connect.reload());
});

gulp.task("server", function(){
	//指定服务器启动根目录
	// browserSync.init({
	// 	server:"app"
	// })
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
	gulp.watch("app/scss/**/*.scss",["sass"]);
	gulp.watch("app/module/**/*.js",["module"]);
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
	gulp.src("app/libs/**/*")
	.pipe(gulp.dest("dist/libs"));
})

gulp.task("sass", function(){
	//把scss文件编译成css，并且放到dist里面
	gulp.src("app/scss/*.scss")
	.pipe(sass())
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
})
//编辑默认任务
gulp.task("default",["server","html","js","css","watch","img","sass","libs","module"]);



