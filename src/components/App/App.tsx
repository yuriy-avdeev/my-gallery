import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

import './App.scss'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Main from '../Main/Main'
import Preloader from '../Preloader/Preloader'
const Gallery = lazy(() => import('../Gallery/Gallery'))
const PictureItem = lazy(() => import('../PictureItem/PictureItem'))
const PageNotFound = lazy(() => import('../PageNotFound/PageNotFound'))

const App = () => {
  return (
    <div className='app'>
      <Header />
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
