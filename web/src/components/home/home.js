import React from 'react'
import $ from 'jquery'
import Swiper from "swiper"
// import {Link} from "react-router"
import FootComponent from '../foot/foot'
import HeadComponent from "../head/head.js"
import {Router, Route, hashHistory, Link, IndexRoute, browserHistory} from 'react-router'

import "./home.scss"
import http from "../../utils/httpclient.js"

export default class HomeComponent extends React.Component{
    state = {
        goodlist:[]
    }
    componentDidMount(){
        $('.j_home').addClass('j_change_color').siblings().removeClass('j_change_color');
        var mySwiper = new Swiper ('.swiper-container', {
            
            loop: true,
            auto:true,
            
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
            
            // 如果需要前进后退按钮
           

            autoplay: {
                            delay: 3000,
                            stopOnLastSlide: false,
                            disableOnInteraction: false,
                        },
        }) ;
        http.get("pbahome").then( (res)=>{
            console.log(res);
            this.setState({
                goodlist:res.data
            })
        })
        
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
    render(){
        return (
            <div className="h_home">
                <HeadComponent/>
                <div className = "block ">

                </div>
                <div className="t_main">
                    <div className="lunbotu"> 
                        <div className="swiper-container">
                            <span className ="swiper-pagination"></span>
                            <div  className="swiper-wrapper">  
                                <div className="swiper-slide">
                                    <img src="../../../src/asset/images/3d91760004d1a6d2392921ce549fe240.jpg"/>
                                </div>
                                <div className="swiper-slide">
                                    <img src="../../../src/asset/images/667e9b6c9288c91473b74e5dc8f1b996.jpg"/>
                                </div>
                                <div className="swiper-slide">
                                    <img src="../../../src/asset/images/dfb1909ea3767212180ac28f6aae8982.jpg"/>
                                </div>
                                
                            </div>  
                        </div>
                    </div>
                    <div className="t_recommand">
                        <div className ="r_item">
                            <Link to ="/details?id=12">
                            <img src = "http://pbaimage.pba.cn/2014/m.pba.cn/images/homepage/kwzx.jpg"/>
                            </Link>
                        </div>
                        <div className ="r_item">

                            <img src = "http://pbaimage.pba.cn/2014/m.pba.cn/images/homepage/newzqr.jpg"/>
                        </div>
                        <div className ="r_item">
                            <Link to ="details?id=17">
                            <img src = "http://pbaimage.pba.cn/2014/m.pba.cn/images/homepage/bb-qd.jpg"/>
                            </Link>
                        </div>

                    </div>
                    <div className= "t_hot_product">
                        <img src= "../../../src/asset/images/banner-hot.jpg"/>
                    </div>
                    <ul className="t_goodslist">
                        {   

                            this.state.goodlist.map( (item,idx,a) => {
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
                                            <img className = "proicon" src={item.proicon}/>
                                        </Link>
                                        <img src="http://pbaimage.pba.cn/2014/m.pba.cn/images/shopcart-light.png" className="add_car" onClick={this.addtocar.bind(this,item)}/>
                                        
                                    </li>)
                            })
                        }
                    </ul>
                    <div className = "block ">

                    </div>
                </div>
                <FootComponent />
            </div>
        )
    }
    
}