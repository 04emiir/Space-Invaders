import { Bullet } from "./Bullet.js";
import { HeroShip } from "./HeroShip.js";
import { Invader } from "./Invader.js";

class GameEngine {
    constructor() {
        this.createGameScreen();
        this.createGameBorder();
        this.createBulletSound();
        this.createBackgroundMusic();
        this.heroShip = new HeroShip();
        this.arrayBullets = new Array();
        this.arrayInvaderBullets = new Array();
        this.arrayInvader = new Array();
        this.pressedA = null;
        this.pressedD = null;
        document.onkeydown = (e) => this.keyboardInput(e);
        this.invaderCanShoot = true;
        this.invaderCoolDown = null;
        this.puedeDisparar = true;
        this.cooldown = null;


    }

    keyboardInput(e) {
        document.getElementById("bgSound").play();
        var key = e.key;
        if (key == "a" || key == "A") {
            this.pressedA = true;
            this.pressedD = false;
        } else if (key == "d" || key == "D") {
            this.pressedA = false;
            this.pressedD = true;
        } else if (key == " ") {
            if (this.puedeDisparar) {
                document.getElementById("bullet").play();
                var bulletX = this.heroShip.centerOfHeroShip;
                var bulletStartY = (this.heroShip.positionY - 5);
                var bulletEndY = (this.heroShip.positionY - 20);
                var bullet = new Bullet(bulletX, bulletStartY, bulletEndY, "rgb(0,255,0)");
                this.arrayBullets.push(bullet);
                this.puedeDisparar = false;
                this.cooldown = setTimeout(() => {
                    this.puedeDisparar = true;
                    this.cooldown = null;
                }, 2000);
            }

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


    checkInvadersMoveDown() {
        for (let invader of this.arrayInvader) {
            if (invader.positionX <= 1 && !invader.invaderDirection) {
                for (let cadaInvader of this.arrayInvader) {
                    cadaInvader.speed = 0;
                    cadaInvader.positionY += 30;
                    cadaInvader.draw();
                    cadaInvader.invaderDirection = true;
                    cadaInvader.speed = 0.5;
                }
            }
            else if (invader.positionX >= 940 && invader.invaderDirection) {
                for (let cadaInvader of this.arrayInvader) {
                    cadaInvader.speed = 0;
                    cadaInvader.positionY += 30;
                    cadaInvader.draw();
                    cadaInvader.invaderDirection = false;
                    cadaInvader.speed = 0.5;
                }
            }
        }
    }

    invaderShoots() {
        if (this.invaderCanShoot) {
            var randomInvader = parseInt(Math.random() * this.arrayInvader.length);
            var invaderThatShoots = this.arrayInvader[randomInvader];
            var invaderBulletX = invaderThatShoots.centerOfInvader;
            var invaderStartY = invaderThatShoots.positionY + 30;
            var invaderEndY = invaderThatShoots.positionY + 45;
            var invaderBullet = new Bullet(invaderBulletX, invaderStartY, invaderEndY, "rgb(255,255,0)");
            this.arrayInvaderBullets.push(invaderBullet);
            this.invaderCanShoot = false;
            this.invaderCoolDown = setTimeout(() => {
                this.invaderCanShoot = true;
                this.invaderCoolDown = null;
            }, 2000);
        }
    }

    createGameScreen() {
        //  Creation of the gameScreen<svg>, set attributes and addition to the HTML.
        var gameScreen = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        gameScreen.setAttribute("width", "1000px");
        gameScreen.setAttribute("height", "700px");
        gameScreen.id = "gameScreen";
        document.body.appendChild(gameScreen);
    }

    createGameBorder() {
        //  Creation of the gameBorder<svg>, set attributes and addition to the gameBorder<svg>.
        var gameBorder = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        gameBorder.setAttribute("x", "0");
        gameBorder.setAttribute("y", "0");
        gameBorder.setAttribute("width", "1000");
        gameBorder.setAttribute("height", "700");
        gameBorder.id = "gameBorder";
        gameBorder.style = "fill:black;stroke-width:5;stroke:rgb(0,100,0)"
        document.getElementById('gameScreen').appendChild(gameBorder);
    }

    createBulletSound() {
        //  Creation of the sound effect for HeroShip bullet.
        var bulletSound = document.createElement("AUDIO");
        bulletSound.src = "bullet.mp3"
        bulletSound.controls = false;
        bulletSound.id = "bullet";
        document.body.appendChild(bulletSound);
    }

    createBackgroundMusic() {
        //  Creation of the background music.
        var bgSound = document.createElement("AUDIO");
        bgSound.src = "howard.mp3"
        bgSound.controls = false;
        bgSound.id = "bgSound";
        bgSound.loop = true;
        document.body.appendChild(bgSound);
    }
}

function createGame() {

    var gameEngine = new GameEngine();

    gameEngine.addInvaders();
    var intervalo = setInterval(() => {
        if (gameEngine.pressedA && !gameEngine.pressedD) {
            gameEngine.heroShip.moveLeft();
            gameEngine.heroShip.draw();
            gameEngine.pressedA = null;
            gameEngine.pressedD = null;
        } else if (gameEngine.pressedD && !gameEngine.pressedA) {
            gameEngine.heroShip.moveRight();
            gameEngine.heroShip.draw();
            gameEngine.pressedA = null;
            gameEngine.pressedD = null;
        }

        for (var bulletShot of gameEngine.arrayBullets) {
            bulletShot.moveUp();
            bulletShot.draw();

            for (let i = 0; i < gameEngine.arrayInvader.length; i++) {
                if ((bulletShot.axisX >= gameEngine.arrayInvader[i].positionX) && (bulletShot.axisX <= gameEngine.arrayInvader[i].positionX + 60) && (bulletShot.endY <= gameEngine.arrayInvader[i].positionY + 30) && (bulletShot.endY >= gameEngine.arrayInvader[i].positionY)) {
                    bulletShot.disappear();
                    gameEngine.arrayBullets.splice(0, 1);
                    gameEngine.arrayInvader[i].destroy();
                    gameEngine.arrayInvader.splice(i, 1);
                }

            }

            if (bulletShot.startY - bulletShot.speed <= 0) {
                gameEngine.arrayBullets.splice(0, 1);
                bulletShot.disappear();
            }
        }

        for (var bulletInvaderShot of gameEngine.arrayInvaderBullets) {
            bulletInvaderShot.moveDown();
            bulletInvaderShot.draw();
            if ((bulletInvaderShot.axisX >= gameEngine.heroShip.positionX) && (bulletInvaderShot.endY <= gameEngine.heroShip.positionY + 30) && (bulletInvaderShot.endY >= gameEngine.heroShip.positionY) && (bulletInvaderShot.axisX <= (gameEngine.heroShip.positionX + parseInt(gameEngine.heroShip.heroShip.getAttribute("width")))) /*&& (bulletInvaderShot.endY > gameEngine.heroShip.positionY)*/) {
                gameEngine.heroShip.destroy();
                clearInterval(intervalo);
                document.body.innerHTML = "";
                let imgGameOver = document.createElement("img");
                let pressF5 = document.createElement("h1");
                let div = document.createElement("div");
                pressF5.innerHTML = "PRESS F5 to play again";
                imgGameOver.src = "./gameover.jpg";
                div.style = "text-align:center;";
                div.appendChild(imgGameOver);
                gameEngine.arrayInvaderBullets.splice(0, 1);
                div.appendChild(pressF5);
                document.body.appendChild(div);

            }

        }
        for (var alien of gameEngine.arrayInvader) {
            alien.wholeMovement();
            alien.draw();
        }
        if (gameEngine.arrayInvader.length == 0) {
            document.body.innerHTML = "";
            let imgGameOver = document.createElement("img");
            let pressF5 = document.createElement("h1");
            let div = document.createElement("div");
            pressF5.innerHTML = "PRESS F5 to play again";
            imgGameOver.src = "./gameover.jpg";
            div.style = "text-align:center;";
            div.appendChild(imgGameOver);
            gameEngine.arrayInvaderBullets.splice(0, 1);
            div.appendChild(pressF5);
            document.body.appendChild(div);
        }
        gameEngine.invaderShoots();
        gameEngine.checkInvadersMoveDown();

    }, 10);
}

window.onload = () => {
    let imgGameOver = document.createElement("img");
    let pressF5 = document.createElement("h1");
    let div = document.createElement("div");
    div.onclick = () => {
        document.body.innerHTML = "";
        createGame();
    }
    pressF5.innerHTML = "Click to Play";
    imgGameOver.src = "./gameover.jpg";
    div.style = "text-align:center;";
    div.appendChild(imgGameOver);
    div.appendChild(pressF5);
    document.body.appendChild(div);
}