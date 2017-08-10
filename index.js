var ktp = require("./lib/ktp-detection");
var start = new ktp();
start.detect("./samples/people.jpg", "./result/people-detect.png");