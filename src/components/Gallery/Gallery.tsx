import { memo, useEffect, useState } from 'react'
import Card from '../Card/Card'
import './Gallery.scss'
import { Outlet, useParams, useLocation } from 'react-router-dom'
import {PaintingData} from '../../types/variables'

import sun from '../../assets/images/mock/u.png'
import book from '../../assets/images/mock/b.png'
import edit from '../../assets/images/mock/e.png'
import recycle from '../../assets/images/mock/s.png'
import basket from '../../assets/images/mock/m.svg'

const paintings: PaintingData[]  = [ // потом добавить как для пропсов
  { name: 'sun', link: sun, cardId: 'sun' },
  { name: 'book', link: book, cardId: 'book' },
  { name: 'edit', link: edit, cardId: 'edit' },
  { name: 'recycle', link: recycle, cardId: 'recycle' },
  { name: 'basket', link: basket, cardId: 'basket' }
]

const Gallery: React.FC = () => {
  const { cardId } = useParams()
  let location = useLocation();

  const [isOutletOpen, setIsOutletOpen] = useState(false)

  useEffect(() => {
    setIsOutletOpen(!!cardId || location.pathname === '/my-gallery/gallery/search')
  }, [cardId, location.pathname])


  return (
    <div className='gallery'>
      <h1 className='gallery__title'>Gallery</h1>
      <div className="gallery__content">
        {/* добавить плавность смещения */}
        <div className={`gallery__images-box ${isOutletOpen && 'gallery__images-box_left'}`}        >
          {
            paintings.map(c =>
              <Card painting={c} key={c.cardId} />)
          }
        </div>
        {/* добавить плавность появления */}
        <div className="gallery__children-box">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Gallery
