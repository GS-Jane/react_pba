import React from 'react'
import {Router, Route, hashHistory, Link, IndexRoute, browserHistory} from 'react-router'

import './details.scss'
import $ from 'jquery'
import http from '../../utils/httpclient'
export default class DetailsComponent extends React.Component{

    state ={
        goodlist:[],
        qty:1
    }
    componentWillMount(){
        let pid = this.props.location.query.id;
        console.log(pid)
        http.post('listtodetail',{id:pid}).then((res)=>{
            console.log(res.data[0])
            this.state.goodlist.push(res.data[0])
            this.setState({})
        })
        // $(".lan").delay(8000).hide(0); 
    }

    // componentDidMount(){
    //     $('.j_car').addClass('j_change_color').siblings().removeClass('j_change_color');
    //     $(".lan").delay(2000).hide(0); 
    //     // $('.lan').hide()
    // }

    addcar(){
        if(window.sessionStorage.getItem('token') ){
            let $time;
            clearTimeout($time);
            let data = this.state.goodlist
            var username = window.sessionStorage.token
            console.log(username)
            this.setState({
                qty:this.state.qty
            })
            http.post('insertnewcarlist',{username:username,id:data[0].id,imgurl:data[0].imgurl,proname:data[0].proname,proprice:data[0].proprice,proqty:this.state.qty}).then((res)=>{
                console.log(res)
            })
            $('.j_tan').fadeIn(1000);
            $time = setTimeout(function(){
                $('.j_tan').fadeOut(2000);
            },3000)
           
        } else {
            window.alert('请先登录')
            hashHistory.push("/login")
          
        }
      
    }


    render(){
        return (
            <div id="j_details">
                <header>
                    <Link to="/list"><i className="iconfont icon-fanhui"></i></Link>            
                    <span className="j_gwc">商品详情</span>
                    <Link to="/car"><i className="iconfont icon-jiarugouwuche"></i></Link>  
                </header>
                <main>
                    {/* <div className="lan">
                        <i className="fa fa-spinner fa-pulse"></i>
                    </div> */}
                    {
                        this.state.goodlist.map((item,idx)=>{
                            return(
                                <div key={item.id}>
                                    <div className="j_box">
                                        <div className="j_img"><img src={item.imgurl} alt=""/></div>
                                        <p className="j_mc">{item.proname}</p>
                                    </div>
                                    <p className="j_zxj">专享价：<span className="j_jg">¥{item.proprice}</span><span className="j_gms">8888人购买</span></p>
                                    <p className="j_dpyh"><span>店铺优惠</span><img src="./src/asset/details/free.jpg" alt=""/><span className="j_by">满99元包邮</span></p>
                                    <p className="j_rmsp">热门商品</p>
                                </div>
                            )
                        })
                    }
                  
                    <ul>
                        <li>
                            <img src="./src/asset/1.jpg" alt=""/>
                            <p>PBA粉底液</p>
                            <p className="j_fjg">¥88.8</p>
                        </li>
                        <li>
                            <img src="./src/asset/1.jpg" alt=""/>
                            <p>PBA粉底液</p>
                            <p className="j_fjg">¥88.8</p>
                        </li>
                        <li>
                            <img src="./src/asset/1.jpg" alt=""/>
                            <p>PBA粉底液</p>
                            <p className="j_fjg">¥88.8</p>
                        </li>
                        <li>
                            <img src="./src/asset/1.jpg" alt=""/>
                            <p>PBA粉底液</p>
                            <p className="j_fjg">¥88.8</p>
                        </li>
                        <li>
                            <img src="./src/asset/1.jpg" alt=""/>
                            <p>PBA粉底液</p>
                            <p className="j_fjg">¥88.8</p>
                        </li>
                    </ul>
                    <div className="j_xq">
                        <p>图文详情</p>
                        <img src="./src/asset/details/2.jpg" alt=""/>
                        <img src="./src/asset/details/3.jpg" alt=""/>
                        <img src="./src/asset/details/4.jpg" alt=""/>
                        <img src="./src/asset/details/5.jpg" alt=""/>
                        <img src="./src/asset/details/6.jpg" alt=""/>
                        <img src="./src/asset/details/7.jpg" alt=""/>
                        <img src="./src/asset/details/8.jpg" alt=""/>
                    </div>
                </main>
                <footer>
                    <div className="j_kf"><i className="iconfont icon-zaixiankefu"></i><span>客服</span></div>
                    <div className="j_fx"><i className="iconfont icon-share"></i><span>分享</span></div>
                    <div className="j_tan">
                        <div className="j_sjx"></div>
                        <div className="j_jiao"></div>
                        <div className="j_tan1">已加入购物车</div> 
                    </div> 
                    <div className="j_gwc" onClick={this.addcar.bind(this)}>加入购物车</div>
                </footer>
            </div>
        )
    }
    
}