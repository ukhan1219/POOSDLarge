import NavBar from '../../components/NavBar'
import Content from '../../components/Content'

import './dashboard.css'

function Dashboard(props) {
  return(
    < >
      <div className='flexbox-container'>
        <NavBar status={props.status}/> 
        <Content status={props.status}/>
      </div>
    </>
  )
}

export default Dashboard