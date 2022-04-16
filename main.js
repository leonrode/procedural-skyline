

const NUM_DEPTHS = 4;
const DEPTH_GAP = (window.innerHeight * 0.6 / NUM_DEPTHS);
const DEPTH_COLOR_GAP = 10;
const BASE_COLOR = hexToRGB(randomBaseColor())
function setup() {

  const canvas = createCanvas(window.innerWidth, window.innerHeight);

  // choose base color for picture
  background(...BASE_COLOR);
  for (let d = 0; d < NUM_DEPTHS; d++) {
    drawBuildings(d);
  }

}

function drawBuildings(depth) {

  let x = 0;
  while (x < window.innerWidth) {
    const buildingWidth = 40 + Math.random() * 70;
    const buildingHeight = 0 + Math.random() * (window.innerHeight * 0.6 - (depth * DEPTH_GAP)) * calculateHeightWeight(x);

    fill(...BASE_COLOR.map(component => component * 0.2 + depth * DEPTH_COLOR_GAP ));
    noStroke();
    rect(x, window.innerHeight - buildingHeight, buildingWidth, buildingHeight);
    drawBuildingDetail(x, depth, buildingWidth, buildingHeight)

    const gap = buildingWidth / 3;
    x += gap;

  }
}


/**
 * Determines the effect of the x-coordinate on the height of the building
 * @param x the x-coordinate
 */
function calculateHeightWeight(x) {

  const difference = Math.abs(window.innerWidth / 2 - x);
  const SCALE = 1.5;
  return SCALE * (1 - (difference / window.innerWidth)); // represent the difference as a percentage of the screen width
}


function drawBuildingDetail(x, depth, buildingWidth, buildingHeight) {

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
    const THRESHOLD = window.innerHeight * 0.6 - (depth * DEPTH_GAP);
    if (buildingHeight > THRESHOLD) {

      const height = 50 + Math.random() * 50;

      const width = 5;
      // rect(x + (buildingWidth / 2 - width / 2), window.innerHeight - buildingHeight - height, width, height);
      triangle(x + (buildingWidth / 2 - width / 2), window.innerHeight - buildingHeight, x + (buildingWidth / 2), window.innerHeight - buildingHeight - height, (x + buildingWidth / 2 + width / 2), window.innerHeight - buildingHeight)
    }
  } else if (choice < 2) {
    // wider triangle centered

    const height = 20 + Math.random() * 40;

    triangle(x, window.innerHeight - buildingHeight, x + buildingWidth / 2, window.innerHeight - buildingHeight - height, x + buildingWidth, window.innerHeight - buildingHeight);
  } else if (choice < 3) {
    // slightly thinner top
    const widthScale = 0.7 + Math.random() * 0.3;

    const height = 50 + Math.random() * 50;
    const pieceWidth = buildingWidth * widthScale;
    rect(x + buildingWidth / 2 - pieceWidth / 2, window.innerHeight - buildingHeight - height, pieceWidth, height);
  } else if (choice < 4) {

    const right = Math.random() < 0.5;

    const height = 20 + Math.random() * 50;

    if (right) {
      triangle(x, window.innerHeight - buildingHeight, x + buildingWidth, window.innerHeight - buildingHeight - height, x + buildingWidth, window.innerHeight - buildingHeight);
    } else {
      triangle(x, window.innerHeight - buildingHeight - height, x, window.innerHeight - buildingHeight, x + buildingWidth, window.innerHeight - buildingHeight);
    }
  }

  // 4-10 nothing happens


}









function hexToRGB(hex)  {

  return [parseInt(hex[1] + hex[2], 16),parseInt(hex[3] + hex[4], 16),parseInt(hex[5] + hex[6], 16)]

}


function randomBaseColor() {

  const options = [
    "#280F36",
    "#672C70",
    "#C86B98",
    "#F09F9C",
    "#08183A",
    "#152852",
    "#4B3D60",
    "#FD5E53",
    "#23233B",
    "#202124",
  ]

  return options[Math.floor(Math.random() * options.length)]

}


