import React from 'react'
import './header.scss'
import $ from 'jquery'
import {Router, Route, hashHistory, Link, IndexRoute, browserHistory} from 'react-router'

export default class HeaderComponent extends React.Component{
    state = {
        username : ''
    }
    componentDidMount(){
        this.setState({
            username : window.sessionStorage.getItem('username')
        })
        $('.l_out').on('click',function(){
            // console.log(888);
            window.sessionStorage.removeItem('username')
            hashHistory.push("/");
        })
    }
    render(){
        return (
            <div>
                <div  className="l_head">
                    <h2 className="l_titel">PBA 后 台 管 理 系 统</h2>
                    <div className="l_userBox">
                        <p>
                            当前用户 :
                            <span className="l_user">{this.state.username}</span>
                        </p>
                        <button className="l_out">退出</button>
                    </div>
                </div>
            </div>
        )
    }
    
}