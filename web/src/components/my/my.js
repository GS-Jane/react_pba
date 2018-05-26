import React from 'react'
import FootComponent from '../foot/foot'
import {Router, Route, hashHistory, Link, IndexRoute, browserHistory} from 'react-router'
import $ from 'jquery'
import './my.scss'
export default class MyComponent extends React.Component{
    componentDidMount(){
        $('.j_my').addClass('j_change_color').siblings().removeClass('j_change_color');
        var username = window.sessionStorage.token
        // console.log(username)
        $('.r_muser').html(username)
    }
    render(){
        return (
            <div className="r_my">
                <div className="r_mtop">
                    <div className="r_mtouxiang"></div>
                    <div className="r_muser">用户名</div>
                    <div className="r_mright iconfont icon-youjiantou"></div>
                </div>
                <ul className="r_mlook">
                    <li><i>0</i>关注</li>
                    <li><i>0</i>粉丝</li>
                    <li><i>0</i>败家</li>
                    <li><i>0</i>积分</li>
                </ul>
                <div className="r_morder">
                    <div className="iconfont icon-dingdan"></div>
                    <div className="r_mwddd">我的订单</div>
                    <div className="r_mright iconfont icon-youjiantou"></div>
                    <div className="r_mckqbdd">查看全部订单</div>
                </div>
                <ul className="r_mdai">
                    <li><i className="iconfont icon-icon-test1"></i>待付款</li>
                    <li><i className="iconfont icon-_to-deliver"></i>待发货</li>
                    <li><i className="iconfont icon-daishouhuo"></i>待收货</li>
                    <li><i className="iconfont icon-daipingjia"></i>待评价</li>
                    <li><i className="iconfont icon-tuikuan"></i>退款/售后</li>
                </ul>
                <ul className="r_mxilie">
                    <li>
                        <div className="iconfont icon-wodeqianbao r_micon"></div>
                        <div className="r_mxlm">我的钱包</div>
                        <div className="iconfont icon-youjiantou r_mright"></div>
                        <div className="r_mxlr">余额、红包</div>
                    </li>
                    <li>
                        <div className="iconfont icon-hebingshiti r_micon"></div>
                        <div className="r_mxlm">合并订单</div>
                        <div className="iconfont icon-youjiantou r_mright"></div>
                    </li>
                    <li>
                        <div className="iconfont icon-wodeshouhou-gerenzhongxin r_micon"></div>
                        <div className="r_mxlm">我的售后</div>
                        <div className="iconfont icon-youjiantou r_mright"></div>
                    </li>
                    <li onClick={this.address.bind(this)}>
                        <div className="iconfont icon-dizhi r_micon"></div>
                        <div className="r_mxlm">地址管理</div>
                        <div className="iconfont icon-youjiantou r_mright"></div>
                    </li>
                    <li>
                        <div className="iconfont icon-suo r_micon"></div>
                        <div className="r_mxlm">修改密码</div>
                        <div className="iconfont icon-youjiantou r_mright"></div>
                    </li>
                </ul>
                <div className="r_mbutton" onClick={this.del.bind(this)}>退出登录</div>
                <FootComponent />
            </div>
        )
    }
    address(){
        hashHistory.push("/my/add")
    }
    del(){
        var username = $('.r_muser').html();
        console.log(username)
        window.sessionStorage.removeItem('token',username);
        hashHistory.push("/login")
    }
}