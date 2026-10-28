// layout.js — places letters so they look hand-made, using p5.js
//
// Give a container one of these classes:
//   class="layout-row"      → the letters inside wobble like a handwritten word
//   class="layout-scatter"  → the images inside spread over the page,
//                             and can be picked up and moved around

function setup() {
  noCanvas(); // we're only moving HTML images, not drawing

  for (let word of selectAll(".layout-row")) {
    placeRow(word);
    word.mousePressed(() => placeRow(word));
  }

  for (let area of selectAll(".layout-scatter")) {
    placeScatter(area);    // spread the letters out once, when the page loads
    makeDraggable(area);   // then let people pick them up and move them
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


// ---------- DRAG: pick up letters and move them ----------
function makeDraggable(area) {
  let topLayer = 10;  // each letter you grab goes on top of the others
  let drops = 0;      // how many times a letter has been let go

  for (let piece of area.elt.querySelectorAll(".piece")) {

    // mouse button goes down on a letter: pick it up
    piece.addEventListener("pointerdown", (e) => {
      piece.setPointerCapture(e.pointerId);  // keep following the mouse
      piece.classList.add("dragging");
      topLayer = topLayer + 1;
      piece.style.zIndex = topLayer;
    });

    // mouse moves while holding it: put the letter under the mouse
    piece.addEventListener("pointermove", (e) => {
      if (!piece.classList.contains("dragging")) return;
      piece.style.left = (e.clientX / window.innerWidth * 100) + "%";
      piece.style.top  = (e.clientY / window.innerHeight * 100) + "%";
    });

    // mouse button comes up: put it down, and count it
    piece.addEventListener("pointerup", () => {
      piece.classList.remove("dragging");
      drops = drops + 1;

      // on the 20th, add "done" to the page. style.css does the fading.
      if (drops == 20) {
        select("#page").addClass("done");
      }
    });

    // if the browser interrupts the drag, just put the letter down
    piece.addEventListener("pointercancel", () => {
      piece.classList.remove("dragging");
    });
  }
}

