

import './styles.css'
// TODO: LEO YOU BETTER FIX THIS 
// LMFAO
function NavBar(props) {
  console.log("user "+props.user)
  return (
    < >
      <div className="header">
        <a href="/" className="logo">Fit</a>
        <div className="navigation">
        <a href="/about">About</a>
          {
            props.user ?
            <a href='profile'>Profile</a> :
            <a href='/login'>Log In</a>
          }
        </div>
      </div>
    </>
  )
}

export default NavBar