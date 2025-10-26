import { useState, useEffect } from 'react';
import { BsPerson } from 'react-icons/bs';
import { IoSearchSharp } from 'react-icons/io5';
import { PiBellBold } from 'react-icons/pi';
import { Link, useNavigate } from 'react-router-dom';
import NoticeModal from '../../components/ui/modal/NoticeModal';
import ProfileModal from '../../components/ui/modal/ProfileModal';
import { useSelector } from 'react-redux';

const NavBar = ({ scrolled, isFixedHeightPath }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNoticeOpen, setIsNoticeOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const navigate = useNavigate();

    const iconColor = isFixedHeightPath || scrolled ? '#222' : '#fff';

    // 화면 리사이즈 감지
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleProfileClick = () => {
        if (windowWidth <= 1023) {
            // 1023 이하에서는 바로 마이페이지 이동
            navigate('/mypage');
        } else {
            // 그 이상에서는 모달 열기
            setIsProfileOpen((prev) => !prev);
        }
    };

    return (
        <nav className="nav">
            <ul className="top-menu">
                <li style={{ position: 'relative' }}>
                    {isLoggedIn ? (
                        <div
                            onMouseEnter={() => windowWidth > 1023 && setIsProfileOpen(true)}
                            onMouseLeave={() => windowWidth > 1023 && setIsProfileOpen(false)}
                            onClick={handleProfileClick}
                        >
                            <a href="#">
                                <BsPerson strokeWidth={0.4} style={{ color: iconColor }} />
                            </a>

                            {isProfileOpen && windowWidth > 1023 && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '100%',
                                        right: 0,
                                        zIndex: 100,
                                    }}
                                >
                                    <ProfileModal />
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                color: iconColor,
                                textDecoration: 'none',
                            }}
                        >
                            <BsPerson strokeWidth={0.4} style={{ color: iconColor }} />
                            <span>로그인</span>
                        </Link>
                    )}
                </li>

                {isLoggedIn && (
                    <li
                        onMouseEnter={() => windowWidth > 1023 && setIsNoticeOpen(true)}
                        onMouseLeave={() => windowWidth > 1023 && setIsNoticeOpen(false)}
                    >
                        <a href="#">
                            <PiBellBold style={{ color: iconColor }} />
                        </a>
                        {isNoticeOpen && windowWidth > 1023 && <NoticeModal />}
                    </li>
                )}

                <li>
                    <Link to="/search">
                        <IoSearchSharp style={{ color: iconColor }} />
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
