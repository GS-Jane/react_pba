import React from 'react'
import FootComponent from '../foot/foot'
import {Router, Route, hashHistory, Link, IndexRoute, browserHistory} from 'react-router'

import http from '../../utils/httpclient'
import $ from 'jquery'
import './login.scss'

export default class LoginComponent extends React.Component{
    componentDidMount(){
        $('.j_foot').children().removeClass('j_change_color');
    }
    render(){
        return (
            <div className="r_login">
                <h1 className="r_logo"><img src={'http://pbaimage.pba.cn/2014/m.pba.cn/images/pba-slogan.png'}/></h1>
                <div className="r_lmain clearfix">
                    <form method="POST" className="r_form">
                        <input type="number" className="r_mobile r_linput" placeholder="账号"/>
                        <input type="password" className="r_password r_linput" placeholder="密码"/>
                    </form>
                    <div className="r_lbutton" onClick={this.login.bind(this)}>立即登录</div>
                    <p className="r_forget">忘记密码？</p>
                    <div className="r_lreg" onClick={this.reg.bind(this)}>注册PBA账号</div>
                    <p className="r_three"><img className="r_threel" src={'http://pbaimage.pba.cn/2014/m.pba.cn/images/login/left-line.jpg'}/>第三方登录<img className="r_threer" src={'http://pbaimage.pba.cn/2014/m.pba.cn/images/login/right-line.jpg'}/></p>
                    <ul className="r_lul">
                        <li className="r_lli">
                            <a href="http://m.pba.cn/wap/querylogin/login/type/qq/?http_referer=3963%2FM5%2BbcPndNOYwTfDPEOh70H2OSvv6AcSBKQanIhQSfmrQesuf9Ji6m5Flb2oRp10x7sNYBKPcg"><img src={'http://pbaimage.pba.cn/2014/m.pba.cn/images/login/icon_qq@2x.png'}/>QQ登录
                            </a>
                        </li>
                        <li className="r_lli">
                            <a href="http://m.pba.cn/wap/querylogin/login/type/sina/?http_referer=3963%2FM5%2BbcPndNOYwTfDPEOh70H2OSvv6AcSBKQanIhQSfmrQesuf9Ji6m5Flb2oRp10x7sNYBKPcg"><img src={'http://pbaimage.pba.cn/2014/m.pba.cn/images/login/icon_weibo@2x.png'}/>微博登录
                            </a>
                        </li>
                    </ul>
                </div>
                <FootComponent />
            </div>
        )
    }
    reg(){
            hashHistory.push("/reg")
        }
    login(){
        var username = $('.r_mobile').val()
        var password = $('.r_password').val()
        if(username==''&&password==''){
            alert('用户名密码不能为空');
            return false;
        }
        http.get('login',{ username: username, password: password }).then((res)=>{
            console.log(res.status);
            if(res.status==true){
                window.sessionStorage.setItem('token',username)
                alert('登录成功');
                hashHistory.push("/my");
            }else{
                alert('用户名或密码不正确');
            }
        })
    }
}