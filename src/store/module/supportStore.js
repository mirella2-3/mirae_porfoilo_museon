import { create } from "zustand";
import faqsData from "../api/faqsData";
import noticesData from "../api/noticesData";

export const COMPANY = "RoadOn";

// 표시용 헬퍼(공지)
const toDateText = (iso) => (iso || "").replace(/-/g, "."); // 'YYYY.MM.DD'
const isNew = (iso, days = 14) => {
  const d = new Date(`${iso}T00:00:00`);
  return (Date.now() - d.getTime()) / 86400000 <= days;
};

// Faq 카테고리 라벨(탭 버튼과 동일하게)
export const Faq_CATEGORIES = [
  "TOP Q&A",
  "전체",
  "국내 숙소",
  "해외 숙소",
  "체험·투어",
  "회원 공통",
];

const useSupportStore = create((set, get) => ({
  // --------------------------
  // 공지 (정렬/조회수 증감 없음)
  // --------------------------
  notices: noticesData.slice(),
  page: 1,
  pageSize: 10,
  q: "",

  list: () => {
    const { notices, page, pageSize, q } = get();
    let arr = notices;
    if (q && q.trim()) {
      const k = q.trim().toLowerCase();
      arr = arr.filter((n) => n.title.toLowerCase().includes(k));
    }
    const total = arr.length;
    const start = Math.max(0, (page - 1) * pageSize);
    const pageItems = arr.slice(start, start + pageSize);
    const items = pageItems.map((n) => ({
      ...n,
      dateText: toDateText(n.date),
      displayTitle: n.category ? `[${n.category}] ${n.title}` : n.title,
      isNew: isNew(n.date),
    }));
    return { items, total, page, pageSize };
  },

  getById: (id) => {
    const n = get().notices.find((x) => x.id === id);
    if (!n) return null;
    return {
      ...n,
      dateText: toDateText(n.date),
      displayTitle: n.category ? `[${n.category}] ${n.title}` : n.title,
      isNew: isNew(n.date),
    };
  },

  setPage: (page) => set({ page }),
  setPageSize: (pageSize) => set({ pageSize }),
  setQuery: (q) => set({ q, page: 1 }),
  resetFilters: () => set({ page: 1, pageSize: 10, q: "" }),

  // --------------------------
  // Faq (정렬/검색 없음, 카테고리 필터 + on 토글)
  // --------------------------
  faqs: faqsData.slice(),
  faqCategory: "TOP Q&A", // 'TOP Q&A' | '전체' | '국내 숙소' | '해외 숙소' | '체험·투어' | '회원 공통'
  openFaqIds: new Set(), // 펼침 상태 id들
  allowMultiOpen: false, // true면 다중 펼침 허용

  // 카테고리 변경
  setFaqCategory: (cat) => set({ faqCategory: cat, openFaqIds: new Set() }),

  // 펼침/접힘 토글
  toggleFaq: (id) => {
    const { openFaqIds, allowMultiOpen } = get();
    const next = new Set(openFaqIds);
    const isOpen = next.has(id);
    if (allowMultiOpen) {
      isOpen ? next.delete(id) : next.add(id);
    } else {
      // 단일 아코디언
      next.clear();
      if (!isOpen) next.add(id);
    }
    set({ openFaqIds: next });
  },

  // 파생 목록: 카테고리 필터만 적용 + isOpen 주입
  listFaqs: () => {
    const { faqs, faqCategory, openFaqIds } = get();
    let arr = faqs;

    if (faqCategory === "TOP Q&A") {
      arr = faqs.filter((f) => !!f.isTop);
    } else if (faqCategory !== "전체") {
      arr = faqs.filter((f) => f.category === faqCategory);
    }
    return arr.map((f) => ({ ...f, isOpen: openFaqIds.has(f.id) }));
  },
}));

export default useSupportStore;
