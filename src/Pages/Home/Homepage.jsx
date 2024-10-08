/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Card from "../../components/Card/Card";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
export default function Homepage() {
  const [apidata, setApiData] = useState([]);

  console.log(apidata);
  CallApiData(setApiData);
  return (
    <>
      <div className=" relative">
        {/* Carousel */}

        <Slider apidata={apidata} />
        <div className=" card-main-container  flex flex-wrap w  gap-6 border-none outline-none mx-auto mt-10 justify-around ">
          {apidata.map((card) => {
            return (
              <Card
                key={card.id}
                img={`https://image.tmdb.org/t/p/original${card.poster_path}`}
                title={card.title}
                overview={card.overview}
                id={card.id}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export function CallApiData(setApiData) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzhkM2I4YTc2YjVmNTUyY2ZjNzVmNWU5ZWIyNDcwNCIsIm5iZiI6MTcyNzg1Mjk1My42MjQxMTEsInN1YiI6IjY2ZjJlN2M2YzIzNzI1OGU0YzI3MDQ0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SzHvNn62E4jmyaFEg24hTz77p7BXingKfIvh4evLY8s",
    },
  };

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
        options
      );
      const data = await res.json();
      setApiData(data.results);
    }

    fetchData();
  }, []);
}

export function Slider({ apidata }) {
  return (
    <>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        transitionTime={5}
        showStatus={false}
        showThumbs={false}
        showArrows={false}
      >
        {apidata.map((card) => {
          return (
            <>
              <div key={card.id} className="h-full  max-h-[600px]  poster ">
                <img
                  className=" w-full   "
                  src={
                    `https://image.tmdb.org/t/p/original` + card.backdrop_path
                  }
                />
              </div>

              <MovieHeadingData
                title={card.original_title}
                relaseDate={card.release_date}
                overview={card.overview}
              />
            </>
          );
        })}
      </Carousel>
    </>
  );
}

function MovieHeadingData({ title, relaseDate, overview, id }) {
  return (
    <div className="  slider-overlay absolute    bottom-[100px]  flex flex-col gap-6 left-16">
      <h1 className="text-5xl  text-left font-bold  title "> {title} </h1>

      <p className=" text-left text-[1.2rem] release-date"> {relaseDate} </p>
      <p className=" overview   text-white italic  max-w-[600px] w-full pr-[5rem]  text-justify  flex flex-wrap">
        {overview}
      </p>
    </div>
  );
}
