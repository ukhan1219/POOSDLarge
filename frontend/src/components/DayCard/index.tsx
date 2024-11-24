import './daycard.css'

function DayCard(props) {

  let content;

  switch(props.state) {
    case 0:
      content = (
        < >
          <div className='card-contents'>
            <p className='empty-msg'>No workout logged</p>
          </div>
          <div className='card-footer'>
            <button className='edit-btn' onClick={() => props.stateSelect(1)}>Edit</button>
            <button className='done-btn' onClick={() => {
              props.option(0)
              }}>Done</button>
          </div>
        </>
      )
      break;
    case 1:
      content = (
        < >
          <form className='form-container'>
            <div className='card-contents'>
              <input placeholder='Workout name' className='in-name'></input>
              <textarea rows={4} placeholder="Exercises" className='in-exercise'></textarea>
              <div className='idk'>
                <input placeholder='Time' className='in-time'></input>
                <input placeholder='Calories' className='in-cal'></input>
              </div>
            </div>
            <div className='card-footer'>
              <button className='cancel-btn' onClick={() => props.stateSelect(0)}>Cancel</button>
              {/* this done button should submit the form */}
              <button className='done-btn'>
                Done
              </button>
            </div>
          </form>
        </>
      )
      break;
  }

  return (
    < >
      <div className='daycard-container'>
        <div className='card-title'>
          {props.chosenDay}
        </div>
        {content}
      </div>
    </>
  )
}

export default DayCard