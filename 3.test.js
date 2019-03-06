// let Koa = require('koa');
// let app = new Koa();
function app () {

}
app.middlewares = [];
app.use = function (callback) {
    app.middlewares.push(callback);
}
app.use((ctx,next)=>{
    console.log(1);
    next();
    console.log(2);
});
app.use((ctx,next)=>{
    console.log(3);
    next();
    console.log(4);
});
app.use((ctx,next)=>{
    console.log(5);
    next();
    console.log(6);
});
app.listen(3000);

function dispatch(index){
    // 先取出第一个中间件，让其执行，让索引递增，调用next就是将下一个中间件继续执行
    if(index === app.middlewares.length) return;
    let middleware = app.middlewares[index];
    middleware({},dispatch(index+1));
}
