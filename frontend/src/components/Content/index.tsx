import Blurb from '../Blurb'
import dumbbells from '../../assets/dumbbells.png'

import './styles.css'

function Content() {
  return (
    < >
      <div className='stuff'>
        <Blurb />
        <img src={dumbbells} className='dumbbells'></img>
      </div>
    </>
  )
}

export default Content