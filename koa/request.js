let url = require('url');
let request = {
    get url () {
        // return ctx.request.req.url;
        return this.req.url;
    },
    get path(){
        return url.parse(this.req.url).pathname;
    }
};
module.exports = request;