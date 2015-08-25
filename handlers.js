var fs = require('fs');


function Job(maxSeconds) {
    var startTime = new Date().getTime();
    var endTime = startTime + maxSeconds*1000;
    var done = false;
    var someCounter = 0;

    function doSomething() {
        console.log("doSomething " + someCounter);
        if (new Date().getTime() >= endTime) {
            done = true;
        } else {
            someCounter++;  // just to do something
            setTimeout(doSomething, 0);
        }
    }

    function checkState() {
        return {
            done: done,
            maxSeconds: maxSeconds,
            counter: someCounter,
            millisecondsPassed: new Date().getTime() - startTime
        };
    }

    doSomething();

    return {
        checkState: checkState
    };
}


//var jobs = [];
var job;

function someJob(response, params) {
    //jobs.push(new Job(30));
    job = new Job(30);

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("OK");
    response.end();
}


function jobState(response, params) {
    if (job) {
        response.writeHead(200, {"Content-Type": "application/json"});
        var state = job.checkState();
        var json = JSON.stringify(state);
        response.end(json);
    } else {
        response.writeHead(400, {"Content-Type": "text/plain"});
        response.write("400 Bad Request (no jobs running)");
        response.end();
    }
}


function bar(response, params) {
    fs.readFile('client/index.html', function (err, html) {
        if (err) {
            throw err;
        }

        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write(html);
        response.end();
    });
}



exports.someJob = someJob;
exports.jobState = jobState;
exports.bar = bar;

