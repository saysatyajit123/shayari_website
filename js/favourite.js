function generateCard(index, personData) {
    const flowers = ['🌺', '🌼', '🥀', '🌻', '🌸', '🌹', '🌷']; // Available flowers
    let randomFlowers = [];
    // Generate a random sequence of 7 flowers
    for (let i = 0; i < 7; i++) {
        const randomIndex = Math.floor(Math.random() * flowers.length);
        randomFlowers.push(flowers[randomIndex]);
    }
    const flowerString = randomFlowers.join(''); // Combine them into a string
    return `
    <div class="card">
        <div class="card-content">
            <p style="text-align:center;margin:0;font-size:23px;">${flowerString}</p>
            <p id="data${index + 1}" class="p-ad">${personData.shayari}</p>
            <p style="text-align:center;margin:0;font-size:23px;">${flowerString}</p>
        </div>
        <div class="button-container">
            <a id="whatsapp${index + 1}" class="btn whatsapp-btn" href="https://api.whatsapp.com/send?text=${encodeURIComponent(personData.shayari)}" target="_blank"></a>
            <button class="btn copy-btn bi bi-copy" data-target="${personData.id}"></button>
            <button class="btn save-btn bi ${isSaved(personData.id) ? 'bi-bookmarks-fill' : ''}" data-target="${personData.id}"></button>
        </div>
    </div>`;
    // ${isSaved(personData.id) ? 'Saved' : 'Save'}
}

const cardContainer = document.getElementById('cardgenerate');

// Function to display only saved content
function displaySavedCards() {
const savedPeople = JSON.parse(localStorage.getItem('savedPeople')) || [];
if (savedPeople.length === 0) {
// cardContainer.innerHTML = `<p>No saved card available.</p>`;
const cardContainerdemo = document.getElementById('cardgenerate'); 
function generateCarddemo(index) {
    return `
        <div class="card">
            <div class="card-content">
                <p id="data1" class="p-ad">No shayari saved available...</p>
            </div>
            <div class="button-container">
                <a id="whatsapp1" class="btn whatsapp-btn"></a>
                <button class="btn copy-btn bi bi-copy" data-target="0"></button>
                <button class="btn save-btn bi bi-bookmarks" data-target="0"></button>
                <button class="btn like-btn bi bi-heart" data-target="0"></button>
            </div>
        </div>`;
}

const gint = 4;
for (let i = 1; i <= gint; i++) {
    const cardHTML = generateCarddemo(i);
    cardContainerdemo.innerHTML += cardHTML;
}
return;
}


fetch('../data/data.json')
.then(response => response.json())
.then(data => {
    // const jsonData = data[shayari_id];
    const jsonData = Object.values(data).flat();
    const savedData = jsonData.filter(item => savedPeople.includes(item.id)); // Filter saved items

    cardContainer.innerHTML = ''; // Clear existing content

    savedData.forEach((personData, index) => {
        const cardHTML = generateCard(index, personData);
        cardContainer.innerHTML += cardHTML;
    });

    // Attach event listeners to the new buttons
    document.querySelectorAll('.copy-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const paragraphText = document.querySelector(`[data-target="${targetId}"]`)
                .closest('.card').querySelector('.p-ad').innerText.trim();
            copyText(paragraphText);
        });
    });

    document.querySelectorAll('.save-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            toggleSave(targetId);

            // Remove card if unsaved
            if (!isSaved(targetId)) {
                btn.closest('.card').remove();
                if (document.querySelectorAll('.card').length === 0) {
                    // cardContainer.innerHTML = `<p>No saved content available.</p>`;
                    const cardContainerdemo = document.getElementById('cardgenerate'); 
                    function generateCarddemo(index) {
                        return `
                            <div class="card">
                                <div class="card-content">
                                    <p id="data1" class="p-ad">No shayari saved available...</p>
                                </div>
                                <div class="button-container">
                                    <a id="whatsapp1" class="btn whatsapp-btn"></a>
                                    <button class="btn copy-btn bi bi-copy" data-target="0"></button>
                                    <button class="btn save-btn bi bi-bookmarks" data-target="0"></button>
                                    <button class="btn like-btn bi bi-heart" data-target="0"></button>
                                </div>
                            </div>`;
                    }

                    const gint = 4;
                    for (let i = 1; i <= gint; i++) {
                        const cardHTML = generateCarddemo(i);
                        cardContainerdemo.innerHTML += cardHTML;
                    }
                    // end
                }
            }
        });
    });
})
.catch(error => console.error('Error fetching data:', error));
}

// Call the function to display only saved cards
displaySavedCards();

// Shuffle function to randomize the data order
function shuffle(array) {
for (let i = array.length - 1; i > 0; i--) {
const j = Math.floor(Math.random() * (i + 1));
[array[i], array[j]] = [array[j], array[i]];
}
return array;
}

// Function to copy text to clipboard
function copyText(text) {
if (navigator.clipboard && navigator.clipboard.writeText) {
navigator.clipboard.writeText(text).then(() => {
    alert("Copied to clipboard!");
}).catch(err => {
    console.error("Failed to copy: ", err);
});
} else {
const textarea = document.createElement('textarea');
textarea.value = text;
document.body.appendChild(textarea);
textarea.select();
try {
    document.execCommand('copy');
    alert("Copied to clipboard using fallback!");
} catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
}
document.body.removeChild(textarea);
}
}

// Function to check if a person is saved
function isSaved(personId) {
const savedPeople = JSON.parse(localStorage.getItem('savedPeople')) || [];
return savedPeople.includes(personId);
}

// Function to toggle save status in localStorage
function toggleSave(personId) {
let savedPeople = JSON.parse(localStorage.getItem('savedPeople')) || [];

if (savedPeople.includes(personId)) {
savedPeople = savedPeople.filter(id => id !== personId);
} else {
savedPeople.push(personId);
}

localStorage.setItem('savedPeople', JSON.stringify(savedPeople));
}

// Function to check if a person is liked
function isLiked(personId) {
const likedPeople = JSON.parse(localStorage.getItem('likedPeople')) || [];
return likedPeople.includes(personId);
}

// Function to toggle like status in localStorage
function toggleLike(personId) {
let likedPeople = JSON.parse(localStorage.getItem('likedPeople')) || [];

if (likedPeople.includes(personId)) {
likedPeople = likedPeople.filter(id => id !== personId);
} else {
likedPeople.push(personId);
}

localStorage.setItem('likedPeople', JSON.stringify(likedPeople));
}
