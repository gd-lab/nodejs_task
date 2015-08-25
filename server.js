var http = require("http");
var url = require("url");
var route = require("./route");



function start() {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");

        var params = {};    // for future use
        route.route(pathname, response, params);
    }

    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");
}

exports.start = start;

