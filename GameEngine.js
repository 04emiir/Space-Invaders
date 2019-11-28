import { Bullet } from "./Bullet.js";
import { HeroShip } from "./HeroShip.js";
import { Invader } from "./Invader.js";

class GameEngine {
    constructor() {
        this.heroShip = new HeroShip();
        this.arrayBullets = new Array();
        document.onkeydown = (e) => this.keyboardInput(e);
        this.bulletX = (this.heroShip.centerOfHeroShip - 1);
        this.bulletStartY = (this.heroShip.positionY + 2);
        this.bulletEndY = (this.heroShip.positionY + 8);
    }

    keyboardInput(e) {
        var key = e.key;
        if (key == "a" || key == "A") {
            this.bulletX = (this.heroShip.centerOfHeroShip - 1);
            this.bulletStartY = (this.heroShip.positionY + 2);
            this.bulletEndY = (this.heroShip.positionY + 8);
            this.heroShip.moveLeft();
            this.heroShip.draw();
        } else if (key == "d" || key == "D") {
            this.bulletX = (this.heroShip.centerOfHeroShip - 1);
            this.bulletStartY = (this.heroShip.positionY + 2);
            this.bulletEndY = (this.heroShip.positionY + 8);
            this.heroShip.moveRight();
            this.heroShip.draw();
        } else if (key == " ") {
            var bullet = new Bullet(this.bulletX, this.bulletStartY, this.bulletX, this.bulletEndY);
            this.arrayBullets.push(bullet);
        }
    }

    addInvaders() {
        var arrayInvaders = new Array();
        var widthTotal = 0;
        var heightTotal = 10
        while (heightTotal < 200) {
            arrayInvaders.push(new Invader(widthTotal, heightTotal));
            widthTotal += 100;
            if (widthTotal > 1000) {
                widthTotal = 0;
                heightTotal += 40
            }
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
    var gameEngine = new GameEngine();
    gameEngine.addInvaders();
    setInterval(() => {
        for (var bala of gameEngine.arrayBullets) {
            bala.moveUp();
            bala.draw();
        }
    }, 100);


}




