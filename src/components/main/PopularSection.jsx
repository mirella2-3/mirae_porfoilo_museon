import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import PopularItem from "./PopularItem";
import "swiper/css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const PopularSection = () => {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR`
      );
      const data = await res.json();
      setPopular(data.results);
    };
    fetchMovies();
  }, []);

  return (
    <section id="CardList" className="PopularSection">
      <div className="inner">
        <h1>Popular</h1>
        <Swiper
          id="CardSwiper"
          slidesPerView={7}
          spaceBetween={30}
          loop
          grabCursor
        >
          {popular.map((data) => (
            <SwiperSlide key={data.id}>
              <PopularItem
                id={data.id}
                img={data.poster_path}
                overview={data.overview}
                title={data.title}
                release={data.release_date}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default PopularSection;
