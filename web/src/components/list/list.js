import React from 'react'
import $ from 'jquery'

import HeadComponent from "../head/head.js"
import FootComponent from '../foot/foot'

import "./list.scss"

export default class ListComponent extends React.Component{
    componentDidMount(){
        $('.j_class').addClass('j_change_color').siblings().removeClass('j_change_color');

    }
    render(){
        return (
            <div className="category" onClick={this.search.bind(this)}>
                <HeadComponent props = {this.props}/>
                <div className="block">
                </div>
                <div className="category_main">
                    <div className="all_goods">
                        <h1 className="title2">
                            <img src="http://pbaimage.pba.cn/2014/m.pba.cn/images/wap/category/caption-all.jpg" alt="所有宝贝"/>
                        </h1>
                        <div className="products">
                            <div className="fenlei">
                                <img src= "http://pbaimage.pba.cn/2014/m.pba.cn/images/wap/category/makeup.jpg" data-aid="makeup"/>
                            </div>
                            <div className="fenlei">
                                <img src="http://pbaimage.pba.cn/2014/m.pba.cn/images/wap/category/skin.jpg" data-aid="skin_care"/>
                            </div>
                            <div className="fenlei">
                                <img src="http://pbaimage.pba.cn/2014/m.pba.cn/images/wap/category/mask.jpg" data-aid="mask"/> 
                            </div>
                            <div className="fenlei">
                                <img src="http://pbaimage.pba.cn/2014/m.pba.cn/images/wap/category/perfume.jpg" data-aid="perfume"/>
                            </div>
                            <div className="fenlei">
                                <img src="http://pbaimage.pba.cn/2014/m.pba.cn/images/wap/category/tools.jpg" data-aid="tools"/>
                            </div>
                            <div className="fenlei">
                                <img src="http://pbaimage.pba.cn/2014/m.pba.cn/images/wap/category/foods.jpg" data-aid="food"/>
                            </div>
                            
                        </div>
                    </div>
                    <div className = "all_category">
                        <h1 className="title2">
                            <img src="http://pbaimage.pba.cn/2014/m.pba.cn/images/wap/category/caption-category.jpg" />
                            <div className="classify">
                                <div className="items " data-id="b">洁面</div>
                                <div className="items " data-id="b">BB霜</div>
                                <div className="items " data-id="b">底妆</div>
                                <div className="items " data-id="b">隔离</div>
                                <div className="items " data-id="b">面霜</div>
                                <div className="items " data-id="b">乳液</div>
                                <div className="items " data-id="b">面膜</div>
                                <div className="items " data-id="b">香水</div>
                                <div className="items " data-id="b">精华水</div>



                                
                            </div>
                        </h1>

                    </div>
                    <div className = "all_efficacy">
                        <h1 className="title2"> 
                            <img src="http://pbaimage.pba.cn/2014/m.pba.cn/images/wap/category/caption-effect.jpg" />
                        </h1>
                        <div className="classify">
                                <div className="items " data-id="c">补水</div>
                                <div className="items " data-id="c">补湿</div>
                                <div className="items " data-id="c">祛痘</div>
                                <div className="items " data-id="c">美白</div>
                                <div className="items " data-id="c">控油</div>
                                <div className="items " data-id="c">遮瑕</div>
                                <div className="items " data-id="c">去黑眼圈</div>
                                <div className="items " data-id="c">淡斑</div>
                                <div className="items " data-id="c">去黑头</div>



                                
                        </div>
                    </div>
                </div>
                <FootComponent />
            </div>
        )
    }
    search(e){
        let proparams ;
        if(e.target.dataset.aid){
            proparams = e.target.dataset.aid;
            this.props.router.push({pathname: '/search', query: {proparams}})  
        }else if(e.target.dataset.id){
            proparams = e.target.innerHTML;
            this.props.router.push({pathname: '/search', query: {proparams}})  
        }
             
    }

    
    
    
}