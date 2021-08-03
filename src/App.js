import './App.css';
import { Route } from 'react-router-dom'
import { Homepage } from './pages/homepage.component';

const Hatspage = () => {
  return(
    <div>HATS PAGE</div>
  )
}

function App() {
  return (
    <div>
      <Route exact path='/' component={Homepage} />
      <Route path='/hats' component={Hatspage} />
    </div>
  );
}

export default App;
