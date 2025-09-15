import { useDispatch, useSelector } from 'react-redux';
import './FestivalList.css';
import { useEffect } from 'react';
import { festivalIndex } from '../../store/thunks/festivalThunk.js';
import { dateFormatter } from '../../utils/dateFormatter.js'; 
import { setSrollEventFlg } from '../../store/slices/festivalSlice.js';

function FestivalList() {
  const dispatch =useDispatch();
  const festivalList = useSelector(state=> state.festival.list);
  const page = useSelector(state=>state.festival.page);
  const scrollEventFlg = useSelector(state =>state.festival.scrollEventFlg);
 
  useEffect(()=>{
    dispatch(festivalIndex(1));

  },[]);
//스크롤용 useEffect
  useEffect(()=>{
  
    window.addEventListener('scroll', addNextPage);
    //window event는 현재컴포넌트가 없는 다른 페이지에도 실행되어서 꼭 리무브 해줘야함 
    return () => {
      window.removeEventListener('scroll', addNextPage);  
    }
  },[page,setSrollEventFlg]);

  //다음페이지 가져오기
  function addNextPage(){
     /*스크롤 이벤트 주의사항
    1.굉장히 잦은 빈도로 실행한다.
     >디바운싱(실행중관점) & 쓰로틀링(시간제약관점) & IntersectionObserver(callback,options)를
     이용하여 실행 빈도 조절 필 수 
     2.같은 요청을 반복적으로 할 가능성이 높아,
        반복적으로 실행이 안되도록 제어하는 것이 필 수
    */
    const docHeight = document.documentElement.scrollHeight;//문서의 Y축 총 길이
    const winHeight = window.innerHeight;//윈도우의 Y축 총 길이 
    const nowHeight = window.scrollY;//현재 스크롤의 Y축 위치
    const viewHeight = docHeight - winHeight//스크롤을 끝까지 내렸을 때의 Y축 위치 

    if(viewHeight === nowHeight && scrollEventFlg){
      dispatch(setSrollEventFlg(false))
      dispatch(festivalIndex(page + 1));
    }
    

  }


  return(
    <>
      <div className="backimgwrap" >
      </div>
      <div className='container'>
        {
          festivalList.length > 0 && festivalList.map(item => {
            return(
              
                <div className="card" key={item.contentid + item.createdtime}>
                  <div className="card-img" style={{backgroundImage: `url(${item.firstimage})`}}></div>
                  <p className="card-title">{item.title}</p>
                  <p className="card-period">{dateFormatter.withHypenYMD(item.eventstartdate)} ~ {dateFormatter.withHypenYMD(item.eventenddate)}</p>
               </div>
            );
          })
        }
        
        
        
      </div>
      <button type="button" onClick={addNextPage} >더보기</button>
      
    </>
  )
}

export default FestivalList;
