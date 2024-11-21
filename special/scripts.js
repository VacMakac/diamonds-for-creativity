const apiKey = 'AIzaSyCzG6i6Vyo1ZFxqwVy5F224mbxf5BnF-v0';
const sheetId = '1f0w2MOL4Z_vlrFUxj9wgTBd5_4AG8Q9HSPrOhPePrZ8';
const range = 'SPECIAL!A2:E';

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
                    const overallRating = parseFloat(row[4]) || 0;

                    const tileElement = document.createElement('div');
                    tileElement.classList.add('table-tile');
                    
                    tileElement.innerHTML = `
                    <img src="${preview}" alt="${title}">
                    <h4 class="author">${author}</h4>
                    <h3>${title}</h3>
                    <div class="overall-rating-text">${overallRating}<span class="rating-max">/90</span></div>
                `;                
                    
                    tileElement.addEventListener('click', () => {
                        window.open(link, '_blank');
                    });
                    
                    container.appendChild(tileElement);
                });
            } else {
                console.log('Нет данных для отображения.');
            }
        })
        .catch(error => console.error('Ошибка при загрузке данных:', error));
}