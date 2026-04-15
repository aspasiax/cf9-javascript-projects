/**
 * Global constant for the initial counter value.
 */
const DEFAULT = 0;

/**
 * The application state representing the current count.
 */
let counter = DEFAULT;

/**
 * Entry point of the application. 
 */
window.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#btnDecr').addEventListener('click', () => onDecreaseClicked());
    document.querySelector('#btnReset').addEventListener('click', () => onResetClicked());
    document.querySelector('#btnIncr').addEventListener('click', () => onIncreaseClicked());
    render();
});

// Controllers

/**
 * Handles the decrease button click event.
 */
function onDecreaseClicked() {
    decreaseCounter();
}

/**
 * Handles the reset button click event.
 */
function onResetClicked() {
    resetCounter();
}

/**
 * Handles the increase button click event.
 */
function onIncreaseClicked() {
    increaseCounter();
}

// Model

/**
 * Decrements the counter state and triggers a re-render.
 */
function decreaseCounter() {
    counter--;
    render();
}

/**
 * Resets the counter state to the default value and triggers a re-render.
 */
function resetCounter() {
    counter = DEFAULT;
    render();
}

/**
 * Increments the counter state and triggers a re-render.
 */
function increaseCounter() {
    counter++;
    render();
}

// View

/**
 * Updates the UI to reflect the current state of the counter.
 */
function render() {
    const counterEl = document.querySelector('#counter');
    if (!counterEl) return;
    
    counterEl.textContent = counter;
    styleCounter(counterEl);
}

/**
 * Applies color styling to the counter element based on its value.
 * Positive numbers appear green, negative red, and zero black.
 */
function styleCounter(counterEl) {
    // Ensure all state-related classes are removed before applying the new one
    counterEl.classList.remove('color-green', 'color-red', 'color-black');
    
    counterEl.classList.add(counter > 0 ? 'color-green' : counter < 0 ? 'color-red' : 'color-black')
}