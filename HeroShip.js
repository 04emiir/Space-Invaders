class HeroShip {
    constructor() {
        this.heroShip = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        this.speed = 5;
        this.actualPositionX = parseInt(this.heroShip.getAttribute("x"));
        this.heroShip.setAttribute("x", "475");
        this.heroShip.setAttribute("y", "650");
        this.heroShip.setAttribute("width", "50");
        this.heroShip.setAttribute("height", "20"); 
        this.heroShip.setAttribute("fill", "green");
        document.getElementById('screen').appendChild(this.heroShip);
    }
    
    moveLeft() {
        if((this.actualPositionX - this.speed) >= 0)
            this.actualPositionX -= this.speed;
    }
    
    moveRight() {
        if((this.actualPositionX + this.speed) <= 1000)
            this.actualPositionX += this.speed; 
    }
    
    shot() {
        
    }
    
    draw() {
        this.heroShip.setAttribute("x", this.actualPositionX);
    }
}