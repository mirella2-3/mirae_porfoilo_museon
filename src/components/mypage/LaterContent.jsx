import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FavoriteButton from '../ui/modal/FavoriteButton';

const LaterContent = () => {
    const favorites = useSelector((state) => state.favorites.favorites);
    const navigate = useNavigate();

    return (
        <div id="LaterStyle">
            {/* <h2>
        지금까지 <strong>{favorites.length}개</strong>의 보고 싶은 콘텐츠가 저장
        됐어요.
      </h2> */}

            <ul className="Later-lists">
                {favorites.length === 0 && <p className="noWish">아직 찜한 콘텐츠가 없습니다.</p>}
                {favorites.map((item) => (
                    <li className="Later-list" key={item.id}>
                        <div>
                            <p>
                                <img src={item.img} alt={item.title} />
                            </p>
                            <div className="overlay">
                                <button
                                    className="view-btn"
                                    onClick={() => navigate(`/detail/${item.id}`)}
                                >
                                    보러가기
                                </button>
                                <button className="favorite">
                                    <FavoriteButton item={item} />
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LaterContent;
