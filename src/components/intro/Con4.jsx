import { Link } from 'react-router-dom';

const Con4 = () => {
    return (
        <div id="content4">
            <div className="inner">
                <div className="container">
                    <h4>자주 묻는 질문</h4>
                    <div className="row">
                        <div className="col-md-3 col-sm-6">
                            <div className="service-box">
                                <div className="service-icon yellow">
                                    <div className="front-content">
                                        <h3>
                                            어떤 콘텐츠를 <br />
                                            시청할 수 있나요?
                                        </h3>
                                    </div>
                                </div>
                                <div className="service-content">
                                    <div className="text">
                                        <h3>어떤 콘텐츠를 시청할 수 있나요?</h3>
                                        <p>
                                            장편 영화, 다큐멘터리, 시리즈, 애니메이션, 오리지널 등
                                            수많은 콘텐츠를 확보하고 있습니다. 마음에 드는 콘텐츠를
                                            원하는 시간에 원하는 만큼 시청하실 수 있습니다.
                                            <Link to="/main">
                                                <button>콘텐츠 구경하러가기</button>
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 col-sm-6">
                            <div className="service-box">
                                <div className="service-icon orange">
                                    <div className="front-content">
                                        <h3>요금은 얼마인가요?</h3>
                                    </div>
                                </div>
                                <div className="service-content">
                                    <div className="text">
                                        <h3>요금은 얼마인가요?</h3>
                                        <p>
                                            스마트폰, 태블릿, 스마트 TV, 노트북 등 다양한
                                            디바이스에서 월정액 요금 하나로 시청하세요. 멤버십
                                            요금은 월 5,000원부터 15,000원까지 다양합니다. 추가
                                            비용이나 약정이 없습니다.
                                            <button>멤버십 구경하기</button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 col-sm-6">
                            <div className="service-box">
                                <div className="service-icon red">
                                    <div className="front-content">
                                        <h3>어디에서 시청할 수 있나요?</h3>
                                    </div>
                                </div>
                                <div className="service-content">
                                    <div className="text">
                                        <h3>어디에서 시청할 수 있나요?</h3>
                                        <p>
                                            언제 어디서나 시청할 수 있습니다. 저장 기능을 이용해
                                            이동 중이나 인터넷에 연결할 수 없는 곳에서도 시청하세요.
                                            저희는 어디서든 함께니까요.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 col-sm-6">
                            <div className="service-box">
                                <div className="service-icon grey">
                                    <div className="front-content">
                                        <h3>
                                            멤버십을 해지하려면 <br />
                                            어떻게 하나요?
                                        </h3>
                                    </div>
                                </div>
                                <div className="service-content">
                                    <div className="text">
                                        <h3>
                                            멤버십을 해지하려면 <br />
                                            어떻게 하나요?
                                        </h3>
                                        <p>
                                            해지는 부담 없이 간편합니다. 성가신 계약도, 약정도
                                            없으니까요. 멤버십 해지도 온라인에서 클릭 두 번이면
                                            완료할 수 있습니다. 해지 수수료도 없으니 원할 때 언제든
                                            계정을 시작하거나 종료하세요.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 col-sm-6">
                            <div className="service-box">
                                <div className="service-icon pink">
                                    <div className="front-content">
                                        <h3>
                                            아이들이 시청해도 <br />
                                            괜찮을까요?
                                        </h3>
                                    </div>
                                </div>
                                <div className="service-content">
                                    <div className="text">
                                        <h3>
                                            아이들이 시청해도 <br />
                                            괜찮을까요?
                                        </h3>
                                        <p>
                                            멤버십에 키즈 환경이 포함되어 있어 부모가 이를 관리할 수
                                            있습니다. 자녀가 시청할 수 있는 콘텐츠의 관람등급을
                                            제한하고 자녀의 시청을 원치 않는 특정 작품을 차단할 수도
                                            있습니다.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Con4;
