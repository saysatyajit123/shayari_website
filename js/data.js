// const gint = 35;
function generateCard(index) {
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
                <p id="data${index}" class="p-ad">Loading...</p>
                <p style="text-align:center;margin:0;font-size:23px;">${flowerString}</p>
            </div>
            <div class="button-container">
                <a id="whatsapp${index}" class="btn whatsapp-btn" href="#" target="_blank"></a>
                <button class="btn copy-btn" data-target="${index}"></button>
                <button class="btn save-btn bi bi-bookmarks" data-target=${index}"></button>
                <button class="btn like-btn bi bi-heart" data-target="${index}"></button>
            </div>
        </div>`;
}
//🌸🌻🌺🌼🥀🌼🌻🌸🌺🌹🍀🍂🍁🌷❣💕💞💓
const cardContainer = document.getElementById('cardgenerate');
for (let i = 1; i <= gint; i++) {
    const cardHTML = generateCard(i);
    cardContainer.innerHTML += cardHTML;
}

document.addEventListener("DOMContentLoaded", function () {
    fetch('../data/data.json')
        .then(response => response.json())
        .then(data => {
            const jsonData = data[shayari_id];
            const shuffledData = shuffle(jsonData);

            shuffledData.slice(0, gint).forEach((personData, index) => {
                const personId = personData.id;

                // Update the paragraph text
                document.getElementById('data' + (index + 1)).textContent = personData.shayari;

                // Update the WhatsApp URL
                const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(personData.shayari)}`;
                document.getElementById('whatsapp' + (index + 1)).href = whatsappUrl;

                // Set the data-target attribute with the person's ID for copy and like buttons
                const card = document.querySelector(`.card:nth-child(${index + 1})`);
                card.querySelector('.save-btn').setAttribute('data-target', personId);
                card.querySelector('.copy-btn').setAttribute('data-target', personId);
                card.querySelector('.like-btn').setAttribute('data-target', personId);

                // Set initial like status based on localStorage
                const likeBtn = card.querySelector('.like-btn');
                if (isLiked(personId)) {
                    // likeBtn.classList.remove('bi-heart');
                    // likeBtn.classList.add('bi-heart-fill')
                    likeBtn.classList.toggle('bi-heart-fill');
                    likeBtn.classList.toggle('bi-heart');
                }

                const saveBtn = card.querySelector('.save-btn');
                if  (isSaved(personId)) {
                    // saveBtn.classList.add('saved');
                    // saveBtn.innerText = 'Saved';
                    saveBtn.classList.toggle('bi-bookmarks-fill');
                    saveBtn.classList.toggle('bi-bookmarks');
                }
            });

            // Attach event listeners after dynamically setting attributes
            document.querySelectorAll('.copy-btn').forEach((btn) => {
                btn.addEventListener('click', () => {
                    const targetId = btn.getAttribute('data-target');
                    const paragraphText = document.querySelector(`[data-target="${targetId}"]`)
                        .closest('.card').querySelector('.p-ad').innerText.trim();
                    copyText(paragraphText);
                });
            });

            document.querySelectorAll('.like-btn').forEach((btn) => {
                btn.addEventListener('click', () => {
                    const targetId = btn.getAttribute('data-target');
                    toggleLike(targetId);

                    btn.classList.toggle('bi-heart');
                    btn.classList.toggle('bi-heart-fill');
                    // btn.innerText = btn.classList.contains('liked') ? 'Liked' : 'Like';
                });
            });

            document.querySelectorAll('.save-btn').forEach((btn) => {
                btn.addEventListener('click', () => {
                    const targetId = btn.getAttribute('data-target');
                    toggleSave(targetId);

                    btn.classList.toggle('bi-bookmarks');
                    btn.classList.toggle('bi-bookmarks-fill');
                    // btn.classList.toggle('saved');
                    // btn.innerText = btn.classList.contains('saved') ? 'Saved' : 'Save';
                });
            });

        })
        .catch(error => console.error('Error fetching data:', error));
});

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

// Function to check if a person is liked
function isLiked(personId) {
    const likedPeople = JSON.parse(localStorage.getItem('likedPeople')) || [];
    return likedPeople.includes(personId);
}

// Function to toggle like status in localStorage
function toggleLike(personId) {
    let likedPeople = JSON.parse(localStorage.getItem('likedPeople')) || [];

    if (likedPeople.includes(personId)) {
        // If already liked, remove from the array
        likedPeople = likedPeople.filter(id => id !== personId);
    } else {
        // If not liked, add to the array
        likedPeople.push(personId);
    }

    localStorage.setItem('likedPeople', JSON.stringify(likedPeople));
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


// // Function to clear data references
// function clearData(data) {
//     // Remove all references to the data
//     for (let key in data) {
//         delete data[key];
//     }
// }
