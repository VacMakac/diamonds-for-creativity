// Функция для загрузки видео из Google Sheets
function loadVideosFromGoogleSheets() {
    const sheetId = '1f0w2MOL4Z_vlrFUxj9wgTBd5_4AG8Q9HSPrOhPePrZ8';
    const sheetRange = 'CORE!A2:L';
    const apiKey = 'AIzaSyCzG6i6Vyo1ZFxqwVy5F224mbxf5BnF-v0';
    const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetRange}?key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const rows = data.values;
            const customOptions = document.getElementById('customOptions');
            
            // Очищаем предыдущие опции перед добавлением новых
            customOptions.innerHTML = ''; 

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

// Функция для отображения выбранного видео и полного скрытия кнопки выбора
function displaySelectedVideo(optionDiv) {
    const previewImage = document.getElementById('videoPreview');
    const videoTitle = document.getElementById('videoTitle');
    const videoAuthor = document.getElementById('videoAuthor');
    const customSelectContainer = document.querySelector('.custom-select-container'); // Контейнер выбора

    // Обновляем информацию о выбранном видео
    previewImage.src = optionDiv.getAttribute('data-preview');
    videoTitle.textContent = optionDiv.getAttribute('data-title');
    videoAuthor.textContent = optionDiv.getAttribute('data-author');

    // Отображаем информацию о видео
    document.querySelector('.video-info').style.display = 'flex';

    // Полностью скрываем кастомный выпадающий список и кнопку выбора
    customSelectContainer.style.display = 'none';
}

// Показать/скрыть опции при клике на кастомный select
document.getElementById('customSelect').addEventListener('click', function() {
    const options = document.getElementById('customOptions');
    
    // Проверяем текущее состояние видимости списка и переключаем
    options.style.display = options.style.display === 'block' ? 'none' : 'block';
});

// Инициализация
document.addEventListener('DOMContentLoaded', function () {
    loadVideosFromGoogleSheets();
});


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

    let multiplier1 = parseInt(document.getElementById('slider5').value) * 0.15;
    let multiplier2 = parseInt(document.getElementById('slider6').value) * 0.10;

    score *= (1 + multiplier1 + multiplier2);
    score = Math.min(Math.round(score), 90);

    totalScoreElement.textContent = score;

    document.getElementById('slider1Value').textContent = document.getElementById('slider1').value;
    document.getElementById('slider2Value').textContent = document.getElementById('slider2').value;
    document.getElementById('slider3Value').textContent = document.getElementById('slider3').value;
    document.getElementById('slider4Value').textContent = document.getElementById('slider4').value;
    document.getElementById('slider5Value').textContent = document.getElementById('slider5').value;
    document.getElementById('slider6Value').textContent = document.getElementById('slider6').value;
}

// Функция для сохранения оценки
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

// Инициализация после загрузки страницы
document.addEventListener('DOMContentLoaded', function () {
    loadVideosFromGoogleSheets();
    document.getElementById('videoSelect').addEventListener('change', displaySelectedVideo);
});