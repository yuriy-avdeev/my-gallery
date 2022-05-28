import { memo } from 'react'
import { NavLink } from 'react-router-dom'

import './Card.scss'
import { PaintingData } from '../../types/variables'

type CardProps = {
  painting: PaintingData,
  isOutletOpen: boolean
}


const Card: React.FC<CardProps> = memo(({ painting, isOutletOpen }) => {
  return (
    <div className={`card ${isOutletOpen && 'card__shift'}`}>
      <NavLink to={painting.cardId}>
        <img className='card__image' src={painting.link} alt={painting.name} />
      </NavLink>
      <h4 className='card__title'>{painting.name}</h4>
    </div >
  )
})

export default Card
