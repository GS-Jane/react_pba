import React from 'react'
import {Router, Route, hashHistory, Link, IndexRoute, browserHistory} from 'react-router'
import $ from 'jquery'
import './add.scss'
import http from '../../../utils/httpclient.js'

export default class AddComponent extends React.Component{
    state = {
        dizhi:[],
    }
    // componentDidMount(){
       
    // }
    componentWillMount(){

        var username = window.sessionStorage.token
        http.get('getaddress',{username:username}).then((res)=>{
            
            this.setState({
                dizhi:res.data
            })
            console.log(res.data)
             console.log($('input').last())
             $('input').last().attr("checked",true)
        })
    }

    my(){
        hashHistory.push("/my")
    }
    ress(){
        hashHistory.push("/my/add/ress")
        window.localStorage.removeItem('token')
    }
    shanchu(e){
        // console.log(e.target.parentNode.parentNode.parentNode.id)
        var current = e.target.parentNode.parentNode.parentNode
        var id = e.target.parentNode.parentNode.parentNode.id
        var username = window.sessionStorage.token
        console.log(id,username)
        http.get('deladdress',{id:id,username:username}).then((res)=>{
            // console.log(res)
            // hashHistory.push("/my/add")
        })
        current.parentNode.removeChild(current);
    }
    bianji(e){
        var name = e.target.parentNode.parentNode.parentNode.children[0].children[0].innerText.split("：")[1]
        var phone = e.target.parentNode.parentNode.parentNode.children[0].children[0].innerText.split("：")[2]
        var ground = e.target.parentNode.parentNode.parentNode.children[0].children[1].innerText.split("：")[1]
        console.log(name,phone,ground)
        window.localStorage.setItem('token',[name,phone,ground])
        hashHistory.push("/my/add/ress")
        var id = e.target.parentNode.parentNode.parentNode.id
        var username = window.sessionStorage.token
        http.get('deladdress',{id:id,username:username}).then((res)=>{
            console.log(res)
        })

    }
    render(){
        return (
            <div className="r_add">
                <div className="r_addhead">
                    <span className=" r_back iconfont icon-zuojiantou" onClick={this.my.bind(this)}>
                    </span>
                    <span className="r_h1">收货地址</span>
                    <span className="r_jia" onClick={this.ress.bind(this)}>添加</span>
                </div>
                <ul className="r_dizhi">
                    {
                        this.state.dizhi.map((item,idx)=>{
                            return(
                                <li id={item.id} key={item.id}>
                                    <div className="r_dizhi_t">
                                        <p>收货人：{item.consignee}：{item.phone}</p>
                                        <p>收货地址：{item.totaladdress}</p>
                                    </div>
                                    <div className="r_dizhi_b">
                                        <input type="radio" className="r_moren" name="r_moren"/>
                                        <i>默认地址</i>
                                        <span onClick={this.shanchu.bind(this)}><img src={'http://pbaimage.pba.cn/2014/m.pba.cn/images/goods_address_cancel@2x.png'}/><j>删除</j></span>
                                        <span onClick={this.bianji.bind(this)}><img src={'http://pbaimage.pba.cn/2014/m.pba.cn/images/goods_address_edit@2x.png'}/><j>编辑</j></span>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}