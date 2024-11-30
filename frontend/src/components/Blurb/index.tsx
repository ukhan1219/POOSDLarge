import Button from '../Button/'


import './styles.css'

function Blurb() {
  return (
    < >
      <div className='content'>
        <p className='phrase'>
          Get Fit,
          <br></br>
          Get Strong,
          <br></br>
          Get Healthy!
        </p>
        <p className='message'>
          Welcome to our fitness tracker website designed to help you achieve your goals and transform your body and mind.
        </p>
        <div className='btn-container'>
          <Button label="Get Started" path="/login" />
        </div>
      </div>
    </>
  )
}

export default Blurb