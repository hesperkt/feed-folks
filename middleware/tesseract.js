const Tesseract = require('tesseract.js')

Tesseract.recognize(
    'image.png',
    'eng', // Language of the text in the image
    { logger: m => console.log(m) } 
).then(({ data: { text } }) => {
    console.log(text);
}).catch(error => {
    console.error("Error during OCR:", error);
});