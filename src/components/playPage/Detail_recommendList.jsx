import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Detail_recommendItem from './Detail_recommendItem';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// Section 그대로 유지
const DetailSection = ({ title, books }) => (
    <>
        <h1>{title}</h1>
        <section>
            {books.map((book, idx) => (
                <Detail_recommendItem
                    key={book.id || idx}
                    id={book.id}
                    img={`https://image.tmdb.org/t/p/w500${book.poster_path}`}
                    title={book.title || book.name}
                    release={book.release_date || book.first_air_date}
                    type={book.media_type} // 나중에 필요하면
                />
            ))}
        </section>
    </>
);

const Detail_recommendList = () => {
    const { id } = useParams(); // /detail/:id
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const type = query.get('type') || 'movie'; // movie or tv

    const [recommendations, setRecommendations] = useState([]);
    const [similar, setSimilar] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        if (!id) return;

        const mediaType = type === 'tv' ? 'tv' : 'movie';

        // 연관 작품
        fetch(
            `https://api.themoviedb.org/3/${mediaType}/${id}/recommendations?api_key=${API_KEY}&language=ko-KR`
        )
            .then((res) => res.json())
            .then((data) => setRecommendations(data.results || []));

        // 비슷한 컨텐츠
        fetch(
            `https://api.themoviedb.org/3/${mediaType}/${id}/similar?api_key=${API_KEY}&language=ko-KR`
        )
            .then((res) => res.json())
            .then((data) => setSimilar(data.results || []));

        // 취향저격 → 임시로 recommendations 재활용 (page=2)
        fetch(
            `https://api.themoviedb.org/3/${mediaType}/${id}/recommendations?api_key=${API_KEY}&language=ko-KR&page=2`
        )
            .then((res) => res.json())
            .then((data) => setFavorites(data.results || []));
    }, [id, type]);

    return (
        <div id="DetailrecommendListStyle">
            <main>
                <DetailSection title="연관 작품" books={recommendations.slice(0, 5)} />
                <DetailSection title="비슷한 컨텐츠" books={similar.slice(0, 5)} />
                <DetailSection title="00님 취향저격 컨텐츠" books={favorites.slice(0, 5)} />
            </main>
        </div>
    );
};

export default Detail_recommendList;
