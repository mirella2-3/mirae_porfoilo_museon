const API_KEY = 'YOUR_API_KEY';
const movieTitles = [
    'About Time',
    'Les Misérables',
    'Renoir',
    'The Grand Budapest Hotel',
    'K-POP Demon Hunters',
    'All About Lily Chou-Chou',
];

async function VisualData(title) {
    const searchRes = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
            title
        )}&language=ko-KR`
    );
    const searchData = await searchRes.json();
    const firstResult = searchData.results[0];
    if (!firstResult) return null;

    const detailRes = await fetch(
        `https://api.themoviedb.org/3/movie/${firstResult.id}?api_key=${API_KEY}&language=ko-KR`
    );
    const detailData = await detailRes.json();
    return detailData;
}

async function fetchAllMovies() {
    const results = [];
    for (const title of movieTitles) {
        const data = await fetchMovieData(title);
        if (data) results.push(data);
    }
    console.log(results); // 모든 상세 데이터 배열
    return results;
}

VisualData();
