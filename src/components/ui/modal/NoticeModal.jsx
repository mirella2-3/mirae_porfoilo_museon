import React, { useState, useEffect } from "react";
import { CgClose } from "react-icons/cg";

const defaultNotices = [
  {
    id: 1,
    text: "회원가입을 환영합니다.",
  },
  {
    id: 2,
    text: "0월 00일, 신작이 출시되었어요.",
  },
  {
    id: 3,
    text: "0월 00일, 나중에 볼 컨텐츠에 담긴 작품의 스트리밍이 종료됩니다.",
  },
];

const STORAGE_KEY = "closedNotices";

const NoticeModal = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    // localStorage에서 닫힌 공지 ID 목록 읽기
    const closedIds = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    // 기본 공지 중 닫힌 ID를 제외한 것만 필터링해서 상태 세팅
    const filteredNotices = defaultNotices.filter(
      (notice) => !closedIds.includes(notice.id)
    );
    setNotices(filteredNotices);
  }, []);

  const handleClose = (id) => {
    setNotices((prev) => {
      const updated = prev.filter((notice) => notice.id !== id);

      // 닫힌 공지 ID를 localStorage에 저장
      const closedIds = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      if (!closedIds.includes(id)) {
        closedIds.push(id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(closedIds));
      }

      return updated;
    });
  };

  return (
    <div id="NoticeModal">
      <ul className="wrap">
        {notices.length > 0 ? (
          notices.map((notice) => (
            <li key={notice.id}>
              <strong>{notice.text}</strong>
              <button onClick={() => handleClose(notice.id)}>
                <CgClose style={{ width: "16px", height: "16px" }} />
              </button>
            </li>
          ))
        ) : (
          <li className="empty">
            <strong>새 소식을 모두 확인했습니다.</strong>
          </li>
        )}
      </ul>
    </div>
  );
};

export default NoticeModal;
