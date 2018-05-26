import React from 'react'
import ContentComponent from '../content/content.js'

export default class UsersComponent extends React.Component{
    componentDidMount(){
        
    }

    state = {
      api:'allusers'
    }

    render(){
        return (
            <div>
                <ContentComponent api={this.state.api} />
            </div>
        )
    }
}