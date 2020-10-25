class CreateCircle {
  constructor(x, y, radius, ctx, color) {
    this.x = x;
    this.y = y;
    this.originalX = x;
    this.originalY = y;
    this.radius = radius;
    this.circleCtx = ctx;
    this.color = color;
    this.isDragging = false;
    this.isDragComplete = false;
  }

  drawCircle() {
    this.circleCtx.beginPath();
    this.circleCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.circleCtx.fillStyle = this.color;
    this.circleCtx.fill();
    this.circleCtx.closePath();
  }
}

class CreateRect {
  constructor(x, y, width, height, ctx, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.rectCtx = ctx;
    this.color = color;
    this.isDropped = false;
  }

  drawRect() {
    this.rectCtx.beginPath();
    this.rectCtx.rect(this.x, this.y, this.width, this.height);
    this.rectCtx.fillStyle = this.color;
    this.rectCtx.strokeStyle = this.color;
    // this.rectCtx.fill();
    this.rectCtx.stroke();
    this.rectCtx.closePath();
  }
}


class BaseCanvas {
  constructor() {
    this.createCanvas();
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height / 4;
    this.dragShapes = [];
    this.dropTarget = [];
    this.count = 0;
    this.canvas.onmousedown = this.dargStart;
    this.canvas.onmousemove = this.dargMove;
    this.canvas.onmouseup = this.dragStop;
    this.dargStart = this.dargStart.bind(this);
    this.dargMove = this.dargMove.bind(this);
    this.dragStop = this.dragStop.bind(this);
    this.createShapes();
    this.animate();
  }

  get color() {
    return ['#adad3b', '#39804c', '#803965'];
  }

  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    document.body.appendChild(this.canvas);
  }

  createShapes() {
    for (let i = 0; i < 3; i++) {
      this.dragShapes.push(new CreateCircle(this.x - 100, this.y, 50, this.ctx, this.color[i]));
      this.dropTarget.push(new CreateRect(this.x + 100, this.y - 50, 120, 120, this.ctx, this.color[i]));
      this.y += 150;
    }
  }

  drawShape() {
    this.dragShapes.forEach((shape) => {
      shape.drawCircle();
    });
    this.dropTarget.forEach((shape) => {
      shape.drawRect();
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawShape();
  }

  animate = () => {
    this.draw();
    requestAnimationFrame(this.animate, 13);
  }

  dargStart = (evt) => {
    this.dragShapes.forEach((shape) => {
      if (evt.clientX < shape.x + shape.radius && evt.clientX > shape.x - shape.radius && evt.clientY < shape.y + shape.radius &&
        evt.clientY > shape.y - shape.radius) {
        shape.isDragging = true;
      }
    });
  }

  dargMove = (evt) => {
    this.dragShapes.forEach((shape) => {
      if (shape.isDragging) {
        shape.x = evt.pageX - this.canvas.offsetLeft;
        shape.y = evt.pageY - this.canvas.offsetTop;
      }
    });
  }

  dragStop = (evt) => {
    evt.preventDefault();
    this.dragShapes.forEach((shape) => {
      if (shape.isDragging) {
        if (shape.x < this.dropTarget[0].x + this.dropTarget[0].width && shape.x > this.dropTarget[0].x &&
          shape.y < this.dropTarget[0].y + this.dropTarget[0].height && shape.y > this.dropTarget[0].y && !this.dropTarget[0].isDragging) {
          shape.x = this.dropTarget[0].x + (this.dropTarget[0].width / 2);
          shape.y = this.dropTarget[0].y + (this.dropTarget[0].height / 2);
          this.count++;
          this.dropTarget[0].isDragging = !this.dropTarget[0].isDragging;
        } else if (shape.x < this.dropTarget[1].x + this.dropTarget[1].width && shape.x > this.dropTarget[1].x &&
          shape.y < this.dropTarget[1].y + this.dropTarget[1].height && shape.y > this.dropTarget[1].y && !this.dropTarget[1].isDragging) {
          shape.x = this.dropTarget[1].x + (this.dropTarget[1].width / 2);
          shape.y = this.dropTarget[1].y + (this.dropTarget[1].height / 2);
          this.count++;
          this.dropTarget[1].isDragging = true;
        } else if (shape.x < this.dropTarget[2].x + this.dropTarget[2].width && shape.x > this.dropTarget[2].x &&
          shape.y < this.dropTarget[2].y + this.dropTarget[2].height && shape.y > this.dropTarget[2].y && !this.dropTarget[2].isDragging) {
          shape.x = this.dropTarget[2].x + (this.dropTarget[2].width / 2);
          shape.y = this.dropTarget[2].y + (this.dropTarget[2].height / 2);
          this.count++;
          this.dropTarget[2].isDragging = true;
        }
        else {
          shape.x = shape.originalX;
          shape.y = shape.originalY;
        }
        shape.isDragging = false;
      }
    });
    if (this.count === this.dropTarget.length) {
      this.canvas.onmousedown = null;
    }
  }
}
const dragAndDrop = new BaseCanvas();
