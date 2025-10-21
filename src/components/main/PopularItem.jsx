import React from 'react';
import { IoHeart, IoInformation, IoPlay, IoTimeOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import FavoriteButton from '../ui/modal/FavoriteButton';

const PopularItem = ({ img, title, release, id }) => {
    const navigate = useNavigate();
    const imageUrl = img ? `https://image.tmdb.org/t/p/w500${img}` : 'placeholder.jpg';
    const releaseYear = release ? release.slice(0, 4) : 'N/A';
    const item = { id, title, poster: img };

    return (
        <article>
            <figure>
                <img src={imageUrl} alt={title} />
                <ul className="card-content">
                    <li className="title">
                        <h4>
                            {title} <span>({releaseYear})</span>
                        </h4>
                    </li>
                    <li className="icons">
                        <div>
                            <IoPlay onClick={() => navigate(`/detail/${id}`)} />
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

export default PopularItem;
