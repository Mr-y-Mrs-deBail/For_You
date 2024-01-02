const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

//Full screen de los fuegos artificiales
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Redimencionar cuando se cambie de tamaño
window.addEventListener('resize',()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

//Renderizar los fuegos artificiales .hoja en blanco
let FuegosArtificiales = [];

//Las chispas se almacenan aquí
let Chispas = [];

class Cohetes {
    constructor() {

        this.x = Math.floor(Math.random() * window.innerWidth);

        //Y: se establece a innerHeight para comenzar desde abajo
        this.y = window.innerHeight;

        this.color = `hsl(${Math.floor(Math.random() * 360)},70%,50%)`;
        this.size = Math.floor(Math.random() * 5 + 5);
        this.speedY = Math.random() * 5 + 5;

        //Y: posición aleatoria donde el cohete estallará
        this.RocketY = Math.floor(window.innerHeight - ((Math.random() * window.innerHeight) + 100));

        this.update = () => {
            this.y -= this.speedY;
        };

        this.draw = () => {
            context.fillStyle = this.color;
            context.beginPath();
            context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            context.fill();
        };
    }
}

function FuegosArtificialesConstruct(x,y,color) {
    
    this.x = x;
    this.y = y;

    this.color = color;
    this.size = Math.floor(Math.random() * 3 + 6);
    this.speedY = Math.random() * 2 - 2;
    this.speedX = Math.round((Math.random() - 0.5) * 10);

    this.velocity = Math.random() / 5;

    this.update = ()=>{
        if (this.size > .2) {
            this.size -= .1
        }
        this.y += this.speedY;
        this.x += this.speedX;
        this.speedY += this.velocity;
    }

    this.draw = ()=>{
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x,this.y,this.size,0,Math.PI * 2);
        context.fill();
    }
}

//Funciones de bucle para actualizar y renderizar los arrays en el canvas
function renderFireRockets() {
    for (let i = 0; i < FuegosArtificiales.length; i++) {
        FuegosArtificiales[i].draw(); 
        FuegosArtificiales[i].update();

        //Condición para eliminar el fuego artificial del array y renderizar 20 partículas de chispas cuando se elimine
        if (FuegosArtificiales[i].y <= FuegosArtificiales[i].RocketY) {
            for (let index = 0; index < 20; index++) {
                Chispas.push(new FuegosArtificialesConstruct(FuegosArtificiales[i].x,FuegosArtificiales[i].y,FuegosArtificiales[i].color))
            }
            FuegosArtificiales.splice(i, 1);
            i--;
        }
    }
}

function renderFireRocketsSparkles() {
    for (let i = 0; i < Chispas.length; i++) {
        Chispas[i].draw(); 
        Chispas[i].update();
        if (Chispas[i].size <= .2) {
            Chispas.splice(i, 1);
            i--;
        }
    }
}

function animate() {
    context.fillStyle = `rgba(24,28,31,.2)`;
    context.fillRect(0,0,canvas.width,canvas.height);
    context.fillStyle = `white`
    renderFireRockets();
    renderFireRocketsSparkles();
    requestAnimationFrame(animate);
}

animate()

setInterval(()=>{
    for (let i = 0; i < 4; i++) {
        FuegosArtificiales.push(new Cohetes());
    }
},600)