import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavBar from './NavBar';

const fixedHeightPaths = ['/mypage', '/search', '/join', '/login'];

const Header = () => {
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

    const isFixedHeightPath = fixedHeightPaths.includes(location.pathname);

    // 스크롤 이벤트
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 0);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // 화면 너비 변경 감지
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 600);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const headerStyle = isFixedHeightPath
        ? {
              position: scrolled ? 'fixed' : 'relative',
              top: 0,
              left: 0,
              width: '100%',
              height: scrolled ? '50px' : '100px',
              backgroundColor: 'rgba(255,255,255,0.3)',
              transition: 'all 0.3s ease',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              padding: '0 20px',
          }
        : {
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: scrolled ? '60px' : '100px',
              backgroundColor: scrolled ? 'rgba(255,255,255,0.3)' : 'transparent',
              transition: 'all 0.3s ease',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              padding: '0 20px',
          };

    const logoHeight = scrolled ? 80 : 120;
    const logoFilter = scrolled || isFixedHeightPath ? 'drop-shadow(0 0 1px #999)' : 'none';

    // 모바일이면 항상 작은 로고
    const logoSrc = isMobile
        ? '/images/logo_small.png'
        : scrolled
        ? '/images/logo_small.png'
        : '/images/logo.png';

    return (
        <header id="header" style={headerStyle}>
            <h1 style={{ margin: 0 }}>
                <Link to="/">
                    <img
                        src={logoSrc}
                        alt="Logo"
                        style={{
                            width: logoHeight,
                            filter: logoFilter,
                            transition: 'filter 0.3s ease, height 0.3s ease',
                        }}
                    />
                </Link>
            </h1>
            <NavBar scrolled={scrolled} isFixedHeightPath={isFixedHeightPath} />
        </header>
    );
};

export default Header;
