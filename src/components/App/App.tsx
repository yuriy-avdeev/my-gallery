import { Suspense, lazy, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import { fetchPaintings } from '../../store/paintingSlice'
import { paintingsTempList } from '../../store/data'
import { useAppSelector, useAppDispatch } from '../../hooks'
import './App.scss'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Main from '../Main/Main'
import Preloader from '../Preloader/Preloader'
const Gallery = lazy(() => import('../Gallery/Gallery'))
const PictureItem = lazy(() => import('../PictureItem/PictureItem'))
const PageNotFound = lazy(() => import('../PageNotFound/PageNotFound'))


const App = () => {
  const dispatch = useAppDispatch()
  const { paintingsMainList } = useAppSelector(state => state.paintings)

  // дальше работа с картинами после запооса - в Gallery
  useEffect(() => {
    !paintingsMainList.length && dispatch(fetchPaintings(paintingsTempList.length)) // по к-ву картин для цикла в сторе
  }, [dispatch, paintingsMainList.length])

  return (
    <div className='app'>
      <Header />
      {/* Suspense работает, но не идеально => добавил Preloader в Gallery */}
      <Suspense fallback={<Preloader />}>
        <Routes>
          <Route path='/'>
            <Route index element={<Main />} />
            <Route path='gallery' element={<Gallery />}>
              <Route path=':cardId' element={<PictureItem />} />
            </Route>
          </Route>
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  )
}

export default App
