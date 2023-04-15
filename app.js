// (async function () {
//     const response = await fetch("./data.json");
//     const movieData = await response.json();


//     let btn = document.getElementById("search");
//     let genreSelect = document.getElementById("genre");
//     let yearSelect = document.getElementById("year");
//     let languageSelect = document.getElementById("language");
//     let ratingSelect = document.getElementById("rating");

//     movieData.forEach(function (movie) {
//         movie.genres.forEach(function (genre) {
//             const option = document.createElement("option");
//             option.value = genre;
//             option.textContent = genre;
//             genreSelect.appendChild(option);
//         });

//         let releaseYear = new Date(movie.release_date).getFullYear();
//         const yearOption = document.createElement("option");
//         yearOption.value = releaseYear;
//         yearOption.textContent = releaseYear;
//         yearSelect.appendChild(yearOption);

//         const languageOption = document.createElement("option");
//         languageOption.value = movie.original_language;
//         languageOption.textContent = movie.original_language;
//         languageSelect.appendChild(languageOption);

//         const ratingOption = document.createElement("option");
//         ratingOption.value = movie.vote_average;
//         ratingOption.textContent = movie.vote_average;
//         ratingSelect.appendChild(ratingOption);
//     });



//     function search() {
//         let genreValue = genreSelect.value.toLowerCase();
//         let yearValue = yearSelect.value.toLowerCase();
//         let languageValue = languageSelect.value.toLowerCase();
//         let ratingValue = ratingSelect.value.toLowerCase();


//         const results = movieData.filter(function (data) {
//             return (data.genres.join("").toLowerCase().includes(genreValue) &&
//                 data.release_date.includes(yearValue) &&
//                 data.original_language.includes(languageValue) &&
//                 data.vote_average.toString().includes(ratingValue)
//             )

//         });
//         displayResult(results);
//     }

//     const rankList = document.getElementById("rankList");
//     const movieList = document.getElementById("movieList");
//     const yearList = document.getElementById("yearList");


//     function displayResult(results, index) {


//         rankList = "";
//         const rankLiList = document.createElement("li");
//         const rankItem = index + 1;
//         rankLiList.innerHTML = rankItem;
//         rankList.appendChild(rankLiList);


//         movieList.innerHTML = "";
//         results.forEach(function (movie) {
//             const li = document.createElement("li");
//             const movieItem = `
//             <img src="https://www.themoviedb.org/t/p/original${movie.poster_path}"
//             alt="img">
//             <div>
//             <div><h4>${movie.title}</h></div>
//             <div><p>${movie.certification} ${movie.genres.map(function (genres) {
//                 return " " + genres
//             }).join(",")}</p></div>
//             </div>
//       `;
//             li.innerHTML = movieItem;
//             movieList.appendChild(li);


//             results.forEach(function (movie) {
//                 yearList.innerHTML = "";
//                 const liList = document.createElement("li");
//                 let liListYear = new Date(movie.release_date).getFullYear();
//                 const yearItem = liListYear;
//                 liList.innerHTML = yearItem;
//                 yearList.appendChild(liListYear);

//             })
//         })
//     }


//     btn.addEventListener("click", search);

// })();





























(async function () {

    // Fetching movie data from JSON file
    const response = await fetch("./data.json");
    const movieData = await response.json();

    // Retrieving all the select elements from the DOM
    let btn = document.getElementById("search");
    let genreSelect = document.getElementById("genre");
    let yearSelect = document.getElementById("year");
    let languageSelect = document.getElementById("language");
    let ratingSelect = document.getElementById("rating");

    // Looping through movie data to populate the select elements with options
    movieData.forEach(function (movie) {

        // Creating and adding options to the genre select element
        movie.genres.forEach(function (genre) {
            const option = document.createElement("option");
            option.value = genre;
            option.textContent = genre;
            genreSelect.appendChild(option);
        });

        // Creating and adding options to the year select element
        let releaseYear = new Date(movie.release_date).getFullYear();
        const yearOption = document.createElement("option");
        yearOption.value = releaseYear;
        yearOption.textContent = releaseYear;
        yearSelect.appendChild(yearOption);

        // Creating and adding options to the language select element
        const languageOption = document.createElement("option");
        languageOption.value = movie.original_language;
        languageOption.textContent = movie.original_language;
        languageSelect.appendChild(languageOption);

        // Creating and adding options to the rating select element
        const ratingOption = document.createElement("option");
        ratingOption.value = movie.vote_average;
        ratingOption.textContent = movie.vote_average;
        ratingSelect.appendChild(ratingOption);
    });

    // Defining the search function
    function search() {
        // Retrieving the selected values from the select elements
        let genreValue = genreSelect.value.toLowerCase();
        let yearValue = yearSelect.value.toLowerCase();
        let languageValue = languageSelect.value.toLowerCase();
        let ratingValue = ratingSelect.value.toLowerCase();

        // Filtering the movie data based on the selected values
        const results = movieData.filter(function (data) {
            return (data.genres.join("").toLowerCase().includes(genreValue) &&
                data.release_date.includes(yearValue) &&
                data.original_language.includes(languageValue) &&
                data.vote_average.toString().includes(ratingValue)
            )
        });
        // Displaying the search results
        displayResult(results);
    }

    // Retrieving the required list elements from the DOM
    const rankList = document.getElementById("rankList");
    const movieList = document.getElementById("movieList");
    const yearList = document.getElementById("yearList");

    // Function to display the search results
    function displayResult(results, index) {

        // Clearing the previous content of the rank list
        rankList = "";

        // Creating and adding rank list item to the rank list
        const rankLiList = document.createElement("li");
        const rankItem = index + 1;
        rankLiList.innerHTML = rankItem;
        rankList.appendChild(rankLiList);

        // Clearing the previous content of the movie list
        movieList.innerHTML = "";

        // Looping through the search results to display movie information
        results.forEach(function (movie) {
            const li = document.createElement("li");
            const movieItem = `
            <img src="https://www.themoviedb.org/t/p/original${movie.poster_path}"
            alt="img">
            <div>
            <div><h4>${movie.title}</h></div>
            <div><p>${movie.certification} ${movie.genres.map(function (genres) {
                return " " + genres
            }).join(",")}</p></div>
            </div>
      `;

            // Set the inner HTML of the list item to the movie data HTML string
            li.innerHTML = movieItem;

            // Add the list item to the movie list element
            movieList.appendChild(li);

            // Loop through each movie in the search results
            results.forEach(function (movie) {

                // Clear the year list element
                yearList.innerHTML = "";

                // Create a new list item element
                const liList = document.createElement("li");

                // Get the release year of the current movie
                let liListYear = new Date(movie.release_date).getFullYear();

                // Set the text content of the list item to the release year
                const yearItem = liListYear;
                liList.innerHTML = yearItem;

                // Add the list item to the year list element
                yearList.appendChild(liListYear);

            })

        })
    }
    
    
    btn.addEventListener("click", search);
    
    }) ();