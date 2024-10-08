/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "./header.css";
import { useEffect, useRef, useState } from "react";
import Hamburger from "hamburger-react";

export default function Header() {
  const navigate = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [show, setIsShow] = useState(false);

  function handleClick() {
    setIsShow(!show);
  }

  useEffect(() => {
    function handleScroll() {
      setScrollY(window.scrollY);
      if (window.scrollY >= 80) {
        navigate.current.classList.add("active");
      } else {
        navigate.current.classList.remove("active");
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      ref={navigate}
      className={`z-40 ${scrollY >= 80 ? "text-black" : ""}`}
    >
      <div className="header-child-div">
        <Link to="/">
          <img
            style={{ width: "100px" }}
            src="https://m.media-amazon.com/images/G/01/IMDb/brand/guidelines/imdb/IMDb_Logo_Rectangle_Gold._CB443386186_.png"
            alt="IMDb Logo"
          />
        </Link>

        <Navbar active={"hidden"} active={"desktop-navbar"} />
        {show && <Navbar show={show} active={"mobile-navbar"} />}

        <button onClick={handleClick}>
          <Hamburger />
        </button>
      </div>
    </header>
  );
}

function Navbar({ active }) {
  return (
    <nav className={`${active}   `}>
      <Link to="/movies/popular">Popular</Link>
      <Link to={`/movies/top_rated`}>Top-Rated</Link>
      <Link to="/movies/upcoming">Upcoming</Link>
    </nav>
  );
}
