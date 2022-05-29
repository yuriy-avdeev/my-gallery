import { memo, useEffect, useState } from 'react'
import Card from '../Card/Card'
import PictureSearch from '../PictureSearch/PictureSearch'
import './Gallery.scss'
import { Outlet, useParams, useLocation } from 'react-router-dom'
import { PaintingData } from '../../types/variables'

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
  const { cardId } = useParams()
  // let location = useLocation()

  const [isOutletOpen, setIsOutletOpen] = useState(false)

  useEffect(() => {
    setIsOutletOpen(!!cardId)
  }, [cardId])


  return (
    <div className='gallery'>
      <div className={`gallery__content-box ${isOutletOpen && 'gallery__content-box_shift'}`}>
        <h1 className='gallery__title'>My gallery</h1>
        <PictureSearch />
      </div>

      <div className='gallery__content' >
        {/* добавить плавность смещения */}
        <div className={`gallery__images-box ${isOutletOpen && 'gallery__images-box_shift'}`}>
          {
            paintings.map(c =>
              <Card painting={c} isOutletOpen={isOutletOpen} key={c.cardId} />)
          }
        </div>
        {/* добавить плавность появления */}
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
