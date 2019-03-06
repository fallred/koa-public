let http = require('http');
let context = require('./context');
let request = require('./request');
let response = require('./response');
class Koa {
    constructor(){
        this.callbackFn;
        this.middlewares = [];
        this.context = context;
        this.request = request;
        this.response = response;
    }
    use(cb){
        // this.callbackFn = cb;
        this.middlewares.push(cb);
    }
    createContext(req, res){
        // let ctx = this.context;// 希望ctx可以拿到context属性，但是不修改context
        // Object.create方法的作用
        let ctx = Object.create(this.context);
        ctx.request = Object.create(this.request);
        ctx.req = ctx.request.req = req;
        ctx.response = Object.create(this.response);
        ctx.res = ctx.response.res = res;
        return ctx;// 返回上下文对象
    }
    compose(ctx, middlewares){
        function dispatch(index) {
            if (index === middlewares.length) {
                return Promise.resolve();
            }
            let middleware = middlewares[index];
            // 递归创建套起来的promise
            return Promise.resolve(middleware(ctx, ()=>dispatch(index+1)));
        }
        return dispatch(0);
    }
    handleRequest(req, res){
        console.log(this);
        // 默认页面找不到
        res.statusCode = 404;
        let ctx = this.createContext(req,res);
        // this.callbackFn(ctx);// 当回调函数执行后，ctx.body值就会发生变化，
        let composeMiddleware = this.compose(ctx, this.middlewares);
        // 当此promise执行完成后，再去res.end
        composeMiddleware.then(()=>{
            let body = ctx.body;
            if (typeof body !== 'undefined') {
                res.end(`Not Found`);
            } else if (typeof body === 'string') {
                res.end(body);
            }
        });
    }
    listen(){
        let server = http.createServer(this.handleRequest.bind(this))
        server.listen(...arguments);
    }
}
module.exports = Koa;