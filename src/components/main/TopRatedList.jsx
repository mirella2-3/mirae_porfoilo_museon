import React, { useEffect, useState } from 'react';
import TopRatedItem from './TopRatedItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const fetchMovies = async (category) => {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&language=ko-KR`
    );
    const data = await res.json();
    return data.results;
};

const TopRatedList = () => {
    const [topRated, setTopRated] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            const top = await fetchMovies('top_rated');
            setTopRated(top); // slice 제거 → 전체 데이터
            setLoading(false);
        };
        loadData();
    }, []);

    if (loading) return <div>로딩 중...</div>;

    return (
        <div id="CardList" className="ListWrap">
            <main className="swiperWrapper">
                <h1>명작은 다시봐도 명작</h1>
                <div className="overlay-left" />
                <div className="overlay-right" />
                <Swiper
                    slidesPerView={8}
                    spaceBetween={15}
                    loop={true}
                    navigation
                    modules={[Navigation, Autoplay]}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    breakpoints={{
                        0: { slidesPerView: 3, spaceBetween: 10 },
                        601: { slidesPerView: 4, spaceBetween: 10 },
                        1024: {
                            slidesPerView: 8,
                            spaceBetween: 15,
                        },
                    }}
                >
                    {topRated.map((data) => (
                        <SwiperSlide key={data.id}>
                            <TopRatedItem
                                id={data.id}
                                img={data.poster_path}
                                title={data.title}
                                release={data.release_date}
                                overview={data.overview}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </main>
        </div>
    );
};

export default TopRatedList;
