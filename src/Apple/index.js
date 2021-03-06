import Block from '../Block/index';
import { widthInBlocks, heightInBlocks} from '../js/index';

// The Apple constructor
export default class Apple {
  constructor() {
    this.position = new Block(10, 10);
  }
};

// Draw a circle at the apple's location
Apple.prototype.draw = function () {
  this.position.drawCircle("LimeGreen");
};

// Move the apple to a new random location
Apple.prototype.move = function (occupBlocks) {
  let randomCol = Math.floor(Math.random() * (widthInBlocks - 2)) + 1;
  let randomRow = Math.floor(Math.random() * (heightInBlocks - 2)) + 1;
  this.position = new Block(randomCol, randomRow);

  for (let i = 0; i < occupBlocks.length; i++) {
    if (this.position.equal(occupBlocks[i])) {
      this.move(occupBlocks); 
      return;
    }
  }
};

export const apple = new Apple();