// import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';

import './App.css';

function App() {
  const LoggedIn = true

  return (
    < >
      {/* <LandingPage status={LoggedIn}/> */}
      <Dashboard status={LoggedIn}/>
    </>
  );
}

export default App;