var koa=require ('koa');
var controller=require('koa-route'); //koa路由
var app=koa();

var views=require('co-views');   //模板渲染的中间件
var render=views('./view',{       //第一个参数渲染的相对路径，注意／前面有一个.，第二个参数map要解析的文件类型及对应的模板引擎类型
    map:{
        html:'ejs'  //
    }
});

var  koa_static=require('koa-static-server');
app.use(koa_static({
    rootDir:'./static/', //相对文件夹的路径,有逗点
    rootPath:'/static/'  ,//url地址,无逗点
    maxage:0          //缓存周期

}));


var service=require('./service/webAppService');
var querystring=require('querystring');



app.use(controller.get('/route_test',function*(){   //app.use使用中间件，接收的第二个参数为generator函数，异步回调函数
    this.set('Cache-Control','no-cache');
    this.body='hello koa';  //返回文本

}));


app.use(controller.get('/ejs_test',function*(){
    this.set('Cache-Control','no-cache');
    this.body=yield render('test',{title:'title_test'});  // 第一个参数模板的名字，第二个参数设置参数
}));


app.use(controller.get('/api_test',function*(){
    this.set('Cache-Control','no-cache');
    this.body=service.get_test_data();

}));


app.use(controller.get('/search',function*(){
    this.set('Cache-Control','no-cache');
    this.body=yield render('search',{title:'书城搜索'});  // 第一个参数模板的名字，第二个参数设置参数
}));


app.use(controller.get('/book',function*(){
    this.set('Cache-Control','no-cache');
    var param=querystring.parse(this.req._parsedUrl.query);
    var bookId=param.id;
    this.body=yield render('book',{bookId:bookId});  // 第一个参数模板的名字，第二个参数设置参数
}));


app.use(controller.get('/',function*(){
    this.set('Cache-Control','no-cache');
    this.body=yield render('index');  // 第一个参数模板的名字，第二个参数设置参数
}));


app.use(controller.get('/ajax/search',function*(){
    this.set('Cache-Control','no-cache');

    var param=querystring.parse(this.req._parsedUrl.query);
    var start=param.start;
    var end=param.end;
    var keyword=param.keyword;
    this.body=yield service.get_search_data(start,end,keyword);

}));


app.use(controller.get('/ajax/search',function*(){
    this.set('Cache-Control','no-cache');

    var param=querystring.parse(this.req._parsedUrl.query);
    var start=param.start;
    var end=param.end;
    var keyword=param.keyword;
    this.body=yield service.get_search_data(start,end,keyword);

}));




app.use(controller.get('/ajax/index',function*(){
    this.set('Cache-Control','no-cache');
    this.body=service.get_index_data();

}));

app.use(controller.get('/ajax/male',function*(){
    this.set('Cache-Control','no-cache');
    this.body=service.get_male_data(id);

}));

app.use(controller.get('/ajax/female',function*(){
    this.set('Cache-Control','no-cache');
    this.body=service.get_female_data(id);

}));


app.use(controller.get('/ajax/bookbacket',function*(){
    this.set('Cache-Control','no-cache');
    this.body=service.get_bookbacket_data();

}));


app.use(controller.get('/ajax/rank',function*(){
    this.set('Cache-Control','no-cache');
    this.body=service.get_rank_data();

}));


app.use(controller.get('/ajax/category',function*(){
    this.set('Cache-Control','no-cache');
    this.body=service.get_category_data();

}));


app.use(controller.get('/ajax/get_book_data',function*(){
    this.set('Cache-Control','no-cache');

    var querystring=require('querystring');
    var param=querystring.parse(this.req._parsedUrl.query);
    var id=param.id;
    if(!id){
        id="18218"
    }


    this.body=service.get_book_data(id);

}));

app.listen(3001);  // 监听在某个端口
console.log('koa server is started');