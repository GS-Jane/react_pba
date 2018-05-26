import React from 'react'
import {Router, Route, hashHistory, Link, IndexRoute, browserHistory} from 'react-router'
import './foot.scss'
import $ from 'jquery'
export default class FootComponent extends React.Component{
        render(){
            return(
                <div className="j_foot">
                    <div ref="home"  className="j_home j_change_color"  onClick={this.home.bind(this)}><i className="iconfont icon-shouye"></i><span>首页</span></div>
                    <div ref="class" className="j_class"onClick={this.class.bind(this)}><i className="iconfont icon-fenleicur"></i><span>分类</span></div>
                    <div ref="car"className="j_car"onClick={this.car.bind(this)}><i className="iconfont icon-gouwuche"></i><span>购物车</span></div>
                    <div ref="my" className="j_my" onClick={this.my.bind(this)}><i className="iconfont icon-icon-test"></i><span>我的</span></div>
                </div>
            )
        }
        home(){
            hashHistory.push("/")
        }
        class(){
            hashHistory.push("/list")
        }
        car(){
           
                hashHistory.push("/car")
          
        }
        my(){
        
                hashHistory.push("/my")
            
        }

}

