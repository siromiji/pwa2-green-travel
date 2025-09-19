import './Header.css';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";


function Header(){
  const navigate = useNavigate();
   const [visible, setVisible] = useState(false);

  return(
    <>
      <div className='hamImg'>
        <img onClick={() => setVisible(true)} src='/base/hamNav.png'/>
      </div>

        {visible && (
        <div className='navbox'>
          <span onClick={() => setVisible(false)}>x</span>
          <img onClick={()=>{navigate('/')}} src='/base/main.png'/>
          <p onClick={()=>{navigate('/festivals')}}>FESTIVAL LIST</p>
          <p onClick={()=>{navigate('/stays')}}>STAY LIST</p>
        </div>
        )}


      <h1 onClick={()=>{navigate('/')}}>Green Travel</h1>
      <div className='wonImg'>
        <img src='/base/won.png' alt="태극원" />
        </div>
    
    </>
  )
}

export default Header;