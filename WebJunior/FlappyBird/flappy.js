// 1. Знаходимо наше полотно в HTML і беремо "пензлик" (context)
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

// 2. Встановлюємо розмір ігрового екрана (ширина та висота)
canvas.width = 256;
canvas.height = 512;

// 3. Створюємо об'єкти для картинок
let bird = new Image();
let back = new Image();
let road = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();

// Вказуємо програмі, де лежать ці картинки
bird.src = "img/bird.png";
back.src = "img/back.png";
road.src = "img/road.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

// 4. Створюємо об'єкти для звуків
let fly_audio = new Audio();
let score_audio = new Audio();

fly_audio.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

// 5. Змінні для позиції пташки (щоб вона могла рухатися)
let xPos = 10;  // Позиція по горизонталі
let yPos = 150; // Позиція по вертикалі

// 6. Головна функція малювання — наш "кінокадр"
function draw() {
    // Малюємо фон. Координати (0,0) — це верхній лівий кут
    context.drawImage(back, 0, 0);
    
    // Малюємо пташку на її поточних координатах
    context.drawImage(bird, xPos, yPos);
    
    // Тут у майбутньому ми додамо код для падіння пташки та руху труб
}

// 7. Запускаємо наш "кінопроектор": викликати функцію draw кожні 20 мс
setInterval(draw, 20);