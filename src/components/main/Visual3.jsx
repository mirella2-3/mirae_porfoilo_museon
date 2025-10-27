import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Autoplay } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const movieTitles = [
    'Toy Story 4',
    'Just For Meeting You',
    'Decision to Leave',
    'K-POP Demon Hunters',
    'about time',
];

async function fetchMovieData(title) {
    try {
        const searchRes = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
                title
            )}&language=en-US`
        );
        const searchData = await searchRes.json();
        const firstResult = searchData.results?.[0];
        if (!firstResult) return null;

        const detailRes = await fetch(
            `https://api.themoviedb.org/3/movie/${firstResult.id}?api_key=${API_KEY}&language=en-US`
        );
        const detailData = await detailRes.json();
        return {
            id: detailData.id,
            title: detailData.title,
            release: detailData.release_date,
            genres: detailData.genres.map((g) => g.name),
            runtime: detailData.runtime,
            vote_average: detailData.vote_average,
            overview: detailData.overview,
            poster: `https://image.tmdb.org/t/p/original${detailData.poster_path}`,
            backdrop: `https://image.tmdb.org/t/p/original${detailData.backdrop_path}`,
        };
    } catch (err) {
        console.error('영화 데이터 로드 오류:', err);
        return null;
    }
}

async function fetchAllMovies() {
    const results = [];
    for (const title of movieTitles) {
        const data = await fetchMovieData(title);
        if (data) results.push(data);
    }
    return results;
}

export default function Visual3() {
    const [movies, setMovies] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const swiperRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllMovies().then((data) => setMovies(data));
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (swiperRef.current) swiperRef.current.update();
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const onClick = (movie) => navigate(`/detail/${movie.id}`);

    if (!movies.length) return <div>Loading...</div>;

    return (
        <div
            className="coverflow-slider"
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${movies[activeIndex].backdrop})`,
            }}
        >
            <div className="visualBtns">
                <div className="swiper-button-prev">
                    <IoIosArrowForward />
                </div>
                <div className="swiper-button-next">
                    <IoIosArrowBack />
                </div>
            </div>

            <div className="inner">
                <div className="slide-info">
                    <h2>{movies[activeIndex].title}</h2>
                    <ul>
                        <li>{movies[activeIndex].release.slice(0, 4)}</li>
                        <li>{movies[activeIndex].genres.slice(0, 2).join(' / ')}</li>
                        <li>{movies[activeIndex].runtime} min</li>
                        <li>{movies[activeIndex].vote_average.toFixed(1)}⭐</li>
                    </ul>
                    <p>{movies[activeIndex].overview}</p>
                    <button onClick={() => onClick(movies[activeIndex])}>MORE</button>
                </div>

                <Swiper
                    modules={[EffectCoverflow, Navigation, Autoplay]}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    effect="coverflow"
                    centeredSlides={true}
                    slidesPerView={3}
                    slidesPerGroup={1}
                    loop={true}
                    watchSlidesProgress
                    autoplay={{ delay: 6000, reverseDirection: true }}
                    navigation={{ prevEl: '.swiper-button-prev', nextEl: '.swiper-button-next' }}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 200,
                        depth: 150,
                        modifier: 1,
                        slideShadows: false,
                    }}
                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                    className="thumb-coverflow no-drag"
                    allowTouchMove={false}
                    mousewheel={false}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            centeredSlides: true,
                            allowTouchMove: true,
                            coverflowEffect: {
                                rotate: 0,
                                stretch: 0,
                                depth: 100,
                                modifier: 1,
                                slideShadows: false,
                            },
                        },
                        768: {
                            slidesPerView: 2,
                            centeredSlides: true,
                            coverflowEffect: {
                                rotate: 0,
                                stretch: 100,
                                depth: 120,
                                modifier: 1,
                                slideShadows: false,
                            },
                        },
                        1024: {
                            slidesPerView: 3,
                            centeredSlides: true,
                            coverflowEffect: {
                                rotate: 0,
                                stretch: 200,
                                depth: 150,
                                modifier: 1,
                                slideShadows: false,
                            },
                        },
                    }}
                >
                    {movies.map((m) => (
                        <SwiperSlide key={m.id}>
                            <div
                                className="thumb-card"
                                style={{ backgroundImage: `url(${m.poster})` }}
                            ></div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
