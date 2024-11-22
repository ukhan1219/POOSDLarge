import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import './styles.css'
function NavBar() {
  return (
    < >
      <div className="header">
        <h3 className="logo">Fit</h3>
        <div className="navigation">
          <a href="">About</a>
          <Link to = '/login'>Login</Link>
        </div>
      </div>
    </>
  )
}

export default NavBar