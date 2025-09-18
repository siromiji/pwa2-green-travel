import './Main.css';
import titleImg from '../assets/backimg.png';
import { useNavigate } from 'react-router-dom';

function Main() {
  const navigate = useNavigate();
  return(
    <div className="titleimgwrap">
      <img src={titleImg} alt="대문" className='title-Img' onClick={()=>{navigate('/festivals')}}/>
    
    </div>
  ) 
}
export default Main