//VARIABLES
var score;
var button;
var pause = false;
var win = false;
var restartButton, quitButton, startButton;
var sling;
var balloons = [];
var balloons2 = [];
var stone = [];
var time;
var myFont;
var slingshot;
var balloonimg1;
var balloonimg2;
var balloonimg3;
var stoneimg;
var popsound;
var winsound;
var soundplaying;


//IMAGES AND SOUNDS
function preload() {
  myFont = loadFont('font/04B_30__.TTF'); //custom font
  slingshot = loadImage("Slingshot.png");
  balloonimg1 = loadImage("Balloon.png");
  balloonimg2 = loadImage("Balloon2.png");
  balloonimg3 = loadImage("Balloon3.png");
  stoneimg = loadImage("Stone.png");
  popsound = loadSound("pop.wav");
  winsound = loadSound("win.wav");
}


function newSlingshot() { //slingshot function
  this.colour = '#fae'; //slingshot colour
  this.posX = 300; //slingshot x position
  this.posY = 370; //slingshot y position
  this.w = 30; //slingshot width
  this.h = 50; //slingshot height
  this.showSlingshot = function() { //function to show the slingshot
    fill(this.colour);
    image(slingshot,this.posX,this.posY,this.w,this.h);
  }
}


function newBalloons(x,y) {
  this.colour = 255;
  this.posX = x;
  this.posY = y;
  this.w = 50;
  this.h = 50;
  this.balloonImageList = [balloonimg1,balloonimg2,balloonimg3]
  this.balloonImage = random(this.balloonImageList)
  this.radius = this.w/2; //radius of targets
  this.balloon = function() { //function to show the balloons (targets)
    fill(this.colour);
    image(this.balloonImage,this.posX,this.posY,this.w,this.h);
  }
  this.burst = function(bang,popp) { //function to make the balloon disappear upon being hit
    bang.splice(popp,1); //splices only the current thing in the array
  }
}


function newStone() {
  this.colour = '#A0A0A0';
  this.posX = sling.posX+sling.w/2; //makes the stone start at the end of the slingshot
  this.posY = sling.posY;
  this.w = 20;
  this.h = 20;
  this.radius = this.w/2;
  this.showStone = function() { //function to show stone
    fill(this.colour);
    image(stoneimg,this.posX,this.posY, this.w, this.h);
  }
   this.shootStone = function() {
    this.posY = this.posY-=10; //makes the stone move upwards when function occurs
  }
  this.disappear = function(vanish){ //function to make the stone disappear upon hitting a target
    stone.splice(vanish,1);
  }
}


function targetShot(ammo,target) {
  var distance = dist(ammo.posX, ammo.posY, target.posX, target.posY);
  if (distance < ammo.radius + target.radius) {
    return true;
  } else {
    return false;
  }
}


function introbuttonpressed() {
  startButton.hide();
  loop() //Resume looping draw() once start button is pressed
}


function keyPressed() {
  if (keyCode === LEFT_ARROW) { //makes slingshot move left if within boundaries and left arrow is pressed
    if (sling.posX > 10) {
      sling.posX -= 20;
    }
  }
    if (keyCode === RIGHT_ARROW) {
     if (sling.posX < 560) { //makes slingshot move right if within boundaries and right arrow is pressed
      sling.posX += 20;
    }
  }
  if (key === ' ') {
      stone.push(new newStone()); //loads new stone when space is pressed
  }
  if (keyCode == '80') { //loads pause screen, unloads if already loaded
    if (pause === true) {
      quitButton.hide();
      pause = false;
    } else {
      pause = true;
    }
  }
}


function endScreen() {
  background(0);
  textAlign(CENTER);
  textSize(16);
  textFont('Arial')
  text('Would you like to play again?', 300, 210);
  text('Your score was: ' +str(score), 300, 180); 
  if (! restartButton) {
  restartButton = createButton("Play again") //Button to restart the game
  restartButton.position(250, 240)
  restartButton.mousePressed(function () { restart(restartButton);}) //Function is here to pass arguments to restart()
  } else { // Checks to stop duplicate buttons
   restartButton.show()}
}

