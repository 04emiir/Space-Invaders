import { Bullet } from "./Bullet.js";
import { HeroShip } from "./HeroShip.js";
import { Invader } from "./Invader.js";

class GameEngine {
    constructor() {
        this.heroShip = new HeroShip();
        document.onkeydown = (e) => this.moveHeroShip(e);
    }

    moveHeroShip(e) {
        var key = e.key;
        if (key == "a" || key == "A") {
            this.heroShip.moveLeft();
            this.heroShip.draw();
        } else if (key == "d" || key == "D") {
            this.heroShip.moveRight();
            this.heroShip.draw();
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


}




