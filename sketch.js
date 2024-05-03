// Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
let classifier;

// A variable to hold the image we want to classify
let img;

function preload() {
  classifier = ml5.imageClassifier('MobileNet');
  // img = loadImage('images/bird.jpg');
}

let label, confidence;

function setup() {
  let canvas = createCanvas(400, 400);
  label = createDiv('');
  confidence = createDiv('');

  canvas.drop(gotFile);
  background(0);
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

// A function to run when we get any errors and the results
function gotResult(error, results) {
  // Display error in the console
  if (error) {
    console.error(error);
  }
  // The results are in an array ordered by confidence.
  label.html('Label: ' + results[0].label);
  confidence.html('Confidence: ' + nf(results[0].confidence, 0, 2));
  console.log(results);
}