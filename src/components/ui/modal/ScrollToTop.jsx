import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // 1. 이미지/리소스 모두 로드된 후 실행
        const handleLoad = () => {
            window.scrollTo(0, 0);
        };

        // 2. pathname 바뀔 때마다 살짝 지연 후 scroll
        const timeout = setTimeout(() => {
            if (document.readyState === 'complete') {
                handleLoad();
            } else {
                window.addEventListener('load', handleLoad, { once: true });
            }
        }, 100); // 지연시간은 상황 따라 조절 가능

        return () => {
            clearTimeout(timeout);
            window.removeEventListener('load', handleLoad);
        };
    }, [pathname]);

    return null;
};

export default ScrollToTop;
