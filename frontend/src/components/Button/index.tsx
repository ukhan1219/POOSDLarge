import { Link } from 'react-router-dom';
import './styles.css'

function Button() {
  return (
    < >
      <div className='btn'>
        <Link to="/login" className="btn-txt">
          Start Now!
        </Link>
      </div>
    </>
  )
}

export default Button