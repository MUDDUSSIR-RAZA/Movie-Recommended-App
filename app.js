(async function () {

    // Fetching movie data from JSON file
    const response = await fetch("./data.json");
    const movieData = await response.json();

    // Retrieving all the select elements from the DOM
    let genreSelect = document.getElementById("genre");
    let yearSelect = document.getElementById("year");
    let languageSelect = document.getElementById("language");
    let ratingSelect = document.getElementById("rating");
    let rankList = document.getElementById("rankList");
    let movieList = document.getElementById("movieList");
    let yearList = document.getElementById("yearList");


    /////////////////////////////////////////////////////////For year drop down list\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


    let genArr = [];
    movieData.forEach(function (movie) {
        let genre = movie.genres;
        if (Array.isArray(genre)) {
            for (i = 0; i < genre.length; i++) {
                let oneMovie = genre[i];
                if (!genArr.includes(oneMovie)) {
                    genArr.push(oneMovie);
                }
            }
        }
        else {
            if (!genArr.includes(genre)) {
                genArr.push(genre);
            }
        }
    });
    for (i = 0; i < genArr.length; i++) {
        let onlyOneGenre = genArr[i];
        const genreOption = document.createElement("option");
        genreOption.value = onlyOneGenre;
        genreOption.textContent = onlyOneGenre;
        genreSelect.appendChild(genreOption);
    }




    /////////////////////////////////////////////////////////For year drop down list\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    let yearArr = [];
    movieData.forEach(function (movie) {
        let releaseYear = new Date(movie.release_date).getFullYear();
        if (!yearArr.includes(releaseYear)) {
            yearArr.push(releaseYear);
        }
    });
    let filterYear = yearArr.sort(function (a, b) {
        return a - b
    })
    for (i = 0; i < filterYear.length; i++) {
        let onlyOneYear = filterYear[i];
        const yearOption = document.createElement("option");
        yearOption.value = onlyOneYear;
        yearOption.textContent = onlyOneYear;
        yearSelect.appendChild(yearOption);
    }


    /////////////////////////////////////////////////////////For Language drop down list\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\



    let langArr = [];
    movieData.forEach(function (movie) {
        if (!langArr.includes(movie.original_language)) {
            langArr.push(movie.original_language);
        }
    });
    for (i = 0; i < langArr.length; i++) {
        let onlyOneRating = langArr[i];
        const languageOption = document.createElement("option");
        languageOption.value = onlyOneRating;
        languageOption.textContent = onlyOneRating;
        languageSelect.appendChild(languageOption);
    }


    /////////////////////////////////////////////////////////For Rating drop down list\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


    let ratingArr = [];
    movieData.forEach(function (movie) {
        if (!ratingArr.includes(movie.vote_average)) {
            ratingArr.push(movie.vote_average);
        }
    });
    let filterRating = ratingArr.sort(function (a, b) {
        return a - b
    })
    for (i = 0; i < filterRating.length; i++) {
        let onlyOneRating = filterRating[i];
        const ratingOption = document.createElement("option");
        ratingOption.value = onlyOneRating;
        ratingOption.textContent = onlyOneRating;
        ratingSelect.appendChild(ratingOption);
    }


    /////////////////////////////////////////////////////////Filtered search\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\




    function filteredSearch() {
        let filteredMovies = movieData;

        if (genreSelect.value !== "all") {
            filteredMovies = filteredMovies.filter(movie => {
                if (Array.isArray(movie.genres)) {
                    for (i = 0; i < movie.genres.length; i++) {
                        let genreLenth = movie.genres[i];
                        if (movie.genres.includes(genreLenth)) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                } else if (movie.genres === genreSelect.value) {
                    return true;
                } else {
                    return false;
                }
            });
        }

        if (yearSelect.value !== "all") {
            filteredMovies = filteredMovies.filter(movie => {
                let movieYear = new Date(movie.release_date).getFullYear();
                if (movieYear === yearSelect.value);
                return true;
            }
            )
        }

        if (languageSelect.value !== "all") {
            filteredMovies = filteredMovies.filter(movie => movie.original_language === languageSelect.value);
        }

        if (ratingSelect.value != "all") {
            filteredMovies = filteredMovies.filter(movie => movie.vote_average >= parseFloat(ratingSelect.value));
        }

        displayMovies(filteredMovies);
    }



    let rankItem = 1;
    function displayMovies(results) {
  console.log(results);
        results.forEach(function (movie) {

            const rankLi = document.createElement("li");
            rankLi.innerHTML = rankItem;
            rankList.appendChild(rankLi);

            const movieLi = document.createElement("li");
            const movieItem = `
                <img src="https://www.themoviedb.org/t/p/original${movie.poster_path}"
                alt="${movie.tagline}">
                <div>
                <div><h4>${movie.title}</h></div>
                <div><p><span class="certification">${movie.certification}</span><span> ${movie.genres.map(function (genres) {
                return " " + genres
            }).join(",")}</span></p></div>
                </div>
          `;


            movieLi.innerHTML = movieItem;
            movieList.appendChild(movieLi);


            const liList = document.createElement("li");

            let liListYear = new Date(movie.release_date).getFullYear();
            liList.innerHTML = liListYear;
            yearList.appendChild(liList);

            rankItem++;
        })
    }


    genreSelect.addEventListener("change", filteredSearch);
    yearSelect.addEventListener("change", filteredSearch);
    languageSelect.addEventListener("change", filteredSearch);
    ratingSelect.addEventListener("change", filteredSearch);

    filteredSearch();


})();
