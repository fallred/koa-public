let proto = {

};
// proto.url = ctx.request.url;
// proto.url = proto.request.url;
//属性代理

function defineGetter(property, name){
    // 自定义获取器，代理
    proto.__defineGetter__(name, function(){
        return this[property][name]
    })
}
function defineSetter(property, name){
    proto.__defineSetter__(name, function(value){
        this[property][name] = value;
    })
}
defineGetter('request','url');
defineGetter('request', 'path');
defineGetter('response', 'body');
defineSetter('response', 'body');
// ctx.body = 'hello';
// ctx.response.body = 'hello';
module.exports = proto;