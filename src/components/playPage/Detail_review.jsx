import React, { useState } from 'react';
import { GiDinosaurRex } from 'react-icons/gi';
import { IoClose } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { onAdd, onDelete } from '../../store/module/reviewSlice';
import Rating from './Rating';
import Swal from 'sweetalert2';

const Detail_review = ({ detailData }) => {
    const maxLength = 200;
    const [text, setText] = useState('');
    const [rating, setRating] = useState(0); // ⭐ 별점 상태

    const dispatch = useDispatch();
    const reviews = useSelector((state) => state.review.reviews);
    const filteredReviews = reviews.filter((r) => r.contentId === detailData.id);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const userInfo = useSelector((state) => state.user.userInfo);

    // 입력값 변경
    const changeInput = (e) => {
        if (e.target.value.length <= maxLength) {
            setText(e.target.value);
        }
    };

    // 리뷰 등록
    const onSubmit = (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            Swal.fire({
                icon: 'warning',
                title: '로그인이 필요한 서비스입니다.',
                text: '로그인 후 리뷰를 작성해주세요.',
            });
            return;
        }
        if (!text.trim()) return;
        if (rating === 0) {
            Swal.fire({
                icon: 'warning',
                title: '별점을 선택해주세요',
            });
            return;
        }

        const today = new Date();
        const formattedDate = today.toISOString().slice(0, 10).replace(/-/g, '.');

        // Detail_review.jsx (onSubmit 부분)
        const newReview = {
            id: Date.now(),
            nickname: userInfo?.name || '익명',
            time: `${Math.floor(Math.random() * 150) + 30}분 시청`,
            date: formattedDate,
            content: text,
            rating: rating,
            contentId: detailData.id,
            title: detailData.title,
            img: detailData.poster_path
                ? `https://image.tmdb.org/t/p/w200${detailData.poster_path}`
                : '/default-poster.png',
        };

        dispatch(onAdd(newReview));
        setText('');
        setRating(0); // 등록 후 별점 초기화
    };

    // 로그인 확인 (input 포커스 시)
    const handleFocus = (e) => {
        if (!isLoggedIn) {
            Swal.fire({
                icon: 'warning',
                title: '로그인이 필요한 서비스입니다.',
                text: '로그인 후 이용해주세요.',
            });
            e.target.blur();
        }
    };

    return (
        <div id="DetailReviewStyle">
            <h2>작품과 함께한 경험을 나눠주세요</h2>

            <Rating rating={rating} setRating={setRating} />

            <form className="textBar" onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="감상평을 입력해주세요"
                    value={text}
                    onChange={changeInput}
                    onFocus={handleFocus}
                />
                <span>
                    {text.length} / {maxLength}
                </span>
                <button type="submit">등록</button>
            </form>

            <div className="replyBox">
                <ul>
                    {filteredReviews.reverse().map((r) => (
                        <li className="reply" key={r.id}>
                            <div className="icon">
                                <img
                                    src={
                                        r.userProfileImg ||
                                        userInfo?.profileImg ||
                                        '/images/profile.png'
                                    }
                                    alt="유저 프로필"
                                />
                            </div>
                            <div className="meta">
                                <span className="nickname">{r.nickname}</span>
                                <span className="info">
                                    {r.date} | {r.time}
                                </span>
                                <p className="content">{r.content}</p>
                            </div>
                            <button className="delete" onClick={() => dispatch(onDelete(r.id))}>
                                <IoClose />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Detail_review;
