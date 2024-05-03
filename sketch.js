let classifier;
let img;

function preload() {
  classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/cdUsmYxlL/');
  // img = loadImage('images/bird.jpg');
}

let label, confidence;

function setup() {
  let canvas = createCanvas(400, 400);
  label = createDiv('');
  confidence = createDiv('');
  
  canvas.drop(gotFile);
  background(200,180,210);
  fill(255);
  noStroke();
  textSize(24);
  textAlign(CENTER);
  text('Drag an image file onto the canvas.', width / 2, height / 2);
}

function imageReady() {
  image(img, 0, 0, width, height);
}

function gotFile(file) {
  if (file.type === 'image') {
    img = createImg(file.data, imageReady).hide();
    classifier.classify(img, gotResult);
  } else {
    console.log('Not an image file!');
  }
}

// in case of errors
function gotResult(error, results) {
  if (error) {
    console.error(error);
  }
//can't edit html text from p5.js so might change it to be included in the canvas to be able to change its font/size/color
  label.html('Medium: ' + results[0].label);
  confidence.html('Confidence: ' + nf(results[0].confidence, 0, 2));

  console.log(results);
}