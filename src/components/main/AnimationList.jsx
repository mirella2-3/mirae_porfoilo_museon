// AnimationList.jsx
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import AnimationItem from './AnimationItem';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// 애니메이션 장르 TV 시리즈 가져오기 (genre_id=16)
const fetchAnimationSeries = async () => {
    const res = await fetch(
        `${TMDB_BASE_URL}/discover/tv?api_key=${API_KEY}&language=ko-KR&sort_by=popularity.desc&page=1&with_genres=16`
    );
    const data = await res.json();
    return data.results;
};

const AnimationList = () => {
    const [seriesList, setSeriesList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            const allSeries = await fetchAnimationSeries();
            setSeriesList(allSeries); // ✅ 전체 불러오기
            setLoading(false);
        };
        loadData();
    }, []);

    if (loading) return <div>로딩 중...</div>;

    return (
        <div id="CardList" className="ListWrap">
            <main className="swiperWrapper">
                <h1>인기 애니메이션 시리즈</h1>
                <div className="overlay-left" />
                <div className="overlay-right" />
                <Swiper
                    slidesPerView={8}
                    spaceBetween={15}
                    loop={true}
                    breakpoints={{
                        0: { slidesPerView: 3, spaceBetween: 10 },
                        601: { slidesPerView: 4, spaceBetween: 10 },
                        1024: {
                            slidesPerView: 8,
                            spaceBetween: 15,
                        },
                    }}
                >
                    {seriesList.map((item) => (
                        <SwiperSlide key={item.id}>
                            <AnimationItem
                                id={item.id}
                                img={item.poster_path}
                                title={item.name}
                                release={item.first_air_date}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </main>
        </div>
    );
};

export default AnimationList;
