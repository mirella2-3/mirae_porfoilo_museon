import React, { useEffect, useState } from 'react';
import Swiper from 'swiper';
import TripAdsData from '../../api/TripAds';

const TripAds = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const swiper = new Swiper('.tripAds-slider', {
            spaceBetween: 30,
            effect: 'fade',
            loop: true,
            mousewheel: {
                invert: false,
            },
            pagination: {
                el: '.tripAds-slider__pagination',
                clickable: true,
            },
            on: {
                slideChange: function () {
                    setActiveIndex(this.realIndex);
                },
            },
        });

        return () => {
            if (swiper && typeof swiper.destroy === 'function') {
                swiper.destroy(true, true);
            }
        };
    }, []);

    const currentBackground = TripAdsData[activeIndex]?.imgBackground;

    return (
        <div
            id="tripAds"
            style={{
                backgroundImage: `url(${currentBackground})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'background-image 0.5s ease-in-out',
            }}
        >
            <div className="tripAds-slider">
                <div className="tripAds-slider__wrp swiper-wrapper">
                    {TripAdsData.map((slide, index) => (
                        <div className="tripAds-slider__item swiper-slide" key={index}>
                            <div className="tripAds-slider__img">
                                <img src={slide.imgCard} alt={slide.title} />
                            </div>
                            <div className="tripAds-slider__content">
                                <div className="tripAds-slider__title">&lt;{slide.title}&gt;</div>
                                <span className="tripAds-slider__code">{slide.packageName}</span>

                                <div className="tripAds-slider__text">{slide.text}</div>
                                <a href={slide.url} className="tripAds-slider__button">
                                    패키지 살펴보기
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="tripAds-slider__pagination"></div>
            </div>
        </div>
    );
};

export default TripAds;
