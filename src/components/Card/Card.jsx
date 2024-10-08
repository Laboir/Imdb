import { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";

/* eslint-disable react/prop-types */
export default function Card({ img, title, overview, id }) {
  const [isLoading, setLoading] = useState(true);
  // const { id } = useParams;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);
  return (
    <>
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <DisplayCard img={img} title={title} overview={overview} id={id} />
      )}
    </>
  );
}

function SkeletonLoader() {
  return (
    <div className=" card bg-black flex  gap-4   w-[200px] h-[300px]   ">
      <SkeletonTheme color="#202020" highlightColor="#444">
        <Skeleton height={300} duration={2} />
      </SkeletonTheme>
    </div>
  );
}

function DisplayCard({ id, overview, img, title }) {
  return (
    <>
      <Link to={`/movie/${id}`}>
        <div
          className={`hover:scale-110 transition-all bg-black cards relative card rounded-[5x] shadow-sm poster h-[300px] cursor-pointer`}
        >
          <img
            className="rounded-[5px] w-full object-contain h-full"
            src={img}
          />

          <OverFlowText title={title} overview={overview} />
        </div>
      </Link>
    </>
  );
}

function OverFlowText({ title, overview }) {
  return (
    <div className="card-overflow flex flex-col gap-2 transition-all opacity-0 absolute bottom-[24px] left-3 h-full  justify-end ">
      <h1 className={`text-[19px]  text-white font-semibold`}>{title}</h1>
      <p className={``}>
        {overview.length > 80 ? overview.slice(1, 60) + "..." : overview}
      </p>
    </div>
  );
}
