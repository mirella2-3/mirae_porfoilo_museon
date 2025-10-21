import React, { useState, useRef } from "react";

const Detail_desc = ({ detailData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  if (!detailData) return null;

  const images = [
    detailData.poster_path
      ? `https://image.tmdb.org/t/p/w500${detailData.poster_path}`
      : "https://placehold.co/430x650?text=No+Image",
    detailData.backdrop_path
      ? `https://image.tmdb.org/t/p/w780${detailData.backdrop_path}`
      : null,
  ].filter(Boolean);

  const handleImageClick = (index) => {
    setCurrentIndex(index);
    clearInterval(intervalRef.current);
  };

  const director =
    detailData.credits?.crew.find((c) => c.job === "Director")?.name ||
    "정보 없음";
  const screenplay =
    detailData.credits?.crew.find((c) => c.job === "Screenplay")?.name ||
    "정보 없음";
  const cast =
    detailData.credits?.cast
      ?.slice(0, 3)
      .map((c) => c.name)
      .join(", ") || "정보 없음";
  const adultText = detailData.adult ? "청소년 관람불가" : "전체 관람가";

  return (
    <div id="DetailDescStyle">
      <div className="inner">
        <ul>
          <li className="imgUrl">
            <section className="photogallery">
              <menu className="gallery-menu">
                <ul>
                  {images.map((src, index) => (
                    <li key={index}>
                      <img
                        src={src}
                        alt={`Gallery ${index + 1}`}
                        className={index === currentIndex ? "activeImage" : ""}
                        onClick={() => handleImageClick(index)}
                      />
                    </li>
                  ))}
                </ul>
              </menu>

              <section className="gallery-display">
                <img
                  className="galleryimage"
                  src={images[currentIndex]}
                  alt="Selected"
                />
              </section>
            </section>
          </li>

          <li className="descs">
            <ul>
              <h3>{detailData.title || "제목 없음"}</h3>
              <span>{detailData.overview || "설명 없음"}</span>
              <li>
                <strong>감독</strong>
                <p>{director}</p>
              </li>
              <li>
                <strong>출연</strong>
                <p>{cast}</p>
              </li>
              <li>
                <strong>각본</strong>
                <p>{screenplay}</p>
              </li>
              <li>
                <strong>장르</strong>
                <p>
                  {detailData.genres
                    ? detailData.genres.map((g) => g.name).join(", ")
                    : "정보 없음"}
                </p>
              </li>
              <li>
                <strong>관람등급</strong>
                <p>{adultText}</p>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Detail_desc;
