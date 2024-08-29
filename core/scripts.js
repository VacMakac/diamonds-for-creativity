const apiKey = 'AIzaSyCzG6i6Vyo1ZFxqwVy5F224mbxf5BnF-v0';
const sheetId = '1f0w2MOL4Z_vlrFUxj9wgTBd5_4AG8Q9HSPrOhPePrZ8';
const range = 'CORE!A2:J';

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
                    const tag = row[4] || '';
                    const overallRating = parseFloat(row[5]) || 0;
                    const vacRating = parseFloat(row[6]) || 0;
                    const vipsRating = parseFloat(row[7]) || 0;
                    const vacVideo = row[8] || '';
                    const vipsVideo = row[9] || '';

                    const tileElement = document.createElement('div');
                    tileElement.classList.add('table-tile');
                    
                    tileElement.innerHTML = `
                    <img src="${preview}" alt="${title}">
                    <h3>${title}</h3>
                    ${tag ? `<h3 class="tag">${tag}</h3>` : ''}
                    <div class="overall-rating-text">${overallRating}<span class="rating-max">/90</span></div>
                `;                
                    
                    tileElement.addEventListener('click', () => {
                        showMenu(title, link, overallRating, vacRating, vipsRating, vacVideo, vipsVideo);
                    });
                    
                    container.appendChild(tileElement);
                });
            } else {
                console.log('Нет данных для отображения.');
            }
        })
        .catch(error => console.error('Ошибка при загрузке данных:', error));
}

function showMenu(title, link, overallRating, vacRating, vipsRating, vacVideo, vipsVideo) {
    document.getElementById('modal-title').textContent = title;
    const videoLink = document.getElementById('modal-link');
    videoLink.href = link;
    videoLink.textContent = 'Смотреть видео';

    const vacVideoElement = document.getElementById('vac-video');
    const vipsVideoElement = document.getElementById('vips-video');

    vacVideoElement.src = `https://i.ytimg.com/vi/${vacVideo}/maxresdefault.jpg`;
    vacVideoElement.onclick = () => window.open(`https://www.youtube.com/watch?v=${vacVideo}`, '_blank');

    vipsVideoElement.src = `https://i.ytimg.com/vi/${vipsVideo}/maxresdefault.jpg`;
    vipsVideoElement.onclick = () => window.open(`https://www.youtube.com/watch?v=${vipsVideo}`, '_blank');

    document.getElementById('vac-rating-text').innerHTML = `${vacRating}<span class="rating-max">/90</span>`;
    document.getElementById('vips-rating-text').innerHTML = `${vipsRating}<span class="rating-max">/90</span>`;

    const modal = document.getElementById('modal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };
}
