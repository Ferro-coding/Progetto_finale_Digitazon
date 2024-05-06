let screen = document.getElementById("screen");
let ctx = screen.getContext("2d");
const body = document.querySelector("body");

let collisionCount = 0;

// classe per impostare e settare posizioni
class Vec2d {
  constructor(x, y) {
    this.set(x, y);
  }

  set(x, y) {
    this.x = x;
    this.y = y;
  }
}

//creo classe entità
class Entity {
  constructor(x, y) {
    this.pos = new Vec2d(x, y);
    this.width = 80;
    this.height = 80;
    this.jumpForce = 10;
    this.gravity = 0.3;
    this.vspd = 0;
    this.isJumping = false;
    this.image = new Image();
    this.image.src = "img/silente.png"; // Imposta il percorso dell'immagine
  }

  update() {
    if (this.isJumping) {
      this.vspd += this.gravity;
      this.pos.y += this.vspd;
      if (this.pos.y >= screen.height - this.height) {
        this.pos.y = screen.height - this.height;
        this.isJumping = false;
      }
    }
  }

  jump() {
    if (!this.isJumping) {
      this.vspd = -this.jumpForce;
      this.isJumping = true;
    }
  }

  draw(context) {
    context.drawImage(
      this.image,
      this.pos.x,
      this.pos.y,
      this.width,
      this.height
    );
  }
}

// creo classe ostacolo
class Obstacle {
  constructor(x, y, width, height, speed) {
    this.pos = new Vec2d(x, y);
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.obs = new Image();
    this.obs.src = "img/scopa.png";
  }

  update() {
    this.pos.x -= this.speed;
  }

  draw(context) {
    /*
        ctx.fillStyle ="red";
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);*/
    context.drawImage(
      this.obs,
      this.pos.x,
      this.pos.y,
      this.width,
      this.height
    );
  }
}

let entity = new Entity(50, 520);
let obstacles = [];

let backgroundImage = new Image();
backgroundImage.src = "img/sfondo game.jpg";

function drawScreen() {
  // Disegna l'immagine di sfondo
  ctx.drawImage(backgroundImage, 0, 0, screen.width, screen.height);
}

/*
function drawScreen(){
    ctx.fillStyle ="white";
    ctx.fillRect(0, 0, screen.width, screen.height);
}
*/

// funzione per generare l'ostacolo un po buggata
function generateObstacle() {
  let x = screen.width;
  let y = screen.height - Math.random() * 100;
  let width = 20 + Math.random() * 30;
  let height = 20 + Math.random() * 50;
  //let speed = 2 + Math.random() * 2;
  let speed = 4;
  obstacles.push(new Obstacle(x, y, width, height, speed));
}

function gameLoop() {
  drawScreen();

  // aggiorno e disegno ostacoli
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].update();
    obstacles[i].draw(ctx);

    // Collisione un po buggata
    if (
      entity.pos.x < obstacles[i].pos.x + obstacles[i].width &&
      entity.pos.x + entity.width > obstacles[i].pos.x &&
      entity.pos.y < obstacles[i].pos.y + obstacles[i].height &&
      entity.pos.y + entity.height > obstacles[i].pos.y
    ) {
      collisionCount++;
    }
  }

  entity.update();
  entity.draw(ctx);

  if (collisionCount >= 100) {
    alert("Game Over! Ricarica per giocare di nuovo");
    return; // Finisce il gioco
  }

  // Generatore di ostacoli casuale
  if (Math.random() < 0.01) {
    generateObstacle();
  }

  requestAnimationFrame(gameLoop);
}

// gestione input dalla tastiera
document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    entity.jump();
  }
});

gameLoop();

