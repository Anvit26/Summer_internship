//import './App.css';
import React from 'react';
import './style.css';
import Signup from './Signup/Signup';
import Appnavbar from './Appnavbar/Appnavbar';
import Signin from'./Signin/Signin';
import SendMail from './Sendmail/SendMail';
import Error from './Error/Error';
import Home from './Home/Home';
import {Switch,Route} from 'react-router-dom';

function App() {
  return (
    <>
    <Appnavbar />
    <Switch>
      <Route exact path='/' component={Signup}/>
      <Route path='/signin' component={Signin}/>
      <Route path='/sendmail' component={SendMail}/>
      <Route path='/home' component={Home}/>
      <Route component={Error} />
    </Switch>
      {/* <Appnavbar />
      <SendMail />
      <Signup />
      <Signin /> */}
    </>
  );
}

export default App;
