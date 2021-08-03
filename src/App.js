import './App.css';
import { Switch, Route } from 'react-router-dom'
import { Homepage } from './pages/homepage/homepage.component'
import ShopPage from './pages/shoppage/shop-page.component';
import { Header } from './components/header/header.component'


function App() {
  return (
    <div>
      <Header></Header>
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path='/shop' component={ShopPage} />
      </Switch>
    </div>
  );
}

export default App;
