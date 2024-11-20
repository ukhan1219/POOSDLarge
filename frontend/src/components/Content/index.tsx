import Calendar from '../Calendar'
import Blurb from '../Blurb'
import dumbbells from '../../assets/dumbbells.png'
import Update from '../Update'

import './content.css'

function Content(props) {
  
  const selectedOption = 0

  let content;
  switch (selectedOption) {
    case 0:
      content = <Update />
      break
  }

  return (
    <div className='stuff'>
      {props.status ? (
        < >
          <div className='calendar-container'>
            <Calendar />
          </div>
          <div className='action-container'>
            {content}
          </div>
        </>
      ) : (
        < >
          <Blurb />
          <img src={dumbbells} className='dumbbells'></img>
        </>
      )}
    </div>
  )
}

export default Content