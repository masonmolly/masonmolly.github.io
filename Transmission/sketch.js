//VARIABLES
var score;
var button;
var start = true;
var pause = false;
var win = false;
var restartButton, quitButton, startButton;
var mosquito;
var people = [];
var people2 = [];
var people3 = [];
var blood = [];
var screams = [];
var screamsound;
var time;
var myFont;
var bg;
var mozzy;
var personimg1;
var personimg2;
var personimg3;
var personimg4;
var personimg5;
var personimg6;
var personimg7;
var personimg8;
var personimg9;
var personimg10;
var personimg11;
var personimg12;
var bloodimg;
var bloodsound;
var screamsound1;
var screamsound2;
var screamsound3;
var screamsound4;
var screamsound5;
var music;
var winsound;
var gameoversound;
var soundplaying;


//IMAGES AND SOUNDS
function preload() {
  myFont = loadFont('font/8-bit.otf'); //custom font
  bg = loadImage("Background.png");
  mozzy = loadImage("Mosquito.png");
  personimg1 = loadImage("Person1.png");
  personimg2 = loadImage("Person2.png");
  personimg3 = loadImage("Person3.png");
  personimg4 = loadImage("Person4.png");
  personimg5 = loadImage("Person5.png");
  personimg6 = loadImage("Person6.png");
  personimg7 = loadImage("Person7.png");
  personimg8 = loadImage("Person8.png");
  personimg9 = loadImage("Person9.png");
  personimg10 = loadImage("Person10.png");
  personimg11 = loadImage("Person11.png");
  personimg12 = loadImage("Person12.png");
  bloodimg = loadImage("Blood.png");
  bloodsound = loadSound("Blood.wav");
  screamsound1 = loadSound("Scream1.wav");
  screamsound2 = loadSound("Scream2.wav");
  screamsound3 = loadSound("Scream3.wav");
  screamsound4 = loadSound("Scream4.mp3");
  screamsound5 = loadSound("Scream5.ogg");
  music = loadSound("Music.mp3");
  winsound = loadSound("Win.wav");
  gameoversound = loadSound("Game_Over.wav");
}


function newMosquito() { 
  this.colour = '#830303'; 
  this.posX = 280; 
  this.posY = 350; 
  this.w = 50; 
  this.h = 80; 
  this.radius = this.w/2;
  this.showMosquito = function() { //function to show the mosquito
    image(mozzy,this.posX,this.posY,this.w,this.h);
  }
}


function newPerson(x,y) {
  this.colour = '#830303';
  this.posX = x;
  this.posY = y;
  this.w = 30;
  this.h = 50;
  this.personImageList = [personimg1,personimg2,personimg3,personimg4,personimg5,personimg6,personimg7,personimg8,personimg9,personimg10,personimg11,personimg12]
  this.personImage = random(this.personImageList)
  this.radius = this.w/2; //radius of people
  this.person = function() { //function to show the people
    image(this.personImage,this.posX,this.posY,this.w,this.h);
  }
  this.infected = function(squish,splat) { //function to make the person disappear upon being hit
    squish.splice(splat,1); //splices only the current thing in the array
  }
}


function newBlood() {
  this.colour = '#830303';
  this.posX = mosquito.posX+mosquito.w/2-5; //makes the blood start at the end of the ship
  this.posY = mosquito.posY;
  this.w = 10;
  this.h = 16;
  this.radius = this.w/2;
  this.showBlood = function() { //function to show blood
    image(bloodimg,this.posX,this.posY, this.w, this.h);
  }
   this.shootBlood = function() {
    this.posY = this.posY-=10; //makes the blood move upwards when function occurs
  }
  this.disappear = function(splat){ //function to make the blood disappear upon infecting a person
    blood.splice(splat,1);
  }
}


function personInfected(disease,target) {
  var distance = dist(disease.posX, disease.posY, target.posX, target.posY);
  if (distance < disease.radius + target.radius) {
    return true;
  } else {
    return false;
  }
}

