import './Header.scss'
import CustomLink from '../CustomLink/CustomLink'


const Header = () => {
  return (
    <header className='header'>
      <nav>
        <ul>
          <li>
            <CustomLink to="my-gallery">Main</CustomLink>
          </li>
          <li>
            <CustomLink to="my-gallery/gallery">Gallery</CustomLink>
          </li>
          <li>
            <CustomLink to="my-gallery/gallery/last">Link №2</CustomLink>
          </li>
        </ul>
      </nav>
    </header >
  )
}

export default Header
