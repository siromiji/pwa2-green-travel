import { useNavigate, useParams } from "react-router-dom";
import './StayShow.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setStayInfo } from "../../store/slices/stayShow.js";

function StayShow() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stayInfo = useSelector(state => state.stayShow.stayInfo);
  const stayList = useSelector(state => state.stay.list);
  
  useEffect(() => {
    const item = stayList.find(item => params.id === item.contentid);
    dispatch(setStayInfo(item));
  }, []);

  function redirectBack() {
    navigate(-1);
  }

  return (
    <>
      <div className='backimgwrap'></div>

      {
        stayInfo.title &&
        <div className="stay-show-container">
          <button type="stay-button" onClick={redirectBack}>되돌아가기</button>
          <img className="stay-show-img" src={stayInfo.firstimage} alt={`${stayInfo.title}사진`} />
          <p className="stay-show-title">{stayInfo.title}</p>
          <p className="stay-show-period">{stayInfo.addr1}</p>
          <p className="stay-show-period">{stayInfo.tel}</p>
          
          
        </div>
      }
    </>
  )
}

export default StayShow;