function mosquitoHit(person, mozzy) {
  var distance = dist(person.posX, person.posY, mozzy.posX, mozzy.posY);
  if (distance < person.radius + mozzy.radius) {
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
  if (keyCode === LEFT_ARROW) { //makes mosquito move left if within boundaries and left arrow is pressed
    if (mosquito.posX > 10) {
      mosquito.posX -= 20;
    }
  }
    if (keyCode === RIGHT_ARROW) {
     if (mosquito.posX < 560) { //makes mosquito move right if within boundaries and right arrow is pressed
      mosquito.posX += 20;
    }
  }
  
  if (keyCode === UP_ARROW) {
     if (mosquito.posY > 10) { //makes mosquito move up if within boundaries and right arrow is pressed
      mosquito.posY -= 20;
    }
  }
  
  if (keyCode === DOWN_ARROW) {
     if (mosquito.posY < 390) { //makes mosquito move down if within boundaries and right arrow is pressed
      mosquito.posY += 20;
    }
  }
  
  if (key === ' ') {
      bloodsound.setVolume(0.1);
      bloodsound.play();
      blood.push(new newBlood()); //shoots new blood drop when space is pressed
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
  if (gameoversound.isPlaying() === false && soundplaying === false) { //Prevents game over sound from playing continously
    gameoversound.setVolume(0.1);
    gameoversound.play();
    soundplaying = true;
  }
  background('#830303');
  textAlign(CENTER);
  textSize(16);
  fill(255);
  textFont('Courier');
  text("Oh dear, you didn't manage to infect everyone!", 300, 150);
  text('Would you like to play again?', 300, 220);
  text('Your score was: ' +str(score), 300, 170); 
  if (! restartButton) {
  restartButton = createButton("Play again"); //Button to restart the game
  restartButton.position(250, 250);
  restartButton.mousePressed(function () { restart(restartButton);}) //Function is here to pass arguments to restart()
  } else { // Checks to stop duplicate buttons
   restartButton.show()}
}

function winScreen() {
  win = true;
  if (winsound.isPlaying() === false && soundplaying === false) { //Prevents winning sound from playing continously
    winsound.setVolume(0.1);
    winsound.play();
    soundplaying = true;
  }
  background('#dadfe8');
  textAlign(CENTER);
  textSize(16);
  fill('#830303');
  textFont('Courier')
  text('Good job, you infected everyone with '+str(round(time))+(' seconds to spare!'), 300, 150); //Winning text
  text('Your score was: ' +str(score), 300, 170); 
  text('Would you like to play again?', 300, 220);
  if (! restartButton) {
  restartButton = createButton("Play again")
  restartButton.position(250, 250)
  restartButton.mousePressed(function () { restart(restartButton);})
  } else { 
   restartButton.show()}
}


function pauseScreen() { //Instructions etc, option to restart
  if (pause === true) {
      background('#dadfe8');
      textFont('Courier')
      textAlign(CENTER);
      fill('#830303');
      text("INSTRUCTIONS", 300, 120);
      textSize(12);
      text("Press P to resume", 300, 50);
      text("Move the mosquito around using the arrow keys.", 300,150);
      text("Shoot blood to infect the people by pressing space.", 300,180);
      text("Flying into a person will cause a game over.", 300,210);
      text("Bottom row: 10 pts      Middle row: 20 pts      Top row: 30 pts", 300, 280);
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
  if (pause === true || win === true) { //pauses time if game is paused or won
    time -= 0;
  } else {
    time -= 0.015; //timer counts down per second
  }
  fill('#830303');
  strokeWeight(1);
  textFont(myFont, 'Courier'); //Custom font first choice
  textSize(32);
  text("TRANSMISSION", 175, 35);
  textSize(12);
  text("Score: "+str(score), 10, 465);
  text("Time: "+str(round(time)),278,465); //rounds time to integer, for aesthetic purposes
  text("Press P to pause", 480, 465);
}


function setup() { 
  createCanvas(600, 470);
  score = 0; //restarts score each game
  time = 30; //resets time each game
  soundplaying = false;
  win = false;
  textFont('Courier');
  startButton = createButton("Start game") //Start button
  startButton.position(265, 300)
  startButton.mousePressed(introbuttonpressed)
  noLoop() // draw only runs once, until loop(), prevents from playing game in start interface
  mosquito = new newMosquito(); 
  for (var a=0; a < 6; a++){
      people[a] = new newPerson(a*76+100, 70); 
      people2[a] = new newPerson(a*76+100, 140);
      people3[a] = new newPerson(a*76+100, 210);
  }
}
  

function draw() {
  background(bg);
  fill(255);
  textFont('Courier');
  while (music.isPlaying() === false) { //background music
    music.setVolume(0.01);
    music.play();
  }
  display(); 
  mosquito.showMosquito(); 
  screams = [screamsound1, screamsound2, screamsound3, screamsound4, screamsound5];
  screamsound = random(screams);
  
//PERSON DISPLAYS
  for (var b=0; b < people.length; b++){
      people[b].person();
  } 
  
  for (var b2=0; b2 < people2.length; b2++){
      people2[b2].person();
  } 
  
  for (var b3=0; b3 < people3.length; b3++){
      people3[b3].person();
  } 
  
//PERSONS INFECTED
  for (var c=0; c < blood.length; c++){
    if (c >= blood.length) { 
      break;
    }
    blood[c].showBlood();
    blood[c].shootBlood();
    
      for (var d=0; d < people.length; d++) {
        if (c >= blood.length) {
          break;
        }
        if (pause != true) {
          people[d].posY = people[d].posY += 0.15;
        }
        if (people[d].posY > 470) {
          people[d].posY = 0;
        }
        if (mosquitoHit(people[d],mosquito)) {
          time = 0;
        }
        if (personInfected(blood[c],people[d])) { //if blood hits person in top array, person + blood disappear, restarts loop from top
          screamsound.setVolume(0.1);
          screamsound.play();
          people[d].infected(people,d);
          blood[c].disappear(c);
          score += 30;
      }
    } 
    
    for (var e=0; e < people2.length; e++) {
        if (c >= blood.length) {
          break;
        }
        if (pause != true) {
          people2[e].posY = people2[e].posY += 0.15;
        }
        if (people2[e].posY > 470) {
          people2[e].posY = 0;
        }
        if (mosquitoHit(people2[e],mosquito)) {
          time = 0;
        }
        if (personInfected(blood[c],people2[e])) {
            screamsound.setVolume(0.1);
            screamsound.play();
            people2[e].infected(people2,e);
            blood[c].disappear(c);
            score += 20;
          }
      }
      
      for (var f=0; f < people3.length; f++) {
        if (c >= blood.length) {
          break;
        }
        if (pause != true) {
          people3[f].posY = people3[f].posY += 0.15;
        }
        if (people3[f].posY > 470) {
          people3[f].posY = 0;
        }
        if (mosquitoHit(people3[f],mosquito)) {
          time = 0;
        }
        if (personInfected(blood[c],people3[f])) {
            screamsound.setVolume(0.1);
            screamsound.play();
            people3[f].infected(people3,f);
            blood[c].disappear(c);
            score += 10;
          }
      }
  }
 
//PAUSE
  if (pause === true) {
      textFont('Courier');
      background(0);
      pauseScreen();
    }

//GAME END
    if (time <= 0) { //if no time is left, load ending screen
      background(0);
      endScreen();
  }

//ALL PEOPLE INFECTED
   if (people.length === 0 && people2.length === 0 && people3.length === 0) { //if there are no people left in all arrays, load winning screen
      background(0);
      winScreen();
   }
}
