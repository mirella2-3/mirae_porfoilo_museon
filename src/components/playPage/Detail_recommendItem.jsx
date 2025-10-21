import React from 'react';
import { IoInformation, IoPlay, IoTimeOutline } from 'react-icons/io5';
import FavoriteButton from '../ui/modal/FavoriteButton';
import { useNavigate } from 'react-router-dom';

const Detail_recommendItem = ({ img, title, id, release, type = 'movie' }) => {
    const navigate = useNavigate();

    const item = {
        id,
        title,
        poster: img,
    };

    const onClick = () => navigate(`/detail/${id}?type=${type}`);

    // 영화=release_date, TV=first_air_date
    const releaseYear = release ? release.slice(0, 4) : 'N/A';
    const imageUrl = img ? `https://image.tmdb.org/t/p/w500${img}` : '/placeholder.jpg';

    return (
        <article>
            <figure>
                <img src={imageUrl} alt={title} />
                <p className="bg"></p>
                <ul className="card-content">
                    <li className="title">
                        <h4>
                            {title} <span>({releaseYear})</span>
                        </h4>
                    </li>
                    <li className="icons">
                        <div>
                            <IoPlay onClick={onClick} />
                        </div>

                        <div>
                            <FavoriteButton item={item} />
                        </div>
                    </li>
                </ul>
            </figure>
        </article>
    );
};

export default Detail_recommendItem;
