import './styles.css'

function NavBar(props) {
  return (
    < >
      <div className="header">
        <p className="logo">Fit</p>
        <div className="navigation">
          <a href="#">About</a>
          {props.status ? (
            <a href='#'>Account</a>
          ) : (
            <a href="#">Login</a>
          )}
        </div>
      </div>
    </>
  )
}

export default NavBar