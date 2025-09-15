import { createSlice } from "@reduxjs/toolkit";
import { festivalIndex } from "../thunks/festivalThunk.js";

const festivalSlice = createSlice({
  name: 'festivalSlice',
  initialState: {
    
    list: [],//페스티벌 리스트
    page: 1,
    scrollEventFlg: true,
  },
  reducers : {
    setSrollEventFlg: (state ,action) => {
      state.scrollEventFlg = action.payload;
    }
  },
  extraReducers: builder => {
      builder
        .addCase(festivalIndex.fulfilled, (state, action) => {
          // console.log(action.payload,action.type);
          // if(state.list !== null){
          // if(state.list !== null){
          //   state.list = [...state.list, ...action.payload.items.item];
          //   state.page = action.payload.pageNo;
          // }else{
          //   state.list = action.payload.items.item;
          // }
          if(action.payload.items?.item){
            state.list = [...state.list, ...action.payload.items.item];
            state.page = action.payload.pageNo;
            state.scrollEventFlg = true;
          }else{
            state.scrollEventFlg = false;
          }


          
        })
        .addMatcher(
          action => action.type.endsWith('/pending'),
          state => {
            console.log('처리중입니다') ; 
          }
        )
        .addMatcher(
          action => action.type.endsWith('/rejected'),
          (state,action) => {
            console.error('에러',action.error)  ;
          }
        );
    }
});

export const {
  setSrollEventFlg
} = festivalSlice.actions;

export default festivalSlice.reducer;
