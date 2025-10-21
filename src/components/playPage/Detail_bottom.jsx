import React from 'react';
import Detail_recommendList from './Detail_recommendList';
import Detail_desc from './Detail_desc';
import Detail_review from './Detail_review';

const Detail_bottom = ({ detailData, activeTab, setActiveTab }) => {
    const tabsData = [
        {
            tabName: '관련 작품',
            desc: <Detail_recommendList detailData={detailData} />,
        },
        {
            tabName: '작품 상세',
            desc: <Detail_desc detailData={detailData} />,
        },
        {
            tabName: '리뷰',
            desc: <Detail_review detailData={detailData} />,
        },
    ];

    return (
        <div id="DetailrecommendStyle">
            <div className="inner">
                <p></p>
                <div className="tab">
                    <ul className="tabs active">
                        {tabsData.map((tab, idx) => (
                            <li key={idx} className={idx === activeTab ? 'current' : ''}>
                                <a
                                    href="#!"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setActiveTab(idx);
                                    }}
                                >
                                    {tab.tabName}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div className="tab_content">
                        {tabsData.map((tab, idx) => (
                            <div
                                key={idx}
                                className={`tabs_item ${idx === activeTab ? 'active' : ''}`}
                                style={{ display: idx === activeTab ? 'block' : 'none' }}
                            >
                                <div>{tab.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail_bottom;
