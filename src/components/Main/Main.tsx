import { Outlet } from 'react-router-dom'

import './Main.scss'
import me from '../../assets/images/me.png'
import feather from '../../assets/images/feather.png'


const Main: React.FC = () => {
  return (
    <div className='main'>
      <div className="main__top-box">
      <img className="main__foto" src={me} alt="it's me" />
        <h1 className='main__title'>My gallery.</h1>
      </div>

      <div>
        <p className='main__text'> <img className='main__paintings' src={feather} alt="feather" />
          I welcome you to my site, where I have collected my favorite paintings.
        </p>
        <p className='main__text'> In total, there are more than a hundred works in my portfolio, here you can see some of them - my best works and those with which I have special memories. Each painting for me is a special experience and a step in the development of my skills.</p>
        <p className='main__text'>I will be very happy if my paintings bring you some pleasant moments.</p>
        <p className='main__text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic adipisci repudiandae sed. Saepe veritatis autem est expedita alias enim obcaecati eius, repellendus mollitia consequatur nesciunt quae provident molestiae dolor pariatur aliquam repudiandae odio et nostrum debitis quas perspiciatis eveniet! Eveniet similique, vel accusamus repellendus consectetur, ipsum dolore quis cupiditate laudantium voluptate perspiciatis atque suscipit nulla. Incidunt, doloribus delectus? Sequi autem reprehenderit alias corporis, id sed hic nemo rerum explicabo expedita dolore aut cum ipsum quos distinctio nobis dolorem quae, consequatur molestiae voluptas. Sunt, sit blanditiis?</p>
        <h3 className='main__title_name'>Oksana Avdeeva</h3>
      </div>
      <Outlet />
    </div >
  )
}

export default Main
