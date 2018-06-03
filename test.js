const Tesseract = require('tesseract.js');
Tesseract.recognize('./test.png').progress(function(p) {
    console.log('progress:', p);
}).then(function() {
    console.log('result:', result);
});