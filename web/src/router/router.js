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
export default(
    <Route>
        <Route path="/car" component={CarComponent} />
        <Route path="/details" component={DetailsComponent} />
        <Route path="/" component={HomeComponent} />
        <Route path="/list" component={ListComponent} />
        <Route path="/login" component={LoginComponent} />
        <Route path="/my" component={MyComponent} />
        <Route path="/reg" component={RegComponent} />
        <Route path="/foot" component={FootComponent} />
    </Route>
)