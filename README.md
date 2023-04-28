# Movie-Recommended-App

This is a movie recommendation application that allows users to filter a dataset of movies by genre, year, language, and rating to find a movie that meets their criteria.

## Usage
To use the application, simply open the index.html file in a web browser. The data for the movies is stored in a data.json file which is fetched by the JavaScript code and stored in the movieData variable.

Users can filter the movies by selecting from the options in the dropdown menus for genre, year, language, and rating. Once a user selects one or more filter criteria, they can click the "Search" button to display the movies that meet their criteria in a table.

The table displays the rank of each movie, its title, release date, and rating. Clicking on a movie title will open a popup window that displays additional information about the movie, including its poster image, plot summary, and list of cast members.

## Code
The JavaScript code uses the fetch() method to retrieve the data from the data.json file and stores it in the movieData variable. It then retrieves the necessary DOM elements for the application and creates the options for the dropdown menus by using the Set and Array methods to filter unique values from the movieData variable.

When a user selects filter criteria and clicks the "Search" button, the filteredSearch() function is called to filter the movie data based on the selected criteria. The filtered results are then displayed in a table using the displayMovies() function.

The code also includes a popup() function that creates a popup window when a movie title is clicked, displaying additional information about the movie.
