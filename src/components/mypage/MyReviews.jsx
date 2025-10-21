import { IoClose } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { onDelete } from '../../store/module/reviewSlice';
import { useNavigate } from 'react-router-dom'; // ✅ 추가
import Swal from 'sweetalert2';

const MyReviews = () => {
    const reviews = useSelector((state) => state.review.reviews);
    const dispatch = useDispatch();
    const navigate = useNavigate(); // ✅ navigate 훅

    // ✅ 토스트 함수
    const onToast = (msg, icon = 'success') => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            customClass: { popup: 'my-toast' },
        });

        Toast.fire({
            icon,
            title: msg,
        });
    };

    const handleDelete = (id) => {
        dispatch(onDelete(id));
        onToast('리뷰가 삭제되었습니다!', 'success');
    };

    return (
        <div id="reviewStyle">
            <h2>
                지금까지 <strong>{reviews.length}개</strong>의 리뷰를 작성하셨습니다.
            </h2>
            <ul>
                {reviews.map((r) => (
                    <li className="reviewBody" key={r.id}>
                        <ul className="reviews">
                            <li
                                className="imageBox"
                                onClick={() => navigate(`/detail/${r.contentId}`)}
                                style={{ cursor: 'pointer' }}
                            >
                                <p>
                                    <img src={r.img} alt={r.title || '작품 이미지'} />
                                </p>
                            </li>
                            <li>
                                <ul>
                                    <li
                                        className="reviewTitle"
                                        onClick={() => navigate(`/detail/${r.contentId}`)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {r.title || '제목 없음'}
                                        <p className="reviewDate">({r.date})</p>
                                    </li>
                                    <li>
                                        <button onClick={() => handleDelete(r.id)}>
                                            <IoClose />
                                        </button>
                                    </li>
                                </ul>

                                <div className="reviewContext">{r.content}</div>
                                <div className="reviewRating">
                                    ⭐ {r.rating}점, 이 작품에 대한 나의 평가
                                </div>
                            </li>
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyReviews;
