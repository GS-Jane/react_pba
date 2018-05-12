import React from 'react'
import FootComponent from '../foot/foot'
import $ from 'jquery'
export default class MyComponent extends React.Component{
    componentDidMount(){
        $('.j_my').addClass('j_change_color').siblings().removeClass('j_change_color');
    }
    render(){
        return (
            <div>
                <h2 className="iconfont icon-xiugaimima">MyComponent </h2>
                <FootComponent />
            </div>
        )
    }
    
}