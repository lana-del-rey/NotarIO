import React, { Component } from 'react'
import {Link} from 'react-router'
import {withRouter} from 'react-router-dom'

import "../css/signup.css";

class LogIn extends Component {
    login = () => {
        var md5 = require('md5');
        this.email = document.getElementById("email").value;
        this.psw = md5(document.getElementById("psw").value);
        this.props.application.setState({authorized : true});
    }

      render() {
          return(
            <div className="sign-up">
                <div className="container">
                    <h1>Log In</h1>
                    <hr/>
                    <div>
                        <label htmlFor="email"><b>Email</b></label>
                          <input type="text" placeholder="Enter Email" id="email" required/>
                        <br/>
                        <label htmlFor="psw"><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" id="psw" required/>    
                    </div>

                    <div className="clearfix">
                    <Link to={"/signup"}><button type="button" className="cancelbtn">Back</button></Link>
                        <button onClick={this.login} type="button" className="signupbtn">Log In</button>
                    </div>
                </div>
            </div>
          );
      }
}

export default LogIn;