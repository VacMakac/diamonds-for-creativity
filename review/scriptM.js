// Функция для обновления оценки слайдерами
const sliders = document.querySelectorAll('.slider');
const totalScoreElement = document.getElementById('totalScore');

sliders.forEach(slider => {
    slider.addEventListener('input', updateScore);
});

function updateScore() {
    let score = 0;

    score += parseInt(document.getElementById('slider1').value);
    score += parseInt(document.getElementById('slider2').value);
    score += parseInt(document.getElementById('slider3').value);
    score += parseInt(document.getElementById('slider4').value);

    let multiplier1 = parseInt(document.getElementById('slider5').value) * 0.13;

    score *= (1 + multiplier1);
    score = Math.min(Math.round(score), 90);

    totalScoreElement.textContent = score;

    document.getElementById('slider1Value').textContent = document.getElementById('slider1').value;
    document.getElementById('slider2Value').textContent = document.getElementById('slider2').value;
    document.getElementById('slider3Value').textContent = document.getElementById('slider3').value;
    document.getElementById('slider4Value').textContent = document.getElementById('slider4').value;
    document.getElementById('slider5Value').textContent = document.getElementById('slider5').value;
}

// Сброс значений слайдеров и общей оценки
function resetSliders() {
    sliders.forEach(slider => {
        slider.dispatchEvent(new Event('input')); // Обновляем отображение значений
    });
    totalScoreElement.textContent = 25; // Устанавливаем значение по умолчанию
}

// Сохранение оценки
document.getElementById('saveButton').addEventListener('click', function () {
    saveScore().then(() => {
        window.location.reload();
    });
});

function saveScore() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Оценка успешно сохранена');
            resolve();
        }, 0);
    });
}

// Инициализация
document.addEventListener('DOMContentLoaded', function () {
    loadVideosFromGoogleSheets();
    resetSliders(); // Устанавливаем значения по умолчанию при загрузке
});