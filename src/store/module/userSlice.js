import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: !!localStorage.getItem("loggedInUser"), // 새로고침해도 로그인 유지
  userInfo: JSON.parse(localStorage.getItem("loggedInUser")) || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.userInfo = {
        ...action.payload,
        profileImg: action.payload.profileImg || "/images/profile.JPG", // 기본 이미지
      };
      localStorage.setItem("loggedInUser", JSON.stringify(state.userInfo));
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userInfo = null;
      localStorage.removeItem("loggedInUser");
    },
    updateNickname(state, action) {
      if (state.userInfo) {
        state.userInfo = {
          ...state.userInfo,
          name: action.payload, // 닉네임만 교체
        };
        localStorage.setItem("loggedInUser", JSON.stringify(state.userInfo));
      }
    },
    updateProfileImg(state, action) {
      if (state.userInfo) {
        state.userInfo = {
          ...state.userInfo,
          profileImg: action.payload,
        };
        localStorage.setItem("loggedInUser", JSON.stringify(state.userInfo));
      }
    },
  },
});

export const { login, logout, updateNickname, updateProfileImg } =
  userSlice.actions;
export default userSlice.reducer;
