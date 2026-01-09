// --- Налаштування екрана ---
let canvas = document.getElementById("canvas"); // Знаходимо полотно
let context = canvas.getContext("2d");           // Беремо "пензлик"

canvas.width = 256;  // Ширина екрана
canvas.height = 512; // Висота екрана

// --- Завантаження картинок ---
let bird = new Image();
let back = new Image();
let road = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();

bird.src = "img/bird.png";             // Наша пташка
back.src = "img/back.png";             // Задній фон
road.src = "img/road.png";             // Дорога
pipeUp.src = "img/pipeUp.png";         // Труба зверху
pipeBottom.src = "img/pipeBottom.png"; // Труба знизу

// --- Завантаження звуків ---
let fly_audio = new Audio();
let score_audio = new Audio();

fly_audio.src = "audio/fly.mp3";     // Звук помаху крил
score_audio.src = "audio/score.mp3"; // Звук переможного очка

// --- Фізика та координати ---
let velY = 0;      // Швидкість пташки (спочатку 0)
let gravity = 0.2; // Сила, що тягне пташку вниз

let xPos = 10;     // Місце пташки зліва направо
let yPos = 150;    // Місце пташки зверху донизу

// --- Головна функція малювання кадрів ---
function draw() {
    context.drawImage(back, 0, 0);         // Малюємо фон
    context.drawImage(bird, xPos, yPos);   // Малюємо пташку на її місці

    // Перевірка: якщо пташка впала нижче екрана — гра перезапускається
    if (yPos >= canvas.height) {
        location.reload(); 
    }

    // Робимо падіння реалістичним:
    velY += gravity; // Додаємо силу тяжіння до швидкості
    yPos += velY;    // Змінюємо висоту пташки згідно зі швидкістю
}

// --- Керування пташкою ---
// Додаємо "вухо", яке слухає натискання кнопки миші
canvas.addEventListener("mousedown", moveUp);

function moveUp() {
    velY = -4;         // Миттєво штовхаємо пташку вгору (мінусове число — це рух вгору)
    fly_audio.play();  // Програємо звук польоту
}

setInterval(draw, 20); // Запускаємо гру: малюємо 50 кадрів на секунду (кожні 20 мс)