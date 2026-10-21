// layout.js — places letters so they look hand-made, using p5.js
//
// Give a container one of these classes:
//   class="layout-row"      → the letters inside wobble like a handwritten word
//   class="layout-scatter"  → the images inside spread over the whole page
// Click it to shuffle again.
//
// p5 helpers used here:
//   random(a, b)  → any number between a and b
//   noise(x)      → "smooth random": numbers close together give similar results.
//                   That's why neighbouring letters lean together, like one hand.
//   dist(...)     → distance between two points

function setup() {
  noCanvas(); // we're only moving HTML images, not drawing

  for (let word of selectAll(".layout-row")) {
    placeRow(word);
    word.mousePressed(() => placeRow(word));
  }

  for (let area of selectAll(".layout-scatter")) {
    placeScatter(area);
    area.mousePressed(() => placeScatter(area));
    
    let clicks = 0; // how many times this page has been shuffled
 
    area.mousePressed(() => {
      clicks = clicks + 1;
      placeScatter(area);
 
      // On the 10th click, add the class "done" to the page.
      // style.css does all the animation from there (no more JS needed).
      if (clicks == 10) {
        select("#page").addClass("done");
      }
    });
  }
}

// ---------- ROW: a handwritten word ----------
function placeRow(word) {
  let start = random(1000); // a new spot in the noise each time
  let letters = selectAll(".letter", word);

  for (let i = 0; i < letters.length; i++) {
    let tilt = (noise(start + i * 0.7) - 0.5) * 40;       // about -15 to 15 degrees
    let lift = (noise(start + 50 + i * 0.7) - 0.5) * 40;  // up/down, % of letter height

    letters[i].style("rotate", tilt + "deg");
    letters[i].style("translate", "0 " + lift + "%");
    letters[i].style("scale", random(0.9, 1.1));

    // tuck each letter into the one before it (not the first one)
    if (i > 0) {
      letters[i].style("margin-left", "calc(var(--u) * " + random(-6, -3) + ")");
    }
  }
}


// ---------- SCATTER: images all over the page ----------
function placeScatter(area) {
  let start = random(1000);
  let pieces = selectAll("img", area);
  let placed = []; // spots already used

  for (let piece of pieces) {
    // Try 30 random spots, keep the one farthest from the others → no clumps
    let best;
    let bestGap = -1;

    for (let t = 0; t < 30; t++) {
      let x = random(10, 90); // % of the window
      let y = random(10, 90);

      let gap = Infinity;
      for (let p of placed) {
        gap = min(gap, dist(x, y, p.x, p.y));
      }

      if (gap > bestGap) {
        best = { x: x, y: y };
        bestGap = gap;
      }
    }
    placed.push(best);

    // noise of the position: images near each other lean the same way
    let tilt = (noise(best.x * 0.03, best.y * 0.03, start) - 0.5) * 80;

    piece.style("left", best.x + "%");
    piece.style("top", best.y + "%");
    piece.style("rotate", tilt + "deg");
    piece.style("scale", random(0.7, 1.3));
    piece.style("z-index", floor(random(10))); // which one sits on top
  }
}
