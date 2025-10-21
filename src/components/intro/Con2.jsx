"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_IMG_URL = "https://image.tmdb.org/t/p/w780";

const Con2 = () => {
  useEffect(() => {
    // ScrollTrigger 설정
    document.querySelectorAll(".container").forEach((container) => {
      const h1 = container.querySelector("h1");

      ScrollTrigger.create({
        trigger: container,
        pin: h1,
        start: "top 40%",
        end: "bottom center",
        pinSpacing: false,
      });
    });

    // TMDB에서 이미지 가져와서 동적 삽입
    const fetchImages = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1&include_adult=false`
        );
        const data = await res.json();

        // poster_path 있는 애들만 필터링
        const validMovies = data.results.filter(
          (movie) => movie.poster_path !== null
        );

        const imageUrls = validMovies.map(
          (movie) => BASE_IMG_URL + movie.poster_path
        );

        // 배열 랜덤 섞기 (셔플)
        const shuffleArray = (arr) =>
          arr
            .map((a) => ({ sort: Math.random(), value: a }))
            .sort((a, b) => a.sort - b.sort)
            .map((a) => a.value);

        const shuffled = shuffleArray(imageUrls);

        // img-wrapper 요소들 선택
        const firstWrapper = document.getElementById("first-img-wrapper");
        const secondWrapper = document.getElementById("sec-img-wrapper");
        const thirdWrapper = document.getElementById("third-img-wrapper");

        // 6개씩 이미지 할당
        const firstImages = shuffled.slice(0, 6);
        const secondImages = shuffled.slice(6, 12);
        const thirdImages = shuffled.slice(12, 18);

        // 기존 placeholder 이미지 제거
        firstWrapper.innerHTML = "";
        secondWrapper.innerHTML = "";
        thirdWrapper.innerHTML = "";

        // 이미지 넣기 함수
        const appendImages = (wrapper, images) => {
          images.forEach((url) => {
            const img = document.createElement("img");
            img.src = url;
            img.alt = "movie poster";
            wrapper.appendChild(img);
          });
        };

        appendImages(firstWrapper, firstImages);
        appendImages(secondWrapper, secondImages);
        appendImages(thirdWrapper, thirdImages);
      } catch (error) {
        console.error("Failed to fetch images from TMDB:", error);
      }
    };

    fetchImages();

    // cleanup
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div id="content2">
      <div id="content">
        <div className="container">
          <h1>세상에 없던</h1>
          <div id="first-img-wrapper" className="img-wrapper">
            {/* 기존 placeholder 이미지들은 useEffect가 실행되면 제거됨 */}
            <img src="https://placehold.co/400x600" alt="placeholder" />
            <img src="https://placehold.co/400x600" alt="placeholder" />
            <img src="https://placehold.co/400x600" alt="placeholder" />
            <img src="https://placehold.co/400x600" alt="placeholder" />
            <img src="https://placehold.co/400x600" alt="placeholder" />
            <img src="https://placehold.co/400x600" alt="placeholder" />
          </div>
        </div>

        <div className="container">
          <h1>당신의 새로운 즐길 거리</h1>
          <div id="sec-img-wrapper" className="img-wrapper">
            <img src="https://placehold.co/400x600" alt="placeholder" />
            <img src="https://placehold.co/400x600" alt="placeholder" />
            <img src="https://placehold.co/400x600" alt="placeholder" />
            <img src="https://placehold.co/400x600" alt="placeholder" />
            <img src="https://placehold.co/400x600" alt="placeholder" />
            <img src="https://placehold.co/400x600" alt="placeholder" />
          </div>
        </div>

        <div className="container">
          <h1>지금껏 없던 방식으로, 당신을 기다립니다</h1>
          <div id="third-img-wrapper" className="img-wrapper">
            <img src="https://placehold.co/400x600" alt="placeholder" />
            <img src="https://placehold.co/400x600" alt="placeholder" />
            <img src="https://placehold.co/400x600" alt="placeholder" />
            <img src="https://placehold.co/400x600" alt="placeholder" />
            <img src="https://placehold.co/400x600" alt="placeholder" />
            <img src="https://placehold.co/400x600" alt="placeholder" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Con2;
