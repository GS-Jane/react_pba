import React from 'react'
import {Router, Route, hashHistory, Link, IndexRoute, browserHistory} from 'react-router'
import $ from 'jquery'
import './ress.scss'
import http from '../../../../utils/httpclient.js'

export default class RessComponent extends React.Component{
    render(){
        return (
            <div className="r_ress">
                <div className="r_resshead">
                    <span className=" r_back iconfont icon-zuojiantou" onClick={this.add.bind(this)}>
                    </span>
                    <span className="r_h1">添加收货地址</span>
                </div>
                <div className="r_ressmain">
                    <ul>
                        <li>
                            <span className="r_rleft">收货人：</span>
                            <input type="text" placeholder="请输入收货人" className="r_rright r_consignee"/>
                        </li>
                        <li>
                            <span className="r_rleft">手机号码：</span>
                            <input type="text" placeholder="请输入手机号码" className="r_rright r_phone"/>
                        </li>
                        <li>
                            <span className="r_rleft">详细地址：</span>
                            <input type="text" placeholder="请填写详细地址" className="r_rright r_totaladdress"/>
                        </li>
                    </ul>
                </div>
                <div className="r_baocun" onClick={this.baocun.bind(this)}>保存</div>
            </div>
        )
    }
    add(){
        hashHistory.push("/my/add")
    }
    state={
        // show:false,
        provincialSet:[],
        citySet:[],
        countySet:[],
    }
    componentDidMount(){
        if(window.localStorage.token!==undefined){
            console.log(window.localStorage.token)
            $('.r_consignee').val(window.localStorage.token.split(',')[0])
            $('.r_phone').val(window.localStorage.token.split(',')[1])
            $('.r_totaladdress').val(window.localStorage.token.split(',')[2])
        }
    }
    // province(){
    //     // this.state.provincialSet.length = 0;
    //     $.get('http://localhost:3002/src/asset/region.json').then((res)=>{
    //         this.state.provincialSet = res.regions;
    //         console.log(this.state.provincialSet);
    //     })
    // }
    // city(){
    //     // this.citySet.length = 0;
    //     // this.countySet.length = 0;
    //     $.get('http://localhost:3002/src/asset/region.json').then((res)=>{
    //         res.regions.map((item,idx)=>{
    //             console.log(this)
    //         });
           
    //     })
    // }
    // county(){
    //     $.get('http://localhost:3002/src/asset/region.json').then((res)=>{
    //         this.provincialSet = res.regions;
    //         console.log(this.provincialSet);
    //     })
    // }
    baocun(){
        var consignee = $('.r_consignee').val();
        var phone = $('.r_phone').val();
        var totaladdress = $('.r_totaladdress').val();
        var username = window.sessionStorage.token;

        if(!/^1[34578]\d{9}$/.test(phone)){
            alert('手机号码格式错误');
            return false;
        }

        http.post('address',{username:username,consignee:consignee,phone:phone,totaladdress:totaladdress}).then((res)=>{
            console.log(res.status);
            if(res.status==true){
                hashHistory.push("/my/add");
            }else{
                alert('请把信息填完整');
            }
        })
    }
}