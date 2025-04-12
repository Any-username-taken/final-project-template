"use strict";

//variables
let player;
let b_ground;
let stars1;

// 6.3 === full rotation new Component(..., angle)
// anim var
let playerSprite = "Sprites/Player/basic ship.png";
let imagesScale = 0.2;

function startGame() {
    GameArea.start();
    player = new Component(313*imagesScale, 207*imagesScale, playerSprite,  640-(313*imagesScale)/2, 360-(202*imagesScale)/2, "player", 6.3)

    //Get Input
    window.addEventListener("keydown", handleMovementPress);
    window.addEventListener("keyup", handleMovementRelease);
}

//Canvas creation

let GameArea = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = 1280;
        this.canvas.height = 720;
        this.context = this.canvas.getContext("2d");
        clearInterval(GameArea.interval);
        this.interval = setInterval(updateGameArea, 20);
        this.canvas.id = "Game-Window";
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        let h1Element = document.querySelector("h1.Game-Title");
        h1Element.insertAdjacentElement("afterend", this.canvas);
    },

    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function Component (width, height, source, x, y, type, angle) {
    this.type = type;
    this.angle = angle;

    if(type === "image" || type === "stars") {
        this.image = new Image();
        this.image.src = source;
    } else if (type === "player") {
        this.image = new Image();
        this.image.src = playerSprite;
    }

    this.width = width;
    this.height = height;

    this.x = x;
    this.y = y;

    this.update = function() {
        let ctx = GameArea.context;

        ctx.save();

        //rotate player img
        ctx.translate(this.x + this.width/2, this.y + this.height/2);
        ctx.rotate(this.angle);

        //Images anim
        if (type === "image" || type === "stars") {
            ctx.drawImage(this.image, -this.width/2, -this.height/2, this.width, this.height);
        } else if (type === "player") {
            this.image.src = playerSprite;
            ctx.drawImage(this.image, -this.width/2, -this.height/2, this.width, this.height);
        }

        ctx.restore();
    }
}


class Sprite{
    constructor(imgPar, pos, type, angle, health) {
        this.imgPar = imgPar //Needs {width: none, height: none, source: none}

        this.image = new Image();
        this.image.src = imgPar.source; //Remember to make imgPar an obj in all instances
        
        this.pos = pos;
        
        this.velX = 0;
        this.velY = 0;

        this.type = type

        this.angle = angle

        this.health = health

        //Tracking keypresses avoids headache
        this.keypress = {
            w: false,
            a: false,
            s: false,
            d: false
        }
    }

    update() {
        //New update function sure to bring joy to the everybody.

        let ctx = GameArea.context;

        ctx.save();

        //rotate player img
        ctx.translate(this.pos.x + this.imgPar.width/2, this.pos.y + this.imgPar.height/2);
        ctx.rotate(this.angle);

        //Images anim
        
        ctx.drawImage(this.image, -this.imgPar.width/2, -this.imgPar.height/2, this.imgPar.width, this.imgPar.height);

        ctx.restore();
    }
}


class Player extends Sprite{
    constructor(imgPar, pos, type, angle, health, firerate) {
        super(imgPar, pos, type, angle, health)

        this.firerate = firerate
    }

    refresh() {
        this.get_input()
        this.get_translate()
        super.update()
    }
    
    get_translate() {
        this.pos.y += this.velX
        this.pos.x += this.velY
        
        

        //Screen wrap top-bottom

        if (this.pos.y > 576) {
            this.pos.y = -100
        }

        if (this.pos.y < -100) {
            this.pos.y = 576
        }

        //Screen wrap left-right
        
        if (this.pos.x > 1024) {
            this.pos.x = -100
        }

        if (this.pos.x < -100) {
            this.position.x = 1024
        }

        //Lower velocity if high

        if (this.velX > 0) {
            this.velX -= 0.125
        }

        if (this.velX < 0) {
            this.velX += 0.125
        }

        // for the y velocity now

        if (this.velY > 0) {
            this.velY -= 0.125
        }

        if (this.velY < 0) {
            this.velY += 0.125
        }
    }

    get_keydowns() {

    }

    get_input() {
        document.addEventListener("keydown", (event) => {
            if (event.key === "w") {
                this.keypress.w = true;
            }

            if (event.key === "a") {
                this.keypress.a = true;
            }

            if (event.key === "s") {
                this.keypress.s = true;
            }

            if (event.key === "d") {
                this.keypress.d = true;
            }
        })

        document.addEventListener("keyup", (event) => {
            if (event.key === "w") {
                this.keypress.w = false;
            }

            if (event.key === "a") {
                this.keypress.a = false;
            }

            if (event.key === "s") {
                this.keypress.s = false;
            }

            if (event.key === "d") {
                this.keypress.d = false;
            }
        })
    }
}

function updateGameArea() {
    GameArea.clear();

    let ctx = GameArea.context;

    enemy.update()

}
