

import './daycard.css'

function DayCard() {

  const typeShit = 0
  const today = "November 1, 2024"

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
          {today}
        </div>
        <div className='card-contents'>
          {content}
        </div>
        <div className='card-footer'>
          <button className='edit-btn'>Edit</button>
          <button className='done-btn'>Done</button>
        </div>
      </div>
    </>
  )
}

export default DayCard