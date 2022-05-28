import './Footer.scss'

const Footer: React.FC = () => {
  return (
    <div className='footer'>
      <p className="footer__text">&copy; {new Date().getFullYear()} Y. Avdeev</p>
    </div>
  )
}

export default Footer
