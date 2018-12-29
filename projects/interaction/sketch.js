var mains;
var settings;
var notes;
var pen;
var plus;
var bg;
var soundPlaying;
var Y_AXIS = 1;
var X_AXIS = 2;
var b1, b2, c1, c2;
var num;

function preload() {
  mains = loadImage("home.png")
  settings = loadImage("settings.png")
  notes = loadImage("notes.png")
  pen = loadImage("pen.png")
  bg = loadImage("background.jpg")
  plus = loadImage("plus.png")
}

function setGradient(x, y, w, h, c1, c2, axis) {

  noFill();
  if (axis == Y_AXIS) {  // Top to bottom gradient (unused)
    for (var i = y; i <= y+h; i++) {
      var inter = map(i, y, y+h, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x+w, i);
    }
  }  
  else if (axis == X_AXIS) {  // Left to right gradient
    for (i = x; i <= x+w; i++) {
      inter = map(i, x, x+w, 0, 1);
      c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y+h);
    }
  }
}

function mousePressed() {
  // Check if mouse is inside the circle
  var d = dist(mouseX, mouseY, 260,560); //happy face
  var d1 = dist(mouseX, mouseY, 430,560); //neutral face
  var d2 = dist(mouseX, mouseY, 620,560); //sad face
  
  if (d < 40 && (num % 2 === 0)) {
    c1 = color(162, 219, 168);
    setGradient(129,207,635,300, c1, c2, X_AXIS)
    num = num+1;
  }
  else if (d < 40 && (num % 1 === 0)) {
    c2 = color(162, 219, 168);
    setGradient(129,207,635,300, c1, c2, X_AXIS)
    num = num+1;
  }
  
  if (d1 < 40 && (num % 2 === 0)) {
    c1 = color(245, 198, 110);
    setGradient(129,207,635,300, c1, c2, X_AXIS)
    num = num+1;
  }
  else if (d1 < 40 && (num % 1 === 0)) {
    c2 = color(245, 198, 110);
    setGradient(129,207,635,300, c1, c2, X_AXIS)
    num = num+1;
  }
  
  if (d2 < 40 && (num % 2 === 0)) {
    c1 = color(182, 220, 250);
    setGradient(129,207,635,300, c1, c2, X_AXIS)
    num = num+1;
  }
  else if (d2 < 40 && (num % 1 === 0)) {
    c2 = color(182, 220, 250);
    setGradient(129,207,635,300, c1, c2, X_AXIS)
    num = num+1;
  }
}

function setup() {
  createCanvas(1000, 1000);
  soundPlaying = true;
  c1 = color(255, 255, 255);
  c2 = color(255, 255, 255);
  num = 0;
}

function draw() {
  background(bg);
  fill(255);
  image(mains, 100, 100);
  setGradient(129,207,635,300, c1, c2, X_AXIS)
  image(pen, 795,240)
  image(plus,141,219);
  
  var dc = dist(mouseX, mouseY, 165,155);
  var dp = dist(mouseX, mouseY, 155,230);
  
  if (dc < 30) {
    image(settings, 100, 100);
  }
  
  if (dp < 20) {
    image(notes, 100, 100);
  }
}