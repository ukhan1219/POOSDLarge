

import './daycard.css'

function DayCard(props) {

  const typeShit = 0

  let content
  switch(typeShit) {
    case 0:
      content = (
        < >
          <p>No workout logged</p>
        </>
      )
      break
  }

  return (
    < >
      <div className='daycard-container'>
        <div className='card-title'>
          {props.chosenDay}
        </div>
        <div className='card-contents'>
          {content}
        </div>
        <div className='card-footer'>
          <button className='edit-btn'>Edit</button>
          <button className='done-btn' onClick={() => props.option(0)}>Done</button>
        </div>
      </div>
    </>
  )
}

export default DayCard