import './style.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/module/userSlice';
import Swal from 'sweetalert2';

const Join = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [phone, setPhone] = useState('');
    const [authCode, setAuthCode] = useState('');
    const [enteredCode, setEnteredCode] = useState('');
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);
    const [birth, setBirth] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [emailChecked, setEmailChecked] = useState(false);

    // 에러 상태
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [birthError, setBirthError] = useState('');
    const [phoneAuthError, setPhoneAuthError] = useState('');

    // 이메일 입력
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailChecked(false);
        const emailRegex = /^[a-zA-Z0-9_\-]+@[a-zA-Z0-9_\-]+\.[a-zA-Z]+$/;
        if (!emailRegex.test(e.target.value)) {
            setEmailError('올바른 이메일 형식을 입력해주세요.');
        } else {
            setEmailError('');
        }
    };

    // 이메일 중복 확인

    const handleEmailCheck = () => {
        if (!email) {
            setEmailError('이메일을 입력해주세요.');
            setEmailChecked(false);
            return;
        }
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        const exists = storedUsers.some((u) => u.email === email);
        if (exists) {
            setEmailError('이미 사용 중인 이메일입니다.');
            setEmailChecked(false);
        } else {
            setEmailError('');
            setEmailChecked(true);

            // 사용 가능한 이메일일 때 모달 띄우기
            Swal.fire({
                icon: 'success',
                title: '사용 가능한 이메일입니다!',
                text: '해당 이메일로 가입하실 수 있습니다.',
                confirmButtonText: '확인',
                customClass: {
                    popup: 'my-alert',
                    title: 'my-title',
                    htmlContainer: 'my-text',
                    confirmButton: 'my-confirm-btn',
                },
            });
        }
    };

    // 비밀번호 확인
    const handlePasswordCheck = (e) => {
        setPasswordCheck(e.target.value);
        if (password !== e.target.value) {
            setPasswordError('비밀번호가 일치하지 않습니다.');
        } else {
            setPasswordError('');
        }
    };

    // 연락처 입력
    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
        const phoneRegex = /^\d{11}$/;
        if (!phoneRegex.test(e.target.value)) {
            setPhoneError('연락처는 숫자 11자리만 입력 가능합니다.');
        } else {
            setPhoneError('');
        }
    };

    // 생년월일 입력
    const handleBirthChange = (e) => {
        setBirth(e.target.value);
        const birthRegex = /^\d{8}$/;
        if (!birthRegex.test(e.target.value)) {
            setBirthError('생년월일은 숫자 8자리 (YYYYMMDD) 형식으로 입력해주세요.');
        } else {
            setBirthError('');
        }
    };

    // 인증번호 발송
    const handleSendCode = () => {
        if (!phone) {
            setPhoneError('전화번호를 입력해주세요.');
            return;
        }
        const code = '1234'; // 테스트용
        setAuthCode(code);
        setIsPhoneVerified(false);
        alert('인증번호가 발송되었습니다 (테스트용: 1234)');
    };

    // 인증번호 확인
    const handleAuthConfirm = () => {
        if (enteredCode === authCode) {
            setIsPhoneVerified(true);
            setPhoneAuthError('');
            setAuthCode('');
        } else {
            setPhoneAuthError('인증번호가 올바르지 않습니다.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !email ||
            !name ||
            !password ||
            !passwordCheck ||
            !phone ||
            !birth ||
            !gender ||
            !address
        ) {
            Swal.fire({
                icon: 'error',
                title: '입력 오류',
                text: '모든 필드를 입력해주세요.',
                customClass: {
                    popup: 'my-alert',
                    title: 'my-title',
                    htmlContainer: 'my-text',
                    confirmButton: 'my-confirm-btn',
                },
            });
            return;
        }

        if (emailError || passwordError || phoneError || birthError || phoneAuthError) {
            Swal.fire({
                icon: 'error',
                title: '입력 오류',
                text: '입력 정보를 확인해주세요.',
                customClass: {
                    popup: 'my-alert',
                    title: 'my-title',
                    htmlContainer: 'my-text',
                    confirmButton: 'my-confirm-btn',
                },
            });
            return;
        }

        if (!emailChecked) {
            Swal.fire({
                icon: 'error',
                title: '이메일 확인',
                text: '이메일 중복 확인을 해주세요.',
                customClass: {
                    popup: 'my-alert',
                    title: 'my-title',
                    htmlContainer: 'my-text',
                    confirmButton: 'my-confirm-btn',
                },
            });
            return;
        }

        if (!isPhoneVerified) {
            Swal.fire({
                icon: 'error',
                title: '휴대폰 인증 필요',
                text: '휴대폰 인증을 완료해주세요.',
                customClass: {
                    popup: 'my-alert',
                    title: 'my-title',
                    htmlContainer: 'my-text',
                    confirmButton: 'my-confirm-btn',
                },
            });
            return;
        }

        const userData = { email, name, password, phone, birth, gender, address };
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        storedUsers.push(userData);
        localStorage.setItem('users', JSON.stringify(storedUsers));
        dispatch(login(userData));

        // 회원가입 완료 모달
        Swal.fire({
            icon: 'success',
            title: '회원가입 완료!',
            text: '회원가입이 성공적으로 완료되었습니다.',
            confirmButtonText: '확인',
            customClass: {
                popup: 'my-alert',
                title: 'my-title',
                htmlContainer: 'my-text',
                confirmButton: 'my-confirm-btn',
            },
        }).then(() => navigate('/login'));
    };

    return (
        <main id="Join">
            <div className="inner">
                <h1 className="title">회원가입</h1>
                <form className="form" onSubmit={handleSubmit}>
                    {/* 이메일 */}
                    <div className="form-group">
                        <div className="label">
                            이메일<span></span>
                        </div>
                        <input
                            style={{ width: '50%' }}
                            type="text"
                            placeholder="이메일 주소를 입력하세요."
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <button type="button" onClick={handleEmailCheck}>
                            중복 확인
                        </button>
                        {emailError && <p className="error-text">{emailError}</p>}
                    </div>

                    {/* 이름 */}
                    <div className="form-group">
                        <div className="label">
                            이름<span></span>
                        </div>
                        <input
                            type="text"
                            placeholder="홍길동"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/* 비밀번호 */}
                    <div className="form-group">
                        <div className="label">
                            비밀번호<span></span>
                        </div>
                        <input
                            type="password"
                            placeholder="비밀번호를 입력하세요."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* 비밀번호 확인 */}
                    <div className="form-group">
                        <div className="label">
                            비밀번호 확인<span></span>
                        </div>
                        <input
                            type="password"
                            placeholder="비밀번호를 다시 입력하세요."
                            value={passwordCheck}
                            onChange={handlePasswordCheck}
                        />
                        {passwordError && <p className="error-text">{passwordError}</p>}
                    </div>

                    {/* 연락처 */}
                    <div className="form-group">
                        <div className="label">
                            연락처<span></span>
                        </div>
                        <input
                            type="text"
                            placeholder="01012345678"
                            value={phone}
                            onChange={handlePhoneChange}
                            disabled={isPhoneVerified}
                        />
                        <button
                            type="button"
                            onClick={handleSendCode}
                            disabled={!phone || isPhoneVerified}
                        >
                            {isPhoneVerified ? '인증 완료' : '인증번호 받기'}
                        </button>
                        {phoneError && <p className="error-text">{phoneError}</p>}
                    </div>

                    {/* 인증번호 입력 */}
                    {authCode && !isPhoneVerified && (
                        <div className="phoneAuth">
                            <input
                                type="text"
                                placeholder="인증번호 입력"
                                value={enteredCode}
                                onChange={(e) => setEnteredCode(e.target.value)}
                            />
                            <button type="button" onClick={handleAuthConfirm}>
                                인증 확인
                            </button>
                            {phoneAuthError && <p className="error-text">{phoneAuthError}</p>}
                        </div>
                    )}

                    {/* 생년월일 + 성별 */}
                    <div className="form-row">
                        <div className="form-group">
                            <div className="label">
                                생년월일<span></span>
                            </div>
                            <div className="input-row">
                                <input
                                    type="text"
                                    placeholder="YYYYMMDD"
                                    value={birth}
                                    onChange={handleBirthChange}
                                />
                            </div>
                            {birthError && <p className="error-text">{birthError}</p>}
                        </div>

                        <div className="form-group">
                            <div className="label">
                                성별<span></span>
                            </div>
                            <div className="gender-group">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    checked={gender === 'male'}
                                    onChange={(e) => setGender(e.target.value)}
                                />
                                <p>남성</p>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    checked={gender === 'female'}
                                    onChange={(e) => setGender(e.target.value)}
                                />
                                <p>여성</p>
                            </div>
                        </div>
                    </div>

                    {/* 주소 */}
                    <div className="form-group">
                        <label className="label">
                            주소<span></span>
                        </label>
                        <input
                            type="text"
                            placeholder="서울시 강남구 서초동"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>

                    {/* 제출 버튼 */}
                    <div className="form-actions">
                        <button
                            type="submit"
                            disabled={
                                !email ||
                                !name ||
                                !password ||
                                !passwordCheck ||
                                !phone ||
                                !birth ||
                                !gender ||
                                !address ||
                                !emailChecked ||
                                !isPhoneVerified
                            }
                        >
                            회원가입
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default Join;
