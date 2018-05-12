import React from 'react'
import FootComponent from '../foot/foot'
import $ from 'jquery'
export default class ListComponent extends React.Component{
    componentDidMount(){
        $('.j_class').addClass('j_change_color').siblings().removeClass('j_change_color');
    }
    render(){
        return (
            <div>
                <h2 className="iconfont icon-xiugaimima">ListComponent </h2> 
                <FootComponent />
            </div>
        )
    }
    
    
}