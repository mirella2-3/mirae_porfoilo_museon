"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(Flip);

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_IMG_URL = "https://image.tmdb.org/t/p/w780";

const Con1 = () => {
  const [images, setImages] = useState([]);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const enterButtonRef = useRef(null);
  const fullviewRef = useRef(null);
  const gridRef = useRef(null);

  // row 별 아이템 수 (총 35 이미지, 5행 x 7개)
  const rows = [7, 7, 7, 7, 7];
  const numRows = rows.length;
  const middleRowIndex = Math.floor(numRows / 2); // 2
  const middleRowItemCount = rows[middleRowIndex]; // 7
  const middleRowItemIndex = Math.floor(middleRowItemCount / 2); // 3

  useEffect(() => {
    // 1. API 데이터 가져오기
    const fetchPopularData = async () => {
      try {
        const movieRes = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`
        );
        const movieData = await movieRes.json();

        const tvRes = await fetch(
          `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=ko-KR&page=1`
        );
        const tvData = await tvRes.json();

        const animeMovieRes = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=ko-KR&with_genres=16&sort_by=popularity.desc&page=1`
        );
        const animeMovieData = await animeMovieRes.json();

        const animeTvRes = await fetch(
          `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=ko-KR&with_genres=16&sort_by=popularity.desc&page=1`
        );
        const animeTvData = await animeTvRes.json();

        const combined = [
          ...movieData.results,
          ...tvData.results,
          ...animeMovieData.results,
          ...animeTvData.results,
        ];

        // 중복 제거 및 backdrop_path 존재 여부 체크
        const uniqueMap = new Map();
        for (const item of combined) {
          if (item.backdrop_path && !uniqueMap.has(item.id)) {
            uniqueMap.set(item.id, item);
          }
        }

        // 최대 35개 슬라이스
        const finalList = Array.from(uniqueMap.values()).slice(0, 35);
        const imageUrls = finalList.map(
          (item) => BASE_IMG_URL + item.backdrop_path
        );

        setImages(imageUrls);
      } catch (error) {
        console.error("Failed to fetch images:", error);
      }
    };

    fetchPopularData();

    // 2. GSAP + 마우스 움직임 효과 및 기타 세팅 (생략 안 하고 유지)
    const body = document.body;
    const content = contentRef.current;
    const enterButton = enterButtonRef.current;
    const fullview = fullviewRef.current;
    const grid = gridRef.current;
    const gridRows = grid.querySelectorAll(".row");

    let winsize = { width: window.innerWidth, height: window.innerHeight };
    window.addEventListener("resize", () => {
      winsize = { width: window.innerWidth, height: window.innerHeight };
    });

    let mousepos = { x: winsize.width / 2, y: winsize.height / 2 };

    const config = {
      translateX: true,
      skewX: false,
      contrast: true,
      scale: false,
      brightness: true,
    };

    const numRows = gridRows.length;
    const middleRowIndex = Math.floor(numRows / 2);
    const middleRow = gridRows[middleRowIndex];
    const middleRowItems = middleRow.querySelectorAll(".row__item");
    const middleRowItemIndex = Math.floor(middleRowItems.length / 2);
    const middleRowItemInner =
      middleRowItems[middleRowItemIndex].querySelector(".row__item-inner");
    const middleRowItemInnerImage =
      middleRowItemInner.querySelector(".row__item-img");

    // 여기서 클래스 추가해도 JSX에서 인라인 스타일 우선이라 무의미할 수 있음
    middleRowItemInnerImage.classList.add("row__item-img--large");

    const baseAmt = 0.1;
    const minAmt = 0.05;
    const maxAmt = 0.1;

    let renderedStyles = Array.from({ length: numRows }, (_, index) => {
      const distanceFromMiddle = Math.abs(index - middleRowIndex);
      const amt = Math.max(baseAmt - distanceFromMiddle * 0.03, minAmt);
      const scaleAmt = Math.min(baseAmt + distanceFromMiddle * 0.03, maxAmt);

      let style = { amt, scaleAmt };
      if (config.translateX) style.translateX = { previous: 0, current: 0 };
      if (config.skewX) style.skewX = { previous: 0, current: 0 };
      if (config.contrast) style.contrast = { previous: 100, current: 100 };
      if (config.scale) style.scale = { previous: 1, current: 1 };
      if (config.brightness) style.brightness = { previous: 100, current: 100 };
      return style;
    });

    let requestId;

    const getMousePos = (ev) => {
      let posx = 0,
        posy = 0;
      if (!ev) ev = window.event;
      if (ev.pageX || ev.pageY) {
        posx = ev.pageX;
        posy = ev.pageY;
      } else if (ev.clientX || ev.clientY) {
        posx =
          ev.clientX +
          document.body.scrollLeft +
          document.documentElement.scrollLeft;
        posy =
          ev.clientY +
          document.body.scrollTop +
          document.documentElement.scrollTop;
      }
      return { x: posx, y: posy };
    };

    const updateMousePosition = (ev) => {
      const pos = getMousePos(ev);
      mousepos.x = pos.x;
      mousepos.y = pos.y;
    };

    const lerp = (a, b, n) => (1 - n) * a + n * b;

    const calculateMappedX = () =>
      (((mousepos.x / winsize.width) * 2 - 1) * 40 * winsize.width) / 100;
    const calculateMappedSkew = () =>
      ((mousepos.x / winsize.width) * 2 - 1) * 3;
    const calculateMappedContrast = () => {
      const centerContrast = 100;
      const edgeContrast = 330;
      const t = Math.abs((mousepos.x / winsize.width) * 2 - 1);
      const factor = Math.pow(t, 2);
      return centerContrast - factor * (centerContrast - edgeContrast);
    };
    const calculateMappedScale = () => {
      const centerScale = 1;
      const edgeScale = 0.95;
      return (
        centerScale -
        Math.abs((mousepos.x / winsize.width) * 2 - 1) *
          (centerScale - edgeScale)
      );
    };
    const calculateMappedBrightness = () => {
      const centerBrightness = 100;
      const edgeBrightness = 15;
      const t = Math.abs((mousepos.x / winsize.width) * 2 - 1);
      const factor = Math.pow(t, 2);
      return centerBrightness - factor * (centerBrightness - edgeBrightness);
    };

    const render = () => {
      const mappedValues = {
        translateX: calculateMappedX(),
        skewX: calculateMappedSkew(),
        contrast: calculateMappedContrast(),
        scale: calculateMappedScale(),
        brightness: calculateMappedBrightness(),
      };

      gridRows.forEach((row, index) => {
        const style = renderedStyles[index];
        for (let prop in config) {
          if (config[prop]) {
            style[prop].current = mappedValues[prop];
            const amt = prop === "scale" ? style.scaleAmt : style.amt;
            style[prop].previous = lerp(
              style[prop].previous,
              style[prop].current,
              amt
            );
          }
        }

        let gsapSettings = {};
        if (config.translateX) gsapSettings.x = style.translateX.previous;
        if (config.skewX) gsapSettings.skewX = style.skewX.previous;
        if (config.scale) gsapSettings.scale = style.scale.previous;
        if (config.contrast)
          gsapSettings.filter = `contrast(${style.contrast.previous}%)`;
        if (config.brightness)
          gsapSettings.filter = `${
            gsapSettings.filter ? gsapSettings.filter + " " : ""
          }brightness(${style.brightness.previous}%)`;

        gsap.set(row, gsapSettings);
      });

      requestId = requestAnimationFrame(render);
    };

    const startRendering = () => {
      if (!requestId) render();
    };

    const stopRendering = () => {
      if (requestId) {
        cancelAnimationFrame(requestId);
        requestId = undefined;
      }
    };

    const getCSSVariableValue = (element, variableName) =>
      getComputedStyle(element).getPropertyValue(variableName).trim();

    const enterFullview = () => {
      const flipstate = Flip.getState(middleRowItemInner);
      fullview.appendChild(middleRowItemInner);

      const transContent = getCSSVariableValue(content, "--trans-content");

      const tl = gsap.timeline();
      tl.add(
        Flip.from(flipstate, {
          duration: 0.9,
          ease: "power4",
          absolute: true,
          onComplete: stopRendering,
        })
      )
        .to(
          grid,
          {
            duration: 0.9,
            ease: "power4",
            opacity: 0.01,
          },
          0
        )
        .to(
          middleRowItemInnerImage,
          {
            scale: 1.2,
            duration: 3,
            ease: "sine",
          },
          "<-=0.45"
        )
        .to(content, {
          y: transContent,
          duration: 0.9,
          ease: "power4",
        });

      enterButton.classList.add("hidden");
      body.classList.remove("noscroll");
    };

    const init = () => {
      startRendering();
      enterButton.addEventListener("click", enterFullview);
      enterButton.addEventListener("touchstart", enterFullview);
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("touchmove", (ev) => {
      const touch = ev.touches[0];
      updateMousePosition(touch);
    });

    const initSmoothScrolling = () => {
      const lenis = new Lenis({ lerp: 0.15 });
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    };

    initSmoothScrolling();
    init();

    return () => {
      stopRendering();
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("touchmove", updateMousePosition);
    };
  }, []);

  return (
    <div id="content1">
      <section className="intro" ref={sectionRef}>
        <div className="content" ref={contentRef}>
          <div className="grid" ref={gridRef}>
            {rows.map((count, rowIndex) => (
              <div className="row" key={`row-${rowIndex}`}>
                {Array.from({ length: count }).map((_, i) => {
                  const imageIndex = rowIndex * 7 + i;

                  // 가운데 큰 이미지인 경우 (CSS에서 고정 이미지 URL 사용)
                  const isLargeImage =
                    rowIndex === middleRowIndex && i === middleRowItemIndex;

                  // 일반 이미지 URL
                  const imageUrl =
                    images[imageIndex] ||
                    "https://placehold.co/780x439?text=No+Image";

                  return (
                    <div
                      className="row__item"
                      key={`row-${rowIndex}-item-${i}`}
                    >
                      <div className="row__item-inner">
                        <div
                          className={`row__item-img ${
                            isLargeImage ? "row__item-img--large" : ""
                          }`}
                          style={{
                            backgroundImage: isLargeImage
                              ? undefined // 인라인 스타일에서 backgroundImage 제거 (CSS로 대체)
                              : `url(${imageUrl})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center center",
                            aspectRatio: "16 / 9",
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="fullview" ref={fullviewRef}></div>
        <div className="enter" ref={enterButtonRef}>
          <span>MORE</span>
        </div>
      </section>
    </div>
  );
};

export default Con1;
