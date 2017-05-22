var openalpr = require('./openalpr');
var fs = require('fs');


const maxit = 200;
function identify (id, buffer) {
    //let data = fs.readFileSync(path);
    console.log (openalpr.IdentifyLicense (buffer, { regions : [{x:346, y:206, width:1318, height:600}]}, function (error, output) {
    var results = output.results;
    //console.log(JSON.stringify(output, null, 4))
    console.log (id +" "+ output.processing_time_ms +" "+ ((results.length > 0) ? results[0].plate : "No results"));

    if (id == maxit) {
        console.log(openalpr.Stop());
        console.timeEnd('lpr');
        let ms = Date.now() - start;
        console.log(`processed ${maxit} plates in ${ms}ms - ${ms / maxit} per plate`)

    }
    }));
}
 
openalpr.Start ()
openalpr.GetVersion ();
 
const buffer = fs.readFileSync("10.125.23.3_01_20170321102708002_VEHICLE_DETECTION.jpg");
console.time('lpr');
var start = Date.now();
for (var i = 0; i <= maxit; i++) {
    identify (i, buffer);
}