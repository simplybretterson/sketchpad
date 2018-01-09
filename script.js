let sketchpadWidth = 512;
let squaresPerSide = 32;
let squareBrightness = [];
const hSketchpadArea = document.querySelector('#sketchpad-area');
const hReset = document.querySelector('#header p');

let isMouseDown = false;

function generatePad() {
  hSketchpadArea.setAttribute("style",
      `grid-template-rows: repeat(${squaresPerSide}, 1fr)`);
  hSketchpadArea.setAttribute("style",
      `grid-template-columns: repeat(${squaresPerSide}, 1fr)`);
  let squareSize = sketchpadWidth / squaresPerSide;

  squareBrightness = [];

  for (x = 0; x < squaresPerSide; x++)
  {
    for (y = 0; y < squaresPerSide; y++)
    {
      squareBrightness.push(50);

      let newDiv = document.createElement('div');
      newDiv.style.width = squareSize;
      newDiv.style.height = squareSize;
      newDiv.classList.add('empty');
      hSketchpadArea.appendChild(newDiv);
    }
  }
}

function clearPad() {
  while(hSketchpadArea.firstChild) {
    hSketchpadArea.removeChild(hSketchpadArea.firstChild);
  }
}

function findSquareIndex(target) {
  let i = 0;
  while ((target = target.previousSibling) != null)
  {
    i++;
  }

  return i;
}

function fillSquare(e) {
  if (e.target !== e.currentTarget && (isMouseDown == true || e.type == 'mousedown')) {

    if (document.querySelector('#wacky').checked == false) {
      e.target.classList.add('filled');
      e.target.classList.remove('empty');
    }
    else {
      let squareIndex = findSquareIndex(e.target);
      let b = squareBrightness[squareIndex]
      e.target.setAttribute("style",`background-color:
          hsl(${Math.random()*360}, ${Math.random()*100}%, ${b}%)`);
      e.target.classList.remove('empty');
      e.target.classList.remove('filled');

      if (squareBrightness[squareIndex] >= 5)
        squareBrightness[squareIndex] -= 5;
    }

    isMouseDown = true;
  }

  e.stopPropagation();
}

document.addEventListener("mouseup", () => {
  isMouseDown = false;
});

hSketchpadArea.addEventListener("mouseover", fillSquare, false);
/*the mousedown listener is needed to make the box that the user starts their
click on actually fill*/
hSketchpadArea.addEventListener("mousedown", fillSquare, false);

hReset.addEventListener("click", () => {
  let response = 'nothing';

  while (isNaN(response)) {
    response = prompt('Choose how many squares per side: ', 32);

    if (response === null) {
      return;
    }

    response = parseInt(response, 10);
  }

  squaresPerSide = response;

  clearPad();
  generatePad();
});

generatePad();
