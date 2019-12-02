export class Bullet{
    constructor(axisX, startY, endY) {
        //  Creation of the Bullet<line> and some variables.
        this.bullet = document.createElementNS("http://www.w3.org/2000/svg", "line");
        this.axisX =  axisX;
        this.startY = startY;
        this.endY = endY;
        this.speed = 2;
        
        //  Attributes for Bullet<line>.
        this.bullet.setAttribute("x1", this.axisX);
        this.bullet.setAttribute("y1", this.startY);
        this.bullet.setAttribute("x2", this.axisX);
        this.bullet.setAttribute("y2", this.endY); 
        this.bullet.setAttribute("style", "stroke:rgb(0,100,0);stroke-width:4");
        
        //  Variable for measuring the SVG maximum height. Minimum height is 0.
        this.SVGHeight = parseInt(document.getElementById('gameScreen').getAttribute("height"));
        
        //  Adding Bullet<line> to the SVG.
        document.getElementById('gameScreen').appendChild(this.bullet);
    }
    
    //  When the HeroShip shoots, the Bullet will move up if it is not completely outside
    //  of the SVG. HeroShip bullets can not move down.
    moveUp() {
        if((this.startY - this.speed) >= 0) {
            //  Both Y are edited so the line remains the same length.
            this.endY -= this.speed;
            this.startY -= this.speed;
        }        
    }
    
    //  When the Invader shoots, the Bullet will move down if it is not completely outside
    //  of the SVG. Invader bullets can not move up.
    moveDown() {
        if((this.startY + this.speed) <= this.SVGHeight) {
            //  Both Y are edited so the line remains the same length.
            this.endY += this.speed;
            this.startY += this.speed;
        }
    }
    
    //  Set the attributes y1(where the Bullet<line> start) and y2 (where the Bullet<line> end).
    //  (y1>y2) when shot by HeroShip & (y2>y1) when shot by Invader.
    draw() {
        this.bullet.setAttribute("y1", this.startY);
        this.bullet.setAttribute("y2", this.endY);
    }
    
    //  When certain conditions are met, the Bullet<line> will be removed from the SVG.
    //  Conditions: collision with HeroShip, Invader or SVG limits.
    disappear() {
        document.getElementById('gameScreen').removeChild(this.bullet);
    }
}