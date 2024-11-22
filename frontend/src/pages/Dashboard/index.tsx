import NavBar from '../../components/NavBar'
import Content from '../../components/Content'

import './dashboard.css'

interface DashboardProps{
  status: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({status}) => {
  console.log('DB status', status);
  return(
    < >
      <div className='flexbox-container'>
        <NavBar/> 
        <Content status={status}/>
      </div>
    </>
  )
}

export default Dashboard