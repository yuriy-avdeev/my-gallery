import { useParams } from 'react-router-dom'

const PictureItem = () => {
  let { cardId } = useParams()

  return (
    <div className='picture-item'>
      <h2> Component with dynamic (:cardId) from URL - {cardId}</h2>;
    </div>
  )
}

export default PictureItem
