import React from 'react'
import {Router, Route, hashHistory, Link, IndexRoute, browserHistory} from 'react-router'
import http from '../../utils/httpclient'
import $ from 'jquery'
import './reg.scss'

export default class RegComponent extends React.Component{
    render(){
        return (
            <div className="r_reg">
                <div className="r_reghead">
                    <span className=" r_back iconfont icon-zuojiantou" onClick={this.login.bind(this)}>
                    </span>
                    <span className="r_h1">注册</span>
                </div>
                <div className="r_regmain clearfix">
                    <p className="r_title">这是一个神秘的后花园，里面有无尽的财富和宝藏等着你去发现，现在就注册账号开启你的美丽探索之旅吧！</p>
                    <form method="post" className="r_main">
                        <ul>    
                            <li className="r_li">
                                <span className="r_li1 iconfont icon-mobile"></span>
                                <input type="number" placeholder="输入手机号" id="mobile" className="r_input" />
                                <div className="tishi1 tishi">这个用户太受欢迎了</div>
                            </li>  
                            <li className="r_li">
                                <span className="r_li1 iconfont icon-xiaoxixinxiduanxintixingyoujiantongzhisixin"></span>
                                <input type="number" id="check_auth" className="r_input" placeholder="请输入验证码" />
                                <span className="SMS"></span>
                                <div className="tishi2 tishi">验证码错误</div>
                            </li> 
                            <li className="r_li">
                                <span className="r_li1 iconfont icon-xiugaimima"></span>
                                <input type="password" placeholder="输入密码" id="pass" className="r_input" />
                                <div className="tishi3 tishi">密码格式错误,6-20位密码</div>
                            </li> 
                            <li className="r_li">
                                <span className="r_li1 iconfont icon-bangbangtang"></span>
                                <input type="text" placeholder="输入推荐人（非必填）" id="recomName" className="r_input" value=""/>
                            </li>   
                        </ul>
                    </form>
                    <div className="r_button" onClick={this.reg.bind(this)}>注册</div>
                    <div className="r_foot">
                        <input type="checkbox" className="r_check"/>
                        <span className="r_xieyi"><u>同意用户协议</u></span>
                    </div>
                </div>
            </div>
        )
    }
    login(){
        hashHistory.push("/login")
    }
    

    reg(){
        var username = $('#mobile').val()
        var password = $('#pass').val()
        var SMS1 = $('#check_auth').val()
        var SMS = $('.SMS').html()

        if(!/^1[34578]\d{9}$/.test(username)){
            alert('手机号码格式错误');
            return false;
        }
        if(SMS !== SMS1){
            alert('验证码错误');
            return false;
        }
        if(!/^[^\s]{6,20}$/.test(password)){
            alert('密码格式错误,6-20位密码');
            return false;
        }
        if($(":checkbox").prop("checked")!==true){
            alert('请同意用户协议');
            return false;
        }

        http.get('reg',{ username: username, password: password }).then((res)=>{
            console.log(res.status);
            if(res.status==true){
                alert('注册成功');
                hashHistory.push("/login");
            }else{
                alert('这个用户太受欢迎了');
            }
        })
    }
    componentDidMount(){
        function test(){  
            // 0-9的随机数  
            var arr = [];//容器  
            for(var i =0;i<6;i++){//循环六次  
                var num = Math.random()*9;//Math.random();每次生成(0-1)之间的数;  
                num = parseInt(num,10);  
                arr.push(num);  
            }         
            // console.log(arr);  
            var b = arr.join("");
            return b;
        }; 
        $('.SMS').html(test())
        $(":checkbox").prop("checked", true);
        console.log($(":checkbox").prop("checked"))
    }
}