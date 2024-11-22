import NavBar from '../../components/NavBar'
import Content from '../../components/Content'
import './landingPage.css'
import Dashboard from '../Dashboard'

interface LandingPageProps{
  status: boolean;
}

const LandingPage: React.FC<LandingPageProps> = ({status}) => {
  return (
    < >
      <div className='flexbox-container'>
        <Dashboard status = {status} />
      </div>
    </>
  )
}

export default LandingPage