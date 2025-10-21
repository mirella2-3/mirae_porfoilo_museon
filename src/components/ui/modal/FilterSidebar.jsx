import { useState } from 'react';

const FilterSidebar = ({ filters, onFilterChange }) => {
    const [open, setOpen] = useState(false);

    const handleGenreChange = (e) => {
        onFilterChange({ genre: e.target.value });
    };

    return (
        <div id="filterSidebar">
            <div className="bookend-trigger" onClick={() => setOpen(true)}></div>
            <div className={`overlay ${open ? 'show' : ''}`} onClick={() => setOpen(false)}></div>

            <div className={`sidebar-bookend ${open ? 'open' : ''}`}>
                <h5>🔍 필터</h5>
                <label>장르</label>
                <select value={filters.genre} onChange={handleGenreChange}>
                    <option value="all">전체</option>
                    <option value="drama">드라마</option>
                    <option value="comedy">코미디</option>
                    <option value="history">역사</option>
                </select>

                <label>정렬</label>
                <select
                    value={filters.sort}
                    onChange={(e) => onFilterChange({ sort: e.target.value })}
                >
                    <option value="popularity.desc">인기순</option>
                    <option value="release_date.desc">최신순</option>
                    <option value="vote_average.desc">평점순</option>
                </select>
            </div>
        </div>
    );
};

export default FilterSidebar;
