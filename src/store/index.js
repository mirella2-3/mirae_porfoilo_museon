import { configureStore } from "@reduxjs/toolkit";
import reviewReducer from "./module/reviewSlice.js";
import userReducer from "./module/userSlice.js";
import favoriteReducer from "./module/favoriteSlice.js";
import watchedReducer from "./module/watchedSlice.js";

const store = configureStore({
  reducer: {
    review: reviewReducer,
    user: userReducer,
    favorites: favoriteReducer,
    watched: watchedReducer,
  },
});

export default store;
