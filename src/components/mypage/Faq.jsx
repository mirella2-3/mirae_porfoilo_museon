// src/components/support/Faq.jsx

import FaqBottom from './FaqBottom';

const Faq = () => {
    return (
        <div id="faqStyle">
            <div className="inner">
                <h2>고객문의</h2>
                <h1>자주 묻는 질문</h1>
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
                                        스마트폰, 태블릿, 스마트 TV, 노트북 등 다양한 디바이스에서
                                        월정액 요금 하나로 시청하세요. 멤버십 요금은 월 5,000원부터
                                        15,000원까지 다양합니다. 추가 비용이나 약정이 없습니다.
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
                                        언제 어디서나 시청할 수 있습니다. 저장 기능을 이용해 이동
                                        중이나 인터넷에 연결할 수 없는 곳에서도 시청하세요. 저희는
                                        어디서든 함께니까요.
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
                                        없으니까요. 멤버십 해지도 온라인에서 클릭 두 번이면 완료할
                                        수 있습니다. 해지 수수료도 없으니 원할 때 언제든 계정을
                                        시작하거나 종료하세요.
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
                                        동시에 몇 명까지 <br />
                                        이용할 수 있나요?
                                    </h3>
                                </div>
                            </div>
                            <div className="service-content">
                                <div className="text">
                                    <h3>동시에 몇 명까지 이용할 수 있나요?</h3>
                                    <p>
                                        선택하신 멤버십 요금제에 따라 다릅니다. 기본 요금제는 1명,
                                        프리미엄 요금제는 최대 4명까지 동시 접속이 가능합니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="col-md-3 col-sm-6">
                        <div className="service-box">
                            <div className="service-icon pink">
                                <div className="front-content">
                                    <h3>
                                        결제 수단에는 <br />
                                        어떤 것들이 있나요?
                                    </h3>
                                </div>
                            </div>
                            <div className="service-content">
                                <div className="text">
                                    <h3>결제 수단에는 어떤 것들이 있나요?</h3>
                                    <p>
                                        신용카드, 체크카드, 간편 결제(카카오페이, 네이버페이 등),
                                        앱스토어 결제 등 다양한 방법을 지원합니다. 원하는 결제
                                        수단을 자유롭게 선택하실 수 있습니다.
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
                                        새로운 콘텐츠는 얼마나 <br />
                                        자주 업데이트되나요?
                                    </h3>
                                </div>
                            </div>
                            <div className="service-content">
                                <div className="text">
                                    <h3>
                                        새로운 콘텐츠는 얼마나 <br />
                                        자주 업데이트되나요?
                                    </h3>
                                    <p>
                                        매주 최신 영화와 드라마, 오리지널 콘텐츠가 꾸준히
                                        업데이트됩니다. 매달 새롭게 공개되는 작품으로 언제나 신선한
                                        즐길 거리를 만나실 수 있습니다.
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
                                        있습니다. 자녀가 시청할 수 있는 콘텐츠의 관람등급을 제한하고
                                        자녀의 시청을 원치 않는 특정 작품을 차단할 수도 있습니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
                <FaqBottom />
            </div>
        </div>
    );
};

export default Faq;
