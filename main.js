const NUM_DEPTHS = Math.floor(1 + Math.random() * 4);
const DEPTH_GAP = (window.innerHeight * 0.6) / NUM_DEPTHS;
const DEPTH_COLOR_GAP = 20;
const BASE_COLOR = hexToRGB(randomBaseColor());
const OUTLINE_WEIGHT = 1;
const MOON_COLOR = [220 + Math.random() * 35, 220 + Math.random() * 35, 220 + Math.random() * 35];
function setup() {
  const canvas = createCanvas(window.innerWidth, window.innerHeight);

  // choose base color for picture
  // background(...BASE_COLOR);
  const RADIUS = 200 * (0.8 + Math.random() * 0.4);
  const x = RADIUS + Math.random() * (window.innerWidth - RADIUS);
  const y = window.innerHeight / 2 - Math.random() * 100;

  drawSky(x, y);
  drawStars();
  drawMoon(x, y, RADIUS);

  stroke(...BASE_COLOR.map((component) => component * 0.2 * DEPTH_COLOR_GAP));
  for (let d = 0; d < NUM_DEPTHS; d++) {
    drawBuildings(d);
  }
}

function drawBuildings(depth) {
  let x = 0;
  while (x < window.innerWidth) {
    const buildingWidth = 40 + Math.random() * 70;
    const buildingHeight =
      0 +
      Math.random() *
        (window.innerHeight * 0.6 - depth * DEPTH_GAP) *
        calculateHeightWeight(x);
    const CURRENT_COLOR = BASE_COLOR.map(
      (component) => component * 0.2 + depth * DEPTH_COLOR_GAP
    );
    fill(...CURRENT_COLOR);

    // noStroke();

    strokeWeight(OUTLINE_WEIGHT);

    rect(x, window.innerHeight - buildingHeight, buildingWidth, buildingHeight);

    drawWindows(
      x,
      window.innerHeight,
      buildingWidth,
      window.innerHeight - buildingHeight,
      depth
    );
    stroke(...CURRENT_COLOR);

    drawBuildingDetail(x, depth, buildingWidth, buildingHeight);

    const gap = buildingWidth / 2;
    x += gap;
  }
}

function drawSky(moonX, moonY) {
  const radius = window.innerWidth * 2.25;
  colorMode(RGB);
  const DARKENED_MOON_COLOR = MOON_COLOR.map((component) => component - 150);
  let newColor = lerpColor(
    color(...BASE_COLOR),
    color(...DARKENED_MOON_COLOR),
    1
  );

  for (let r = radius; r > 0; r--) {
    // console.log(r);
    // console.log(newColor._array)
    strokeWeight(5);
    stroke(newColor);
    circle(moonX, moonY, r);
    newColor = lerpColor(
      color(...BASE_COLOR),
      color(...DARKENED_MOON_COLOR),
      1 - map(r, 0, radius, 0, 1)
    );
  }
  colorMode(RGB);
}

function drawStars() {
  const COUNT = 150;

  fill(255);
  noStroke();
  for (let i = 0; i < COUNT; i++) {
    circle(
      Math.random() * window.innerWidth,
      Math.random() * window.innerHeight,
      Math.floor(1 + Math.random() * 2)
    );
  }
}

/**
 * Determines the effect of the x-coordinate on the height of the building
 * @param x the x-coordinate
 */
function calculateHeightWeight(x) {
  const difference = Math.abs(window.innerWidth / 2 - x);
  const SCALE = 1.5;
  return SCALE * (1 - difference / window.innerWidth); // represent the difference as a percentage of the screen width
}

function drawWindows(x, startY, maxWidth, height, depth) {
  const GAP = 10 + Math.random() * 10;
  const WINDOW_HEIGHT = 1.5;
  const X_PADDING = 2 + Math.random() + 5;
  const COLOR_GAP = 15;
  const COLOR = [
    225 + depth * COLOR_GAP,
    225 + depth * COLOR_GAP,
    175  + depth * COLOR_GAP,
  ];

  let y = startY + GAP;
  stroke(...COLOR);
  strokeWeight(WINDOW_HEIGHT);
  while (y > height + GAP) {
    const leftOffset = (Math.random() * maxWidth) / 4;
    const rightOffset = (Math.random() * maxWidth) / 4;

    const exist = Math.random() < 0.66;
    if (exist) {
      line(
        x + X_PADDING + leftOffset,
        y,
        x + maxWidth - rightOffset - X_PADDING,
        y
      );
    }

    y -= GAP;
  }

  strokeCap(ROUND);
}

function drawBuildingDetail(x, depth, buildingWidth, buildingHeight) {
  stroke(0);
  strokeWeight(OUTLINE_WEIGHT);
  /*
  1. Antennas (thin, high) <1
  2. Centered triangle top <2
  3. Slightly thinner part <3
  4. Right triangle top <4
  5. no detail <10
  */

  const choice = Math.floor(Math.random() * 10);

  if (choice < 1) {
    // antenna
    const THRESHOLD = window.innerHeight * 0.6 - depth * DEPTH_GAP;
    if (buildingHeight > THRESHOLD) {
      const height = 50 + Math.random() * 50;

      const width = 5;
      // rect(x + (buildingWidth / 2 - width / 2), window.innerHeight - buildingHeight - height, width, height);
      triangle(
        x + (buildingWidth / 2 - width / 2),
        window.innerHeight - buildingHeight,
        x + buildingWidth / 2,
        window.innerHeight - buildingHeight - height,
        x + buildingWidth / 2 + width / 2,
        window.innerHeight - buildingHeight
      );
    }
  } else if (choice < 2) {
    // wider triangle centered

    const height = 20 + Math.random() * 40;

    triangle(
      x,
      window.innerHeight - buildingHeight,
      x + buildingWidth / 2,
      window.innerHeight - buildingHeight - height,
      x + buildingWidth,
      window.innerHeight - buildingHeight
    );
  } else if (choice < 3) {
    // slightly thinner top
    const widthScale = 0.5 + Math.random() * 0.3;

    const height = 10 + Math.random() * 50;
    const pieceWidth = buildingWidth * widthScale;
    rect(
      x + buildingWidth / 2 - pieceWidth / 2,
      window.innerHeight - buildingHeight - height,
      pieceWidth,
      height
    );
  } else if (choice < 4) {
    const right = Math.random() < 0.5;

    const height = 20 + Math.random() * 50;

    if (right) {
      triangle(
        x,
        window.innerHeight - buildingHeight,
        x + buildingWidth,
        window.innerHeight - buildingHeight - height,
        x + buildingWidth,
        window.innerHeight - buildingHeight
      );
    } else {
      triangle(
        x,
        window.innerHeight - buildingHeight - height,
        x,
        window.innerHeight - buildingHeight,
        x + buildingWidth,
        window.innerHeight - buildingHeight
      );
    }
  }

  // 4-10 nothing happens
}

function drawMoon(x, y, radius) {
  fill(MOON_COLOR);
  noStroke();
  circle(x, y, radius * 2);
  return [x, y];
}

function hexToRGB(hex) {
  return [
    parseInt(hex[1] + hex[2], 16),
    parseInt(hex[3] + hex[4], 16),
    parseInt(hex[5] + hex[6], 16),
  ];
}

function randomBaseColor() {
  const options = [
    "#1C2954",
    "#0B1341",
    "#352657",
    "#311254",
    "#030116",
    "#292D71",
    "#060C23",
    "#272B4F",
    "#010820",
    "#3B0762",
    "#3D1C51",
  ];

  return options[Math.floor(Math.random() * options.length)];
}
