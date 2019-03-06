let Koa = require('./koa/application');
let app = new Koa();
// 获取请求的路径req.url
app.use((ctx)=>{
    console.log(ctx.req.url);// ctx.req = req
    console.log(ctx.request.req.url);
    console.log(ctx.request.url);
    console.log(ctx.path);
    ctx.body= 'hello';
    // ctx.response.body= 'hello';
    console.log(ctx.response.body);
});
app.listen(3000);