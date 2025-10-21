import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/module/userSlice'; // 경로는 프로젝트 구조 맞게 수정
import Swal from 'sweetalert2';
import '../ui/modal/style.scss';

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfo = useSelector((state) => state.user.userInfo);

    const [form, setForm] = useState({
        id: '',
        name: '',
        email: '',
        phone: '',
        birth: '',
        gender: '',
        address: '',
        password: '',
        confirmPassword: '',
    });

    // 로그인된 유저 정보 로드
    useEffect(() => {
        if (userInfo) {
            setForm((prev) => ({
                ...prev,
                id: userInfo.id || '',
                name: userInfo.name || '',
                email: userInfo.email || '',
                phone: userInfo.phone || '',
                birth: userInfo.birth || '',
                gender: userInfo.gender || '',
                address: userInfo.address || '',
            }));
        }
    }, [userInfo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: '비밀번호 불일치',
                text: '비밀번호와 비밀번호 확인이 같지 않습니다.',
            });
            return;
        }

        Swal.fire({
            icon: 'success',
            title: '수정 완료',
            text: '내 정보가 성공적으로 수정되었습니다.',
        });

        console.log('마이페이지 수정 데이터:', form);
    };

    // 🔹 회원탈퇴
    const onConfirmDelete = async () => {
        const result = await Swal.fire({
            title: '정말 탈퇴하시겠습니까?',
            text: '되돌릴 수 없는 작업입니다.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '네, 탈퇴합니다',
            cancelButtonText: '취소',
            reverseButtons: true,
        });

        if (result.isConfirmed) {
            // localStorage에서 해당 유저 삭제
            const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
            const updatedUsers = storedUsers.filter((user) => user.email !== userInfo.email);
            localStorage.setItem('users', JSON.stringify(updatedUsers));

            // 현재 로그인 상태 초기화
            localStorage.removeItem('loggedInUser');
            dispatch(logout());

            Swal.fire('탈퇴 완료', '회원탈퇴가 정상적으로 처리되었습니다.', 'success');

            // 로그인 페이지로 이동
            navigate('/login');
        }
    };

    return (
        <div id="account">
            <div className="bg">
                <img src="/images/ott/museon_bg.png" alt="" />
            </div>
            <div className="inner">
                <h1>계정 관리</h1>

                <form className="form" onSubmit={handleSubmit}>
                    {/* 이메일 */}
                    <div className="form-group">
                        <div className="label">이메일</div>
                        <input type="email" value={form.email} disabled />
                    </div>

                    {/* 연락처 */}
                    <div className="form-group">
                        <div className="label">연락처</div>
                        <input type="text" value={form.phone} disabled />
                    </div>

                    {/* 주소 */}
                    <div className="form-group">
                        <div className="label">주소</div>
                        <input type="text" value={form.address} disabled />
                    </div>

                    {/* 변경할 비밀번호 */}
                    <div className="form-group">
                        <div className="label">비밀번호 변경</div>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="새 비밀번호를 입력하세요."
                        />
                    </div>

                    {/* 비밀번호 확인 */}
                    <div className="form-group">
                        <div className="label">비밀번호 변경 확인</div>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            placeholder="비밀번호를 다시 입력하세요."
                        />
                    </div>

                    {/* 버튼 영역 */}
                    <div className="form-actions">
                        <button type="submit">정보수정</button>
                        <button type="button" onClick={onConfirmDelete} className="delete-btn">
                            회원탈퇴
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