function winScreen() {
  win = true;
  if (winsound.isPlaying() === false && soundplaying === false) { //Prevents winning sound from playing continously
  winsound.setVolume(0.1);
  winsound.play();
  soundplaying = true
 }
  background(0);
  textAlign(CENTER);
  textSize(16);
  fill('#FFFF00');
  textFont('Arial')
  text('Would you like to play again?', 300, 210);
  text('Congratulations, you hit all the targets with '+str(round(time))+(' seconds to spare!'), 300, 150); //Winning text
  text('Your score was: ' +str(score), 300, 180); 
  if (! restartButton) {
  restartButton = createButton("Play again")
  restartButton.position(250, 240)
  restartButton.mousePressed(function () { restart(restartButton);})
  } else { 
   restartButton.show()}
}


function pauseScreen() { //Instructions etc, option to restart
  if (pause === true) {
      background(0);
      textSize(20);
      textFont('Arial')
      textAlign(CENTER);
      fill(255);
      text("INSTRUCTIONS", 300, 150);
      textSize(12);
      text("Press P to resume", 300, 50);
      text("Move the slingshot using the left and right arrow keys.", 300,200);
      text("Shoot to hit the targets by pressing space.", 300,250);
      text("Top targets: 20 pts   Bottom targets: 10 pts", 300, 300);
      textAlign(LEFT);
      if (!quitButton) {
      quitButton = createButton('Restart game')
      quitButton.position(255,350)
      quitButton.mousePressed(function () { restart(quitButton);})
      } else { //Prevents duplicates
       quitButton.show() 
      }
    }
}


function restart(button) { //Restarts the game
  pause = false;
  button.hide();
  setup()
}


function display() {
  fill(0);
  rect(0,420,599,49);
  textSize(12);
  textFont('Arial');
  strokeWeight(1);
  fill(255);
  text("Score: "+str(score), 10, 20);
  text("P = Pause", 520, 20);
  text("Time: "+str(round(time)),250,20) //rounds time to integer, for aesthetic purposes
  if (pause === true || win === true) { //pauses time if game is paused or won
    time -= 0;
  } else {
    time -= 0.015; //timer counts down per second
  }
  fill('indigo');
  textFont(myFont, 'Arial'); //Custom font first choice
  textSize(32);
  text("TARGET PRACTICE", 10, 455);
}


function setup() { 
  createCanvas(600, 470);
  score = 0; //restarts score each game
  time = 30; //resets time each game
  soundplaying = false;
  win = false;
  startButton = createButton("Start game") //Start button
  startButton.position(480, 433)
  startButton.mousePressed(introbuttonpressed)
  noLoop() // draw only runs once, until loop(), prevents from playing game in start interface
  sling = new newSlingshot(); 
  for (var a=0; a < 6; a++){
      balloons[a] = new newBalloons(a*80+100, 70); 
      balloons2[a] = new newBalloons(a*80+100, 140); 
  }
}
  

function draw() {
  background('#3399FF');
  fill(255);
  display(); //loads GUI
  sling.showSlingshot(); //loads slingshot

//BALLOON DISPLAYS  
  for (var b=0; b < balloons.length; b++){
      balloons[b].balloon();
  } //loads top line of targets
  
  for (var b2=0; b2 < balloons2.length; b2++){
      balloons2[b2].balloon();
  } //loads bottom line of targets
  
//BALLOONS HIT
  for (var c=0; c < stone.length; c++){
    if (c >= stone.length) { 
      break;
    }
    stone[c].showStone();
    stone[c].shootStone();
      for (var d=0; d < balloons.length; d++) {
          if (c >= stone.length) {
            break;
          }
        if (targetShot(stone[c],balloons[d])) { //if stone hits top line of target, target + stone disappear, restarts loop from top
          popsound.setVolume(0.1);
          popsound.play();
          balloons[d].burst(balloons,d);
          stone[c].disappear(c);
          score += 20; //adds 20 to score if top target is hit
      }
    } for (var e=0; e < balloons2.length; e++) {
          if (c >= stone.length) {
            break;
          }
        if (targetShot(stone[c],balloons2[e])) {
            popsound.setVolume(0.1);
            popsound.play();
            balloons2[e].burst(balloons2,e);
            stone[c].disappear(c);
            score += 10;
          }
      }
  }
 
//PAUSE
  if (pause === true) {
      background(0);
      pauseScreen();
    }

//GAME END
    if (time<=0) { //if no time is left, load ending screen
      background(0);
      endScreen();
  }

//ALL TARGETS HIT
   if (balloons.length === 0 && balloons2.length === 0) { //if there are no targets left in both top and bottom arrays, load winning screen
     background(0);
     winScreen();
   }
}
