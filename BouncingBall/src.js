class DrawCanvas {
  constructor() {
    this.createCanvas();
    this.radius = 10;
    this.x = parseInt(this.width / 2);
    this.y = parseInt(this.height / 2);
    this.vX = Math.random() * 10 - 5;
    this.vY = Math.random() * 10 - 5;
    this.animate();
  }

  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    document.body.appendChild(this.canvas);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawBall();
  }

  animate = () => {
    this.x += this.vX;
    this.y += this.vY;
    if (this.x > this.width - this.radius || this.x < this.radius) {
      this.vX = -this.vX;
    } else if (this.y > this.height - this.radius || this.y < this.radius) {
      this.vY = -this.vY;
    }
    this.draw();
    setTimeout(this.animate, 13);
  }

  drawBall() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = '#420909';
    this.ctx.fill();
    this.ctx.closePath();
  }
}
let obj = new DrawCanvas();
