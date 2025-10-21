import { Link } from 'react-router-dom';

const IntroLogin = () => {
    return (
        <div id="introLogin">
            <div className="inner">
                <ul>
                    <li>
                        <span>시작할 준비가 됐다면?</span>
                        <Link to="/login">
                            <div className="wrap">
                                <button className="button">로그인/회원가입</button>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <span>VI:ON 둘러보러 가기</span>
                        <Link to="/main">
                            <button className="button">메인페이지</button>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};
export default IntroLogin;
