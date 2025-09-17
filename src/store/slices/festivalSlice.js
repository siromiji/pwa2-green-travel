import { createSlice } from "@reduxjs/toolkit";
import { festivalIndex } from "../thunks/festivalThunk.js";
import { localStorageUtil } from "../../utils/localStorageUtil.js";

const festivalSlice = createSlice({
  name: 'festivalSlice',
  initialState: {
    
    list: [],//페스티벌 리스트
    page: 1,
    scrollEventFlg: true,
    list: localStorageUtil.getFestivalList() ? localStorageUtil.getFestivalList() : [], // 페스티벌 리스트
    page: localStorageUtil.getFestivalPage() ? localStorageUtil.getFestivalPage() : 0, // 현재 페이지 번호
    scrollEventFlg: localStorageUtil.getFestivalScrollFlg() ? localStorageUtil.getFestivalScrollFlg() : true, // 스크롤 이벤트 디바운싱 제어 플래그
  
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
            //state 저장
            state.list = [...state.list, ...action.payload.items.item];
            state.page = action.payload.pageNo;
            state.scrollEventFlg = true;

             // localstorage 저장
            localStorageUtil.setFestivalList(state.list);
            localStorageUtil.setFestivalPage(state.page);
            localStorageUtil.setFestivalScrollFlg(state.scrollEventFlg);
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
} = festivalSlice.actions;

export default festivalSlice.reducer;
