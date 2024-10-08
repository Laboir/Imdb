import { useEffect, useState } from "react";
// import Card from "../Card/Card";
import { useParams } from "react-router-dom";
import Card from "../Card/Card";
import { Slider } from "../../Pages/Home/Homepage";

export default function Movielist() {
  const [movieList, setMovieList] = useState([]);
  const { type } = useParams();

  useEffect(() => {
    ApiDate(setMovieList, type);
  }, [type]);

  return (
    <>
      <Slider apidata={movieList} />
      <div>
        <div className="card-main-container flex flex-wrap gap-6 border-none outline-none mx-auto mt-10 justify-around ">
          {movieList.map((card) => {
            return (
              <div key={card.id}>
                <Card
                  key={card.id}
                  img={`https://image.tmdb.org/t/p/original${card.poster_path}`}
                  title={card.title}
                  overview={card.overview}
                  id={card.id}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

function ApiDate(setMovieList, type) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzhkM2I4YTc2YjVmNTUyY2ZjNzVmNWU5ZWIyNDcwNCIsIm5iZiI6MTcyODIxNzE2My43OTA3ODgsInN1YiI6IjY2ZjJlN2M2YzIzNzI1OGU0YzI3MDQ0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OrrbdQBql6EB6EQoYj9T60ddoe3lrcoGMJ24HgWlU_0",
    },
  };

  fetch(
    `https://api.themoviedb.org/3/movie/${
      type ? type : "popular"
    }?language=en-US&page=1`,
    options
  )
    .then((response) => response.json())
    .then((response) => setMovieList(response.results))
    .catch((err) => console.error(err));
}
