const apiKey = 'AIzaSyCzG6i6Vyo1ZFxqwVy5F224mbxf5BnF-v0';  // Ваш API-ключ
const sheetId = '1f0w2MOL4Z_vlrFUxj9wgTBd5_4AG8Q9HSPrOhPePrZ8'; // Ваш ID таблицы
const range = 'MineShield!A2:I'; // Обновленный диапазон

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

function fetchData() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const rows = data.values;
            const container = document.querySelector('.table-container');
            
            if (rows) {
                rows.forEach(row => {
                    const link = row[0] || '#';
                    const preview = row[1] || 'default.jpg';
                    const title = row[2] || 'No Title';
                    const author = row[3] || 'Unknown Author';
                    const overallRating = parseFloat(row[4]) || 0;
                    const vakVideo = row[7] || '';
                    const vipsVideo = row[8] || '';

                    const tileElement = document.createElement('div');
                    tileElement.classList.add('table-tile');
                    
                    tileElement.innerHTML = `
                        <img src="${preview}" alt="${title}">
                        <h3>${title}</h3>
                        <div class="overall-rating-text">${overallRating}/90</div>
                    `;
                    
                    tileElement.addEventListener('click', () => {
                        showMenu(title, link, overallRating, vakVideo, vipsVideo);
                    });
                    
                    container.appendChild(tileElement);
                });
            } else {
                console.log('Нет данных для отображения.');
            }
        })
        .catch(error => console.error('Ошибка при загрузке данных:', error));
}

function showMenu(title, link, overallRating, vakVideo, vipsVideo) {
    document.getElementById('modal-title').textContent = title;
    const videoLink = document.getElementById('modal-link');
    videoLink.href = link;
    videoLink.textContent = 'Смотреть видео';
    
    document.getElementById('overall-rating-text').textContent = `${overallRating}/90`;
    
    document.getElementById('vak-video').src = `https://www.youtube.com/embed/${vakVideo}`;
    document.getElementById('vips-video').src = `https://www.youtube.com/embed/${vipsVideo}`;

    const modal = document.getElementById('modal');
    modal.style.display = 'flex';

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}