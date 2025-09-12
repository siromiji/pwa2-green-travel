import './Main.css';
import titleImg from '../assets/backimg.png';
import { useNavigate } from 'react-router-dom';

function Main() {
  const navigate = useNavigate();
  return(
    <div class="titleimgwrap">
      <img src={titleImg} alt="대문" className='title-Img' onClick={()=>{navigate('/fastivals')}}/>
    
    </div>
  ) 
}
export default Main