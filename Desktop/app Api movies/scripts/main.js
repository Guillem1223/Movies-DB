import { global } from "./global.js";
let seccion = "popular";
let lan = "es-ES";
const popularMovies = document.getElementById("popularMovies");
popularMovies.addEventListener("click", () => {
  seccion = "popular";
  getPopularMovies();
});

const upComingMovies = document.getElementById("upComing");
upComingMovies.addEventListener("click", () => {
  seccion = "upComing";
  getUpComingMovies();
});
const topRated = document.getElementById("topRated");
topRated.addEventListener("click", () => {
  seccion = "topRated";
  getTopRated();
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

// cambio de idioma
document.getElementById("select-lang").addEventListener("change", (ev) => {
  lan = ev.target.value;
  console.log("Nuevo idioma: ", lan);
  if (seccion == "popular") {
    getPopularMovies(lan);
    console.log("Nuevo idioma: ", lan);
  } else if (seccion == "upComing") {
    getUpComingMovies(lan);
  } else if (seccion == "topRated") {
    getTopRated(lan);
  } else if (seccion.includes("details_")) {
    // .split crea un array usando como separador lo que esta en parentesis y .pop borra el ultimo indice del array
    let idMovieDetails = seccion.split("details_").pop();
    getDetails(idMovieDetails);
  }
});

// llamada a la API para las peliculas
const getPopularMovies = async () => {
  const api = `${global.baseUrl}/movie/popular?api_key=${global.apiKey}&language=${lan}&page=1`;
  console.log(lan);
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

const getTopRated = async () => {
  console.log("me has llamado");
  const api = `${global.baseUrl}/movie/top_rated?api_key=${global.apiKey}&language=${lan}&page=1`;
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
    <div class="movie" id='${movie.id}'>
    
      <img src="${global.imageUrl}/w185/${movie.poster_path}" alt="" />
      <h3 class = movieInfo>${movie.title}</h3>
      <p class = movieInfo>${movie.release_date}</p>
      <div id="vote">${movie.vote_average}</div>

    </div>
    `;
  }
  root.innerHTML = resultado;
  addingEnterFunction();
};
function addingEnterFunction() {
  const uiMovies = document.getElementsByClassName("movie");
  Array.from(uiMovies).forEach((movie) => {
    movie.addEventListener("click", () => {
      getDetails(movie.id);
    });
  });
}
const getDetails = async (id) => {
  console.log("detalles de cada pelicula", id);

  const api = `${global.baseUrl}/movie/${id}?api_key=${global.apiKey}&language=${lan}`;
  seccion = `details_${id}`;
  const res = await axios.get(api);
  console.log(res.data);
  renderDetails(res.data);
};
const renderDetails = (resdata) => {
  const root = document.getElementById("movies");
  root.innerHTML = `
  <h1 id = tituloPeli>${resdata.title}<h1>
  <p id =sinopsis>${resdata.overview}<p>
  <img src="${global.imageUrl}/w185/${resdata.poster_path}" alt="" />
  
  `;
  console.log(resdata.title);
};
console.log("Cargando datos...");
getPopularMovies();

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
