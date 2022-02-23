const api_key = 'bdd283e1-19ba-4195-8fa6-f39fe3885da4';
const urlStart = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1`;
const urlSearch = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=';

async function getData(url) {
   const res = await fetch(url, {
      headers: {
         'X-API-KEY': api_key,
         'Content-Type': 'application/json',
      },
   });
   const data = await res.json();
   console.log(data);

   showMovies(data);

}
getData(urlStart);



// вывод карточек фильмов

function showMovies(data) {
   const moviesContainer = document.querySelector('.cards');
   moviesContainer.innerHTML = '';
   data.films.forEach((movie) => {
      const card = `<li class="cards__item">
                        <img src="${movie.posterUrlPreview}" alt="poster movie" class="cards__image">
                        <h2 class="cards__title">${movie.nameRu}</h2>
                        <div class="cards__block">
                           <button type="button" class="cards__discription-button">Details</button>
                           <a href="https://www.kinopoisk.ru/film/${movie.filmId}" class="cards__link">Kinopoisk</a>
                           <p class="cards__mark cards__mark--${voteColor(movie.rating)}">${movie.rating}</p>
                        </div>
                        <p class="cards__discription">Жанр:${movie.genres.map((genre) => ` ${genre.genre}`)}.<br> Длительность фильма: ${movie.filmLength}.<br> Год выхода: ${movie.year}.</p>
                     </li>`
      moviesContainer.insertAdjacentHTML('beforeend', card)
   });




   // показ описания к фильму

   const discriptionBtn = document.querySelectorAll('.cards__discription-button');
   const discription = document.querySelectorAll('.cards__discription');

   discriptionBtn.forEach((btn, index) => {
      btn.addEventListener('click', () => {
         discription[index].classList.toggle('active');
         btn.classList.toggle('active');
         if (btn.textContent == 'Details') {
            btn.textContent = 'close'
         } else {
            btn.textContent = 'Details'
         }
      })
   })
}

// поиск фильмов через инпут, работа кнопок поиска

const form = document.querySelector('.form');
const search = document.querySelector('.form__input');
const apiSearchUrl = `${urlSearch}${search.value}`;
const resetBtn = document.querySelector('.form__btn-reset');
const submitBtn = document.querySelector('.form__btn-submit');

form.addEventListener('submit', (evt) => {
   evt.preventDefault();
   const apiSearchUrl = urlSearch + search.value;
   if (search.value) {
      getData(apiSearchUrl);
      document.querySelector('.form__btn-reset').classList.remove('visually-hidden');
   }
})

search.addEventListener('input', () => {
   resetBtn.classList.remove('visually-hidden');
})

resetBtn.addEventListener('click', () => {
   resetBtn.classList.add('visually-hidden');
   search.focus();
})

submitBtn.addEventListener('click', () => {
   search.focus();
})

// пагинация

const pageBtn = document.querySelector('.header__btn-page');

function pageCounter() {
   let counter = 1;
   pageBtn.addEventListener('click', () => {
      counter++;
      if (counter <= 10 && search.value) {
         getData(`${urlSearch}${search.value}&page=${counter}`);
         console.log(`${urlSearch}${search.value}&page=${counter}`);
      } else if (counter <= 10) {
         const urlPage = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=${counter}`;
         console.log(urlPage);
         getData(urlPage);
      } else {
         getData(urlStart);
         counter = 1;
      }

   })
}
pageCounter()

// покраска рейтинга

function voteColor(rating) {
   if (rating >= 7) {
      return "green"
   } else if (rating >= 6) {
      return "orange"
   } else {
      return "red"
   }
}