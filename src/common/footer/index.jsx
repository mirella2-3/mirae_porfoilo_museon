import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer id="footer">
            <div className="inner">
                <ul>
                    <li>
                        <h2>
                            <Link to="/main">
                                <img src="/images/logo.png" alt="" />
                            </Link>
                        </h2>
                    </li>
                    <li className="law">
                        <p>통신판매업신고번호: 제2018-서울종로-0426호</p>
                        <p>전화번호: 00-308-321-0160 (수신자 부담)</p>
                        <p>이메일 주소: korea@museon.com</p>

                        <p>사업자등록번호: 164-87-00119</p>
                    </li>
                    <li className="brand">
                        <p>전화문의 1644-8282 (오전 9시 - 익일 새벽 3시)</p>
                        <p> 서울특별시 서초구 서초대로77길 41 대동2빌딩 9층 </p>
                        <p>Copyright museon Corp. All rights reserved.</p>
                    </li>
                    {/* <li className="familySite">
                        <button>Family Site</button>
                        <ul className="dropdown">
                            <li>
                                <a
                                    href="https://road-on-project-three.vercel.app/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    로드온 | RoadOn
                                </a>
                            </li>
                        </ul>
                    </li> */}
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
