var fs=require('fs');
exports.get_test_data=function(){
    var content=fs.readFileSync('./mock/test.json','utf-8');
    return content;
};

exports.get_index_data=function(){
    var content=fs.readFileSync('./mock/home.json','utf-8');
    return content;
};


exports.get_book_data=function(id){
    if(!id){
        id="18218"
    };
    if(fs.existsSync('./mock/book/' + id + '.json')){
        return fs.readFileSync('./mock/book/' + id + '.json', 'utf-8');
    }else{
        return fs.readFileSync('./mock/book/18218.json', 'utf-8');
    }
};


exports.get_search_data=function(start,end,keyword){
    return function(cb){   //http  异步的
        var http=require('http');
        var qs=require('querystring');
        var data={
            start:start,
            end:end,
            keyword:keyword
        };

        var content=qs.stringify(data);

        var http_request={
            hostname:'dushu.xiaomi.com',
            port:80,
            path:'/store/v0/lib/query/onebox?'+content
        };

        var req_obj=http.request(http_request,function(_res){
            var content='';
            _res.setEncoding('utf8');
            _res.on('data',function(chunk){
                content+=chunk;
            });

            _res.on('end',function(){
                cb(null,content);  //第一个变量为error代码，第二个为返回内容
            })
        });

        req_obj.on('error',function(error){
            console.log(error)

        });


        req_obj.end();  //发送请求





    }



};



exports.get_rank_data=function(){
    var content=fs.readFileSync('./mock/rank.json','utf-8');
    return content;
};


exports.get_bookbacket_data=function(){
    var content=fs.readFileSync('./mock/bookbacket.json','utf-8');
    return content;
};


exports.get_category_data=function(){
    var content=fs.readFileSync('./mock/category.json','utf-8');
    return content;
};