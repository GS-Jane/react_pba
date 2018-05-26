import React from "react"
import $ from "jquery"
import {Router, Route, hashHistory, Link, IndexRoute, browserHistory} from 'react-router'
import HeadComponent from "../head/head.js"

import "./search.scss"
import http from "../../utils/httpclient.js"


export default class SearchComponent extends React.Component {
    state = {
        data:[]
    }
    render(){
        return (
            <div className = "search_goods">
                <HeadComponent />
                <div className="block"></div>
                <div className ="errorbox" ref = "errorbox">
                    没找到您想要的商品呢，要不看<Link to="/list">看看别的</Link>~
                </div>
                <ul className = "search_show_goods"  ref="showgoods">
                    
                    {   

                        this.state.data.map( (item,idx,a) => {
                        return  (<li className ='show_item' key={item.id} data-id = {item.id} >
                                    <Link to ={"/details?id="+item.id}>
                                        <img src = {item.imgurl} />
                                        <div className = 'text'>
                                            <p className ="good_name"><span>{item.brand}</span>
                                            <span>{item.proname}</span></p>
                                            <p className ="good_des">{item.prodescription}</p>
                                            <p className ="good_price">
                                                专享价:<span> ￥ {item.proprice}</span>
                                            </p>
                                        </div>
                                        </Link>
                                        <img src="http://pbaimage.pba.cn/2014/m.pba.cn/images/shopcart-light.png" className="add_car" onClick={this.addtocar.bind(this,item)} />
                                </li>)
                        })
                    }
                </ul>
                <div className="fix-go-home">
                    <div className="fix-nav " ref="shownav" >
                        <ul>
                            <li className="cf">
                                <img src="http://pbaimage.pba.cn/2014/m.pba.cn/images/homepage/sy.png"/>
                                <Link to="/">首页</Link>
                            </li>
                            <li className="cf">
                                <img src="http://pbaimage.pba.cn/2014/m.pba.cn/images/homepage/gwc.png"/>
                                <Link to="/">购物车</Link>
                            </li>
                            <li className="cf">
                                <img src="http://pbaimage.pba.cn/2014/m.pba.cn/images/homepage/wd.png"/>
                                <Link to="">我的</Link>
                            </li>
                            <li className="cf">
                                <img src="http://pbaimage.pba.cn/2014/m.pba.cn/images/homepage/sp.png"/>
                                <Link to="/">所有商品</Link>
                            </li>
                            <li className="cf">
                                <img src="http://pbaimage.pba.cn/2014/m.pba.cn/images/homepage/sq.png"/>
                                <Link to="/">社区</Link>
                            </li>
                        </ul>
                    </div>
                    <img src="http://pbaimage.pba.cn/2014/m.pba.cn/images/homepage/menu-icon.png" alt="菜单" className="menu-icon" onClick={this.show.bind(this)} />
                </div>

            </div>
        )
        
    }
    addtocar(item){
        console.log(item);
        if(window.sessionStorage.getItem('token') ){
           
            var username = window.sessionStorage.token
            
            http.post('insertnewcarlist',{username:username,id:item.id,imgurl:item.imgurl,proname:item.proname,proprice:item.proprice,proqty:1}).then((res)=>{
                console.log(res)
                if(res.status){
                    alert("加入成功！")
                }
            })
            
           
        } else {
            window.alert('请先登录')
            hashHistory.push("/login")
          
        }
    }
    componentDidMount(){
        http.get("pbafuzzysearch",this.props.location.query).then( (res)=>{

            if(res.status == true){
                
               this.setState({
                    data:res.data
               })
                
            }else{
                
                this.refs.errorbox.style.display = "block";
                this.refs.showgoods.style.display = "none";
            }
        })
    }
    show(){
        this.refs.shownav.classList.toggle("showblock")
            
        
    }
    
    
}