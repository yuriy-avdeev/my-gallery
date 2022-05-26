import './Preloader.scss'

const Preloader: React.FC = () => {
  return (
    <div className='preloader'>
      <div className='preloader__container'>
        <span className='preloader__round'></span>
      </div>
    </div>
  )
}

export default Preloader
