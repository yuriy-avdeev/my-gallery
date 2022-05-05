import { Outlet, NavLink } from 'react-router-dom'

const Gallery = () => {
  return (
    <div className='picture-item'>
      <h1> Gallery</h1>
      <NavLink
        to='555'
        // className={({ isActive }) =>
        //   isActive ? 'header__link header__link_active' : 'header__link'
        // }
      >
        Link to - cardId #555
      </NavLink>
      <Outlet />
    </div>
  )
}

export default Gallery
