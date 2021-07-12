//import './App.css';
import React,{useEffect, useState} from 'react';
import './style.css';
import Signup from './Signup/Signup';
import Appnavbar from './Appnavbar/Appnavbar';
import Signin from'./Signin/Signin';
import SendMail from './Sendmail/SendMail';
import Error from './Error/Error';
import Home from './Home/Home';
import ViewProfile from './ViewProfile/ViewProfile';
import Statistics from './Statistics/Statistics';
import AdminHome from './AdminHome/AdminHome';
import Index from './Index/Index';
import TemplateMail from './TemplateMail/TemplateMail';
import ForgetPassword from './ForgetPassword/ForgetPassword';
import {Switch,Route} from 'react-router-dom';
// import { get } from 'mongoose';

function App() {
  return (
    <>
    <Appnavbar />
      <Switch>
        <Route exact path='/' component={Index}/>
        <Route path='/signin' component={Signin}/>
        <Route path='/signup' component={Signup}/>
        <Route path='/sendmail' component={SendMail}/>
        <Route path='/home' component={Home}/>
        <Route path='/viewProfile' component={ViewProfile}/>
        <Route path='/statistics' component={Statistics}/>
        <Route path='/adminHome' component={AdminHome}/>
        <Route path='/sendTemplateMail' component={TemplateMail}/>
        <Route path='/forgetPassword' component={ForgetPassword}/>
        <Route component={Error} />
      </Switch>
    </>
  );
}

export default App;
