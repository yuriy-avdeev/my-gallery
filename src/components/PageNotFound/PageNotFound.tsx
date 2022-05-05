import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className='not-found'>
      <h3 className='not-found__title'>404</h3>
      <p className='not-found__message'>Такой страницы у нас нет...</p>
      <Link className='not-found__link' to='/my-gallery'>Вернуться на главную</Link>
    </div>
  )
}

export default PageNotFound
