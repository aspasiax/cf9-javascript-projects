/**
 * Movie Search Application
 * Handles movie data fetching from OMDB API with debouncing logic.
 */

$(function() {
    let debounceTimeout = null;

    /**
     * Event listener for search input with debouncing to limit API calls.
     */
    $('#searchInput').on('input', function() {
        clearTimeout(debounceTimeout);
        // Wait 1500ms after the user stops typing before fetching
        debounceTimeout = setTimeout(() => getMovie(this.value.trim()), 1500);
    });

    /**
     * Toggle extended movie information.
     */
    $('#showMore').on('click', function(e) {
        e.preventDefault();
        onShowMoreClicked();
    });
});

/**
 * Validates input and initiates the movie fetch process.
 */
function getMovie(title) {
    if (!title) return;

    onBeforeSend();
    fetchMovieFromApi(title);
}

/**
 * Fetches movie data from OMDB API using Axios.
 */
function fetchMovieFromApi(title) {
    axios.get(`https://www.omdbapi.com/?t=${title}&apikey=thewdb`)
    .then(response => {
        handleResults(response.data);
    })
    .catch(error => {
        console.error('Error fetching movie data:', error.message);
        onApiError();
    });
}

/**
 * Processes API response and updates UI components.
 */
function handleResults(data) {
    if (data.Response === 'True') {
        render(data);
        hideComponent('#waiting');
    } else {
        hideComponent('#waiting');
        showComponent('#notFound');
    }
}

/**
 * UI State: Pre-fetch setup.
 */
function onBeforeSend() {
    showComponent('#waiting');
    hideComponent('#movie');
    hideComponent('#notFound');
    hideComponent('#error');
}

/**
 * UI State: API error handling.
 */
function onApiError() {
    hideComponent('#waiting');
    showComponent('#error');
}

/**
 * Utility to show a hidden element.
 */
function showComponent(component) {
    return $(component).removeClass('hidden');
}

/**
 * Utility to hide an element.
 */
function hideComponent(component) {
    return $(component).addClass('hidden');
}

/**
 * Handles the "Show More" animation using jQuery's slideToggle.
 */
function onShowMoreClicked() {
    $('.extended').slideToggle(1000);
}

/**
 * Renders movie data into the DOM.
 */
function render(data) {
    const imdbURL = `https://www.imdb.com/title/${data.imdbID}/`;
    $('#imdbId').attr('href', imdbURL);

    $('#title').text(data.Title);
    $('#year').text(`Year: ${data.Year}`);
    $('#runtime').text(`Runtime: ${data.Runtime}`);
    $('#genre').text(`Genre: ${data.Genre}`);
    $('#imdbRating').text(data.imdbRating);
    $('#plot').text(data.Plot);
    
    // Detailed info
    $('#director span').text(data.Director);
    $('#actors span').text(data.Actors);
    $('#production span').text(data.Production);
    $('#boxOffice span').text(data.BoxOffice);
    $('#language span').text(data.Language);
    $('#rated span').text(data.Rated);

    const $poster = $('#image');
    $poster.attr('src', data.Poster !== 'N/A' ? data.Poster : './img/no-image.png');
    $poster.attr('alt', data.Title);

    showComponent('#movie');
}