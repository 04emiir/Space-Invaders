import { Bullet } from "./Bullet.js";
import { HeroShip } from "./HeroShip.js";
import { Invader } from "./Invader.js";

class GameEngine {
    constructor() {
        this.heroShip = new HeroShip();
        this.arrayBullets = new Array();
        document.onkeydown= (e) => this.keyboardInput(e); 
    }
    
    keyboardInput(e) {
        document.getElementById("bgSound").play();
        var key = e.key;
        if(key == "a" || key == "A") {
            this.heroShip.moveLeft();
            this.heroShip.draw();
        } else if(key == "d" || key == "D") {
            this.heroShip.moveRight();
            this.heroShip.draw();
        } else if(key == " ") {
            document.getElementById("bullet").play();
            var bulletX = this.heroShip.centerOfHeroShip;
            var bulletStartY = (this.heroShip.positionY - 5);
            var bulletEndY = (this.heroShip.positionY - 20);
            var bullet = new Bullet(bulletX, bulletStartY, bulletX, bulletEndY);
            this.arrayBullets.push(bullet);
        }
    }
    
}



window.onload = () => {
    var gameScreen = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    gameScreen.setAttribute("width", "1000px");
    gameScreen.setAttribute("height", "700px");
    gameScreen.id = "gameScreen";
    document.body.appendChild(gameScreen);

    var gameBorder = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    gameBorder.setAttribute("x", "0");
    gameBorder.setAttribute("y", "0");
    gameBorder.setAttribute("width", "1000");
    gameBorder.setAttribute("height", "700");
    gameBorder.id = "gameBorder";
    gameBorder.style = "fill:black;stroke-width:5;stroke:rgb(0,100,0)"
    document.getElementById('gameScreen').appendChild(gameBorder);
    
    var bulletSound = document.createElement("AUDIO");
    bulletSound.src = "bullet.mp3"
    bulletSound.controls = false;
    bulletSound.id = "bullet";
    document.body.appendChild(bulletSound);
    
    var bgSound = document.createElement("AUDIO");
    bgSound.src = "howard.mp3"
    bgSound.controls = false;
    bgSound.id = "bgSound";
    bgSound.loop = true;
    document.body.appendChild(bgSound);
    
    var gameEngine = new GameEngine();
    
    setInterval(() => {
        for(var bulletShot of gameEngine.arrayBullets) {
            bulletShot.moveUp();
            bulletShot.draw();
            if (bulletShot.startY - bulletShot.speed <= 0) {
                gameEngine.arrayBullets.splice(0, 1);
                bulletShot.disappear();
            }
        }
    }, 10);
    

}




