document.addEventListener('DOMContentLoaded', function () {
    const diamondContainer = document.getElementById('diamond-container');

    function createDiamond() {
        const diamond = document.createElement('div');
        diamond.classList.add('diamond');

        diamond.style.left = `${Math.random() * 100}vw`;
        diamond.style.animationDuration = `${Math.random() * 5 + 10}s`;
        diamond.style.animationDelay = `${Math.random() * 2}s`;

        diamondContainer.appendChild(diamond);

        setTimeout(() => {
            diamond.remove();
        }, 15000);
    }

    setInterval(createDiamond, 1500);
});
