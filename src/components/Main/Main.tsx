import { Outlet } from 'react-router-dom'

import './Main.scss'

const Main = () => {
  return (
    <div className='main'>
      <h1>
        Personal site of Oksana Avdeeva
      </h1>
      <Outlet />
    </div >
  )
}

export default Main
