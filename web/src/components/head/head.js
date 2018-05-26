import React from "react"

import "./head.scss";

export default class HeadComponent extends React.Component{
    render(){
        return(
            <div className="t_head">
                <div className="t_search">
                    <input type="text" placeholder="搜索商品" className="goods_search" onKeyUp={this.presssearch.bind(this)} ref="search_value"/>
                    <div className="icon_search" onClick = {this.clicksearch.bind(this)}>
                        <img src="../../../src/asset/images/search-input.png"/>
                    </div>
                </div>
            </div>
        )
    }
    presssearch(e){
        
        
        if(e.which == 13){
            let proparams ;
            proparams = this.refs.search_value.value;
            location.href = "http://localhost:3002/#/search?proparams=" +   proparams;
        }
        
        
    }

    clicksearch(){
        
        let proparams ;
        proparams = this.refs.search_value.value;
        location.href = "http://localhost:3002/#/search?proparams=" +   proparams;  
        
    }
    componentDidMount(){
        
    }
}