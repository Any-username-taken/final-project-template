"use strict";

//variables
let player;
let b_ground;
let stars1;
let stars2;
let stars3;
let stars4;
let stars5;


// anim var
let playerSprite = "Sprites/Player/basic ship.png";
let imagesScale = 0.2;

function startGame() {
    GameArea.start();
    player = new Component(313*imagesScale, 207*imagesScale, playerSprite,  640-(313*imagesScale)/2, 360-(202*imagesScale)/2, "player", 0)
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

function updateGameArea() {
    GameArea.clear();

    let ctx = GameArea.context;

    player.update()
}