import React from 'react'
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import './login.scss'
import http from '../../utils/httpclient.js'
import {Router, Route, hashHistory, Link, IndexRoute, browserHistory} from 'react-router'

export default class LoginComponent extends React.Component{
    componentDidMount(){
        $('.btn').on('click',function(){
            var username = $('.l_username').val();
            var password = $('.l_password').val();
            if(username=='' || password==''){
                window.alert('用户名和密码不能为空！');
                return false;
            }
            // console.log(222)
            http.get('backlogin',{username:username,password:password}).then((res)=>{
                // console.log(res);
                if(res.status==true){
                    window.sessionStorage.setItem('username',username)
                    window.alert('登录成功!');
                    hashHistory.push("/home");
                }else{
                    window.alert('用户名或密码不正确!');
                }
              
            })
            
        })
    }
    render(){
        return (
            <div className="login clearfix">
                <div className="login-box">
                    <div className="col-sm-12 b-r">
                        <h3 className="m-t-none m-b">登录</h3>
                        <form role="form">
                            <div className="form-group text-left">
                                <label>User：</label>
                                <input type="text" placeholder="请输入用户名" className="form-control required l_username" />
                            </div>
                            <div className="form-group  text-left">
                                <label>Password:</label>
                                <input type="password" placeholder="请输入密码" className="form-control required l_password" />
                            </div>
                            <div>
                                <input type="button" className="btn-color btn btn-primary pull-right m-t-n-xs" value="Sign in" />
                            </div>
                        </form>
                    </div>
                </div> 
                
            </div>
        )
    }
    
}