import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import DetailPage from '../../components/playPage/DetailPage';
import Detail_bottom from '../../components/playPage/Detail_bottom';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function Detail() {
    const { id } = useParams();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const type = query.get('type') || 'movie'; // movie(default) or tv

    const contentId = parseInt(id);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    // activeTab state: 부모가 탭 상태를 관리 (기본 0)
    const [activeTab, setActiveTab] = useState(0);

    // Detail_bottom 위치 참조용 ref (스크롤용)
    const detailBottomRef = useRef(null);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/${type}/${contentId}?api_key=${API_KEY}&language=ko-KR&append_to_response=credits`
                );

                if (!res.ok) throw new Error('Failed to fetch detail');

                const detailData = await res.json();
                setData(detailData);
            } catch (error) {
                console.error(error);
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchDetail();
    }, [contentId, type]);

    // 리뷰 버튼 클릭 시 호출 함수 (DetailPage에서 내려줌)
    const openReviewTab = () => {
        setActiveTab(2); // 3번째 탭 (리뷰) 인덱스 2
        // 약간 딜레이 후 스크롤 (탭이 바뀐 뒤)
        setTimeout(() => {
            detailBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    if (loading) return <div>로딩 중...</div>;
    if (!data) return <div>해당 콘텐츠를 찾을 수 없습니다.</div>;

    return (
        <main className="about">
            <DetailPage data={data} type={type} onReviewClick={openReviewTab} />
            <div ref={detailBottomRef}>
                <Detail_bottom
                    detailData={data}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
            </div>
        </main>
    );
}

export default Detail;
