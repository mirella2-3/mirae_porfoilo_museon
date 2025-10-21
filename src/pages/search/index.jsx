import React, { useState, useEffect, useRef } from 'react';
import { Container, Button, FormControl, Spinner } from 'react-bootstrap';
import { IoHeart, IoInformation, IoPlay, IoTimeOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import FavoriteButton from '../../components/ui/modal/FavoriteButton';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const GENRE_MAP = {
    전체보기: null,
    드라마: 18,
    역사: 36,
    공상과학: 878,
    범죄: 80,
    코미디: 35,
    판타지: 14,
};

function Search() {
    const [wishlist, setWishlist] = useState(() => {
        const saved = localStorage.getItem('wishlist');
        return saved ? JSON.parse(saved) : [];
    });

    const [category, setCategory] = useState('all');
    const [displayCategory, setDisplayCategory] = useState('all');
    const [search, setSearch] = useState('');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const changeCategory = (newCategory) => {
        if (newCategory === displayCategory) return;
        setDisplayCategory(newCategory);
    };

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        async function fetchItems() {
            setLoading(true);
            try {
                let urlMovie = '';
                let urlTv = '';
                const genreFilter = GENRE_MAP[displayCategory];

                if (search.trim().length >= 2) {
                    urlMovie = `${TMDB_BASE_URL}/search/movie?api_key=${API_KEY}&language=ko-KR&query=${encodeURIComponent(
                        search
                    )}&page=1&include_adult=false`;

                    urlTv = `${TMDB_BASE_URL}/search/tv?api_key=${API_KEY}&language=ko-KR&query=${encodeURIComponent(
                        search
                    )}&page=1`;
                } else {
                    if (displayCategory === 'all') {
                        urlMovie = `${TMDB_BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`;
                        urlTv = `${TMDB_BASE_URL}/tv/popular?api_key=${API_KEY}&language=ko-KR&page=1`;
                    } else {
                        urlMovie = `${TMDB_BASE_URL}/discover/movie?api_key=${API_KEY}&language=ko-KR&with_genres=${genreFilter}&page=1`;
                        urlTv = `${TMDB_BASE_URL}/discover/tv?api_key=${API_KEY}&language=ko-KR&with_genres=${genreFilter}&page=1`;
                    }
                }

                const [resMovie, resTv] = await Promise.all([
                    fetch(urlMovie, { signal }),
                    fetch(urlTv, { signal }),
                ]);

                const movieData = resMovie.ok ? await resMovie.json() : { results: [] };
                const tvData = resTv.ok ? await resTv.json() : { results: [] };

                let combined = [...(movieData.results || []), ...(tvData.results || [])];

                if (
                    search.trim().length >= 2 &&
                    displayCategory !== 'all' &&
                    GENRE_MAP[displayCategory]
                ) {
                    combined = combined.filter((item) => {
                        return (
                            item.genre_ids && item.genre_ids.includes(GENRE_MAP[displayCategory])
                        );
                    });
                }

                combined = combined.slice(0, 100);

                setItems(combined);
            } catch (err) {
                if (err.name !== 'AbortError') console.error(err);
                setItems([]);
            } finally {
                setLoading(false);
            }
        }

        const debounceTimeout = setTimeout(fetchItems, 300);

        return () => {
            clearTimeout(debounceTimeout);
            controller.abort();
        };
    }, [search, displayCategory]);

    return (
        <div id="bootstrap-wrapper">
            <h2>찾는 컨텐츠가 있으신가요?</h2>
            <FormControl
                type="search"
                placeholder="콘텐츠를 검색하세요."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="custom-search-input"
            />
            <Container className="category-container my-3">
                {Object.keys(GENRE_MAP).map((cat) => (
                    <Button
                        key={cat}
                        onClick={() => changeCategory(cat)}
                        variant={cat === category ? 'success' : 'light'}
                        className="category-btn mx-1"
                    >
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </Button>
                ))}
            </Container>
            {loading && (
                <div className="text-center my-3">
                    <Spinner animation="border" variant="primary" />
                </div>
            )}
            <AnimatedProductList products={items} />
        </div>
    );
}

function AnimatedProductList({ products }) {
    return (
        <div className="product-list-container">
            {products.length === 0 && (
                <p style={{ fontSize: 24, fontWeight: 700, margin: 100 }}>
                    검색 결과를 찾지 못했습니다.
                </p>
            )}
            <div className="product-list-flex">
                {products.map((item) => (
                    <div
                        key={`${item.id}-${item.media_type || (item.title ? 'movie' : 'tv')}`}
                        className="product-item"
                    >
                        <ProductCard product={item} />
                    </div>
                ))}
            </div>
        </div>
    );
}

function ProductCard({ product }) {
    const posterUrl = product.poster_path
        ? `https://image.tmdb.org/t/p/w500${product.poster_path}`
        : 'https://via.placeholder.com/280x393?text=No+Image';
    const navigate = useNavigate();
    const onClick = () =>
        navigate(
            `/detail/${product.id}?type=${product.media_type || (product.title ? 'movie' : 'tv')}`
        );
    // ... 나머지 동일
    const ulRef = useRef(null);
    const [bgHeight, setBgHeight] = useState(0);

    useEffect(() => {
        if (ulRef.current) setBgHeight(ulRef.current.offsetHeight);
    }, [product]);

    return (
        <article>
            <figure>
                <img
                    src={posterUrl}
                    className="card-img-top"
                    alt={product.title || product.name}
                    style={{
                        width: '100%',
                        height: '350px',
                        objectFit: 'cover',
                        borderRadius: '5px',
                    }}
                />
                <ul ref={ulRef} className="card-content">
                    <li className="title">
                        <h4>
                            {product.title || product.name}
                            <span>
                                ({' '}
                                {product.release_date
                                    ? product.release_date.slice(0, 4)
                                    : product.first_air_date
                                    ? product.first_air_date.slice(0, 4)
                                    : 'N/A'}
                                )
                            </span>
                        </h4>
                    </li>
                    <li className="icons">
                        <div>
                            <IoPlay onClick={onClick} />
                        </div>

                        <div>
                            <FavoriteButton
                                item={{
                                    ...product,
                                    poster: product.poster_path,
                                }}
                            />
                        </div>
                    </li>
                </ul>{' '}
                <style>
                    {`
            .card-content {
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              padding: 10px 15px;
              background: rgba(255, 255, 255, 0.95);
              transform: translateY(100%);
              transition: transform 0.3s ease;
              box-sizing: border-box;
              border-radius: 0 0 5px 5px;
              z-index: 1;
            }
            figure:hover .card-content {
              transform: translateY(0);
            }
          `}
                </style>
            </figure>
        </article>
    );
}

export default Search;
