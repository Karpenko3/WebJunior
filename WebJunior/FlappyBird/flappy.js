// --- Налаштування полотна (Canvas) ---
let canvas = document.getElementById("canvas"); // Знаходимо полотно в HTML
let context = canvas.getContext("2d"); // Отримуємо інструмент для малювання

// Встановлюємо розміри ігрового поля через скрипт
canvas.width = 256;
canvas.height = 512;

// --- Завантаження зображень ---
let bird = new Image();
let back = new Image();
let road = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();

bird.src = "img/bird.png";
back.src = "img/back.png";
road.src = "img/road.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

// --- Завантаження звуків ---
let fly_audio = new Audio();
let score_audio = new Audio();

fly_audio.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

// --- Нові змінні для фізики та позиції пташки ---
let velY = 0;        // Швидкість падіння (вертикальна швидкість)
let gravity = 0.2;   // Сила тяжіння (постійне прискорення)

let xPos = 10;       // Початкова позиція пташки по горизонталі
let yPos = 150;      // Початкова позиція пташки по вертикалі

// --- Головна функція малювання ---
function draw() {
    // 1. Малюємо фон (точка прив'язки - верхній лівий кут)
    context.drawImage(back, 0, 0);
    
    // 2. Малюємо головного героя, використовуючи змінні позиції
    context.drawImage(bird, xPos, yPos);

    // 3. Перевірка на зіткнення: якщо пташка торкається низу — перезавантажуємо сторінку
    if (yPos >= canvas.height) {
        location.reload(); // Функція перезапуску гри
    }

    // 4. Реалізація гравітації: швидкість падіння постійно зростає
    velY += gravity;  // Додаємо силу тяжіння до швидкості
    yPos += velY;     // Змінюємо позицію пташки відповідно до швидкості
}

// Запускаємо періодичне виконання функції draw кожні 20 мілісекунд
setInterval(draw, 20);