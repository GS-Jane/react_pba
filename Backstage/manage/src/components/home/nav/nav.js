import React from 'react'
import './nav.scss'
import $ from 'jquery'
import {Router, Route, hashHistory, Link, IndexRoute, browserHistory} from 'react-router'

export default class NavComponent extends React.Component{
    componentDidMount(){
        $('.l_guanli').on('click','li',function(){
            // console.log(999)
            // console.log($(this))
            $(this).addClass('l_active').siblings().removeClass('l_active')
        })
    }

    render(){
        return (
            <div  className="l_nav">
                <ul className="l_guanli">
                    <li className="l_active">
                        <Link to="/products">商品管理</Link>
                    </li>
                    <li>
                        <Link to="/users">用户管理</Link>
                    </li>
                </ul>
            </div>
        )
    }
}