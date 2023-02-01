import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export type LoginState = {
  loginModal: 
    {
      toggle: boolean;
    }
};

const initialState: LoginState = {
  loginModal: { toggle: false },
};

export const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    changeToggle: (state, action: PayloadAction<boolean>) => {
      console.log(state.loginModal,'state');
      console.log(!action.payload,'action');
      state.loginModal = {...state.loginModal,toggle:!action.payload};
      console.log(state.loginModal,'state2');
    },
  },

  extraReducers: {},

});
export const { changeToggle } = ModalSlice.actions;
export default ModalSlice.reducer;

// comment: [
//   {
//     id: 0,
//     accessToken: true,
//     nickName: "길동이",
//     content: "저는 어디에도 있고 어디에도 없습니다.",
//     editCheck: false,
//     dislikeCheck: false,
//     likes: 0,
//     dislike: 0,
//   },
//   {
//     id: 1,
//     accessToken: false,
//     nickName: "발락",
//     content: "여기가 차붐의 나라입니까..?",
//     editCheck: false,
//     dislikeCheck: false,
//     likes: 0,
//     dislikes: 0,
//   },
//   {
//     id: 2,
//     accessToken: false,
//     nickName: "예수그리스도",
//     content: '"AMEN"',
//     editCheck: false,
//     dislikeCheck: false,
//     likes: 0,
//     dislikes: 0,
//   },
// ],