import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, hashHistory, Link, IndexRoute, browserHistory} from 'react-router'

import LoginComponent from '../components/login/login'
import HomeComponent from '../components/home/home'
import UsersComponent from '../components/home/users/users.js'
import ProductsComponent from '../components/home/products/products.js'
import HeaderComponent from '../components/home/header/header'
import NavComponent from '../components/home/nav/nav'
import EditComponent from '../components/home/edit/edit.js'

let isLogin = (nextState, replace, next) => {
    if(window.sessionStorage.getItem('username') ){
        next()
    } else {
        replace({ pathname: '/' })
        next();
    }
    
}

export default(
    <Route>
        <Route path="/" component={LoginComponent} />
        <Route path="/home" component={HomeComponent} onEnter={isLogin}>
            <Route path="/users" component={UsersComponent} />
            <IndexRoute component={ProductsComponent} />
            <Route path="/products" component={ProductsComponent} />
            <Route path="/header" component={HeaderComponent} />
            <Route path="/nav" component={NavComponent} />
            <Route path="/edit" component={EditComponent} />
        </Route>
    </Route>
)