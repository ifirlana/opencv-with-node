/**
 * Created by ikhlasfirlana on 8/10/17.
 */
var cv = require("opencv");
var ktp = function () {
    this.detect = function (from, to) {
        cv.readImage(from, function (err, im) {
            if (err) throw err;
            if (im.width() < 1 || im.height() < 1) throw new Error('Image has no size');

            im.detectObject("./node_modules/opencv/data/haarcascade_frontalface_alt.xml", {}, function (err, faces) {
                console.log("faces ",JSON.stringify(faces));
                if (err) throw err;
                for (var i = 0; i < faces.length; i++) {
                    var face = faces[i];
                    im.ellipse(face.x + face.width / 2, face.y + face.height / 2, face.width / 2, face.height / 2);
                    var im2 = im.roi(face.x, face.y, face.width, face.height);
                    var face_img = face.x+face.y+face.width+face.height+".png";
                    im2.save("./face/"+face_img);

                    im.detectObject("./node_modules/opencv/data/haarcascade_eye.xml", {},function (err, eyes) {
                        console.log("eyes ",JSON.stringify(eyes));
                        for (var j = 0; j < eyes.length; j++) {
                            var eye = eyes[j];
                            im.ellipse(eye.x + eye.width / 2, eye.y + eye.height / 2, eye.width / 2, eye.height / 2);
                            var im3 = im.roi(eye.x, eye.y, eye.width, eye.height);
                            var eye_img = eye.x+eye.y+eye.width+eye.height+".png";
                            im3.save("./eye/"+eye_img);
                        }
                    })
                }

                im.save(to);
                console.log('Image saved to ', to);
            });
        });
    }
};
module.exports = ktp;