import './Header.css'
import won from '../../assets/won.png'

function Header(){
  return(
    <>
      <h1>Green Travel</h1>
      <div className='wonImg'>
        <img src={won} alt="태극원" />
        </div>
    
    </>
  )
}

export default Header;