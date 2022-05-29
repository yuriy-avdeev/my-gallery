import { memo, useEffect, useState } from 'react'
import { Outlet, useParams, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import './Gallery.scss'
import Card from '../Card/Card'
import PictureSearch from '../PictureSearch/PictureSearch'
import { PaintingData } from '../../types/variables'
import { fetchPaintings } from '../../store/paintingSlice'

import dali from '../../assets/images/mock/dali.jpg'
import endy from '../../assets/images/mock/endy.webp'
import monet from '../../assets/images/mock/monet.jpg'
import raffael from '../../assets/images/mock/raffael.jpg'
import rembrandt from '../../assets/images/mock/rembrandt.jpg'
import vanGog from '../../assets/images/mock/van-gog.jpg'
import sun from '../../assets/images/mock/sun.png'
const paintings: PaintingData[] = [ // потом добавить как для пропсов
  { name: 'Dali', link: dali, cardId: 'dali' },
  { name: 'Monet', link: monet, cardId: 'monet' },
  { name: 'Raffael', link: raffael, cardId: 'raffael' },
  { name: 'VanGog', link: vanGog, cardId: 'van-gog' },
  { name: 'Rembrandt', link: rembrandt, cardId: 'rembrandt' },
  { name: 'Sun', link: sun, cardId: 'sun' },
  { name: 'Endy', link: endy, cardId: 'endy' },
]

const Gallery: React.FC = () => {
  const dispatch = useDispatch()
  const {status, error} = useSelector(state => state.ppaintingsain)
  const { cardId } = useParams()
  // let location = useLocation()
  // useSelector - доступ к данным стора (приним. стейт и ф-ю и возвр. тут в переменную)
  // const paintings = useSelector(state => state.paintings.paintingsRenderList)
  const [isOutletOpen, setIsOutletOpen] = useState(false)

  useEffect(() => {
    setIsOutletOpen(!!cardId)
  }, [cardId])

  useEffect(() => {
    dispatch(fetchPaintings())
  }, [dispatch])


  return (
    <div className='gallery'>
      <div className={`gallery__content-box ${isOutletOpen && 'gallery__content-box_shift'}`}>
        <h1 className='gallery__title'>Gallery</h1>
        <PictureSearch />
      </div>

      <div className='gallery__content' >
        {error && <h2>Error - {error}</h2>}
        {status && <h2>LOADING...</h2>}

        <div className={`gallery__images-box ${isOutletOpen && 'gallery__images-box_shift'}`}>
          {
            paintings.map(c =>
              <Card painting={c} isOutletOpen={isOutletOpen} key={c.cardId} />)
          }
        </div>
        {
          isOutletOpen &&
          <div className="gallery__children-box">
            <Outlet />
          </div>
        }
      </div>
    </div>
  )
}

export default Gallery
