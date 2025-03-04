const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const window_height = window.innerHeight;
const window_width = window.innerWidth;

canvas.height = window_height;
canvas.width = window_width;
canvas.style.background = "#B24DDE";

class Circle {
  constructor(x, y, radius, color, text, speed) {
    this.posX = x;
    this.posY = y;
    this.radius = radius;
    this.color = color;
    this.text = text;
    this.speed = speed;
    this.dx = (Math.random() > 0.5 ? 1 : -1) * 10 * this.speed;
    this.dy = (Math.random() > 0.5 ? 1 : -1) * 10 * this.speed;
  }

  draw(context) {
    context.beginPath();
    context.strokeStyle = this.color;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "20px Arial";
    context.fillText(this.text, this.posX, this.posY);
    context.lineWidth = 2;
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
    context.stroke();
    context.closePath();
  }

  update(context) {
    this.draw(context);

    if (this.posX + this.radius >= window_width || this.posX - this.radius <= 0) {
      this.dx = -this.dx;
      this.posX = Math.max(this.radius, Math.min(this.posX, window_width - this.radius));
    }

    if (this.posY + this.radius >= window_height || this.posY - this.radius <= 0) {
      this.dy = -this.dy;
      this.posY = Math.max(this.radius, Math.min(this.posY, window_height - this.radius));
    }

    this.posX += this.dx;
    this.posY += this.dy;
  }
}

let randomX = Math.random() * (window_width - 60) + 30;
let randomY = Math.random() * (window_height - 60) + 30;
let randomRadius = Math.floor(Math.random() * 50 + 20);

let miCirculo = new Circle(randomX, randomY, randomRadius, "black", "Tec1", 1);
let miCirculo2 = new Circle(randomX, randomY, randomRadius, "white", "Tec2", 1);

function updateCircle() {
  requestAnimationFrame(updateCircle);
  ctx.clearRect(0, 0, window_width, window_height);
  miCirculo.update(ctx);
  miCirculo2.update(ctx);
};

updateCircle();