// 여러 화면에서 공유할 수 있는 페이지네이션 스토어

import { create } from "zustand";
import { useEffect } from "react";

const usePaginationStore = create((set) => ({
  state: {}, // { [key]: { page, pageSize } }

  setPage: (key, page) =>
    set((s) => ({
      state: {
        ...s.state,
        [key]: { page, pageSize: s.state[key]?.pageSize ?? 5 },
      },
    })),

  setPageSize: (key, pageSize) =>
    set((s) => ({
      state: {
        ...s.state,
        [key]: { page: s.state[key]?.page ?? 1, pageSize },
      },
    })),

  reset: (key) =>
    set((s) => {
      const next = { ...s.state };
      delete next[key];
      return { state: next };
    }),
}));

// 편의 훅: 컴포넌트에서 간단히 사용
export function usePagination(key, defaultPageSize = 5) {
  const page = usePaginationStore((s) => s.state[key]?.page ?? 1);
  const pageSize = usePaginationStore(
    (s) => s.state[key]?.pageSize ?? defaultPageSize
  );
  const setPage = usePaginationStore((s) => s.setPage);
  const setPageSize = usePaginationStore((s) => s.setPageSize);

  // 초기 페이지 사이즈 세팅 (렌더 중 set 방지)
  useEffect(() => {
    if (usePaginationStore.getState().state[key]?.pageSize == null) {
      setPageSize(key, defaultPageSize);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, defaultPageSize]);

  return {
    page,
    pageSize,
    setPage: (p) => setPage(key, p),
    setPageSize: (sz) => setPageSize(key, sz),
  };
}

export default usePaginationStore;
