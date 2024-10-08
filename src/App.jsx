import { Route, Routes, useLocation } from "react-router-dom";
import Homepage from "./Pages/Home/Homepage";
import DetailCard from "./components/Detail4/DetailCard";
import Movielist from "./components/MovieList/Movielist";

import Footer from "./components/Footer/Footer";
import { useState, useEffect } from "react";

export default function App() {
  const location = useLocation(); // Hook to access current route
  const [isHide, setIsHide] = useState(false); // State to control footer visibility

  useEffect(() => {
    if (location.pathname.startsWith("/movie/")) {
      setIsHide(true);
    } else {
      setIsHide(false);
    }
  }, [location]);

  return (
    <div className="App">
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/movie/:id" element={<DetailCard />} />
        <Route path="/movies/:type" element={<Movielist />} />
        <Route path="/*" element={<h1>Error</h1>} />
      </Routes>

      {!isHide && <Footer />}
    </div>
  );
}
