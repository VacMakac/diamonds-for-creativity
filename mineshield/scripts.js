const apiKey = 'AIzaSyCzG6i6Vyo1ZFxqwVy5F224mbxf5BnF-v0';
const sheetId = '1f0w2MOL4Z_vlrFUxj9wgTBd5_4AG8Q9HSPrOhPePrZ8';
const range = 'MineShield!A2:N';

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
                    const author = row[3] || 'No Title';
                    const tag = row[4] || '';
                    const overallRating = parseFloat(row[5]) || 0;
                    const vacRating = parseFloat(row[6]) || 0;
                    const vipsRating = parseFloat(row[7]) || 0;
                    const smashRating = parseFloat(row[8]) || 0;
                    const optiRating = parseFloat(row[9]) || 0;
                    const vacVideo = row[10] || '';
                    const vipsVideo = row[11] || '';
                    const smashVideo = row[12] || '';
                    const optiVideo = row[13] || '';

                    const tileElement = document.createElement('div');
                    tileElement.classList.add('table-tile');
                    
                    tileElement.innerHTML = `
                    <img src="${preview}" alt="${title}">
                    <h4 class="author">${author}</h4>
                    <h3>${title}</h3>
                    ${tag ? `<h3 class="tag">${tag}</h3>` : ''}
                    <div class="overall-rating-text">${overallRating}<span class="rating-max">/90</span></div>
                `;                
                    
                    tileElement.addEventListener('click', () => {
                        showMenu(title, link, overallRating, vacRating, vipsRating, smashRating, optiRating, vacVideo, vipsVideo, smashVideo, optiVideo);
                    });
                    
                    container.appendChild(tileElement);
                });
            } else {
                console.log('Нет данных для отображения.');
            }
        })
        .catch(error => console.error('Ошибка при загрузке данных:', error));
}

function showMenu(title, link, overallRating, vacRating, vipsRating, smashRating, optiRating, vacVideo, vipsVideo, smashVideo, optiVideo) {
    document.getElementById('modal-title').textContent = title;
    const videoLink = document.getElementById('modal-link');
    videoLink.href = link;
    videoLink.textContent = 'Смотреть видео';

    const vacVideoElement = document.getElementById('vac-video');
    const vipsVideoElement = document.getElementById('vips-video');
    const smashVideoElement = document.getElementById('smash-video');
    const optiVideoElement = document.getElementById('opti-video');

    // Оценка ВакМакака
    if (vacRating) {
        document.getElementById('vac-rating-text').innerHTML = `${vacRating}<span class="rating-max">/90</span>`;
        vacVideoElement.src = `https://i.ytimg.com/vi/${vacVideo}/maxresdefault.jpg`;
        vacVideoElement.style.display = 'block';
        vacVideoElement.onclick = () => window.open(`https://www.youtube.com/watch?v=${vacVideo}`, '_blank');
        document.querySelector('.vac-section').style.display = 'flex';
    } else {
        vacVideoElement.style.display = 'none';
        document.querySelector('.vac-section').style.display = 'none';
    }

    // Оценка Випса
    if (vipsRating) {
        document.getElementById('vips-rating-text').innerHTML = `${vipsRating}<span class="rating-max">/90</span>`;
        vipsVideoElement.src = `https://i.ytimg.com/vi/${vipsVideo}/maxresdefault.jpg`;
        vipsVideoElement.style.display = 'block';
        vipsVideoElement.onclick = () => window.open(`https://www.youtube.com/watch?v=${vipsVideo}`, '_blank');
        document.querySelector('.vips-section').style.display = 'flex';
    } else {
        vipsVideoElement.style.display = 'none';
        document.querySelector('.vips-section').style.display = 'none';
    }

    // Оценка Смэша
    if (smashRating) {
        document.getElementById('smash-rating-text').innerHTML = `${smashRating}<span class="rating-max">/90</span>`;
        smashVideoElement.src = `https://i.ytimg.com/vi/${smashVideo}/maxresdefault.jpg`;
        smashVideoElement.style.display = 'block';
        smashVideoElement.onclick = () => window.open(`https://www.youtube.com/watch?v=${smashVideo}`, '_blank');
        document.querySelector('.smash-section').style.display = 'flex';
    } else {
        smashVideoElement.style.display = 'none';
        document.querySelector('.smash-section').style.display = 'none';
    }

    // Оценка Опти
    if (optiRating) {
        document.getElementById('opti-rating-text').innerHTML = `${optiRating}<span class="rating-max">/90</span>`;
        optiVideoElement.src = `https://i.ytimg.com/vi/${optiVideo}/maxresdefault.jpg`;
        optiVideoElement.style.display = 'block';
        optiVideoElement.onclick = () => window.open(`https://www.youtube.com/watch?v=${optiVideo}`, '_blank');
        document.querySelector('.opti-section').style.display = 'flex';
    } else {
        optiVideoElement.style.display = 'none';
        document.querySelector('.opti-section').style.display = 'none';
    }

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