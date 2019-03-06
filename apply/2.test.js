let Koa = require('koa');
let app = new Koa();
// 获取请求的路径req.url
app.use((ctx, next)=>{
    ctx.body = 'hello zfpx';
    // console.log(ctx.req.url);
    // console.log(ctx.request.url);
    // console.log(ctx.request.req.url);
    // console.log(ctx.url);
    console.log(ctx.req.path);// ctx.req = req
    console.log(ctx.request.path);// ctx.request是koa自己封装的属性
    console.log(ctx.request.req.path);// ctx.request.req = req
    console.log(ctx.path);// 用ctx来代理一下ctx.request属性
    ctx.response.body= 'hello';
});
app.listen(30000);