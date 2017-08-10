/**
 * Created by ikhlasfirlana on 8/10/17.
 */
var cv = require("opencv");
var cameraFacedetection = function () {

    this.start = function () {
        try {
            console.log("index.js");
            var camera = new cv.VideoCapture(0);
            var window = new cv.NamedWindow('Video', 0)

            setInterval(function () {
                camera.read(function (err, im) {
                    if (err) throw err;
                    if (im.size()[0] > 0 && im.size()[1] > 0) {

                        im.detectObject("./node_modules/opencv/data/haarcascade_frontalface_alt.xml", {}, function (err, faces) {
                            if (err) throw err;
                            if (!faces.length) return console.log("No Faces");

                            var face = faces[0];

                            for (var i = 0; i < faces.length; i++) {
                                var face = faces[i];
                                // im2.ellipse(face.x + face.width / 2, face.y + face.height / 2, face.width / 2, face.height / 2);
                                im.ellipse(face.x + face.width / 2, face.y + face.height / 2, face.width / 2, face.height / 2);
                            }
                            im.save('./result/face-detection.png');
                            console.log(face.x, face.y, face.width, face.height);
                            window.show(im);
                        })
                    } else {
                        console.log("Camera didn't return image")
                    }
                    window.blockingWaitKey(0, 50);
                });
            }, 20);

        } catch (e) {
            console.log("e : ", e);
        }
    }
};
module.exports = cameraFacedetection;