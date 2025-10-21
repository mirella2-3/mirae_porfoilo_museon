// store/module/favoriteSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const item = action.payload;
      const exists = state.favorites.find((f) => f.id === item.id);

      if (exists) {
        state.favorites = state.favorites.filter((f) => f.id !== item.id);
      } else {
        state.favorites.push(item);
      }

      // 로컬스토리지 동기화
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
  },
});

export const { toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
