import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, hashHistory, Link, IndexRoute, browserHistory} from 'react-router';


import routes from './router/router.js'

ReactDOM.render(<Router history={hashHistory} routes={routes}></Router>,document.getElementById('app'))