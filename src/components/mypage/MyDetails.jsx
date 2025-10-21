import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateNickname, updateProfileImg } from '../../store/module/userSlice';
import WatchedContent from './WatchedContent';
import LaterContent from './LaterContent';
import MyReviews from './MyReviews';
import { RiEdit2Fill } from 'react-icons/ri';
import { RxPencil1 } from 'react-icons/rx';
import { LuPencil } from 'react-icons/lu';
import plans from '../../api/Membership';
import { Link } from 'react-router-dom';

const MyDetails = () => {
    const [activeTab, setActiveTab] = useState('watched');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newNickname, setNewNickname] = useState('');
    const [profileImg, setProfileImg] = useState('/images/profile.JPG');
    const fileInputRef = useRef(null);
    const [currentPlan, setCurrentPlan] = useState(1);
    const userInfo = useSelector((state) => state.user.userInfo);
    const dispatch = useDispatch();
    const userName = userInfo?.name || '회원';
    const currentPlanName = plans[currentPlan]?.name || 'Silver';
    const renderBottomContent = () => {
        switch (activeTab) {
            case 'watched':
                return <WatchedContent />;
            case 'later':
                return <LaterContent />;
            case 'reviews':
                return <MyReviews />;
            default:
                return <div>선택된 콘텐츠가 없습니다.</div>;
        }
    };
    const handleSave = () => {
        if (newNickname.trim().length > 6) {
            alert('닉네임은 6글자 이하로 입력해야 합니다.');
            return;
        }
        dispatch(updateNickname(newNickname));
        setIsEditing(false);
    };

    const handleProfileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Data = reader.result; // Base64 문자열
                dispatch(updateProfileImg(base64Data)); // Redux + localStorage 저장
            };
            reader.readAsDataURL(file); // Base64로 변환
        }
    };

    return (
        <div id="mydetailsStyle">
            <div className="inner">
                <h1>프로필</h1>

                <ul className="topWrap">
                    <li className="profileBox">
                        <img
                            src={userInfo?.profileImg || '/images/profile.JPG'}
                            alt="프로필 사진"
                        />
                        <div className="nickname">
                            {isEditing ? (
                                <div className="editBox">
                                    <input
                                        type="text"
                                        value={newNickname}
                                        onChange={(e) => setNewNickname(e.target.value)}
                                        placeholder="새 닉네임 입력"
                                    />
                                    <button onClick={handleSave}>저장</button>
                                    <button onClick={() => setIsEditing(false)}>취소</button>
                                </div>
                            ) : (
                                <>
                                    {userInfo?.name || '닉네임'}
                                    <button
                                        onClick={() => {
                                            setIsEditing(true);
                                            setNewNickname(userInfo?.name || '');
                                        }}
                                    >
                                        <LuPencil size={17} color="#777" />
                                    </button>
                                </>
                            )}
                        </div>

                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleProfileChange}
                        />
                    </li>
                    <li className="profileMembership">
                        <span>
                            {userName}님의 사용 중인 멤버십은 <strong>{currentPlanName} </strong>
                            입니다.
                        </span>
                        <Link to="/mypage?tab=Membership">
                            <button>멤버십 혜택 보러가기</button>
                        </Link>
                    </li>
                </ul>

                <div className="middleWrap">
                    <ul>
                        <li
                            className={activeTab === 'watched' ? 'active' : ''}
                            onClick={() => setActiveTab('watched')}
                        >
                            시청한 콘텐츠
                        </li>
                        <li
                            className={activeTab === 'later' ? 'active' : ''}
                            onClick={() => setActiveTab('later')}
                        >
                            나중에 볼 콘텐츠
                        </li>
                        <li
                            className={activeTab === 'reviews' ? 'active' : ''}
                            onClick={() => setActiveTab('reviews')}
                        >
                            내 리뷰 관리
                        </li>
                    </ul>
                </div>

                <div className="bottomWrap">{renderBottomContent()}</div>
            </div>
        </div>
    );
};

export default MyDetails;
