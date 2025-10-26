import React, { useEffect, useState } from 'react';
import DramaItem from './DramaItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const fetchAllSeries = async () => {
    const res = await fetch(
        `${TMDB_BASE_URL}/discover/tv?api_key=${API_KEY}&language=ko-KR&sort_by=popularity.desc&page=1`
    );
    const data = await res.json();
    return data.results;
};

const DramaList = () => {
    const [seriesList, setSeriesList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            const allSeries = await fetchAllSeries();
            setSeriesList(allSeries.slice(0, 20)); // 상위 20개
            setLoading(false);
        };
        loadData();
    }, []);

    if (loading) return <div>로딩 중...</div>;

    return (
        <div id="CardList" className="ListWrap">
            <main className="swiperWrapper">
                <h1>인기 TV 시리즈</h1>
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
                            <DramaItem
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

export default DramaList;
