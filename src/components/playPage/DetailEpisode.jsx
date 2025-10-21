import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const DetailEpisode = ({ tvId }) => {
    const [seasons, setSeasons] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState(null);
    const [episodes, setEpisodes] = useState([]);

    useEffect(() => {
        if (!tvId) return;
        const fetchTvDetail = async () => {
            const res = await fetch(
                `https://api.themoviedb.org/3/tv/${tvId}?api_key=${API_KEY}&language=ko-KR`
            );
            const data = await res.json();
            setSeasons(data.seasons || []);
        };
        fetchTvDetail();
    }, [tvId]);

    const handleSeasonClick = async (seasonNumber) => {
        setSelectedSeason(seasonNumber);
        const res = await fetch(
            `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNumber}?api_key=${API_KEY}&language=ko-KR`
        );
        const data = await res.json();
        setEpisodes(data.episodes || []);
    };

    const handleBack = () => {
        setSelectedSeason(null);
        setEpisodes([]);
    };

    return (
        <div className="detail-episode">
            {!selectedSeason ? (
                <div className="season-wrapper">
                    <Swiper
                        slidesPerView={2}
                        spaceBetween={15}
                        navigation={{
                            nextEl: '.season-next',
                            prevEl: '.season-prev',
                        }}
                        modules={[Navigation]}
                    >
                        {seasons.map((s) => (
                            <SwiperSlide key={s.id}>
                                <div
                                    className="season-card"
                                    onClick={() => handleSeasonClick(s.season_number)}
                                >
                                    <img
                                        src={
                                            s.poster_path
                                                ? `https://image.tmdb.org/t/p/w300${s.poster_path}`
                                                : '/placeholder.jpg'
                                        }
                                        alt={s.name}
                                    />
                                    <strong>{s.name}</strong>
                                </div>
                            </SwiperSlide>
                        ))}
                        <div className="btns">
                            <div className="season-prev">←</div>
                            <div className="season-next">→</div>
                        </div>
                    </Swiper>
                </div>
            ) : (
                <div className="episode-wrapper">
                    <button className="back-btn" onClick={handleBack}>
                        ◀ 시즌 선택
                    </button>

                    <Swiper
                        modules={[Navigation]}
                        navigation={{
                            nextEl: '.episode-next',
                            prevEl: '.episode-prev',
                        }}
                        spaceBetween={20}
                        slidesPerView={5}
                        className="episode-list"
                    >
                        {episodes.map((ep) => (
                            <SwiperSlide key={ep.id}>
                                <li className="episode-card">
                                    <img
                                        src={
                                            ep.still_path
                                                ? `https://image.tmdb.org/t/p/w300${ep.still_path}`
                                                : '/placeholder.jpg'
                                        }
                                        alt={ep.name}
                                    />
                                    <div className="episode-info">
                                        <strong>
                                            {ep.episode_number}. {ep.name}
                                        </strong>
                                        <p>{ep.overview}</p>
                                    </div>
                                </li>
                            </SwiperSlide>
                        ))}

                        <div className="episode-prev">←</div>
                        <div className="episode-next">→</div>
                    </Swiper>
                </div>
            )}
        </div>
    );
};

export default DetailEpisode;
