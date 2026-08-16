const taskForm = document.getElementById('taskForm');
const taskTitle = document.getElementById('taskTitle');
const taskDesc = document.getElementById('taskDesc');
const poolDropzone = document.getElementById('poolDropzone');
const dropzones = document.querySelectorAll('.day-dropzone, .pool-dropzone');

// Form Submit to Create Flashcard
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    createFlashcard(taskTitle.value, taskDesc.value);
    
    // Reset form fields
    taskTitle.value = '';
    taskDesc.value = '';
});

// Function to create a Flashcard element
function createFlashcard(title, description) {
    const card = document.createElement('div');
    card.classList.add('flashcard');
    card.setAttribute('draggable', 'true');
    
    // Using setHTMLUnsafe for easy rendering of internal structural elements
    card.setHTMLUnsafe(`
        <button class="delete-btn">&times;</button>
        <h4>${title}</h4>
        <p>${description}</p>
    `);

    // Delete Event
    card.querySelector('.delete-btn').addEventListener('click', () => {
        card.remove();
    });

    // Drag Events for the Card
    card.addEventListener('dragstart', () => {
        card.classList.add('dragging');
    });

    card.addEventListener('dragend', () => {
        card.classList.remove('dragging');
    });

    // Put it in the main task container initially
    poolDropzone.appendChild(card);
}

// Setup Dropzone Events
dropzones.forEach(zone => {
    zone.addEventListener('dragover', (e) => {
        e.preventDefault(); // Required to allow dropping cards
        zone.classList.add('hovered');
    });

    zone.addEventListener('dragleave', () => {
        zone.classList.remove('hovered');
    });

    zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.classList.remove('hovered');
        const draggingCard = document.querySelector('.dragging');
        if (draggingCard) {
            zone.appendChild(draggingCard);
        }
    });
});