import React from 'react'
import $ from 'jquery'
import {Router, Route, hashHistory, Link, IndexRoute, browserHistory} from 'react-router'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.min.js'
import './content.scss'
import http from '../../../utils/httpclient.js'
import SpinnerComponent from '../../spinner/spinnerComponent.js'


export default class ContentComponent extends React.Component{
    state = {
      dataset:[],
    }

    componentDidMount(){

        http.get(this.props.api,{page:1}).then((res)=>{
          // console.log(res)
          this.setState({
            dataset:res.data
          })
        })

    }
    paging(e){
        let page = e.target.innerText;
        // e.target.classList.add('l_page');
        // e.target.parentNode.children.classList.remove('l_page')
        http.get(this.props.api,{page:page}).then((res)=>{
          // console.log(res)
          this.setState({
            dataset:res.data
          })
        })
        // console.log(this.state.page);

    }

    edit(){
        console.log(555);
        hashHistory.push("/edit");
    }

    static defaultProps = {
        api:''
    }

    getKeys(key={}){
        return Object.keys(key);
    }
    
    render(){
        return (
            <div  className="l_content">
                <div>
                    <table className="l_table">
                        <thead>
                            <tr>
                                {
                                    this.getKeys(this.state.dataset[0]).map((item,idx)=>{
                                        return <th key={idx}>{item}</th>
                                    })
                                }
                                {<th>operate</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.dataset.map((obj)=>{
                                    return (
                                        <tr key={obj.id}>
                                            {
                                                this.getKeys(obj).map((item,idx)=>{
                                                    return <td key={item+idx}>{obj[item]}</td>
                                                })
                                            }
                                            {
                                              <td className="l_operate">
                                                <button className="l_edit" onClick={this.edit}>编辑</button>
                                                <button className="l_del">删除</button>
                                              </td>
                                            }
                                        </tr>
                                    )
                                    
                                })
                                
                            }
                        </tbody>
                    </table>
                    <SpinnerComponent />
                </div>
                <div  className="l_pageBox" onClick={this.paging.bind(this)}>
                    <span className="l_page">1</span>
                    <span className="l_page">2</span>
                    <span className="l_page">3</span>
                    <span className="l_page">4</span>
                    <span className="l_page">5</span>
                </div>               
            </div>
        )
    }
}