import React from 'react';
import { BsFillQuestionSquareFill, BsPersonFill } from 'react-icons/bs';
import { IoTicket } from 'react-icons/io5';
import { LuLogOut } from 'react-icons/lu';
import { RiBankCard2Fill } from 'react-icons/ri';
import { VscOctoface } from 'react-icons/vsc';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../store/module/userSlice';

const ProfileModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfo = useSelector((state) => state.user.userInfo);

    const handleLogout = () => {
        dispatch(logout());
        alert('로그아웃 되었습니다.');
        navigate('/main');
    };

    return (
        <div id="profileModal">
            <ul className="wrap">
                {userInfo ? (
                    <li className="name">
                        <h4>
                            <p>
                                <VscOctoface />
                            </p>
                            {userInfo.name}
                        </h4>
                    </li>
                ) : (
                    <li className="name">
                        <h4>로그인이 필요합니다.</h4>
                    </li>
                )}

                {userInfo && (
                    <li className="setting">
                        <ul>
                            <li>
                                <Link to="/mypage">
                                    <p>
                                        <BsPersonFill strokeWidth={0.4} />
                                    </p>
                                    <h4>내 프로필</h4>
                                </Link>
                            </li>

                            <li>
                                <Link to="/mypage?tab=profile">
                                    <p>
                                        <RiBankCard2Fill />
                                    </p>
                                    <h4>계정 관리</h4>
                                </Link>
                            </li>

                            <li>
                                <Link to="/mypage?tab=Membership">
                                    <p>
                                        <IoTicket />
                                    </p>
                                    <h4>내 멤버십</h4>
                                </Link>
                            </li>

                            <li>
                                <Link to="/mypage?tab=Faq">
                                    <p>
                                        <BsFillQuestionSquareFill />
                                    </p>
                                    <h4>고객문의</h4>
                                </Link>
                            </li>
                        </ul>
                    </li>
                )}

                {userInfo ? (
                    <li className="logout" onClick={handleLogout}>
                        <p>
                            <LuLogOut />
                        </p>
                        <h4>로그아웃</h4>
                    </li>
                ) : (
                    <li className="logout" onClick={() => navigate('/login')}>
                        <p>
                            <LuLogOut />
                        </p>
                        <h4>로그인</h4>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default ProfileModal;
