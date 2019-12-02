export class HeroShip {
    constructor() {
        //  Creation of the HeroShip<rect> element
        this.heroShip = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        
        //  Attributes for the HeroShip<rect>.
        this.heroShip.setAttribute("x", "475");
        this.heroShip.setAttribute("y", "650");
        this.heroShip.setAttribute("width", "50");
        this.heroShip.setAttribute("height", "20");
        this.heroShip.setAttribute("fill", "green");
        
        //  Some helpful variables
        this.speed = 7;
        this.positionX = parseInt(this.heroShip.getAttribute("x"));
        this.positionY = parseInt(this.heroShip.getAttribute("y"));
        this.heroShipWidth = parseInt(this.heroShip.getAttribute("width")); 
        
        //  Variable for measuring the SVG maximum width. Minimum width is 0. Also in Invader.
        this.SVGWidth = parseInt(document.getElementById('gameScreen').getAttribute("width"));
        
        //  Variable to know where the Bullet<line> will start.
        this.centerOfHeroShip = this.positionX + (this.heroShipWidth / 2);
        
        //  Adding HeroShip<rect> to the SVG
        document.getElementById('gameScreen').appendChild(this.heroShip);
    }

    //  1. Variable "positionX" will be changed if the result of the HeroShip current 
    //  position (X Axis) minus the base speed is greater or equal than 0 (SVG left limit).
    //  2. Variable "centerOfHeroShip" will be changed if (1. == true).
    moveLeft() {
        if((this.positionX - this.speed) >= 0) {
            this.positionX -= this.speed;
            this.centerOfHeroShip = this.positionX + (this.heroShipWidth / 2);
        }
    }
    
    //  1. Variable "positionX" will be changed if the result of the HeroShip current 
    //  position (X Axis) plus the base speed plus the HeroShip width is lesser or equal 
    //  than the SVG right limit (1000 by default).
    //  2. Variable "centerOfHeroShip" will be changed if (1. == true).
    moveRight() {
        if((this.positionX + this.speed + this.heroShipWidth) <= this.SVGWidth) {
            this.positionX += this.speed; 
            this.centerOfHeroShip = this.positionX + (this.heroShipWidth / 2);
        }
    }

    //  Set the attribute x (where the HeroShip<rect> starts).
    draw() {
        this.heroShip.setAttribute("x", this.positionX);
    }
}

//  NOTE: THE HEROSHIP CAN ONLY MOVE LEFT TO RIGHT AND VICEVERSA. AXIS_Y NOT (YET) IMPLEMENTED.