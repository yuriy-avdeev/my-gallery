import { Outlet } from 'react-router-dom'

import './Main.scss'

const Main: React.FC = () => {
  return (
    <div className='main'>
      <h1 className='main__title'>
        Personal site of Oksana Avdeeva
      </h1>
      <Outlet />
    </div >
  )
}

export default Main
