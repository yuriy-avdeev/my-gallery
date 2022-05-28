import { Outlet } from 'react-router-dom'

import './Main.scss'
import me from '../../assets/images/me.png'


const Main: React.FC = () => {
  return (
    <div className='main'>
      <h1 className='main__title'>
        Personal site of Oksana Avdeeva
      </h1>
      <div className="main__info">
        <img className="main__foto" src={me} alt="it's me" />
      </div>
      <Outlet />
    </div >
  )
}

export default Main
