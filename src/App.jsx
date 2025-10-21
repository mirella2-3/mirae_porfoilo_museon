import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/index.scss';
import { About, Main, Mypage } from './pages';
import Layout from './common/Layout';
import Detail from './pages/detail';
import Intro from './pages/intro';
import Login from './pages/login';
import Join from './pages/login/Join';
import Search from './pages/search';
import './App.css';
import ScrollToTop from './components/ui/modal/ScrollToTop';

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Intro />} />

                <Route path="/" element={<Layout />}>
                    <Route path="main" element={<Main />} />
                    <Route path="search" element={<Search />} />
                    <Route path="detail/:id" element={<Detail />} />
                    <Route path="login" element={<Login />} />
                    <Route path="join" element={<Join />} />
                    <Route path="mypage" element={<Mypage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
