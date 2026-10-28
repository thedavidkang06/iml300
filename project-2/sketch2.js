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
  noStroke();

  // 1. Red frame with a gradient: lighter at the top, darker at the bottom
  let grad = drawingContext.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0,   "#d42b15");
  grad.addColorStop(0.5, "#ad1405");
  grad.addColorStop(1,   "#7a0b02");
  drawingContext.fillStyle = grad;

  rect(0, 0, frame, height);                     // left side
  rect(width - frame, 0, frame, height);         // right side
  rect(0, 0, width, frame);                      // top
  rect(0, height - bottomBar, width, bottomBar); // bottom

  // 2. A raised lip around the screen so it looks recessed
  let sx = frame;
  let sy = frame;
  let sw = width - frame * 2;
  let sh = height - bottomBar - frame;

  noFill();

  // 3. The two knobs
  let knobSize = bottomBar * 0.7;
  let knobY = height - bottomBar / 2;
  drawKnob(frame * 0.9, knobY, knobSize);          // left knob
  drawKnob(width - frame * 0.9, knobY, knobSize);  // right knob
}

function drawKnob(cx, cy, d) {
  let r = d / 2;  // radius

  // soft shadow under the knob
  drawingContext.shadowColor = "rgba(0, 0, 0, 0.55)";
  drawingContext.shadowBlur = r * 0.5;
  drawingContext.shadowOffsetY = r * 0.15;
  noStroke();
  fill(90);
  circle(cx, cy, d);

  // turn the shadow off again so nothing else gets one
  drawingContext.shadowColor = "rgba(0, 0, 0, 0)";
  drawingContext.shadowBlur = 0;
  drawingContext.shadowOffsetY = 0;

  // shiny body: bright spot at the top left, darker toward the edge
  let body = drawingContext.createRadialGradient(
    cx - r * 0.35, cy - r * 0.4, r * 0.1,
    cx, cy, r
  );
  body.addColorStop(0,    "#f4f4f4");
  body.addColorStop(0.55, "#bdbdbd");
  body.addColorStop(1,    "#7d7d7d");
  drawingContext.fillStyle = body;
  circle(cx, cy, d);

  // grip ridges around the edge
  stroke(60, 90);
  strokeWeight(2);
  let ridges = 40;
  for (let i = 0; i < ridges; i++) {
    let a = (TWO_PI / ridges) * i;
    line(
      cx + cos(a) * r * 0.82, cy + sin(a) * r * 0.82,
      cx + cos(a) * r * 0.97, cy + sin(a) * r * 0.97
    );
  }

  // dimple in the middle: dark at the top left, light at the bottom right
  noStroke();
  let dimple = drawingContext.createLinearGradient(
    cx - r * 0.4, cy - r * 0.4,
    cx + r * 0.4, cy + r * 0.4
  );
  dimple.addColorStop(0, "#8f8f8f");
  dimple.addColorStop(1, "#e6e6e6");
  drawingContext.fillStyle = dimple;
  circle(cx, cy, d * 0.5);
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