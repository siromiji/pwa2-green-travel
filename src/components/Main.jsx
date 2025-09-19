import './Main.css';
import { useNavigate } from 'react-router-dom';

function Main() {
  const navigate = useNavigate();
  return(
    <div className="titleimgwrap">
      <img  alt="대문" className='title-Img' onClick={()=>{navigate('/festivals')}} src='/base/backimg.png'/>
    
    </div>
  ) 
}
export default Main