var ktp = require("./lib/ktp-detection");
var start = new ktp();
start.detect("./samples/people-02.jpg", "./result/people-detect.png");