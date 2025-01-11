document.getElementById('openDrawerBtn').addEventListener('click', function() {
    const drawer = document.getElementById('drawer');
    drawer.style.display = 'block';
    setTimeout(() => {
        drawer.classList.add('show');
    }, 10);
});

document.getElementById('closeDrawerBtn').addEventListener('click', function() {
    const drawer = document.getElementById('drawer');
    drawer.classList.remove('show');
    setTimeout(() => {
        drawer.style.display = 'none';
    }, 500);
});