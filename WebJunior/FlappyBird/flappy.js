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
let gap = 110;         // Відстань у пікселях між верхньою та нижньою трубою (просвіт)
let score = 0;         // Змінна, яка зберігає твої бали
let pipe = [];         // Масив (список), де ми будемо зберігати координати кожної пари труб

pipe[0] = {            // Створюємо першу трубу у списку
    x: canvas.width,   // Вона з'являється за правим краєм екрана
    y: 0               // Починається від самого верху
};

// --- Головна функція малювання кадрів ---
function draw() {
    context.drawImage(back, 0, 0);                 // Малюємо фон (небо)

    for (let i = 0; i < pipe.length; i++) {        // Цикл: проходимося по кожній трубі в масиві
        // Малюємо верхню трубу
        context.drawImage(pipeUp, pipe[i].x, pipe[i].y); 
        
        // Малюємо нижню трубу (вона малюється під верхньою з урахуванням просвіту gap)
        context.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--; // Рухаємо трубу вліво на 1 піксель кожен кадр

        // Якщо труба доїхала до певного місця (100 пікселів від лівого краю)
        if (pipe[i].x == 100) { 
            pipe.push({                           // Додаємо нову трубу в масив
                x: canvas.width,                  // Вона знову з'явиться справа
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height // Випадкова висота труби
            });
        }

        // --- Перевірка на зіткнення ---
        // Якщо пташка торкається труби АБО якщо пташка торкається дороги
        if (xPos + bird.width >= pipe[i].x &&                         // Пташка залетіла за лівий край труби
            xPos <= pipe[i].x + pipeUp.width &&                       // Пташка ще не вилетіла за правий край труби
            (yPos <= pipe[i].y + pipeUp.height ||                     // Пташка вдарилася об верхню трубу
             yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || // Пташка вдарилася об нижню трубу
            yPos + bird.height >= canvas.height - road.height) {      // Пташка впала на дорогу
            
            location.reload(); // Перезавантажуємо сторінку (гра починається спочатку)
        }

        // --- Підрахунок балів ---
        if (pipe[i].x == 5) {    // Якщо труба пролетіла повз пташку (координата x стала 5)
            score++;             // Додаємо 1 бал
            score_audio.play();  // Відтворюємо звук отримання очка
        }
    }

    context.drawImage(road, 0, canvas.height - road.height); // Малюємо дорогу поверх труб
    context.drawImage(bird, xPos, yPos);                     // Малюємо пташку

    // Реалістичне падіння:
    velY += gravity; // Додаємо силу тяжіння до швидкості
    yPos += velY;    // Змінюємо висоту пташки

    // Малюємо текст із рахунком на екрані
    context.fillStyle = "#000";             // Колір тексту (чорний)
    context.font = "24px Verdana";          // Шрифт та розмір
    context.fillText("Score: " + score, 10, canvas.height - 20); // Малюємо напис знизу
}

// --- Керування пташкою ---
// Додаємо "вухо", яке слухає натискання кнопки миші
canvas.addEventListener("mousedown", moveUp);

function moveUp() {
    velY = -4;         // Миттєво штовхаємо пташку вгору (мінусове число — це рух вгору)
    fly_audio.play();  // Програємо звук польоту
}

setInterval(draw, 20); // Запускаємо гру: малюємо 50 кадрів на секунду (кожні 20 мс)

