// Like the scratch paper, the Etch A Sketch reminds me of making art before I worried about getting everything right. Its limited controls force me to slow down, work with what I have, and accept unexpected lines. Recreating it as a digital drawing tool brings back that playful feeling while reminding me that creativity does not require complete control.

let brushSize = 4;
let speed = 2.5; // how many dots are added in the direction you go

let x, y;                       // current drawing position
let frame, bottomBar;           // thickness of the red border (set in setup)

function setup() {
  createCanvas(windowWidth, windowHeight);

  // border thickness, based on the window size
  frame = min(width, height) * 0.08;  // sides and top. Change 0.08 for a thicker or thinner border
  bottomBar = frame * 1.67;           // the bottom is thicker, for the knobs

  // start in the center of the gray screen
  x = width / 2;
  y = (frame + (height - bottomBar)) / 2;

  background(180);
  drawBorder();
}

function drawBorder() {
  fill(173, 20, 5);
  noStroke();

  rect(0, 0, frame, height);                    // left side
  rect(width - frame, 0, frame, height);        // right side
  rect(0, 0, width, frame);                     // top
  rect(0, height - bottomBar, width, bottomBar); // bottom

  // the two knobs, in the bottom corners
  fill(195);
  let knobSize = bottomBar * 0.6;
  let knobY = height - bottomBar / 2;
  circle(frame * 0.75, knobY, knobSize);          // left knob
  circle(width - frame * 0.75, knobY, knobSize);  // right knob
}

function draw() {
  let moving = false;

  if (keyIsDown(LEFT_ARROW)) {
    x = x - speed;
    moving = true;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    x = x + speed;
    moving = true;
  }
  if (keyIsDown(UP_ARROW)) {
    y = y - speed;
    moving = true;
  }
  if (keyIsDown(DOWN_ARROW)) {
    y = y + speed;
    moving = true;
  }

  // keep the dot inside the gray screen (5px away from the border)
  x = constrain(x, frame + 5, width - frame - 5);
  y = constrain(y, frame + 5, height - bottomBar - 5);

  if (moving) {
    fill(50);
    noStroke();
    circle(x, y, brushSize);
  }
}

function keyPressed() {
  if (key === " ") {
    background(180);
    drawBorder();
    console.log("Cleared");
  }

  return false;
}
