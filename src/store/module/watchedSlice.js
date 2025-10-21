import { createSlice } from "@reduxjs/toolkit";

// 🔹 로컬스토리지에서 초기값 불러오기
const loadWatched = () => {
  try {
    const saved = localStorage.getItem("watched");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// 🔹 로컬스토리지에 저장하기
const saveWatched = (watched) => {
  localStorage.setItem("watched", JSON.stringify(watched));
};

const watchedSlice = createSlice({
  name: "watched",
  initialState: {
    watched: loadWatched(),
  },
  reducers: {
    addWatched: (state, action) => {
      if (!state.watched.find((w) => w.id === action.payload.id)) {
        state.watched.push(action.payload);
        saveWatched(state.watched); // ✅ 추가 시 저장
      }
    },
    removeWatched: (state, action) => {
      state.watched = state.watched.filter((w) => w.id !== action.payload);
      saveWatched(state.watched); // ✅ 삭제 시 저장
    },
    clearWatched: (state) => {
      state.watched = [];
      saveWatched(state.watched); // ✅ 전체삭제 시 저장
    },
  },
});

export const { addWatched, removeWatched, clearWatched } = watchedSlice.actions;
export default watchedSlice.reducer;
