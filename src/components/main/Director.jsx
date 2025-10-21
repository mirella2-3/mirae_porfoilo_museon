import React, { useEffect, useState } from "react";

const fighters = [
  {
    name: "봉준호",
    img: "/images/ott/director1.png",
    classes: "spotlight bg-red",
  },

  {
    name: "제임스 카메론",
    img: "/images/ott/director3.png",
    classes: "spotlight z-9 bg-green",
  },
  {
    name: "크리스토퍼 놀란",
    img: "/images/ott/director4-2.png",
    classes: "spotlight alt bg-purple",
  },
  {
    name: "박찬호",
    img: "/images/ott/director2-2.png",
    classes: "spotlight z-10 bg-blue alt",
  },
];
const Director = () => {
  const [selectedDirector, setSelectedDirector] = useState(null);
  const handleDirectorClick = (director) => {
    setSelectedDirector(director);
  };
  useEffect(() => {
    if (selectedDirector) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // 컴포넌트 언마운트 시 복원
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedDirector]);

  return (
    <div id="director">
      <div className="prompt">
        <div className="centerize">
          <h1>영화계 거장들의 작품 몰아보기</h1>
          <div className="flex">
            {fighters.map((fighter, index) => (
              <div
                key={index}
                className={fighter.classes}
                onClick={() => handleDirectorClick(fighter)}
              >
                <div className="breakout">
                  <img src={fighter.img} alt={fighter.name} />
                </div>
                <div className="image">
                  <img src={fighter.img} alt={fighter.name} />
                </div>
                <div className="text">{fighter.name}</div>
              </div>
            ))}
          </div>

          {selectedDirector && (
            <div className="director-modal">
              <div className="director-modal-content">
                <div className="left">
                  <img src={selectedDirector.img} alt={selectedDirector.name} />
                </div>
                <div className="right">
                  <h2>{selectedDirector.name} 감독의 작품</h2>
                  <ul>
                    <li>🎬 영화 1</li>
                    <li>🎬 영화 2</li>
                    <li>🎬 영화 3</li>
                  </ul>
                  <button onClick={() => setSelectedDirector(null)}>
                    닫기
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Director;
