

import './styles.css'
// TODO: LEO YOU BETTER FIX THIS 
// LMFAO
function NavBar(props) {
  console.log("user "+props.user)
  return (
    < >
      <div className="header">
        <a className="logo">Fit</a>
        <div className="navigation">
          {/* <a href="">About</a> */}
          {
            props.user ?
            <a href='profile'>Profile</a> :
            <a href=''>Log In</a>
          }
        </div>
      </div>
    </>
  )
}

export default NavBar