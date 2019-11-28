export class Bullet{
    constructor(startX, startY, endX, endY) {
        this.bullet = document.createElementNS("http://www.w3.org/2000/svg", "line");
        this.startX = startX;
        this.startY = startY;
        this.endX =  endX;
        this.endY = endY;
        this.speed = 5;
        
        //the start is first when shot by the invaders (example startY=0, endY=5)
        //the end is first when shot by the heroShip (example startY=900, endY=895)
        this.bullet.setAttribute("x1", this.startX);
        this.bullet.setAttribute("y1", this.startY);
        this.bullet.setAttribute("x2", this.endX);
        this.bullet.setAttribute("y2", this.endY); 
        this.bullet.setAttribute("style", "stroke:rgb(0,100,0);stroke-width:3");
        this.SVGHeight = parseInt(document.getElementById('gameScreen').getAttribute("height"));
        document.getElementById('gameScreen').appendChild(this.bullet);
    }
    
    //when the heroShip shoots.
    moveUp() {
        if((this.endY - this.speed) >= 0) {
            this.endY -= this.speed;
            this.startY -= this.speed;
        }
    }
    
    //when the invaders shoot.
    moveDown() {
        if((this.endY + this.speed) <= this.SVGHeight) {
            this.endY += this.speed;
            this.startY += this.speed;
        }
    }
    
    draw() {
        this.bullet.setAttribute("y1", this.startY);
        this.bullet.setAttribute("y2", this.endY);
    }
}