import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import CardItem from "./CardItem";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const NowPlayingSection = () => {
  const [nowPlaying, setNowPlaying] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko-KR`
      );
      const data = await res.json();
      setNowPlaying(data.results);
    };
    fetchMovies();
  }, []);

  return (
    <div id="CardList" className="ListWrap">
      <div className="inner">
        <h1>Now Playing</h1>
        <main>
          <Swiper
            id="CardSwiper"
            slidesPerView={6}
            spaceBetween={30}
            loop={true}
            grabCursor={true}
          >
            {nowPlaying.map((data) => (
              <SwiperSlide key={data.id}>
                <CardItem
                  id={data.id}
                  img={data.poster_path}
                  overview={data.overview}
                  title={data.title}
                  release={data.release_date}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </main>
      </div>
    </div>
  );
};

export default NowPlayingSection;
