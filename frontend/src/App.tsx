import NavBar from './components/NavBar/'
import Blurb from './components/Blurb/'
import EyeCandy from './components/EyeCandy'

import './App.css';

function App() {
  return (
    < >
      <NavBar />
      <div className='stuff'>
        <div className='flex-box'>
          <Blurb />
          <EyeCandy />
        </div>
      </div>
    </>
  );
}

export default App;