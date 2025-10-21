import React from 'react';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { toggleFavorite } from '../../../store/module/favoriteSlice';

const FavoriteButton = ({ item }) => {
    const dispatch = useDispatch();
    const { favorites } = useSelector((state) => state.favorites);
    const { isLoggedIn } = useSelector((state) => state.user);

    const isFavorite = favorites.some((f) => f.id === item.id);

    // 토스트 생성기
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        customClass: { popup: 'my-toast' },
    });

    const handleClick = () => {
        if (!isLoggedIn) {
            Swal.fire({
                icon: 'warning',
                title: '로그인이 필요합니다',
                text: '찜 기능은 로그인 후 이용 가능합니다.',
                confirmButtonText: '확인',
                customClass: {
                    popup: 'my-alert',
                    title: 'my-title',
                    htmlContainer: 'my-text',
                    confirmButton: 'my-confirm-btn',
                },
            });
            return;
        }
        dispatch(
            toggleFavorite({
                id: item.id,
                title: item.title || item.name, // 영화/드라마 대응
                img: item.poster
                    ? `https://image.tmdb.org/t/p/w500${item.poster}`
                    : '/default-poster.png',
            })
        );

        // 찜 여부에 따라 다른 메시지
        if (isFavorite) {
            Toast.fire({
                icon: 'info',
                title: `'${item.title || item.name}'이(가) <br/>나중에 볼 목록에서 제거되었습니다.`,
            });
        } else {
            Toast.fire({
                icon: 'success',
                title: `'${item.title || item.name}'이(가) <br/>나중에 볼 목록에 추가되었습니다!`,
            });
        }
    };

    return (
        <div className="favBtn" onClick={handleClick} style={{ cursor: 'pointer' }}>
            {isFavorite ? <GoHeartFill style={{ color: '#12b560' }} /> : <GoHeart />}
        </div>
    );
};

export default FavoriteButton;
