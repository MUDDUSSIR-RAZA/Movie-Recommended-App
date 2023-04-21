(async function () {


    // This code fetches the data from the data.json file and stores it in the movieData variable.
    // The fetch function returns a Promise that resolves with a Response object representing the data.
    const response = await fetch("data.json");

    // The json method of the Response object returns a Promise that resolves with the parsed JSON data.
    // This data is then stored in the movieData variable.
    const movieData = await response.json();


    // Get the select elements from the DOM
    const genreSelect = document.getElementById("genre");
    const yearSelect = document.getElementById("year");
    const languageSelect = document.getElementById("language");
    const ratingSelect = document.getElementById("rating");

    // Get the table element from the DOM
    const table = document.getElementById("table");



    // Get all unique options from the movieData array by using flatMap 
    const genreOptions = [...new Set(movieData.flatMap(obj => obj.genres).filter(Boolean))];

    // Get all unique options from the movieData array by using Map 
    const yearOptions = [...new Set(movieData.map(obj => obj.release_date.slice(0, 4)).filter(Boolean))];

    // Get all unique options from the movieData array by using Map 
    const languageOptions = [...new Set(movieData.map(obj => obj.original_language).filter(Boolean))];

    // Get all unique options from the movieData array by using Map 
    const ratingOptions = [...new Set(movieData.map(obj => obj.vote_average).filter(Boolean))];



    // Sort the genre options alphabetically using the sort() method.
    genreOptions.sort();

    // Sort the year options in descending order
    yearOptions.sort((a, b) => b - a);

    // Sort the language options alphabetically using the sort() method.
    languageOptions.sort();

    // Sort the rating options in descending order
    ratingOptions.sort((a, b) => b - a);



    // This function takes two parameters: an array of options to add and a select element where the options will be added.
    function addvalues(addOption, placeOption) {
        // Loop over each option in the addOption array.
        addOption.forEach(addOption => {
            // For each option, create a new option element using createElement().
            const makeOptions = document.createElement("option");
            // Set the innerHTML of the new option to the option value.
            makeOptions.innerHTML = addOption;
            // Set the value of the new option to the option value.
            makeOptions.value = addOption;
            // Append the new option to the placeOption select element.
            placeOption.appendChild(makeOptions);
        })
    }

    // Call the addvalues() function with the appropriate parameters to add each set of options to its respective select element.
    addvalues(genreOptions, genreSelect);
    addvalues(yearOptions, yearSelect);
    addvalues(languageOptions, languageSelect);
    addvalues(ratingOptions, ratingSelect);



    // Set the initial value of rankItem to 1, which will be used to display the rank of each movie in the table.
    let rankItem = 1;

    // This function is called when the user clicks the "Search" button or when a filter criteria is selected. 
    function filteredSearch() {
        // Reset rankItem to 1 and clear the table before adding filtered movies to it.
        rankItem = 1;
        table.innerHTML = "";

        // Create a new array to hold the filtered movies, initially set to the full list of movies.
        let filteredMovies = [];
        filteredMovies = movieData;

        // If the user has selected a specific genre, filter the list to include only movies with that genre.
        if (genreSelect.value !== "all") {
            filteredMovies = filteredMovies.filter(movie => {
                if (Array.isArray(movie.genres)) {
                    return movie.genres.join(" ").includes(genreSelect.value);
                } else {
                    return movie.genres.toLowerCase().includes(genreSelect.value);
                }
            });
        }

        // If the user has selected a specific year, filter the list to include only movies from that year.
        if (yearSelect.value !== "all") {
            filteredMovies = filteredMovies.filter(movie => {
                return movie.release_date.includes(yearSelect.value);
            })
        }

        // If the user has selected a specific language, filter the list to include only movies with that language.
        if (languageSelect.value !== "all") {
            filteredMovies = filteredMovies.filter(movie => {
                return movie.original_language.includes(languageSelect.value);
            });
        }

        // If the user has selected a specific rating, filter the list to include only movies with that rating or higher.
        if (ratingSelect.value != "all") {
            filteredMovies = filteredMovies.filter(movie => {
                return movie.vote_average >= parseFloat(ratingSelect.value);
            });
        }

        // Display the filtered movies in the table.
        displayMovies(filteredMovies);
    }




    // This function is called to display a list of movies in the table.
    function displayMovies(results) {
        console.log(results); // logs the movie results array to the console

        // loops through each movie object in the results array
        results.forEach(function (movie) {

            // creates a new table row element
            const row = document.createElement("tr");

            // creates a new table data element for the movie rank
            const tdRank = document.createElement("td");
            tdRank.className = "rankSection";
            tdRank.innerHTML = rankItem; // assigns the rankItem value to the tdRank element
            row.appendChild(tdRank); // adds the tdRank element to the current row

            // creates a new table data element for the movie details
            const tdMovie = document.createElement("td");
            tdMovie.className = "movieSection";

            //     const movieItem = `
            //         <img src="https://www.themoviedb.org/t/p/original${movie.poster_path}"
            //         alt="${movie.tagline}">
            //             <div  class="movie-details">
            //             <div><h4>${movie.title}</h4></div>
            //             <div><p><span class="certification">${movie.certification}</span><span id="text"> ${movie.genres.map(function (genres) {
            //             return " " + genres
            //         }).join(",")}</span></p></div>
            //             </div>
            //   `;


            // checks if the movie has multiple genres
            if (movie.genres.lenght > 1) {

                // creates the HTML markup for the movie item with multiple genres
                const movieItem = `
                <img src="https://www.themoviedb.org/t/p/original${movie.poster_path}"
                alt="${movie.tagline}">
                    <div  class="movie-details">
                    <div><h4>${movie.title}</h4></div>
                    <div><p><span class="certification">${movie.certification}</span><span id="text"> ${movie.genres.map(function (genres) {
                    return " " + genres
                }).join(",")}</span></p></div>
                    </div>
              `;

                // assigns the HTML markup to the tdMovie element
                tdMovie.innerHTML = movieItem;
                row.appendChild(tdMovie); // adds the tdMovie element to the current row

                // creates a new table data element for the movie year
                const tdYear = document.createElement("td");
                tdYear.className = "yearSection";
                let ListYear = new Date(movie.release_date).getFullYear();
                tdYear.innerHTML = ListYear;
                row.appendChild(tdYear); // adds the tdYear element to the current row

                table.appendChild(row); // adds the current row to the table element

                rankItem++; // increments the rankItem value by 1

            } else { // if the movie has only one genre

                // creates the HTML markup for the movie item with one genre
                const movieItem = `
                <img src="https://www.themoviedb.org/t/p/original${movie.poster_path}"
                alt="${movie.tagline}">
                    <div  class="movie-details">
                    <div><h4>${movie.title}</h4></div>
                    <div><p><span class="certification">${movie.certification}</span><span id="text"> ${movie.genres}</span></p></div>
                    </div>
              `;

                // assigns the HTML markup to the tdMovie element
                tdMovie.innerHTML = movieItem;
                row.appendChild(tdMovie); // adds the tdMovie element to the current row

                // creates a new table data element for the movie year
                const tdYear = document.createElement("td");
                tdYear.className = "yearSection";
                let ListYear = new Date(movie.release_date).getFullYear();
                tdYear.innerHTML = ListYear;
                row.appendChild(tdYear); // adds the tdYear element to the current row

                table.appendChild(row); // adds the current row to the table element

                rankItem++; // increments the rankItem value by 1
            }
        })

    }


    // Add event listeners to each of the dropdown menus, so that the filteredSearch function is called whenever the user changes a value.
    genreSelect.addEventListener("change", filteredSearch);
    yearSelect.addEventListener("change", filteredSearch);
    languageSelect.addEventListener("change", filteredSearch);
    ratingSelect.addEventListener("change", filteredSearch);

    // Call the filteredSearch function to initially display the full list of movies.
    filteredSearch();

})();
