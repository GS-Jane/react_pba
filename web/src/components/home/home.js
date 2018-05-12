import React from 'react'
import FootComponent from '../foot/foot'
import $ from 'jquery'
export default class HomeComponent extends React.Component{
    componentDidMount(){
        $('.j_home').addClass('j_change_color').siblings().removeClass('j_change_color');
    }
    render(){
        return (
            <div>
                <h2 className="iconfont icon-xiugaimima">HomeComponent </h2>
                <FootComponent />
            </div>
        )
    }
    
}