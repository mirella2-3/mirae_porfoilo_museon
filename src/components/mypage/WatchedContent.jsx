import { useSelector, useDispatch } from 'react-redux';
import { removeWatched } from '../../store/module/watchedSlice';

const WatchedContent = () => {
    const watched = useSelector((state) => state.watched.watched);
    const dispatch = useDispatch();

    return (
        <div id="watchedStyle">
            {/* <h2>
                지금까지 <strong>{watched.length}개</strong>의 콘텐츠를 시청하셨습니다.
            </h2> */}

            <ul className="watched-lists">
                {watched.length === 0 && <p className="noWish"> 시청한 콘텐츠가 없습니다</p>}
                {watched.map((item) => (
                    <li className="watched-list" key={item.id}>
                        <div>
                            <p>
                                <img src={item.img} alt={item.title} />
                            </p>
                            <div className="overlay">
                                <button
                                    className="view-btn"
                                    onClick={() => navigate(`/detail/${item.id}`)}
                                >
                                    리뷰쓰기
                                </button>
                                <button
                                    className="deleteContent"
                                    onClick={() => dispatch(removeWatched(item.id))}
                                >
                                    삭제
                                </button>
                            </div>
                        </div>
                        {/* <h3 className="title">{item.title}</h3> */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WatchedContent;
