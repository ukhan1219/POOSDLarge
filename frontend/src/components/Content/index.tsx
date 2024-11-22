
import Blurb from '../Blurb'
import dumbbells from '../../assets/dumbbells.png'
import Update from '../Update'
import DayCard from '../DayCard'

import './content.css'

function Content(props) {
  
  const selectedOption = 1

  let content;
  switch (selectedOption) {
    case 0:
      content = <Update />
      break
    case 1:
      content = <DayCard />
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