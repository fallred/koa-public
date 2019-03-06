let response = {
    set body(value){
        // 只要调用了ctx.body = 'xxx',就会成功
        this.res.statusCode = 200;
        this._body = value;
        console.log(value);
    },
    get body(){
        return this._body;
    }
};
// ctx.body = 'hello';
// ctx.response.body = 'hello';
// response.body = 'hello';
module.exports = response;