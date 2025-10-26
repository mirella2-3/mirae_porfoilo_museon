import React, { useEffect, useState } from 'react';
import CardItem from './CardItem';
import PopularItem from './PopularItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const fetchMovies = async (category) => {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&language=ko-KR`
    );
    const data = await res.json();
    return data.results;
};

const NowplayingSection = ({ title, nowplayings }) => (
    <>
        <h1>{title}</h1>
        <Swiper
            id="CardSwiper"
            slidesPerView={7}
            spaceBetween={13}
            loop={true}
            grabCursor={true}
            breakpoints={{
                0: { slidesPerView: 3, spaceBetween: 10 },
                601: { slidesPerView: 4, spaceBetween: 10 },
                1024: {
                    slidesPerView: 7,
                    spaceBetween: 13,
                },
            }}
        >
            {nowplayings.map((data, idx) => (
                <SwiperSlide key={idx}>
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
    </>
);

const PopularSection = ({ title, datas }) => (
    <>
        <h1>{title}</h1>
        <Swiper
            id="CardSwiper"
            slidesPerView={7}
            spaceBetween={13}
            loop={true}
            grabCursor={true}
            breakpoints={{
                0: { slidesPerView: 3, spaceBetween: 10 },
                601: { slidesPerView: 4, spaceBetween: 10 },
                1024: {
                    slidesPerView: 7,
                    spaceBetween: 13,
                },
            }}
        >
            {datas.map((data, idx) => (
                <SwiperSlide key={idx}>
                    <PopularItem
                        id={data.id}
                        img={data.poster_path}
                        overview={data.overview}
                        title={data.title}
                        release={data.release_date}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    </>
);

const CardList = () => {
    const [nowPlaying, setNowPlaying] = useState([]);
    const [popular, setPopular] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            const now = await fetchMovies('now_playing');
            const pop = await fetchMovies('popular');

            setNowPlaying(now);
            setPopular(pop);
            setLoading(false);
        };

        loadData();
    }, []);

    if (loading) return <div>로딩 중...</div>;

    return (
        <div id="CardList" className="ListWrap">
            <main className="swiperWrapper">
                <div className="overlay-left" />
                <div className="overlay-right" />
                <NowplayingSection title="영화 동시 상영작" nowplayings={nowPlaying} />
                <PopularSection title="트렌디한 선택" datas={popular} />
            </main>
        </div>
    );
};

export default CardList;
