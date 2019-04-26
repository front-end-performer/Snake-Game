import '../styles/styles.less';
import Snake from '../Snake/index';
import Apple from '../Apple/index';



// Set up canvas
const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");

export const width = canvas.width;
export const height = canvas.height;

export const blockSize = 10;
export const widthInBlocks = width / blockSize;
export const heightInBlocks = height / blockSize;

// Draw the border
const drawBorder = function () {
    ctx.fillStyle = "#37474f";
    ctx.fillRect(0, 0, width, blockSize);
    ctx.fillRect(0, height - blockSize, width, blockSize);
    ctx.fillRect(0, 0, blockSize, height);
    ctx.fillRect(width - blockSize, 0, blockSize, height);
};


export const drawScore = function () {
    const scr = document.getElementById("score");
    scr.innerText= snake.score;
};

// Clear the interval and display Game Over
export const gameOver = function () {
    clearInterval(intervalId);
    ctx.font = "60px Courier";
    ctx.fillStyle = "Red";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Game Over", width / 2, height / 2);
};

// circle = apple 
export const circle = function (x, y, radius, fillCircle) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    if (fillCircle) {
        ctx.fill();
    } else {
        ctx.stroke();
    }
};


// Create the snake and apple objects
const snake = new Snake();
export const apple = new Apple();

// an animation function to setInterval
const intervalId = setInterval(function () {
    ctx.clearRect(0, 0, width, height);
    drawScore();
    snake.move();
    snake.draw();
    apple.draw();
    drawBorder();
}, 100);

// Convert keycodes to directions
const directions = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
};

window.addEventListener("keydown", (event) => {
    const newDirection = directions[event.keyCode];
    if (newDirection !== undefined) {
        snake.setDirection(newDirection);
    }
});












