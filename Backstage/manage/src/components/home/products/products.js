import React from 'react'
import ContentComponent from '../content/content.js'
import './product.scss'

export default class ProductsComponent extends React.Component{
    componentDidMount(){
        
    }

    state = {
      api:'paging'
    }
    
    render(){
        return (
            <div>
                <ContentComponent api={this.state.api} />
            </div>
        )
    }
}