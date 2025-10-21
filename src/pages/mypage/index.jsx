import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MyDetails from '../../components/mypage/MyDetails';
import Profile from '../../components/mypage/Profile';
import Membership from '../../components/mypage/Membership';
import Faq from '../../components/mypage/Faq.jsx';

const TabContent = ({ activeTab }) => {
    switch (activeTab) {
        case 'my-details':
            return <MyDetails />;
        case 'profile':
            return <Profile />;
        case 'Membership':
            return <Membership />;
        case 'Faq':
            return <Faq />;
        default:
            return <MyDetails />;
    }
};

const Mypage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // URL 쿼리 파라미터에서 activeTab 값을 가져옵니다.
    const queryParams = new URLSearchParams(location.search);
    const tabFromUrl = queryParams.get('tab') || 'my-details'; // 기본값은 'my-details'

    const [activeTab, setActiveTab] = useState(tabFromUrl); // 탭 상태 관리

    useEffect(() => {
        // 쿼리 파라미터가 변경될 때마다 activeTab을 업데이트
        setActiveTab(tabFromUrl);
    }, [location.search]); // location.search가 변경될 때마다 실행

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        navigate(`/mypage?tab=${tab}`); // 탭 클릭 시 URL 쿼리 파라미터를 업데이트
    };

    return (
        <main id="MypageStyle">
            <div className="responsive-wrapper">
                <div className="horizontal-tabs">
                    <a
                        href="#"
                        onClick={() => handleTabClick('my-details')}
                        className={activeTab === 'my-details' ? 'active' : ''}
                    >
                        프로필
                        <div className="sub">
                            <p>프로필 편집</p>
                            <p>시청한 콘텐츠</p>
                            <p>나중에 볼 콘텐츠</p>
                            <p>내 리뷰 관리</p>
                        </div>
                    </a>

                    <a
                        href="#"
                        onClick={() => handleTabClick('profile')}
                        className={activeTab === 'profile' ? 'active' : ''}
                    >
                        계정
                        <div className="sub">
                            <p>계정 관리</p>
                        </div>
                    </a>

                    <a
                        href="#"
                        onClick={() => handleTabClick('Membership')}
                        className={activeTab === 'Membership' ? 'active' : ''}
                    >
                        멤버십
                        <div className="sub">
                            <p>내 멤버십 관리</p>
                            <p>멤버십 혜택</p>
                        </div>
                    </a>

                    <a
                        href="#"
                        onClick={() => handleTabClick('Faq')}
                        className={activeTab === 'Faq' ? 'active' : ''}
                    >
                        고객문의
                        <div className="sub">
                            <p>자주 묻는 질문</p>
                            <p>1:1 문의</p>
                        </div>
                    </a>
                </div>

                <div className="content">
                    <TabContent activeTab={activeTab} />
                </div>
            </div>
        </main>
    );
};

export default Mypage;
