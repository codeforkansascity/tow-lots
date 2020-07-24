import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Search from './Search/Search'
import Profile from './Profile/Profile'
import { WrappedLoginForm } from './Login/Login'
import { WrappedRegistrationForm } from './Join/Join'

export default class Router extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Search}/>
        <Route path='/login' component={WrappedLoginForm}/>
        <Route path='/join' component={WrappedRegistrationForm}/>
        <Route path='/profile' component={Profile} />
      </Switch>
    )
  }
}
