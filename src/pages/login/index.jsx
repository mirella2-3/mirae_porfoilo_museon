import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../store/module/userSlice'; // userSlice 액션 가져오기

const Login = () => {
    const [mode, setMode] = useState('login'); // 'login' 또는 'register'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 로그인 처리
    const handleLogin = (e) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find((u) => u.email === email && u.password === password);

        if (!email || !password) {
            alert('이메일과 비밀번호를 모두 입력해주세요.');
            return;
        }

        if (!user) {
            alert('이메일 또는 비밀번호가 일치하지 않습니다.');
            return;
        }

        // Redux + localStorage에 로그인 상태 저장
        dispatch(login(user));
        localStorage.setItem('loggedInUser', JSON.stringify(user));

        navigate('/main');
    };

    return (
        <div id="loginStyle">
            <div className="veen">
                {/* 로그인 버튼 */}
                <div className="login-btn splits">
                    <button
                        className={`auth-btn ${mode === 'login' ? 'active' : ''}`}
                        onClick={() => setMode('login')}
                    >
                        로그인
                    </button>
                </div>

                {/* 회원가입 버튼 */}
                <div className="rgstr-btn splits">
                    <button
                        className={`auth-btn ${mode === 'register' ? 'active' : ''}`}
                        onClick={() => setMode('register')}
                    >
                        회원가입
                    </button>
                </div>

                {/* 로그인 / 회원가입 폼 */}
                <div className={`wrapper ${mode === 'register' ? 'move' : ''}`}>
                    {/* 로그인 */}
                    <form id="login" onSubmit={handleLogin}>
                        <h3>로그인</h3>
                        <div className="mail">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label>이메일</label>
                        </div>
                        <div className="passwd">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label>비밀번호</label>
                        </div>
                        <div className="submit">
                            <button type="submit" className="dark">
                                로그인
                            </button>
                        </div>
                        <div className="lost">
                            <p>아이디 찾기</p>
                            <p>비밀번호 찾기</p>
                        </div>
                        <div className="apps">
                            {/* <p>
                                <img src="images/login/google.png" alt="" />
                            </p>
                            <p>
                                <img src="images/login/kakao.png" alt="" />
                            </p>
                            <p>
                                <img src="images/login/apple.png" alt="" />
                            </p> */}
                        </div>
                    </form>

                    {/* 회원가입 */}
                    <form id="register">
                        <h3>회원가입</h3>
                        <div className="submit">
                            <Link to="/join">
                                <button type="button" className="dark">
                                    회원가입
                                </button>
                            </Link>
                        </div>
                        <div className="apps">
                            {/* <p>
                                <img src="images/login/google.png" alt="" />
                            </p>
                            <p>
                                <img src="images/login/kakao.png" alt="" />
                            </p>
                            <p>
                                <img src="images/login/apple.png" alt="" />
                            </p> */}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
