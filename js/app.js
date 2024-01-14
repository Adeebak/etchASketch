const container = document.querySelector('.container');
const promptButton = document.querySelector('.user-select');
const buttons = document.getElementById('buttons');
const clearButton = document.getElementById('clear-button');
const gridSizeDisplay = document.querySelector('.gridSizeDisplay');

let gridLinesVisible = true;
let isMouseDown = false;
let selectedColor = 'black';
let rainbowMode = false;


function createGridSquares(squaresPerSide, gridWidth) {
    gridSizeDisplay.textContent = ` Grid Size: ${squaresPerSide} x ${squaresPerSide}`;
    const numOfSquares = squaresPerSide * squaresPerSide;
    let widthOrHeight = 0;

    for (let i = 0; i < numOfSquares; i++) {
        const gridSquare = document.createElement("div");

        if (gridLinesVisible) {
            widthOrHeight = `${(parseInt(gridWidth) / squaresPerSide) - 2}px`;
            gridSquare.style.border = "1px solid whitesmoke";
        } else if (!gridLinesVisible) {
            widthOrHeight = `${(parseInt(gridWidth) / squaresPerSide)}px`;
            gridSquare.style.border = "none";
        }
        gridSquare.style.width = gridSquare.style.height = widthOrHeight;

        gridSquare.addEventListener('mousedown', () => {
            isMouseDown = true;
            setSquareBackgroundColor(gridSquare);
        });

        gridSquare.addEventListener('mouseover', (e) => {
            if (isMouseDown) {
                setSquareBackgroundColor(gridSquare);
            }
        });

        gridSquare.addEventListener('mouseup', () => {
            isMouseDown = false;
        });

        gridSquare.addEventListener("dragstart", (e) => {
            e.preventDefault();
        });

        container.appendChild(gridSquare);

    }
}

function getRandomRainbowColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function setSquareBackgroundColor(square) {
    if (isMouseDown) {
        let color;
        if (rainbowMode) {
            color = getRandomRainbowColor();
        } else if (selectedColor === 'white') {
            color = '';
        }
        else {
            color = selectedColor;
        }
        square.style.backgroundColor = color;
        updatePenColor(color);
    }
}

function updatePenColor(color) {
    const radio = document.querySelector(`input[name = 'pen'][data-color = '${color}']`);
    if (radio) {
        radio.checked = true;
        selectedColor = color;
    }
}

function setPenColor(color) {
    selectedColor = color;
}

function toggleRainbowMode(mode) {
    rainbowMode = mode;
}

function clearGrid() {

    const gridSquare = document.querySelectorAll('.container > div');
    gridSquare.forEach((square) => {
        square.style.backgroundColor = '';
    });
    selectedColor = 'white';
    updatePenColor(selectedColor);

    container.innerHTML = '';
    createGridSquares(16, '600px');
}

clearButton.addEventListener('click', clearGrid);

buttons.addEventListener('change', (event) => {
    if (event.target.type === 'radio' && event.target.checked) {
        if (event.target.value === 'rainbow') {
            toggleRainbowMode(true);
            setPenColor('rainbow');
        } else {
            setPenColor(event.target.dataset.color);
            toggleRainbowMode(false);
        }
    }
});

promptButton.addEventListener('click', () => {
    const userInput = prompt('Please enter the number of squares per side :');
    const squaresPerSide = parseInt(userInput);

    if (!isNaN(squaresPerSide) && squaresPerSide >= 1 && squaresPerSide <= 100) {
        container.innerHTML = '';
        createGridSquares(squaresPerSide, '600px');
    } else {
        alert('invalid input. Please enter a number between 1 and 100.');
    }
});

createGridSquares(16, '600px');