import React, { useEffect, useRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import { PiStarFourFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import plans from "../../api/Membership";

const Con3 = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    cardsRef.current.forEach((card) => {
      const content = card.querySelector(".card-content");
      const rotationFactor = parseFloat(card.dataset.rotationFactor) || 2;

      if (!isTouchDevice) {
        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateY = (rotationFactor * (x - centerX)) / centerX;
          const rotateX = (-rotationFactor * (y - centerY)) / centerY;

          content.style.transform = `
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg)
          `;

          card.style.setProperty("--x", `${(x / rect.width) * 100}%`);
          card.style.setProperty("--y", `${(y / rect.height) * 100}%`);
        });

        card.addEventListener("mouseleave", () => {
          content.style.transform = "rotateX(0) rotateY(0)";
          content.style.transition = "transform 0.5s ease";
          setTimeout(() => {
            content.style.transition = "";
          }, 500);
        });
      }

      const randomDelay = Math.random() * 2;
      card.style.animation = `cardFloat 4s infinite alternate ease-in-out ${randomDelay}s`;
    });
  }, []);

  const handleRipple = (e) => {
    const button = e.currentTarget;
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");
    button.appendChild(ripple);

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;

    ripple.classList.add("active");

    setTimeout(() => {
      ripple.remove();
    }, 500);
  };

  return (
    <div id="content3" className="card-page">
      <div className="inner">
        <h1>
          믿을 수 있는 요금제와 함께 <br /> 지금 바로 시작하세요
        </h1>
        <p className="subtitle">알찬 혜택과 VI:ON만의 특별한 서비스</p>
        <div className="cards-container">
          {plans.map((plan, i, color) => (
            <div
              className="card"
              data-rotation-factor="2"
              ref={(el) => (cardsRef.current[i] = el)}
              key={i}
            >
              <div className="card-content">
                <h2>{plan.name}</h2>
                <h3>
                  <strong>{plan.price.toLocaleString()}원</strong>/ 월
                </h3>
                <ul>
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>
                      <p>
                        <PiStarFourFill />
                      </p>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="card-footer">
                  <Link to="/login">
                    <button className="card-button" onClick={handleRipple}>
                      ORDER
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Con3;
