import React, { Component } from 'react'
import "../css/block.css"
import "../css/header.css"

export default class Document extends Component {
    render() {
        return (
            <div className="card">
                <div className="header-small">
                    <p><b>Document</b></p>
                </div>
                <div className="container">
                    <div><b>Some info </b></div>
                </div> 
            </div>
        );
    }
}
