import { useState } from 'react';
import { BsPerson } from 'react-icons/bs';
import { IoSearchSharp } from 'react-icons/io5';
import { PiBellBold } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import NoticeModal from '../../components/ui/modal/NoticeModal';
import ProfileModal from '../../components/ui/modal/ProfileModal';
import { useSelector } from 'react-redux';

const NavBar = ({ scrolled, isFixedHeightPath }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNoticeOpen, setIsNoticeOpen] = useState(false);

    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    const iconColor = isFixedHeightPath || scrolled ? '#222' : '#fff';

    return (
        <nav className="nav">
            <ul className="top-menu">
                <li style={{ position: 'relative' }}>
                    {isLoggedIn ? (
                        <div
                            onMouseEnter={() => setIsProfileOpen(true)}
                            onMouseLeave={() => setIsProfileOpen(false)}
                        >
                            <a href="#">
                                <BsPerson strokeWidth={0.4} style={{ color: iconColor }} />
                            </a>

                            {isProfileOpen && (
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
                        onMouseEnter={() => setIsNoticeOpen(true)}
                        onMouseLeave={() => setIsNoticeOpen(false)}
                    >
                        <a href="#">
                            <PiBellBold style={{ color: iconColor }} />
                        </a>
                        {isNoticeOpen && <NoticeModal />}
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
