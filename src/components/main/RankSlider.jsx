import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swiper from "swiper";
import "swiper/swiper-bundle.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const RankSlider = () => {
  const [movies, setMovies] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [rankTopSwiper, setRankTopSwiper] = useState(null);
  const navigate = useNavigate();

  const onClick = (movie) => {
    navigate(`/detail/${movie.id}`);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&region=KR&page=1`
        );
        const data = await res.json();
        const topMovies = data.results.slice(0, 5);

        // 각 영화 디테일 호출 (병렬 처리)
        const detailedMovies = await Promise.all(
          topMovies.map(async (movie) => {
            const detailRes = await fetch(
              `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&language=ko-KR`
            );
            const detailData = await detailRes.json();
            return { ...movie, ...detailData };
          })
        );

        setMovies(detailedMovies);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    if (movies.length === 0) return;

    const rankThumbs = new Swiper(".rank-thumbs", {
      direction: "horizontal",
      spaceBetween: 10,
      slidesPerView: 5,
      watchSlidesProgress: true,
      watchOverflow: true,
      slideToClickedSlide: true,
    });

    const topSwiper = new Swiper(".rank-top", {
      direction: "horizontal",
      spaceBetween: 10,
      a11y: {
        prevSlideMessage: "Previous slide",
        nextSlideMessage: "Next slide",
      },
      keyboard: {
        enabled: true,
      },
      thumbs: {
        swiper: rankThumbs,
      },
      on: {
        slideChange: function () {
          setSelectedIndex(this.activeIndex);
        },
      },
    });

    setRankTopSwiper(topSwiper);

    return () => {
      if (rankThumbs?.destroy) rankThumbs.destroy(true, true);
      if (topSwiper?.destroy) topSwiper.destroy(true, true);
    };
  }, [movies]);

  // 선택된 영화
  const selectedMovie = movies[selectedIndex] || {};

  return (
    <div id="rankSlider" className="swiper-container-wrapper">
      <div className="inner">
        <h1>
          오늘의 한국인기 <strong>TOP5</strong>
        </h1>
        <div className="wrap">
          {/* 메인 슬라이더 */}
          <div className="swiper-container rank-top">
            <div className="swiper-wrapper">
              {movies.length === 0 && <div>Loading...</div>}
              {movies.map((movie) => (
                <div className="swiper-slide" key={movie.id}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    style={{
                      width: "100%",
                      borderRadius: "8px",
                      marginBottom: 10,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="rightBox">
            <div className="textBox">
              <h2>
                {selectedMovie.title || "title"}{" "}
                <span>
                  ({selectedMovie.release_date?.slice(0, 4) || "release"})
                </span>
              </h2>
              <ul className="icons">
                <li>
                  {selectedMovie.release_date?.slice(0, 4) || "개봉연도 없음"}
                </li>

                <li>{selectedMovie.vote_average?.toFixed(1)} ⭐</li>
              </ul>

              <strong>
                {selectedMovie.overview || "영화 설명이 여기에 표시됩니다."}
              </strong>

              <button onClick={() => onClick(selectedMovie)}>자세히보기</button>
            </div>

            {/* 썸네일 슬라이더 */}
            <div className="swiper-container rank-thumbs">
              <div className="swiper-wrapper">
                {movies.map((movie, idx) => (
                  <div className="swiper-slide swiper-text" key={movie.id}>
                    <img
                      src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
                      alt={movie.title}
                      style={{ width: "100%", borderRadius: "8px" }}
                    />
                    <strong>{idx + 1}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankSlider;
