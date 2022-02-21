const api_key = "&api_key=61d3a291811a4b6a63c44806ed77d53a";
const urlStart = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc${api_key}`;
const urlSearch = `https://api.themoviedb.org/3/search/movie?query=${api_key}`;

async function getData(url) {
   const res = await fetch(url);
   const data = await res.json();
   showMovies(data);
   console.log(data);
}
getData(urlStart);

// вывод карточек фильмов

function showMovies(data) {
   const moviesContainer = document.querySelector('.cards');
   moviesContainer.innerHTML = '';
   data.results.forEach((movie) => {
      const card = `<li class="cards__item">
                        <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="poster movie" class="cards__image">
                        <p class="cards__title">${movie.original_title}</p>
                        <div class="cards__block">
                           <button type="button" class="cards__discription-button">discription</button>
                           <a href="" class="cards__link">Kinopoisk</a>
                           <p class="cards__mark cards__mark--${voteColor(movie.vote_average)}">${movie.vote_average}</p>
                        </div>
                        <p class="cards__discription">${movie.overview}</p>
                     </li>`
      moviesContainer.insertAdjacentHTML('beforeend', card)
   });

   // показ описания к фильму

   const discriptionBtn = document.querySelectorAll('.cards__discription-button');
   const discription = document.querySelectorAll('.cards__discription');

   discriptionBtn.forEach((btn, index) => {
      btn.addEventListener('click', () => {
         discription[index].classList.toggle('active');
      })
   })
}

// поиск фильмов через инпут

const form = document.querySelector('.form');
const search = document.querySelector('.form__input');

const apiSearchUrl = `https://api.themoviedb.org/3/search/movie?query=${search.value}${api_key}`;
console.log(apiSearchUrl);

form.addEventListener('submit', (evt) => {
   evt.preventDefault();
   const apiSearchUrl = `https://api.themoviedb.org/3/search/movie?query=${search.value}${api_key}`;
   if (search.value) {
      getData(apiSearchUrl);
   }
})

// покраска рейтинга

function voteColor(vote) {
   if (vote >= 7) {
      return "green"
   } else if (vote >= 6) {
      return "orange"
   } else {
      return "red"
   }
}
