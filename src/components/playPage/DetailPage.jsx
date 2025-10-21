import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { IoShareSocial } from 'react-icons/io5';
import { MdReviews } from 'react-icons/md';
import FavoriteButton from '../ui/modal/FavoriteButton';
import Swal from 'sweetalert2';
import DetailEpisode from './DetailEpisode';
import onShareAlert from '../ui/modal/onShareAlert';
import { useDispatch, useSelector } from 'react-redux';
import { addWatched } from '../../store/module/watchedSlice';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const DetailPage = ({ data, type, onReviewClick }) => {
    // data, type는 부모에서 넘겨줌 (Detail.jsx)
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const [videoKey, setVideoKey] = useState(null);

    useEffect(() => {
        if (!data) return;

        const fetchVideos = async () => {
            try {
                const contentId = data.id;
                const videoUrl =
                    type === 'tv'
                        ? `https://api.themoviedb.org/3/tv/${contentId}/videos?api_key=${API_KEY}&language=ko-KR`
                        : `https://api.themoviedb.org/3/movie/${contentId}/videos?api_key=${API_KEY}&language=ko-KR`;

                const videoRes = await fetch(videoUrl);
                if (!videoRes.ok) throw new Error('Failed to fetch videos');
                const videoData = await videoRes.json();

                const trailer = videoData.results.find(
                    (vid) => vid.site === 'YouTube' && vid.type === 'Trailer'
                );
                setVideoKey(trailer ? trailer.key : null);
            } catch (error) {
                console.error(error);
                setVideoKey(null);
            }
        };

        fetchVideos();
    }, [data, type]);

    if (!data) return null;

    const contentId = data.id;
    const title = data.title || data.name;
    const release = data.release_date || data.first_air_date;
    const runtime = data.runtime || data.episode_run_time?.[0];

    const handlePlayNow = () => {
        if (!data) return;

        if (!isLoggedIn) {
            Swal.fire({
                icon: 'warning',
                title: '로그인이 필요합니다',
                text: '이 기능을 사용하려면 먼저 로그인해주세요.',
                confirmButtonText: '확인',
                customClass: {
                    popup: 'my-alert',
                    title: 'my-title',
                    htmlContainer: 'my-text',
                    confirmButton: 'my-confirm-btn',
                },
            });
            return;
        }

        dispatch(
            addWatched({
                id: contentId,
                title: title,
                img: data.poster_path
                    ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
                    : '/default-poster.png',
                date: new Date().toLocaleDateString(),
            })
        );

        Swal.fire({
            didOpen: () => Swal.showLoading(),
            title: `${title} <br/>재생 준비 중`,
            text: '즐거운 시청 되세요.',
            customClass: {
                popup: 'my-alert',
                title: 'my-title',
                htmlContainer: 'my-text',
                confirmButton: 'my-confirm-btn',
            },
        });
    };

    return (
        <div id="detailStyle" className="detailWrap">
            <div className="overlay"></div>

            <iframe
                width="100%"
                height="100%"
                src={
                    videoKey
                        ? `https://www.youtube.com/embed/${videoKey}?controls=0&autoplay=1&mute=1`
                        : `https://www.youtube.com/embed/${videoKey}?controls=0&autoplay=1&mute=1`
                }
                title="YouTube video player"
                frameBorder="0"
                allowFullScreen
            ></iframe>

            <div className="content">
                <p></p>
                <div className="txts">
                    <h2>{title}</h2>
                    <ul className="inform">
                        <li>{release?.slice(0, 4)}</li>
                        <li>
                            {data.genres
                                ?.map((g) => g.name)
                                .slice(0, 2)
                                .join(', ')}
                        </li>
                        <li>{runtime ? `${runtime}분` : ''}</li>
                        <li>{data.vote_average?.toFixed(1)}⭐</li>
                    </ul>
                </div>

                <strong className="desc">{data.overview}</strong>

                {/* 버튼들 */}
                <ul className="buttons">
                    <li>
                        {/* 리뷰 버튼 클릭 시 onReviewClick 함수 실행 */}
                        <MdReviews
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                if (onReviewClick) onReviewClick();
                            }}
                            title="리뷰 탭으로 이동"
                        />
                    </li>
                    <li>
                        <IoShareSocial
                            onClick={onShareAlert}
                            title="공유하기"
                            style={{ cursor: 'pointer' }}
                        />
                    </li>
                    <li>
                        <FavoriteButton
                            item={{
                                id: contentId,
                                title: title,
                                poster: data.poster_path,
                            }}
                        />
                    </li>
                </ul>

                {/* Play Now 버튼 */}
                <button onClick={handlePlayNow}>Play Now</button>
            </div>

            {/* TV 시리즈일 때만 에피소드 컴포넌트 렌더링 */}
            {type === 'tv' && <DetailEpisode tvId={contentId} />}
        </div>
    );
};

export default DetailPage;
