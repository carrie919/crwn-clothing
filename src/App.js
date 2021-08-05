import { Switch, Route } from 'react-router-dom'

import './App.css';

import Homepage from './pages/homepage/homepage.component'
import ShopPage from './pages/shoppage/shop-page.component'
import Header from './components/header/header.component'
import SignInSingUp from './components/sign-in-sing-up/sign-in-sign-up.component';
import { auth , createUserProfileDocument} from './firebase/firebase.utils'
import React from 'react';


class App extends React.Component {
  constructor(){
    super()

    this.state = {
      currentUser: null
    }
  }

  componentDidMount(){
    this.unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = createUserProfileDocument(userAuth)

        ;(await userRef).onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          })
        })
      }
      this.setState({
        currentUser: userAuth
      })
    })
  }

  unSubscribeFromAuth = null

  componentWillUnmount(){
    this.unSubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header currentUser={this.state.currentUser}></Header>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInSingUp} />
        </Switch>
      </div>
    );
  }
}

export default App;
