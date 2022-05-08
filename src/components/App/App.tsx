import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

import './App.scss'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Main from '../Main/Main'
import Preloader from '../Preloader/Preloader'
const Gallery = lazy(() => import('../Gallery/Gallery'))
const PictureItem = lazy(() => import('../PictureItem/PictureItem'))
const PictureLast = lazy(() => import('../PictureLast/PictureLast'))
const PageNotFound = lazy(() => import('../PageNotFound/PageNotFound'))

const App = () => {


  return (
    <div className='app'>
      <Header />
      <main className='app__main'>
        <Suspense fallback={<Preloader />}>
          <Routes>
            <Route path='my-gallery'>
              <Route index element={<Main />} />
              <Route path='gallery' element={<Gallery />}>
                <Route path=':cardId' element={<PictureItem />} />
                <Route path='last' element={<PictureLast />} />
              </Route>
            </Route>
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default App
