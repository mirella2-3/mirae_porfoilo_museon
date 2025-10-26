import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavBar from './NavBar';

const fixedHeightPaths = ['/mypage', '/search', '/join', '/login'];

const Header = () => {
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);

    const isFixedHeightPath = fixedHeightPaths.includes(location.pathname);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const headerStyle = isFixedHeightPath
        ? {
              position: scrolled ? 'fixed' : 'relative',
              top: 0,
              left: 0,
              width: '100%',
              height: scrolled ? '50px' : '100px',
              backgroundColor: 'rgba(255,255,255,0.3)',
              borderBottom: scrolled ? 'none' : 'none',
              opacity: 1,
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
              borderBottom: scrolled ? 'none' : 'none',
              opacity: 1,
              transition: 'all 0.3s ease',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              padding: '0 20px',
          };

    const logoHeight = scrolled ? 80 : 120;
    const logoFilter = scrolled || isFixedHeightPath ? 'drop-shadow(0 0 1px #999)' : 'none';

    // NavBar에 넘겨줄 텍스트 색상 (투명일 때 흰색, 그 외 진한색)
    const navTextColor = !scrolled && !isFixedHeightPath ? '#fff' : '#222';

    return (
        <header id="header" style={headerStyle}>
            <h1 style={{ margin: 0 }}>
                <Link to="/">
                    <img
                        // src={scrolled ? '/images/logo_small.png' : '/images/logo.png'}
                        alt="Logo"
                        style={{
                            // height: logoHeight,
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
