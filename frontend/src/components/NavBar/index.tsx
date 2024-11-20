import { Link } from 'react-router-dom';
import './styles.css'

function NavBar() {
  return (
    < >
      <div className="header">
        <p className="logo">Fit</p>
        <div className="navigation">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </>
  )
}

export default NavBar