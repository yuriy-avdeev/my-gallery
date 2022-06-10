import { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useAppSelector } from '../../hooks'

import './Gallery.scss'
import Card from '../Card/Card'
import PictureSearch from '../PictureSearch/PictureSearch'
import me from '../../assets/images/wow.png'
import Preloader from '../Preloader/Preloader'


const Gallery: React.FC = () => {
  const { cardId } = useParams()
  const { isLoading, paintingsRenderList } = useAppSelector(state => state.paintings)
  const [isPictureOpen, setIsPictureOpen] = useState(false)

  useEffect(() => {
    setIsPictureOpen(!!cardId)
  }, [cardId])

  return (
    <>
      {
        isLoading ?
          <Preloader />
          :
          <div className='gallery'>
            <div className={`gallery__content-box ${isPictureOpen && 'gallery__content-box_shift'}`}>
              <h1 className='gallery__title'>Gallery</h1>
              <PictureSearch />
            </div>

            <div className='gallery__content'>
              {
                paintingsRenderList.length ?
                  <div className={`gallery__images-box ${isPictureOpen && 'gallery__images-box_shift'}`}>
                    {
                      paintingsRenderList.map(c =>
                        <Card painting={c} isPictureOpen={isPictureOpen} key={c.cardId} />)
                    }
                  </div>
                  :
                  <div className='gallery__info-box'>
                    <img className='gallery__foto' src={me} alt="me-morning" />
                    <p className='gallery__message'>I haven't drawn this yet...</p>
                  </div>
              }
              {
                isPictureOpen &&
                <div className="gallery__children-box">
                  <Outlet />
                </div>
              }
            </div>
          </div>
      }
    </>
  )
}

export default Gallery
