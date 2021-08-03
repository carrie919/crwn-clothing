import './App.css';
import { Route } from 'react-router-dom'
import { Homepage } from './pages/homepage/homepage.component'
import ShopPage from './pages/shoppage/shop-page.component';


function App() {
  return (
    <div>
      <Route exact path='/' component={Homepage} />
      <Route path='/shop' component={ShopPage} />
    </div>
  );
}

export default App;
