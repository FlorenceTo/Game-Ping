// Ball position and game state variables
let xPos = 400; // Intial horizontal position of the falling circle
let yPos = 0; // Initial vertical position (starts at top)
let speed = 5; // Speed at which the circle falls
let score = 0; // Starting score
let misses = 0; // initializes the misses variable setting it to 0 so the program can begin counting how many times acthe ball is missed.

let hitOsc; // Oscillator for hit sound

let confetti = []; // For storing celebration emoji positions

function setup() {
  createCanvas(800, 800);
  let canvas = createCanvas(800, 800);
canvas.parent(document.body); // Ensures it stays centered with our CSS

  // Create a second oscillator for the hit sound
  hitOsc = new p5.Oscillator("triangle");
  hitOsc.start();
  hitOsc.amp(0); // Also start muted (0 = silent)

  // Prepare emoji "confetti"
  for (let i = 0; i < 20; i++) {
    confetti.push({
      x: random(width),
      y: random(height),
      speedY: random(1, 3),
      offsetX: random(-1, 1),
    });
  }
}

function draw() {
  background(220); // Light gray background

  // Draw and move the falling circle
  noStroke(); // Remove outline
  fill(0, 0, 0); // Fill color for the falling circle (Red, Green, Blue)
  circle(xPos, yPos, 100); // Circle position
  yPos += speed; // Moving circle down by 'speed'

  // Reset the circle if it hits the bottom
  if (yPos > height) {
    yPos = 0;
    xPos = random(width); // New random X position
    speed -= 5; // Prevent speed from going below 5
    misses += 1; //Increase the value of the misses variable by 1
  }

  // Paddle collision
  if (dist(xPos, yPos, mouseX, 700) < 50) {
    yPos = 0;
    xPos = random(width);
    speed += 5; // Increase speed as difficult
    score += 1; // Increase score

    // Hit sound
    hitOsc.freq(300);
    hitOsc.amp(0.5, 0.05); // Quick ramp up
    hitOsc.amp(0, 0.2); // Quick fade out
  }

  // Draw paddle (rectangle follows mouseX)
  rectMode(CENTER);
  fill(0, 0, 255);
  rect(mouseX, 700, 200, 50); // Paddle follows mouse horizontally

  // Display score and misses
  textSize(30);
  fill(0);
  text("Score: " + score, 30, 100);
  text("Misses: " + misses, 30, 140);

  // Show emoji on too many misses
  if (misses > 4) {
    textSize(80);
    text("🧐", width / 2 - 40, height / 2);
  }

  // Show celebration when score > 40
  if (score > 15) {
    textSize(100);
    for (let i = 0; i < confetti.length; i++) {
      text("👾", confetti[i].x, confetti[i].y);
      confetti[i].y += confetti[i].speedY;
      confetti[i].x += confetti[i].offsetX;

      if (confetti[i].y > height) {
        confetti[i].y = 0;
        confetti[i].x = random(width);
      }
    }
  }
}

// Required for activating audio in some browsers
function mousePressed() {
  userStartAudio(); // Enable audio context on user interaction
}
