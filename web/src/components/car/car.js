import React from 'react'
import {Router, Route, hashHistory, Link, IndexRoute, browserHistory} from 'react-router'

import './car.scss'
import $ from 'jquery'
import http from '../../utils/httpclient'
export default class CarComponent extends React.Component{
    state = {
        dataset : [
            // {id:0,imgurl:'./src/asset/1.jpg',proname:'jhshhshs',proprice:'88',proqty:'1'},
            // {id:1,imgurl:'./src/asset/1.jpg',proname:'jhshhshs',proprice:'88',proqty:'1'},
            // {id:2,imgurl:'./src/asset/1.jpg',proname:'jhshhshs',proprice:'88',proqty:'1'},
            // {id:3,imgurl:'./src/asset/1.jpg',proname:'jhshhshs',proprice:'88',proqty:'1'},
            // {id:4,imgurl:'./src/asset/1.jpg',proname:'jhshhshs',proprice:'88',proqty:'1'},
            // {id:5,imgurl:'./src/asset/1.jpg',proname:'jhshhshs',proprice:'88',proqty:'1'},
        ],
        total: 0,
        qty:0,
    }
    componentWillMount(){
        var username = window.sessionStorage.token
        
        var total = 0;
        http.get('carlist',{username:username}).then((res)=>{
            // console.log(res.data)
            this.setState({
                dataset: res.data
            })
            res.data.forEach(function(item){
                total+=item.proprice*item.proqty; 
            })
            this.setState({
                total:total.toFixed(2)
            })
            
            console.log(this.state.dataset)
        })
        
    }

    fun(proprice,proqty,e){
    
        if(e.target.checked){
            this.setState({qty:this.state.qty+=proqty})
            
            this.state.total += proprice*proqty
            let res = this.state.total.toFixed(2)*1;

            this.setState({total:res}) 
            // console.log(res)
        }else{
            this.setState({qty:this.state.qty-=proqty})
            // console.log(proprice,proqty,this.state.total)
            this.state.total -= proprice*proqty
            let res = this.state.total.toFixed(2)*1;
            this.setState({total:res}) 
            // console.log(res)  
        }

        for(var i=0;i<this.refs.ipt.children.length;i++){
            if(!(this.refs.ipt.children[i].children[0].children[0].checked)){
               $('#j_checkAll').prop({checked:false})
                return
            }  
        }
            $('#j_checkAll').prop({checked:true}) 
            
       
    }

    jAll(e){
        var total1 = 0 ;
        if(e.target.checked){
            for(var i=0;i<this.refs.ipt.children.length;i++){
                this.refs.ipt.children[i].children[0].children[0].checked="checked";
            }
            this.state.dataset.forEach(function(item){
                total1 +=item.proprice*item.proqty; 
            })
            this.setState({
                total:total1.toFixed(2)
            })
        }else if(!e.target.checked){
            for(var i=0;i<this.refs.ipt.children.length;i++){
                this.refs.ipt.children[i].children[0].children[0].checked=false;
            }
            this.setState({
                total:0
            })
        }    
    }
    
