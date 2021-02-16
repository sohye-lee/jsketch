
// Initial Setup
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

// Variables
var mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
};

var colors = [
    colorGenerator(),
    colorGenerator(),
    colorGenerator(),
    colorGenerator(),
    colorGenerator(),
    colorGenerator(),
    colorGenerator(),
    colorGenerator(),
    colorGenerator(),
    colorGenerator()
];

var gravity = 1;
var friction = 0.99;

//Event Listeners
addEventListener("mousemove", function(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

addEventListener("resize", function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
});

addEventListener('click', function() {
    init();
})

//Utility Functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function colorGenerator() {
    var red = String(Math.floor(Math.random() * 200)+50);
    var yellow = String(Math.floor(Math.random() * 200)+50);
    var blue = String(Math.floor(Math.random() * 200)+50);
    console.log(red)
    return 'rgb('+red+','+yellow+','+blue+')';

}

//Objects
class Ball {
    constructor(x, y, dx, dy, radius, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = color;
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 
            Math.PI*2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    };

    update() {
        if (this.y + this.radius + this.dy > canvas.height) {
            this.dy = -this.dy * friction;
        } else {
            this.dy += gravity;
        }

        if (this.x + this.radius + this.dx > canvas.width
            || this.x - this.radius <= 0) {
            this.dx = -this.dx
        } 
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    };

}

//Implementation
var ball;
var balls = [];
function init() {
    balls = [];
    for (var i = 0; i < 1000; i++) {
        var x = randomIntFromRange(radius, canvas.width - radius);
        var y = randomIntFromRange(0, canvas.height - radius);
        var dx = randomIntFromRange(-2,2);
        var dy = randomIntFromRange(-2,2)
        var radius = randomIntFromRange(5, 50);
        var color = randomColor(colors);
        balls.push(new Ball(x, y, dx, dy, radius, color));
    }

}


//Animation Loop
function animate() {
    requestAnimationFrame(animate);

    
    ctx.clearRect(0,0, canvas.width, canvas.height);
    for (var i = 0; i<balls.length; i++) {
        balls[i].update();
    }
 
}

init();
animate();
console.log(colors);