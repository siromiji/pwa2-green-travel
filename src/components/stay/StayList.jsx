import { useDispatch, useSelector } from 'react-redux';
import './StayList.css';
import { useEffect } from 'react';
import { stayIndex } from '../../store/thunks/stayThunk.js';
import { setScrollEventFlg } from '../../store/slices/staySlice.js';
import { useNavigate } from 'react-router-dom';

function StayList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const stayList = useSelector(state => state.stay.list);
  const scrollEventFlg = useSelector(state => state.stay.scrollEventFlg);

  useEffect(() => {
    window.addEventListener('scroll', addNextPage);
    
    if(stayList.length === 0) {
      dispatch(stayIndex());
    }

    return () => {
      window.removeEventListener('scroll', addNextPage);
    }
  }, []);

  // 다음 페이지 가져오기
  function addNextPage() {
    // 스크롤 관련 처리
    const docHeight = document.documentElement.scrollHeight; // 문서의 Y축 총 길이
    const winHeight = window.innerHeight; // 윈도우의 Y축 총 길이
    const nowHeight = Math.ceil(window.scrollY); // 현재 스크롤의 Y축 위치
    const viewHeight = docHeight - winHeight; // 스크롤을 끝까지 내렸을 때의 Y축 위치
    
    if(viewHeight === nowHeight && scrollEventFlg) {
      dispatch(setScrollEventFlg(false));
      dispatch(stayIndex());
    }
  }

  // 상세페이지로 이동
  function redirectShow(item) {
    // dispatch(setFestivalInfo(item));
    navigate(`/stays/${item.contentid}`);
  }

  return (
    <>
      <div className='backimgwrap'></div>
      <div className="container">
        {
          stayList.map(item => {
            return (
              <div className="card" onClick={() => { redirectShow(item) }} key={item.contentid + item.createdtime}>
                <div className="card-img" style={{backgroundImage: `url('${item.firstimage}')`}}></div>
                <p className="card-title">{item.title}</p>
              </div>
            );
          })
        }
      </div>
    </>
  )
}

export default StayList;