    jia(proprice,proqty,e){
        let $li = e.target.parentNode.parentNode.parentNode;
        let $input = $li.children[0].children[0]
        if($input.checked){
            var total = 0 ;
            let qty = e.target.previousElementSibling.innerText;
            qty++;
            e.target.previousElementSibling.innerText = qty;
            let username = window.sessionStorage.getItem('token');
            let objid = e.target.parentNode.parentNode.parentNode.id;
        
            for(var i = 0; i<this.state.dataset.length;i++){
                if(this.state.dataset[i].id == objid){
                    
                    this.state.dataset[i].proqty = qty;
                }
            }
            http.post('addcarlist',{proqty:qty,username:username,id:objid}).then((res)=>{
                // console.log(666)
                // console.log(res)
            })
        
                // console.log($input.checked)
                total =  $('.j_shj').text()*1 +proprice*1;
                this.setState({
                    total:total.toFixed(2)
                })
        }else{
            window.alert('选中商品才能增加哦！')
        }
       
        
    }
    jian(proprice,proqty,e){
        let $li = e.target.parentNode.parentNode.parentNode
        let $input = $li.children[0].children[0]
        if($input.checked){
            var total = 0 ;
            let qty = e.target.nextElementSibling.innerText;
            qty--;
            if(qty<1){
                window.alert('不能在减少了哦！')
                return
            }
            let username = window.sessionStorage.getItem('token');
            e.target.nextElementSibling.innerText = qty;
            // console.log(qty)
            
            let objid = e.target.parentNode.parentNode.parentNode.id;
            for(var i = 0; i<this.state.dataset.length;i++){
                if(this.state.dataset[i].id == objid){
                    
                    this.state.dataset[i].proqty = qty;
                }
            }
            http.post('minuscarlist',{proqty:qty,username:username,id:objid}).then((res)=>{
                // console.log(666)
                // console.log(res)
            })
        
                total =  $('.j_shj').text()*1 - proprice*1
                this.setState({
                    total:total.toFixed(2)
                })
        }else{
            window.alert('选中商品才能减少哦！')
        }
        
    }
    del(proprice,proqty,e){
        var total = 0 ;
        let current = e.target.parentNode.parentNode.parentNode;
        let objid = current.id;
        var username = window.sessionStorage.token
        console.log(objid)
        http.post('delcarlist',{username:username,id:objid}).then((res)=>{
            console.log(res)
        })
        current.parentNode.removeChild(current);
        total =  $('.j_shj').text()*1 - proprice*proqty
        this.setState({
            total:total.toFixed(2)
        })
    }
    fan(){
        history.go(-1);
    }
    jies(){
        hashHistory.push("my/add");
    }
    render(){
        return (
            <div id="j_car">
                <header>
                    <span onClick={this.fan.bind(this)}><i className="iconfont icon-zuojiantou"></i></span>            
                    <span className="j_gwc">购物车</span>
                    <Link to=""><span className="j_hsz">回收站</span></Link>  
                </header>
                <main>
                    {/* <div className="lan">
                        <i className="fa fa-spinner fa-pulse"></i>
                    </div> */}
                    <ul ref="ipt" className="datalist">
                        {
                            this.state.dataset.map((item,idx)=>{
                               
                                return(
                                    <li key={item.id} id={item.id}> 
                                        <div className="j_checkbox ">
                                            <input type="checkbox" defaultChecked={true} className="j_checkItem j_check j_dx" onClick={this.fun.bind(this,item.proprice,item.proqty)}/>
                                        </div>
                                        <div className="j_img"><img src={item.imgurl} alt=""/></div>
                                        <div className="j_r">
                                            <p>{item.proname}</p>
                                            <p className="j_jf">不支持积分抵扣</p>
                                            <p className="j_jg"><span className="j_proprice">¥{item.proprice}</span></p>
                                            <p className="j_qty">数量：
                                                <span className="j_jian" onClick={this.jian.bind(this,item.proprice,item.proqty)}>-</span>
                                                <span className="input">{item.proqty}</span>    
                                                {/* <input type="text" value={item.proqty} className="input" />    */}
                                                <span className="j_jia" onClick={this.jia.bind(this,item.proprice,item.proqty)}>+</span>
                                                <span className="j_zrs">自然色</span>
                                                <i className="iconfont icon-shanchu j_sc" onClick={this.del.bind(this,item.proprice,item.proqty)}></i>
                                            </p>
                                        </div>
                                    </li> 
                                 )
                            })
                            
                        }
                                           
                    </ul>
                </main>
                <footer>
                    <div className="j_checkAllBox">
                        <input type="checkbox" defaultChecked={true} id="j_checkAll" className="j_check ipt" onClick={this.jAll.bind(this)}/>
                        <span className="j_checkAll">全选</span>    
                    </div>
                    <div className="j_zj">
                        <p className="j_hj">合计：¥<span className="j_shj">{this.state.total}</span></p>
                        <p>不含运费</p>   
                    </div>
                    <div className="j_zjs" onClick={this.jies.bind(this)}>结算</div>
                </footer>
                
            </div>
        )
    }

    
    // componentDidMount(){
    //     $('.j_car').addClass('j_change_color').siblings().removeClass('j_change_color');
    //     $(".lan").delay(2000).hide(0); 
    // }
}