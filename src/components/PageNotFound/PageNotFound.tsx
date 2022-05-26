import { Link } from 'react-router-dom'
import './PageNotFound.scss'

const PageNotFound: React.FC = () => {
  return (
    <div className='not-found'>
      <h3 className='not-found__title'>404</h3>
      <p className='not-found__text'>I don't have this page...</p>
      <Link className='not-found__link' to='/my-gallery'>to main</Link>
    </div>
  )
}

export default PageNotFound
