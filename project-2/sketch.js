let brushSize1 = 4;
let topMargin = 80;
let holeSpacing = 70; // distance between holes. Bigger number = fewer holes

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(20);
  drawHoles();
}

function drawHoles() {
  // how many holes fit across the window
  let count = floor(width / holeSpacing);

  // where the first hole goes, so the whole row is centered
  let startX = (width - (count - 1) * holeSpacing) / 2;

  for (let i = 0; i < count; i++) {
    let x = startX + i * holeSpacing; // each hole is one spacing further right

    // the hole
    fill(14);
    stroke(10);
    strokeWeight(5);
    ellipse(x, 40, 35);

    // the two spiral lines, 5px left and right of the hole's center
    stroke(6);
    strokeWeight(6);
    line(x - 5, 53, x - 5, 0);
    line(x + 5, 53, x + 5, 0);
  }
}

function draw() {}

function mouseDragged() {
  if (mouseY > topMargin) {
    stroke(mouseX / 3, mouseY / 3, windowWidth - mouseX / 3);
    strokeWeight(brushSize1);
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

function keyPressed() {
  if (key === " ") {
    background(19);
    drawHoles();
    console.log("Cleared");
  }

  return false;
}