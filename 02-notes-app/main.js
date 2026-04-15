/**
 * Global constants for date formatting.
 */
const daysEN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthsEN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/**
 * Application State
 */
let notes = [];
let nextId = 1;

/**
 * Initializes the application on DOM load.
 */
window.addEventListener('DOMContentLoaded', function() {
    const inputNote = document.querySelector('#inputNote');
    const addButton = document.querySelector('#addNoteBtn');

    // Interval to update the date and time every second
    this.setInterval(() => printDate(), 1000);

    const getNoteValue = () => inputNote.value.trim();

    /**
     * Factory function to create a new note object.
     */
    const getNewNote = () => ({
        key: nextId,
        note: getNoteValue(),
        softDeleted: false
    });

    // Event Listeners
    addButton.addEventListener('click', () => {
        onInsertHandler(getNewNote());
        inputNote.value = '';
    });

    inputNote.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            onInsertHandler(getNewNote());
            inputNote.value = '';
        }
    });

    renderNotes();
});

/**
 * Updates the header with current date and time.
 */
function printDate() {
    const now = new Date();
    const pad = n => String(n).padStart(2, '0');

    const dateStr = `${daysEN[now.getDay()]}, ${now.getDate()} ${monthsEN[now.getMonth()]} ${now.getFullYear()}`;
    const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    
    const dateTxtEl = document.getElementById('datetxt');
    if (dateTxtEl) {
        dateTxtEl.innerHTML = `${dateStr}<br>${timeStr}`;
    }
}

/**
 * Logic Controller for inserting a note.
 */
function onInsertHandler(noteObj) {
    if (!noteObj?.note) return;
    insertNote(noteObj);
    renderNotes();
}

/**
 * Model function to update state (Immutable).
 */
function insertNote(noteObj) {
    notes = [...notes, noteObj];
    nextId++;
}

/**
 * Updates the completion status of a note.
 */
function strikeThrough(key) {
    notes = notes.map(noteObj => 
        noteObj.key === key ? {...noteObj, softDeleted: !noteObj.softDeleted } : noteObj
    );
    renderNotes();
}

/**
 * Removes a note from the state.
 */
function deleteNote(key) {
    notes = notes.filter(noteObj => noteObj.key !== key);
    renderNotes();
}

/**
 * View function to render the notes list.
 */
function renderNotes() {
    const notesContainer = document.querySelector('#notesWrapper');
    if (!notesContainer) return;
    
    notesContainer.textContent = '';
    notes.forEach(noteObj => notesContainer.appendChild(createNoteElement(noteObj)));
}

/**
 * Component-like function to create a note element.
 */
function createNoteElement(noteObj) {
    const div = document.createElement('div');
    div.id = 'noteTemplate' + noteObj.key;
    div.className = 'flex justify-between items-center p-2 border-b border-black bg-white hover:bg-gray-50';

    const checkbox = document.createElement('input');
    checkbox.id = 'checkbox' + noteObj.key;
    checkbox.type = 'checkbox';
    checkbox.className = 'cursor-pointer';
    checkbox.checked = noteObj.softDeleted;
    checkbox.addEventListener('click', () => strikeThrough(noteObj.key));

    const label = document.createElement('label');
    label.htmlFor = checkbox.id;
    label.textContent = noteObj.note;
    label.className = `flex-1 mx-3 break-words cursor-pointer ${noteObj.softDeleted ? 'line-through text-gray-400' : 'text-gray-800'}`;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✕';
    deleteBtn.className = 'w-8 h-8 flex items-center justify-center rounded-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors';
    deleteBtn.addEventListener('click', () => deleteNote(noteObj.key));

    div.appendChild(checkbox);
    div.appendChild(label);
    div.appendChild(deleteBtn);
    
    return div;
}