import React from 'react'

import ContentComponent from './content/content.js'
import HeaderComponent from './header/header.js'
import NavComponent from './nav/nav.js'
import './home.scss'

export default class HomeComponent extends React.Component{
    static defaultProps = {
        data:[
            {}
        ]
    }

    componentDidMount(){
        
    }
    render(){

        return (
            <div>
                <HeaderComponent />
                <NavComponent />
                <div className="l_container">
                    {this.props.children}
                </div>
            </div>
        )
    }
    
}