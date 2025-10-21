// store/module/reviewSlice.js
import { createSlice } from "@reduxjs/toolkit";

// 초기 상태를 localStorage에서 불러오기
const savedReviews = JSON.parse(localStorage.getItem("reviews")) || [];

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    reviews: savedReviews,
  },
  reducers: {
    onAdd: (state, action) => {
      state.reviews.push(action.payload);
      localStorage.setItem("reviews", JSON.stringify(state.reviews));
    },
    onDelete: (state, action) => {
      state.reviews = state.reviews.filter((r) => r.id !== action.payload);
      localStorage.setItem("reviews", JSON.stringify(state.reviews));
    },
  },
});

export const { onAdd, onDelete } = reviewSlice.actions;
export default reviewSlice.reducer;
