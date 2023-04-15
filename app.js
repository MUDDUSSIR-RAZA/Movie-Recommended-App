(async function () {
    const response = await fetch("./data.json");
    const movieData = await response.json();


    let btn = document.getElementById("search");
    let genreSelect = document.getElementById("genre");
    let yearSelect = document.getElementById("year");
    let languageSelect = document.getElementById("language");
    let ratingSelect = document.getElementById("rating");

    movieData.forEach(function (movie) {
        movie.genres.forEach(function (genre) {
            const option = document.createElement("option");
            option.value = genre;
            option.textContent = genre;
            genreSelect.appendChild(option);
        });

        let releaseYear = new Date(movie.release_date).getFullYear();
        const yearOption = document.createElement("option");
        yearOption.value = releaseYear;
        yearOption.textContent = releaseYear;
        yearSelect.appendChild(yearOption);

        const languageOption = document.createElement("option");
        languageOption.value = movie.original_language;
        languageOption.textContent = movie.original_language;
        languageSelect.appendChild(languageOption);

        const ratingOption = document.createElement("option");
        ratingOption.value = movie.vote_average;
        ratingOption.textContent = movie.vote_average;
        ratingSelect.appendChild(ratingOption);
    });



    function search() {
        let genreValue = genreSelect.value.toLowerCase();
        let yearValue = yearSelect.value.toLowerCase();
        let languageValue = languageSelect.value.toLowerCase();
        let ratingValue = ratingSelect.value.toLowerCase();


        const results = movieData.filter(function (data) {
            return (data.genres.join("").toLowerCase().includes(genreValue) &&
                data.release_date.includes(yearValue) &&
                data.original_language.includes(languageValue) &&
                data.vote_average.toString().includes(ratingValue)
            )

        });
        displayResult(results);
    }

        const rankList = document.getElementById("rankList");
        const movieList = document.getElementById("movieList");
        const yearList = document.getElementById("yearList");


        function displayResult(results) {
            movieList.innerHTML = "";
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
                li.innerHTML = movieItem;
                movieList.appendChild(li);


                results.forEach(function (movie) {
                    yearList.innerHTML = "";
                    const liList = document.createElement("li");
                    let liListYear = new Date(movie.release_date).getFullYear();
                    const yearItem = liListYear;
                    liList.innerHTML = yearItem;
                    yearList.appendChild(liListYear);

                })
            })
        }
    

    btn.addEventListener("click", search);

})();