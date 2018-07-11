import React, { Component } from 'react'
import {Link} from 'react-router'
import "../css/signup.css"; 


export default class SignUp extends Component {

    signup = () => {
        var md5 = require('md5');
        this.email = document.getElementById("email").value;
        this.psw = md5(document.getElementById("psw").value);
        this.psw_repeat = md5(document.getElementById("psw-repeat").value);
        if (this.psw != this.psw_repeat) {
            alert("Passwords do not match");
        } else {
            this.props.application.setState({authorized : true});
        }
    }

    render() {
          return(
            <div className="sign-up">
                <div className="container">
                    <h1>Sign Up</h1>
                    <p>Please fill in this form to create an account.</p>
                    <hr/>
                    <div>
                        
                        <label htmlFor="email"><b>Email</b></label>
                        <input type="text" placeholder="Enter Email" id="email"  required/>
                        
                        <br/>
                        <label htmlFor="psw"><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" id="psw"  required/>    
                        
                        <br/>
                        <label htmlFor="psw-repeat"><b>Repeat Password</b></label>
                        <input type="password" placeholder="Repeat Password" id="psw-repeat"  required/>    
                    
                    </div>

                    <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>

                    <div className="clearfix">
                        <button onClick={this.signup} type="button" className="signupbtn">Sign Up</button>
                    </div>

                    <div className="clearfix">
                        <p>Already have an account? <a><Link to={"/login"}>Log In</Link></a>.</p>
                    </div>
                </div>
            </div>
          );
      }
}