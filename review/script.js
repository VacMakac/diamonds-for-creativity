const sheetId = '1f0w2MOL4Z_vlrFUxj9wgTBd5_4AG8Q9HSPrOhPePrZ8';
const apiKey = 'AIzaSyCzG6i6Vyo1ZFxqwVy5F224mbxf5BnF-v0';
let currentTable = 'CORE'; // По умолчанию выбрана таблица CORE

document.getElementById('customSelect').addEventListener('click', function() {
    const options = document.getElementById('customOptions');
    const tableSwitch = document.getElementById('tableSwitch');
    
    // Показать или скрыть таблицы
    if (options.style.display === 'block') {
        options.style.display = 'none';
        tableSwitch.style.display = 'none';
    } else {
        options.style.display = 'block';
        tableSwitch.style.display = 'block';
        loadVideosFromGoogleSheets(); // Загрузка видео при открытии
    }
});

document.getElementById('coreTableButton').addEventListener('click', function() {
    currentTable = 'CORE';
    loadVideosFromGoogleSheets();
});

document.getElementById('mineShieldTableButton').addEventListener('click', function() {
    currentTable = 'MineShield';
    loadVideosFromGoogleSheets();
});

// Функция для загрузки видео из Google Sheets
function loadVideosFromGoogleSheets() {
    const sheetRange = `${currentTable}!A2:L`;
    const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetRange}?key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const rows = data.values;
            const customOptions = document.getElementById('customOptions');
            
            customOptions.innerHTML = ''; // Очищаем предыдущие опции

            rows.forEach(row => {
                const status = row[4]; // Статус видео
                if (status === 'Без оценки' || status === 'Частично оценено') {
                    const optionDiv = document.createElement('div');
                    optionDiv.classList.add('custom-option');
                    optionDiv.setAttribute('data-url', row[0]);
                    optionDiv.setAttribute('data-preview', row[1]);
                    optionDiv.setAttribute('data-title', row[2]);
                    optionDiv.setAttribute('data-author', row[3]);

                    optionDiv.innerHTML = `
                        <img src="${row[1]}" alt="Preview">
                        <span>${row[2]}</span>
                    `;

                    optionDiv.addEventListener('click', () => {
                        displaySelectedVideo(optionDiv);
                    });

                    customOptions.appendChild(optionDiv);
                }
            });
        })
        .catch(error => console.error('Ошибка при загрузке данных из Google Sheets:', error));
}

// Функция для отображения выбранного видео и скрытия списка
function displaySelectedVideo(optionDiv) {
    const previewImage = document.getElementById('videoPreview');
    const videoTitle = document.getElementById('videoTitle');
    const videoAuthor = document.getElementById('videoAuthor');
    const customSelectContainer = document.querySelector('.custom-select-container');

    // Обновляем информацию о выбранном видео
    previewImage.src = optionDiv.getAttribute('data-preview');
    videoTitle.textContent = optionDiv.getAttribute('data-title');
    videoAuthor.textContent = optionDiv.getAttribute('data-author');

    // Отображаем информацию о видео
    document.querySelector('.video-info').style.display = 'flex';

    // Скрываем кастомный выпадающий список и кнопки
    customSelectContainer.style.display = 'none';
}

// Обновление оценки слайдерами
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

    let multiplier1 = parseInt(document.getElementById('slider5').value);
    let multiplier2 = parseInt(document.getElementById('slider6').value);

    score += (multiplier1 + multiplier2) * 2;

    totalScoreElement.textContent = score;
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
});
