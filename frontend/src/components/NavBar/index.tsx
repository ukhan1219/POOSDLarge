import NavigateButton from '../Button'
import './styles.css'
// TODO: LEO YOU BETTER FIX THIS 
function NavBar() {
  return (
    < >
      <div className="header">
        <h3 className="logo">Fit</h3>
        <div className="navigation">
          <a href="">About</a>
          {/*<NavigateButton path = './LoginPage/index.tsx' label = 'login'/>*/}
        </div>
      </div>
    </>
  )
}

export default NavBar