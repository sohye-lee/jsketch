import { Point } from './point.js';

class Wave {
    constructor(index, totalPoints, color) {
        this.index = index;
        this.totalPoints = totalPoints;
        this.color = color;
        this.points = [];
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.centerX = stageWidth / 2;
        this.centerY = stageHeight / 2;

        this.pointGap = this.stageWidth / (this.totalPoints - 1);

        this.init();
    }

    init() {
        this.points = [];

        for (let i = 0; i < this.totalPoints; i++) {
            const point = new Point(
                this.index + i,
                this.pointGap * i,
                this.centerY,
            );
            this.points[i] = point;
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        
       let prevX = this.points[0].x;
       let prevY = this.points[0].y;

       ctx.moveTo(prevX, prevY);

       for (let i = 1; i < this.totalPoints; i++) {
           if (i < this.totalPoints - 1) {
               this.points[i].update();
           }

           const cx = (prevX + this.points[i].x) / 2;
           const cy = (prevY + this.points[i].y) / 2;

           ctx.quadraticCurveTo(prevX, prevY, cx, cy);

           prevX = this.points[i].x;
           prevY = this.points[i].y;
       }

       ctx.lineTo(prevX, prevY);
       ctx.lineTo(this.stageWidth, this.stageHeight);
       ctx.lineTo(this.points[0].x, this.stageHeight);
       ctx.fill();
       ctx.closePath()
    }
}

function generateColor() {
    const r = Math.round(Math.random() * 70);
    const g = Math.round(Math.random() * 70);
    const b = Math.round(Math.random() * 255);
    const opacity = (Math.random() * (0.8-0.2) + 0.2).toFixed(1);

    return `rgba(${r},${g},${b},${opacity})`;
}

export class WaveGroup {
    constructor() {
        this.totalWaves = 3;
        this.totalPoints = 6;
        const color1 = generateColor();
        const color2 = generateColor();
        const color3 = generateColor();
        this.color = [color1, color2, color3];
        this.waves = [];

        for (let i = 0; i < this.totalWaves; i++) {
            const wave = new Wave(
                i,
                this.totalPoints,
                this.color[i]
            );
            this.waves[i] = wave;
        }
    }

    resize(stageWidth, stageHeight) {
        for (let i = 0; i < this.totalWaves; i++) {
            const wave = this.waves[i];
            wave.resize(stageWidth, stageHeight);
        }
    }

    draw(ctx) {
        for (let i = 0; i < this.totalWaves; i++) {
            const wave = this.waves[i];
            wave.draw(ctx);
        }
    }
}