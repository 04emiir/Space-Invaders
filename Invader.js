import { Bullet } from './Bullet.js';

export class Invader {
    constructor(positionX, positionY, height=30, width=60) {
        //  Creation of the Invader<rect> and some variables
        this.invader = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        this.positionX = positionX;
        this.positionY = positionY;
        this.height = height;
        this.width = width;
        this.speed = 0.5;
        
        //  Attributes for Invader<invader>
        this.invader.setAttribute("x", positionX);
        this.invader.setAttribute("y", positionY);
        this.invader.setAttribute("fill", "yellow");
        this.invader.setAttribute("width", width);
        this.invader.setAttribute("height", height);
        
        //  Helpful variable
        this.invaderWidth = parseInt(this.invader.getAttribute("width")); 
        
        //center of invader
        this.centerOfInvader = this.positionX+(this.invaderWidth/2);

        //  true means a positive X movement. false means a negative X movement.
        this.invaderDirection = true;
        
        //  Variable for measuring the SVG maximum width. Minimum width is 0. Also in HeroShip.
        this.SVGWidth = parseInt(document.getElementById('gameScreen').getAttribute("width"));
        
        //  Adding Invader<rect> to the SVG
        document.getElementById('gameScreen').appendChild(this.invader);
    }

    /* TO BE ADDED (AFTER INVADER MOVEMENT)
    
    shot() {
        var bullet = new Bullet(this.positionX, this.positionY, this.positionX, this.positionY + 700);
    }
    */
    
    //  1. Variable "positionX" will be changed if the result of the Invader current 
    //  position (X Axis) minus the base speed is greater or equal than 0 (SVG left limit).
    //  2. If(!1.), a.k.a "upon touching the SVG right limit" "invaderDirection" will change
    moveLeft() {
        if((this.positionX - this.speed) >= 0) {
            this.positionX -= this.speed;
            this.centerOfInvader=this.centerOfInvader = this.positionX+(this.invaderWidth/2);
        }
        else {
           this.invaderDirection = true; 
        }
    }

    moveDown(){
        this.positionY =+1;
    }

    //  1. Variable "positionX" will be changed if the result of the Invader current 
    //  position (X Axis) plus the base speed plus the Invader width is lesser or equal 
    //  than the SVG right limit (1000 by default).
    //  2. If(!1.), a.k.a "upon touching the SVG right limit" "invaderDirection" will change
    moveRight() {
        if((this.positionX + this.speed + this.invaderWidth) <= this.SVGWidth) {
            this.positionX += this.speed; 
            this.centerOfInvader=this.centerOfInvader = this.positionX+(this.invaderWidth/2);
        } else {
            this.invaderDirection = false;  
        }
    }
    
    //  Group both left and right movement in one method, to determine the direction of 
    //  the Invader, thanks to "invaderDirection".
    wholeMovement() {
        if (this.invaderDirection) {
            this.moveRight();
        } else {
            this.moveLeft();
        }
        
    }

        
    //  Set the attribute x (where the Inavder<rect> starts).
    draw() {
        this.invader.setAttribute("x", this.positionX);
        this.invader.setAttribute("y", this.positionY);
    }

    destroy() {
        if(this.invader.parentElement.id=="gameScreen")
            document.getElementById('gameScreen').removeChild(this.invader);
    }

}
