const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

// class works similar to python, where constructor is def __init__()
// this.var is also like self.var, and it works the same with the arguments
// draw is like blit, it draws the sprite
class Player {
    constructor({position, Velocity, imagesrc}) {
        this.position = position
        this.Velocity = Velocity
        this.angle = 0
        this.Images = new Image()
        this.Images.src = imagesrc
        this.Images.style.scale = 5
        
    }

    draw() {
        c.drawImage(this.Images, this.position.x, this.position.y)
    }

    update() {
        this.draw()
        this.position.y += this.Velocity.y
        this.position.x += this.Velocity.x
        
        

        //Screen wrap top-bottom

        if (this.position.y > 576) {
            this.position.y = -100
        }

        if (this.position.y < -100) {
            this.position.y = 576
        }

        //Screen wrap left-right
        
        if (this.position.x > 1024) {
            this.position.x = -100
        }

        if (this.position.x < -100) {
            this.position.x = 1024
        }

        //Lower velocity if high

        if (this.Velocity.x > 0) {
            this.Velocity.x -= 0.125
        }

        if (this.Velocity.x < 0) {
            this.Velocity.x += 0.125
        }

        // for the y velocity now

        if (this.Velocity.y > 0) {
            this.Velocity.y -= 0.125
        }

        if (this.Velocity.y < 0) {
            this.Velocity.y += 0.125
        }
    }
}

const player = new Player({position: {
    x: 0,
    y: 0
},
Velocity: {
    x: 0,
    y: 0
}, imagesrc: 'Sprites/Player/basic ship.png'})


player.draw()
console.log(player)

const keys = {
    w: {
        pressed: false
    }, a: {
        pressed: false
    }, s: {
        pressed: false
    }, d: {
        pressed: false
    }
}

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)

    player.update()

    //NOTE: true/falses are stored in the const keys above
    //Incrementally speeds up player to a certain limit
    //Also, being set up like this allows for diagonal movement while simultaniously preventing standstill when pressing two keys that move in opposite directions
    //This works by prioritizing one key over the other

    // Key pressed y vel
    if (keys.w.pressed) {
        if (player.Velocity.y >= -3) {
            player.Velocity.y -= 0.5
        }
    }else if (keys.s.pressed) {
        if (player.Velocity.y <= 3) {
            player.Velocity.y += 0.5
        }
    }
    // Key pressed x vel
    if (keys.d.pressed) {
        if (player.Velocity.x <= 3) {
            player.Velocity.x += 0.5
        }
    }else if (keys.a.pressed) {
        if (player.Velocity.x >= -3) {
            player.Velocity.x -= 0.5
        }
    }

    
}

animate()

window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
        break

        case 'a':
            keys.a.pressed = true
        break

        case 'w':
            keys.w.pressed = true
        break

        case 's':
            keys.s.pressed = true
        break
    }
})

window.addEventListener("keyup", (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
        break

        case 'a':
            keys.a.pressed = false
        break

        case 'w':
            keys.w.pressed = false
        break

        case 's':
            keys.s.pressed = false
        break
    }
})

window.addEventListener('mousemove', (event) => {
    let mouseX = event.clientX
    let mouseY = event.clientY

})