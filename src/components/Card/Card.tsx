import { memo } from 'react'
import { NavLink } from 'react-router-dom'

import './Card.scss'
import { PaintingData } from '../../types/variables'

type CardProps = {
  painting: PaintingData,
  isPictureOpen: boolean
}


const Card: React.FC<CardProps> = memo(({ painting, isPictureOpen }) => {
  return (
    <div className={`card ${isPictureOpen && 'card__shift'}`}>
      <NavLink to={painting.cardId}>
        <img className='card__image' src={painting.link} alt={painting.title} />
      </NavLink>
      <h4 className='card__title'>{painting.title}</h4>
    </div >
  )
})

export default Card
