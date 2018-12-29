var posX, posY;
var speedX, speedY;
var foodX, foodY;
var score;
var food;
var button;
var pause = false;
var restart_button, quit_button;
var allblocks;
var snake_parts;
var snake;
var head_posX, head_posY;
var foodimg1, foodimg2, foodimg3, foodimg4, foodimg5, foodimg6;
var food_image_list;
var food_image;
var snakeimg;
var gameoversound;
var eatsound;
var soundplaying;

function preload() {
  foodimg1 = loadImage("apple.png");
  foodimg2 = loadImage("banana.png");
  foodimg3 = loadImage("doughnut.png");
  foodimg4 = loadImage("pizza.png");
  foodimg5 = loadImage("sushi.png");
  foodimg6 = loadImage("watermelon.png");
  snakeimg = loadImage("snake.png");
  gameoversound = loadSound('gameover.wav');
  eatsound = loadSound('eat.mp3');
}

function introbuttonpressed() {
  start_button.hide();
  loop() //Resume looping draw(), so that the game may run (infinite loop)
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    if (speedY != 30) {
     dir(0, -30);
    }
  } else if (keyCode === DOWN_ARROW) {
    if (speedY != -30) {
     dir(0, 30);
    }
  } else if (keyCode === LEFT_ARROW) {
    if (speedX != 30) {
    dir(-30, 0);
    }
  } else if (keyCode === RIGHT_ARROW) {
    if (speedX != -30) {
    dir(30, 0);
    }
  }
  if (keyCode == '80') {
    if (pause === true) {
      quit_button.hide();
      pause = false;
    } else {
      pause = true;
    }
  }
}

function squares() {
  // Returns co-ordinates for food
 var blocks = Array();
 for (var x = 16; x <= 584; x += 30) {
  for (var y = 16; y <= 384; y += 30) {
    append(blocks, [x, y]);
 }
}
 return blocks
}

function lines() { // Creates the grid
  strokeWeight(3)
  for (var i = 0; i <= 600; i += 30) {
    stroke(55);
    line(i, 0, i, 420);
    stroke(55);
    if (i <= 420) {
      stroke(55);
      line(0, i, 600, i);
    }
  }
}

function game_over() {
 speedX = 0, speedY = 0;
 background(0);
 textAlign(CENTER);
 textSize(16);
 text('Game over. Would you like to play again?', 300, 210);
 text('Your score was: ' +str(score), 300, 180); 
 image(snakeimg, 220, 300, 150, 100);
 if (gameoversound.isPlaying() === false && soundplaying === false) { //Stops game over sound from playing continuously
  gameoversound.setVolume(0.1);
  gameoversound.play();
  soundplaying = true
 }
 if (!restart_button) {
 restart_button = createButton('Play again')
 restart_button.position(250, 240)
 restart_button.mousePressed(function () { restart(restart_button);}) // Need to make function in here to pass arguments to restart()
 } else { // Prevents duplicate buttons being made
   restart_button.show()}
}

function dir(x,y) {
  speedX = x;
  speedY = y;
}

function restart(button) { // Restarts the game, either from pause screen or game over
  pause = false;
  button.hide();
  setup()
}

function head_touching_snake(x, y) { // Checks if the head of the snake touches any body parts
  for (r = 1; r < snake_parts.length; r++) {
    if (snake_parts[r][0] == x && snake_parts[r][1] == y) {
      return true
  }
  }
  return false
}

function setup() { 
  createCanvas(600, 470);
  score = 0;
  head_posX = 35.5, head_posY = 5.5; //each square is +30
  snake_parts = Array()
  append(snake_parts, [head_posX, head_posY]);
  speedX = 30, speedY = 0; // Starting direction is right (+30 speedX)
  frameRate(3); // Slows the snake down
  allblocks = squares(); // Generates all food-block locations
  food_coords = food(); //Get random co-ords for first piece of food. Returns a list
  food_image_list = [foodimg1, foodimg2, foodimg3, foodimg4, foodimg5, foodimg6]; //Images of the possible food items in an array
  food_image = random(food_image_list) //Chooses a random food image to use
  foodX = food_coords[0], foodY = food_coords[1];
  start_button = createButton("Start game") //Start button
  start_button.position(500, 425)
  start_button.mousePressed(introbuttonpressed)
  soundplaying = false;
  noLoop() // This makes draw() only run once when the program loads. This is so we can have a starting interface
}

function draw() {
  background(0); //This creates a new canvas
  head_posX = snake_parts[0][0], head_posY= snake_parts[0][1]; // Co-ordinates of the head
  fill(255);
  rect(0,420,599,49);
  fill(0);
  textSize(12);
  strokeWeight(1);
  textFont("Monospace");
  text("Score: "+str(score), 10, 440);
  text("Press P to pause and see instructions.", 10, 460);
  fill('indigo');
  textSize(20);
  text("SNAKE", 260, 442);
  if (pause === true) {
      textSize(20);
      textAlign(CENTER);
      fill(255);
      text("INSTRUCTIONS", 300, 150);
      textSize(12);
      text("Game has been paused. Press P to resume.", 300, 50);
      text("Move the snake using the arrow keys to eat the food.", 300,200);
      text("The snake gets faster and longer each food eaten.", 300,250);
      text("Game ends if you run into yourself or a wall.", 300, 300);
      textAlign(LEFT);
      if (!quit_button) {
      quit_button = createButton('Restart game')
      quit_button.position(500,425)
      quit_button.mousePressed(function () { restart(quit_button);})
      } else { // To avoid making multiple buttons
       quit_button.show() 
      }
    } else {
  lines()
  for (var i = 0; i < snake_parts.length; i++) { // Builds all the snake pieces (head + any tails)
    fill('#fae');
    snake = rect(snake_parts[i][0], snake_parts[i][1], 20, 20);
  }
  fill(255);
  image(food_image, foodX-8, foodY-8, 16, 16) // Generates food image
  if (head_posX > 600 || head_posX < 0 || head_posY < 0 || head_posY > 420 || head_touching_snake(head_posX, head_posY)) {
   game_over();
  }
  if (snake_on_food(head_posX, head_posY)) {
    score += 1
    eatsound.setVolume(0.1);
    eatsound.play();
    if (snake_parts.length == 1) {
      append(snake_parts, [head_posX+speedX, head_posY+speedY])
    } else {
      append(snake_parts, [snake_parts[snake_parts.length-1][0]-speedX, snake_parts[snake_parts.length-1][1]-speedY]) // Build a new tail after the last tail
    }
    new_food = food();
    foodX = new_food[0], foodY = new_food[1];
    frameRate(3 + score*0.3) //Snake goes faster each food it eats
    food_image = random(food_image_list);
  } else {
  if (snake_parts.length > 1) {
   for (var q = snake_parts.length-1; q > 0; q--) {
    snake_parts[q][0] = snake_parts[q-1][0];
    snake_parts[q][1] = snake_parts[q-1][1];
  } 
  }
  snake_parts[0][0] += speedX;
  snake_parts[0][1] += speedY;
  }
    }
}

function food() {
  return random(allblocks)
}

function snake_on_food(x, y) {
  return (x + 10.5 == foodX) && (y + 10.5 == foodY);
}