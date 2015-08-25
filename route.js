var handlers = require("./handlers");


var handle = {
    "/job": handlers.someJob,
    "/jobstate.json": handlers.jobState,
    "/bar": handlers.bar
};


function route(pathname, response, params) {
    console.log("About to route a request for " + pathname);
    if (typeof handle[pathname] === 'function') {
        handle[pathname](response, params);
    } else {
        console.log("No request handler found for " + pathname);
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not found");
        response.end();
    }
}

exports.route = route;

