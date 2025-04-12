"use strict";

//variables
let player;
let b_ground;
let stars1;

// 6.3 === full rotation new Component(..., angle)
// anim var
let playerSprite = "Sprites/Player/basic ship.png";
let imagesScale = 0.115;

function startGame() {
    GameArea.start();
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
        document.body.insertBefore(this.canvas, document.body.childNodes[1]);
        let element = document.querySelector("div.window");
        element.appendChild(this.canvas);
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

        ctx.save();
        ctx.restore()
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
    constructor(imgPar, pos, type, angle, health, firerate, maxSpeed) {
        super(imgPar, pos, type, angle, health)

        this.firerate = firerate
        this.mSpeed = maxSpeed

        this.mouseX = 0
        this.mouseY = 0
    }

    refresh() {
        this.get_input()
        this.get_keydowns()
        this.get_angle()
        this.get_translate()
        super.update()
    }

    get_dist() {
        let element = document.querySelector("canvas");
        let elementRect = element.getBoundingClientRect();
        
        let space_left = elementRect.left;
        return space_left
    }

    get_mouse_pos () {
        document.addEventListener("mousemove", (event) => {
            let orig = this.get_dist()
            this.mouseX = event.clientX - orig - 15
            this.mouseY = event.clientY - 90
        })
    }
    
    get_angle() {
        this.get_mouse_pos()
        let dy = this.mouseY - this.pos.y;
        let dx = this.mouseX - this.pos.x;

        this.angle = Math.atan2(dy, dx);
    }

    get_translate() {
        this.pos.y += this.velY
        this.pos.x += this.velX
        
        

        //Screen wrap top-bottom

        if (this.pos.y > 720) {
            this.pos.y = -100
        }

        if (this.pos.y < -100) {
            this.pos.y = 720
        }

        //Screen wrap left-right
        
        if (this.pos.x > 1280) {
            this.pos.x = -100
        }

        if (this.pos.x < -100) {
            this.pos.x = 1280
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
        if (this.keypress.w) {
            if (this.velY < 0 - this.mSpeed){

                this.velY = 0 - this.mSpeed
            } else {
                this.velY -= 0.5
            }
        } else if (this.keypress.s) {
            if (this.velY > this.mSpeed) {
                this.velY = this.mSpeed
            } else {
            this.velY += 0.5
            }
        }

        if (this.keypress.a) {
            if (this.velX < 0 - this.mSpeed){

                this.velX = 0 - this.mSpeed
            } else {
                this.velX -= 0.5
            }
        } else if (this.keypress.d) {
            if (this.velX > this.mSpeed) {
                this.velX = this.mSpeed
            } else {
            this.velX += 0.5
            }
        }
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


let layer = new Player({
    width: 313*imagesScale, 
    height: 207*imagesScale, 
    source: playerSprite
    }, //imgParamaters
    {x: 0, y: 0},//pos
    "idk", //type? idk why I added that
    1.5, //angle
    20, //health
    1.5, //firerate
    10 //speed
)


function updateGameArea() {
    GameArea.clear();

    let ctx = GameArea.context;

    layer.refresh()
}
