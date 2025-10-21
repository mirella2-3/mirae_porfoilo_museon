import React, { useState, useEffect } from "react";
import "sweetalert2/dist/sweetalert2.min.css";
import Swal from "sweetalert2";
import "../ui/modal/style.scss";

const ratings = [
  { id: 1, name: "마음에 들지 않아요" },
  { id: 2, name: "아쉬워요" },
  { id: 3, name: "보통이에요" },
  { id: 4, name: "좋아요" },
  { id: 5, name: "최고예요" },
];

const Rating = ({ rating, setRating }) => {
  const [prevSelected, setPrevSelected] = useState(0);
  const [delays, setDelays] = useState({});

  useEffect(() => {
    if (rating === null) return;

    let delay = 0;
    const newDelays = {};

    ratings.forEach(({ id }) => {
      if (id > prevSelected + 1 && id <= rating) {
        delay++;
        newDelays[id] = delay;
      }
    });

    setDelays(newDelays);
    setPrevSelected(rating);
  }, [rating, prevSelected]);

  // 토스트 모달
  const onToast = (msg) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      customClass: {
        popup: "my-toast",
        title: "my-title",
        htmlContainer: "my-text",
      },
    });

    Toast.fire({
      icon: "success",
      title: msg,
    });
  };

  const ratingModal = (id) => {
    setRating(id); // 부모에 전달
    onToast(`${id}점이 저장되었습니다`);
  };

  return (
    <div id="rating">
      <form id="rating" className="rating">
        <div className="rating__stars">
          {ratings.map(({ id }) => (
            <React.Fragment key={id}>
              <input
                id={`rating-${id}`}
                className={`rating__input rating__input-${id}`}
                type="radio"
                name="rating"
                value={id}
                checked={rating === id}
                onChange={() => ratingModal(id)}
              />
              <label
                className={`rating__label ${rating >= id ? "active" : ""} ${
                  delays[id] ? `rating__label--delay${delays[id]}` : ""
                }`}
                htmlFor={`rating-${id}`}
              >
                <svg
                  className="rating__star"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <g transform="translate(16,16)">
                    <circle
                      className="rating__star-ring"
                      fill="none"
                      stroke="#000"
                      strokeWidth="16"
                      r="8"
                      transform="scale(0)"
                    />
                  </g>
                  <g
                    stroke="#000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <g transform="translate(16,16) rotate(180)">
                      <polygon
                        className="rating__star-stroke"
                        points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 
                            8.82,-12.14 0,-7.5 -8.82,-12.14 
                            -7.13,-2.32 -14.27,4.64 -4.41,6.07"
                        fill={rating >= id ? "#F3A825" : "none"}
                      />
                      <polygon
                        className="rating__star-fill"
                        points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 
                            8.82,-12.14 0,-7.5 -8.82,-12.14 
                            -7.13,-2.32 -14.27,4.64 -4.41,6.07"
                        fill={rating >= id ? "#F3A825" : "none"}
                      />
                    </g>
                    <g
                      transform="translate(16,16)"
                      strokeDasharray="12 12"
                      strokeDashoffset="12"
                    >
                      <polyline
                        className="rating__star-line"
                        transform="rotate(0)"
                        points="0 4,0 16"
                      />
                      <polyline
                        className="rating__star-line"
                        transform="rotate(72)"
                        points="0 4,0 16"
                      />
                      <polyline
                        className="rating__star-line"
                        transform="rotate(144)"
                        points="0 4,0 16"
                      />
                      <polyline
                        className="rating__star-line"
                        transform="rotate(216)"
                        points="0 4,0 16"
                      />
                      <polyline
                        className="rating__star-line"
                        transform="rotate(288)"
                        points="0 4,0 16"
                      />
                    </g>
                  </g>
                </svg>
                <span className="rating__sr">
                  {id} star{id > 1 ? "s" : ""}
                </span>
              </label>
            </React.Fragment>
          ))}
        </div>
      </form>
    </div>
  );
};

export default Rating;
