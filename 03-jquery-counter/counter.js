/**
 * Global constant for the initial counter value.
 */
const DEFAULT = 0;

/**
 * The application state representing the current count.
 */
let counter = DEFAULT;

/**
 * Entry point using jQuery ready function.
 * Initializes event listeners.
 */
$(function() {
    $('#btnIncr').on('click', () => onIncreaseClicked());
    $('#btnReset').on('click', () => onResetClicked());
    $('#btnDecr').on('click', () => onDecreaseClicked());
    
    // Initial render to set starting value
    render();
});

// Controllers 

/**
 * Handles the increase button click event.
 */
function onIncreaseClicked() {
    increaseCounter();
}

/**
 * Handles the reset button click event.
 */
function onResetClicked() {
    resetCounter();
}

/**
 * Handles the decrease button click event.
 */
function onDecreaseClicked() {
    decreaseCounter();
}

// Model 

/**
 * Increments the counter state and triggers a re-render.
 */
function increaseCounter() {
    counter++;
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
 * Decrements the counter state and triggers a re-render.
 */
function decreaseCounter() {
    counter--;
    render();
}

// View 

/**
 * Updates the UI to reflect the current state of the counter using jQuery.
 */
function render() {
    const $counter = $('#counter');
    $counter.text(counter);
    styleCounterElement($counter);
}

/**
 * Applies color styling to the counter element based on its value.
 * Utilizes jQuery's toggleClass for efficient class management.
 */
function styleCounterElement($counter) {
    $counter.toggleClass('color-green', counter > 0);
    $counter.toggleClass('color-red', counter < 0);
    $counter.toggleClass('color-black', counter === 0);
}