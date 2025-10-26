import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // ✅ 추가
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const titles = [
    { name: '폭군의 셰프', type: 'tv' },
    { name: '오징어 게임', type: 'tv' },
    { name: 'K-POP Demon Hunters', type: 'movie' },
    { name: '도깨비', type: 'tv' },
    { name: '로스쿨', type: 'tv' },
    { name: '이상한 변호사 우영우', type: 'tv' },
    { name: '별에서 온 그대', type: 'tv' },
    { name: '기생충', type: 'movie' },
    { name: '미스터 션샤인', type: 'tv' },
    { name: '킹덤', type: 'tv' },
    { name: '범죄도시', type: 'movie' },
    { name: '슬기로운 의사생활', type: 'tv' },
    { name: '신과함께-죄와 벌', type: 'movie' },
    { name: '비밀의 숲', type: 'tv' },
];

async function fetchContent(title, type) {
    try {
        const searchRes = await fetch(
            `https://api.themoviedb.org/3/search/${type}?api_key=${API_KEY}&query=${encodeURIComponent(
                title
            )}&language=ko-KR`
        );
        const searchData = await searchRes.json();
        const firstResult = searchData.results?.[0];
        if (!firstResult) return null;

        const detailRes = await fetch(
            `https://api.themoviedb.org/3/${type}/${firstResult.id}?api_key=${API_KEY}&language=ko-KR`
        );
        const detailData = await detailRes.json();

        return {
            id: detailData.id,
            title: type === 'movie' ? detailData.title : detailData.name,
            release: type === 'movie' ? detailData.release_date : detailData.first_air_date,
            overview: detailData.overview,
            vote_average: detailData.vote_average,
            poster: `https://image.tmdb.org/t/p/original${detailData.poster_path}`,
            backdrop: `https://image.tmdb.org/t/p/original${detailData.backdrop_path}`,
            type,
        };
    } catch (err) {
        console.error('데이터 로드 오류:', err);
        return null;
    }
}

async function fetchSelectedContents() {
    const promises = titles.map((t) => fetchContent(t.name, t.type));
    const results = await Promise.all(promises);
    return results.filter(Boolean);
}

const Recommend = () => {
    const [slides, setSlides] = useState([]);
    const swiperRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadData() {
            const data = await fetchSelectedContents();
            setSlides(data);
        }
        loadData();
    }, []);

    useEffect(() => {
        if (slides.length > 0) {
            if (swiperRef.current) {
                swiperRef.current.destroy(true, true);
            }
            swiperRef.current = new Swiper('.placeSwiper', {
                centeredSlides: true,
                slidesPerView: 7,
                spaceBetween: 15,
                speed: 800,
                // loop: true,
                loopAdditionalSlides: 3,
                pagination: {
                    el: '.placeSwiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.placeSwiper-button-next',
                    prevEl: '.placeSwiper-button-prev',
                },
                observer: true,
                observeParents: true,
                initialSlide: 4,
            });
        }
    }, [slides]);

    return (
        <div id="recommend" className="cardWrap">
            <div className="container">
                <h3>
                    매력적인 <strong>한국배경</strong> 콘텐츠
                </h3>
                <div className="placeSwiper">
                    <div className="swiper-wrapper">
                        {slides.map(({ id, title, poster, release, type }) => (
                            <div
                                className="swiper-slide recommend-slide"
                                key={id}
                                data-id={id}
                                onClick={(e) => {
                                    if (e.currentTarget.classList.contains('swiper-slide-active')) {
                                        navigate(`/detail/${id}?type=${type}`);
                                    }
                                }}
                                style={{ cursor: 'pointer' }}
                            >
                                <img src={poster} alt={title} />
                                <p>
                                    {title} <strong>({release?.slice(0, 4)})</strong>
                                </p>
                                <button> 보러가기 </button>
                            </div>
                        ))}
                    </div>

                    <div className="placeSwiper-button-prev">
                        <IoIosArrowBack />
                    </div>
                    <div className="placeSwiper-button-next">
                        <IoIosArrowForward />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Recommend;
