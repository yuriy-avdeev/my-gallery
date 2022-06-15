import { Outlet } from 'react-router-dom'

import './Main.scss'
import me from '../../assets/images/me.png'
import feather from '../../assets/images/feather.png'


const Main: React.FC = () => {
  return (
    <div className='main'>
      <div className="main__top-box">
        <img className="main__foto" src={me} alt="it's me" />
        <h1 className='main__title'>My paintings</h1>
      </div>

      <div>
        <p className='main__text'> <img className='main__paintings' src={feather} alt="feather" />
          I welcome you to my site, where I have collected my favorite paintings.
        </p>
        <p className='main__text'> In total, there are more than a hundred works in my portfolio, here you can see some of them - my best works and those with which I have special memories. Each painting for me is a special experience and a step in the development of my skills.</p>
        <p className='main__text'>I took my first steps as an artist at the age of 7, and since then I have been attending an art school almost constantly, combining classes in it with studying in a regular school. Sometimes I had to take short breaks and it was painful for me - I always wanted to pick up a brush as soon as possible and express feelings and emotions on canvas.</p>
        <p className='main__text'>I experienced real pleasure when I could leave all worries behind and devote myself to creativity, and the crown of this process was an unforgettable feeling when for the first time I see in front of me a finished and perfect work created by my own hands.</p>
        <p className='main__text'>I will be very happy if my paintings bring you some pleasant moments.</p>
        <h3 className='main__title_name'>Oksana Avdeeva</h3>
      </div>
      <Outlet />
    </div >
  )
}

export default Main
