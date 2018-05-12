import React from 'react'
import FootComponent from '../foot/foot'
import './car.scss'
import $ from 'jquery'
export default class CarComponent extends React.Component{
    componentDidMount(){
        $('.j_car').addClass('j_change_color').siblings().removeClass('j_change_color');
    }
    render(){
        return (
            <div>
                <h2 className="iconfont icon-xiugaimima">car</h2>
                <FootComponent />
            </div>
        )
    }
    
}