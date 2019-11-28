import { Bullet } from './Bullet.js';

export class Invader {
    constructor(positionX, positionY, height=30, width=60) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.height = height;
        this.width = width;
        this.tag = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        this.tag.setAttribute("x", positionX);
        this.tag.setAttribute("y", positionY);
        this.tag.setAttribute("fill", "yellow");
        this.tag.setAttribute("width", width);
        this.tag.setAttribute("height", height);
        document.getElementsByTagName("svg")[0].appendChild(this.tag);
    }

    shot() {
        var bullet = new Bullet(this.positionX, this.positionY, this.positionX, this.positionY + 700);
    }

    moveLeft(speed) {
        this.positionX -= speed;
    }

    moveRight(speed) {
        this.positionX += speed;
    }

    goDown(speed) {
        this.positionY += speed;
    }

    draw() {
        this.tag.setAttribute("x", this.positionX);
        this.tag.setAttribute("y", this.positionY);
    }

    destroy() {
        this.tag.parentElement.removeChild(this.tag);
    }

}
