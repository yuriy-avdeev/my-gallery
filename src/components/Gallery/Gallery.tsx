import { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../hooks'

import './Gallery.scss'
import Card from '../Card/Card'
import PictureSearch from '../PictureSearch/PictureSearch'
import { fetchPaintings } from '../../store/paintingSlice'


const Gallery: React.FC = () => {
  const { cardId } = useParams()
  const dispatch = useAppDispatch()
  const { paintingsMainList, paintingsRenderList } = useAppSelector(state => state.paintings)
  const [isPictureOpen, setIsPictureOpen] = useState(false)

  useEffect(() => {
    !paintingsMainList.length && dispatch(fetchPaintings(7)) // - mock - по кол-ву существующих картин для цикла в сторе
  }, [dispatch, paintingsMainList.length])

  useEffect(() => {
    setIsPictureOpen(!!cardId)
  }, [cardId])

  return (
    <div className='gallery'>
      <div className={`gallery__content-box ${isPictureOpen && 'gallery__content-box_shift'}`}>
        <h1 className='gallery__title'>Gallery</h1>
        <PictureSearch />
      </div>

      <div className='gallery__content' >
        <div className={`gallery__images-box ${isPictureOpen && 'gallery__images-box_shift'}`}>
          {
            paintingsRenderList.map(c =>
              <Card painting={c} isPictureOpen={isPictureOpen} key={c.cardId} />)
          }
        </div>
        {
          isPictureOpen &&
          <div className="gallery__children-box">
            <Outlet />
          </div>
        }
      </div>
    </div>
  )
}

export default Gallery
