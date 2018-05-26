import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, hashHistory, Link, IndexRoute, browserHistory} from 'react-router'

import FootComponent from '../components/foot/foot'

import CarComponent from '../components/car/car'
import DetailsComponent from '../components/details/details'
import HomeComponent from '../components/home/home'
import ListComponent from '../components/list/list'
import LoginComponent from '../components/login/login'
import MyComponent from '../components/my/my'
import RegComponent from '../components/reg/reg'

import SearchComponent from "../components/search/search"

import AddComponent from '../components/my/address/add'
import RessComponent from '../components/my/address/ress/ress'

let isLogin = (nextState, replace, next) => {
    if(window.sessionStorage.getItem('token') ){
        next()
    } else {
        replace({ pathname: 'login' })
        next();
    }
    
}
export default(
    <Route>
        <Route path="/car" component={CarComponent} onEnter={isLogin}/>
        <Route path="/details" component={DetailsComponent} />
        <Route path="/" component={HomeComponent} />
        <Route path="/list" component={ListComponent} />
        <Route path="/login" component={LoginComponent} />
        <Route path="/my" component={MyComponent} onEnter={isLogin}/>
        <Route path="/reg" component={RegComponent} />
        <Route path="/foot" component={FootComponent} />
        <Route path="/my/add" component={AddComponent} />
        <Route path="/my/add/ress" component={RessComponent} />
        <Route path="/search(/:params)" component={SearchComponent} />

    </Route>
)