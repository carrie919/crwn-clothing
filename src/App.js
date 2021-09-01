import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/shoppage/shop-page.component';
import Header from './components/header/header.component';
import CheckOut from './pages/checkoutpage/checkout-page.component';
import SignInSingUp from './components/sign-in-sing-up/sign-in-sign-up.component';

import { selectCurrentUser } from './redux/user/user.selector';
import { checkUserSession } from './redux/user/user.action';


class App extends React.Component {

  componentDidMount(){
    const { checkUserSession } = this.props;
    checkUserSession();
  }

  render(){
    return (
      <div>
        <Header></Header>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckOut} />
          <Route exact path='/signin'
            render={() =>
              this.props.currentUser ?
              (<Redirect to='/' />) : (<SignInSingUp />)
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
