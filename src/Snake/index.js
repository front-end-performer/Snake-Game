import Block from '../Block/index';
import * as func from '../js/index';
import * as obj from '../Apple/index';

// The Snake constructor
export default class Snake {
    constructor() {
        this.segments = [
            new Block(7, 5),
            new Block(6, 5),
            new Block(5, 5)
        ];

        // Set score to 0
        this.score = 0;

        this.direction = "right";
        this.nextDirection = "right";
    };
}

// Draw a square for each segment of the snake's body
Snake.prototype.draw = function () {
    for (let i = 0; i < this.segments.length; i++) {
        this.segments[i].drawSquare("#17a2b8");
    
        // add colors to eah segment
        // let isEvenSegment = false;

        // for (let i = 1; i < this.segments.length; i++) {
        //     if (isEvenSegment) {
        //         this.segments[i].drawSquare("Blue");
        //     } else {
        //         this.segments[i].drawSquare("Yellow");
        //     }

        //     isEvenSegment = !isEvenSegment; // следующий сегмент будет нечетным
        // }
    }
};

// Create a new head and to move the snake in its current direction
Snake.prototype.move = function () {
    const head = this.segments[0];
    let newHead;


    this.direction = this.nextDirection;

    if (this.direction === "right") {
        newHead = new Block(head.col + 1, head.row);
    } else if (this.direction === "down") {
        newHead = new Block(head.col, head.row + 1);
    } else if (this.direction === "left") {
        newHead = new Block(head.col - 1, head.row);
    } else if (this.direction === "up") {
        newHead = new Block(head.col, head.row - 1);
    }

    if (this.checkCollision(newHead)) {
        func.gameOver();
        return;
    }

    this.segments.unshift(newHead);

    if (newHead.equal(obj.apple.position)) {
        this.score++;
        obj.apple.move();
    } else {
        this.segments.pop();
    }
};

// Check if the snake's new head has collided with the wall or itself
Snake.prototype.checkCollision = function (head) {
    const leftCollision = (head.col === 0);
    const topCollision = (head.row === 0);
    const rightCollision = (head.col === func.widthInBlocks - 1);
    const bottomCollision = (head.row === func.heightInBlocks - 1);

    const wallCollision = leftCollision || topCollision || rightCollision || bottomCollision;

    let selfCollision = false;

    for (let i = 0; i < this.segments.length; i++) {
        if (head.equal(this.segments[i])) {
            selfCollision = true;
        }
    }

    return wallCollision || selfCollision;
};

// Set the snake's next direction based on the keyboard
Snake.prototype.setDirection = function (newDirection) {
    if (this.direction === "up" && newDirection === "down") {
        return;
    } else if (this.direction === "right" && newDirection === "left") {
        return;
    } else if (this.direction === "down" && newDirection === "up") {
        return;
    } else if (this.direction === "left" && newDirection === "right") {
        return;
    }

    this.nextDirection = newDirection;
};

export const snake = new Snake();
