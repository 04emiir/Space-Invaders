import { Bullet } from "./Bullet.js";
import { HeroShip } from "./HeroShip.js";
import { Invader } from "./Invader.js";

class GameEngine {
    constructor() {
        this.heroShip = new HeroShip();
        this.arrayBullets = new Array();
        this.arrayInvader = new Array();
        this.pressedA = null;
        this.pressedD = null;
        document.onkeydown= (e) => this.keyboardInput(e); 
    }

    keyboardInput(e) {
        document.getElementById("bgSound").play();
        var key = e.key;
        if(key == "a" || key == "A") {
            this.pressedA = true;
            this.pressedD = false;
        } else if(key == "d" || key == "D") {
            this.pressedA = false;
            this.pressedD = true;
        } else if(key == " ") {
            document.getElementById("bullet").play();
            var bulletX = this.heroShip.centerOfHeroShip;
            var bulletStartY = (this.heroShip.positionY - 5);
            var bulletEndY = (this.heroShip.positionY - 20);
            var bullet = new Bullet(bulletX, bulletStartY, bulletEndY);
            this.arrayBullets.push(bullet);
        }
    }

    addInvaders() {
        var widthTotal = 300;
        var heightTotal = 10;
        while (heightTotal < 200) {
            var alienigena = new Invader(widthTotal, heightTotal)
            this.arrayInvader.push(alienigena);
            widthTotal += 100;
            if (widthTotal > 700) {
                widthTotal = 300;
                heightTotal += 40;
            }
        }
    }
}

window.onload = () => {
    //  Creation of the gameScreen<svg>, set attributes and addition to the HTML.
    var gameScreen = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    gameScreen.setAttribute("width", "1000px");
    gameScreen.setAttribute("height", "700px");
    gameScreen.id = "gameScreen";
    document.body.appendChild(gameScreen);

    //  Creation of the gameBorder<svg>, set attributes and addition to the gameBorder<svg>.
    var gameBorder = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    gameBorder.setAttribute("x", "0");
    gameBorder.setAttribute("y", "0");
    gameBorder.setAttribute("width", "1000");
    gameBorder.setAttribute("height", "700");
    gameBorder.id = "gameBorder";
    gameBorder.style = "fill:black;stroke-width:5;stroke:rgb(0,100,0)"
    document.getElementById('gameScreen').appendChild(gameBorder);
    
    //  Creation of the sound effect for HeroShip bullet.
    var bulletSound = document.createElement("AUDIO");
    bulletSound.src = "bullet.mp3"
    bulletSound.controls = false;
    bulletSound.id = "bullet";
    document.body.appendChild(bulletSound);
    
    //  Creation of the background music.
    var bgSound = document.createElement("AUDIO");
    bgSound.src = "howard.mp3"
    bgSound.controls = false;
    bgSound.id = "bgSound";
    bgSound.loop = true;
    document.body.appendChild(bgSound);
    
    var gameEngine = new GameEngine();
    gameEngine.addInvaders();
    setInterval(() => {
        if(gameEngine.pressedA && !gameEngine.pressedD) {
            gameEngine.heroShip.moveLeft();
            gameEngine.heroShip.draw();
            gameEngine.pressedA = null;
            gameEngine.pressedD = null;
        } else if(gameEngine.pressedD && !gameEngine.pressedA) {
            gameEngine.heroShip.moveRight();
            gameEngine.heroShip.draw();
            gameEngine.pressedA = null;
            gameEngine.pressedD = null;
        }
        
        for(var bulletShot of gameEngine.arrayBullets) {
            bulletShot.moveUp();
            bulletShot.draw();
            if (bulletShot.startY - bulletShot.speed <= 0) {
                gameEngine.arrayBullets.splice(0, 1);
                bulletShot.disappear();
            }
        }
        for(var alien of gameEngine.arrayInvader) {
            alien.wholeMovement();
            alien.draw();
        }

    }, 10);
}