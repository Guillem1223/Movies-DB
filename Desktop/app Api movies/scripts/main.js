import { global } from "./global.js";
let seccion = "popular";

const popularMovies = document.getElementById("popularMovies");
popularMovies.addEventListener("click", () => {
  seccion = "popular";
  getPopularMovies();
});

const upComingMovies = document.getElementById("upComing");
upComingMovies.addEventListener("click", () => {
  getUpComingMovies();
});
const getUpComingMovies = async (lan = "es-ES") => {
  const spinnertHtml = document.getElementById("spinner");

  spinnertHtml.style.display = "block";

  await sleep(2000);
  try {
    const res = await axios.get(
      `${global.baseUrl}/movie/upcoming?api_key=${global.apiKey}&language=${lan}&page=1`
    );
    console.log("me has llamado");
    const movies = res.data.results;
    renderMovies(movies);
  } catch (error) {
    console.log("Error");
  }
  spinnertHtml.style.display = "none";
};
const topRated = document.getElementById("topRated");
topRated.addEventListener("click", () => {
  getTopRated();
});

// cambio de idioma
document.getElementById("select-lang").addEventListener("change", (ev) => {
  const lan = ev.target.value;
  console.log("Nuevo idioma: ", lan);
  getPopularMovies(lan);
});
document.getElementById("select-lang").addEventListener("change", (ev) => {
  const lan = ev.target.value;
  console.log("Nuevo idioma: ", lan);
  getUpComingMovies(lan);
});
document.getElementById("select-lang").addEventListener("change", (ev) => {
  const lan = ev.target.value;
  console.log("Nuevo idioma: ", lan);
  getTopRatedMovies(lan);
});

// llamada a la API para las peliculas
const getPopularMovies = async (lan = "es-ES") => {
  const api = `${global.baseUrl}/movie/${seccion}?api_key=${global.apiKey}&language=${lan}&page=1`;

  const spinnertHtml = document.getElementById("spinner");
  spinnertHtml.style.display = "block";
  await sleep(2000);

  try {
    let data = await fetch(api);
    data = await data.json();
    const movies = data.results;
    renderMovies(movies);
  } catch (error) {
    console.log(error);
  }
  spinnertHtml.style.display = "none";
};

const getTopRated = async (lan = "es-ES") => {
  console.log("me has llamado");
  const api = `${global.baseUrl}/movie/top_rated?api_key=${global.apiKey}&${lan}&page=1`;
  const spinnertHtml = document.getElementById("spinner");
  spinnertHtml.style.display = "block";
  await sleep(2000);
  try {
    let data = await fetch(api);
    data = await data.json();
    const movies = data.results;
    console.log(movies);
    renderMovies(movies);
  } catch (error) {
    console.log(error);
  }
  spinnertHtml.style.display = "none";
};

//   fetch(
//     `${global.baseUrl}/movie/${seccion}?api_key=${global.apiKey}&language=${lan}&page=1`
//   )
//   //  .then lo utilizamos para capturar una promesa       res.json es una llamada a una funcion
//     .then((res) => res.json())
//     .then((data) => {
//       console.log("Datos listos");
//       const movies = data.results;
//       renderMovies(movies);
//       console.log(data);
//     })
//     // .catch lo usamos para capturar un error de una promesa
//     .catch((err) => console.log(err));
// };
// renderizar las peliculas en el html

const renderMovies = (movies) => {
  const root = document.getElementById("movies");
  let resultado = "";
  root.innerHTML = "";

  //   root.innerHTML = movies.length;
  for (const movie of movies) {
    resultado += `
    <div class="movie">
      <img src="${global.imageUrl}/w185/${movie.poster_path}" alt="" />
      <h3 class = movieInfo>${movie.title}</h3>
      <p class = movieInfo>${movie.release_date}</p>
      <div id="vote">${movie.vote_average}</div>

    </div>
    `;
  }
  root.innerHTML = resultado;
};
console.log("Cargando datos...");
getPopularMovies();

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
