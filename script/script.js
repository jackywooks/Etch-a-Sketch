//declare variable for division
const controlDiv = document.querySelector(".control");
//declare variable for the button
const sizeButton = document.querySelector("#size");
const resetButton = document.querySelector("#reset");
//set up the container div
const containerDiv = document.createElement("div");
containerDiv.setAttribute("class", "container");
const conatinerWidth = 960;
controlDiv.parentNode.insertBefore( containerDiv, controlDiv.nextSibling );
//initial box row no
let currentBoxRowNo = 10;
//initial color
let whiteColor = "rgb(255, 255, 255)";

//set up divs inside the container
function generateGrid(boxRowNo) {
  containerDiv.innerHTML = ""; //reset the content of container div when generate new grid
  let TotalBox = boxRowNo * boxRowNo;
  let boxWidth = conatinerWidth / boxRowNo;
  for (i = 0; i < TotalBox; i++) {
    const boxDiv = document.createElement("div");
    boxDiv.setAttribute("class", "box");
    boxDiv.style.flex = `1 0 ${boxWidth}px`;
    containerDiv.appendChild(boxDiv);
  }
  const boxDivs = document.querySelectorAll(".box");
  addHover(boxDivs);
}

generateGrid(currentBoxRowNo);

// allow user to input the grid size and capture it for the sketch board generator
sizeButton.addEventListener("click", () => {
  let boxRowNo = prompt("Please enter your desired grid size");
  if (boxRowNo === null) {
    reset();
  } else if (
    !isNaN(boxRowNo) &&
    Number.isInteger(parseFloat(boxRowNo)) &&
    boxRowNo <= 100
  ) {
    generateGrid(boxRowNo);
    currentBoxRowNo = boxRowNo;
  } else {
    alert("Invalid Input! Please input an integer less than or equal to 100!");
  }
});

resetButton.addEventListener("click", () => reset());

//add hover effect to the box Div
function addHover(boxDivs) {
  boxDivs.forEach((boxDiv) => {
    boxDiv.addEventListener("mouseenter", () => {
      const bgcolor = getComputedColor(boxDiv, "background-color");
      if (bgcolor == whiteColor) {
        boxDiv.style.backgroundColor = getRandomColor();
      } else {
        boxDiv.style.backgroundColor = getReducedColor(bgcolor);
      }
    });
  });
}

function reset() {
  generateGrid(currentBoxRowNo);
}

function getComputedColor(element, propertyName) {
  return window.getComputedStyle(element).getPropertyValue(propertyName);
}

function getRandomColor() {
  let red = Math.floor(Math.random() * 255);
  let green = Math.floor(Math.random() * 255);
  let blue = Math.floor(Math.random() * 255);
  return `rgb(${red},${green},${blue})`;
}

function getReducedColor(color) {
  const regex = /(\d+), (\d+), (\d+)/g;
  const matches = regex.exec(color);
  let red = matches[1]*0.8;
  let green = matches[2]*0.8;
  let blue = matches[3]*0.8;
  return `rgb(${red},${green},${blue})`;
}

// boxDivs.forEach(boxDiv => {
//     boxDiv.addEventListener("mouseleave", () => {
//         boxDiv.style.backgroundColor = "white";
//       });
// });
