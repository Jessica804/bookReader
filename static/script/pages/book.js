/**
 * Created by dell on 2017/8/22.
 */
var id=location.href.split("?id=").pop();

$.get('/ajax/get_book_data?id='+id,function(d){
  debugger;
new Vue({
  el:'#app',
  data:d,
  methods:{

  }
});
},'json');