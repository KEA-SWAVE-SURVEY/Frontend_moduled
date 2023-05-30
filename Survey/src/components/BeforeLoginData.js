import '../styles/BeforeLoginStyles.css'

import { Component } from 'react'

class BeforeLoginData extends Component{
    render(){
        return(
            <div className={this.props.className}>
                <div className="bef-text">
                    <h2>&nbsp;&nbsp;&nbsp;&nbsp;{this.props.heading}</h2>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.props.text}</p>
                </div>
                
                <div className="image">
                    <img alt="img" src={this.props.img1}/>
                    <img alt="img" src={this.props.img2}/>
                </div>
            </div>
        )
    }
}

export default BeforeLoginData
