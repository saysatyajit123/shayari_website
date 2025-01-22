const loading = document.getElementById('loading-spinner');
const main_container = document.getElementById('main-container');
const footer_id = document.getElementById('footer-id');
 
 // wait for the page to fully load 
window.addEventListener('load', function() {
    setTimeout(function() {
        loading.style.display  = 'none';
        main_container.style.display = 'block';
        footer_id.style.display = 'block';
    }, 1000);
});

function loadScript(scriptUrl) {
    const script = document.createElement("script");
    script.src = scriptUrl;
    document.body.appendChild(script);
}

function checkscreensize() {
    const existingScript = document.querySelector(`script[src="../js/android-drawer.js"]`);
    if (!existingScript && window.innerWidth < 500) {
        loadScript("../js/android-drawer.js");
    } else if (existingScript) {
        existingScript.remove();
    }
}
checkscreensize();
window.addEventListener("resize", checkscreensize);
document.addEventListener('keydown', (e) => {
    if(e.ctrlKey || e.keyCode == 123) {
        e.stopPropagation()
        e.preventDefault()
    }
})
document.addEventListener('contextmenu', function(e) { 
    e.preventDefault(); 
});