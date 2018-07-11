import React, { Component } from 'react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import getWeb3 from './utils/getWeb3'

import AllDocuments from "./components/AllDocuments"
import Shell from "./components/Shell" 
import Profile from "./components/Profile"
import Home from "./components/Home"
import SignUp from "./components/SignUp"
import LogIn from "./components/LogIn"

import axios from "axios"

import {Router, Route, browserHistory, IndexRoute} from "react-router";

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

//const contract = require('truffle-contract')
//const simpleStorage = contract(SimpleStorageContract)

export default class App extends Component {

  constructor(props) {
    super(props)

    const contract = window.web3.eth.contract([
      {
        "constant": false,
        "inputs": [
          {
            "name": "x",
            "type": "uint256"
          }
        ],
        "name": "set",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "get",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      }
    ]);

    this.state = {
      address : "...",
      amount : "0",
      storageValue: 0,
      contractAddress : "...",
      web3: null,
      currentPage : SignUp,
      authorized : false,
      contractInstance : contract.at('0xda2f7294bbf110662ec3438a3a7f129feca80511')
    };

    
  }

  componentWillMount() {
    console.log("componentWillMount()");

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })
      
      this.getClientInfo();
      try {
      this.getContract();
      } catch(e) {
        console.log(e);
      }
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  getClientInfo() {
    var el = this;
    this.setState({address : this.state.web3.eth.accounts[0]});
    this.state.web3.eth.getBalance(this.state.address, function(err, wei) {
      var eth = el.state.web3.fromWei(wei, 'ether');
      el.setState({amount : eth.toString()});
    });

    //TODO
    el.setState({user : "Client"});
  }

  getContract() {

    const {set} = this.state.contractInstance;
    const {get} = this.state.contractInstance;

    
      get((err, res)=> {
        console.log(res.toString());
      });
  
    
    
    

    /*simpleStorage.setProvider(this.state.web3.currentProvider)
    var simpleStorageInstance;
    var el = this
    
    simpleStorage.deployed().then((instance) => {
      simpleStorageInstance = instance
      console.log("...getting instance");
      return simpleStorageInstance.get.call(el.state.address);
    }).then((value) => {
      el.setState({storageValue : value.toString()});
    }).then(() => {
      el.setState({contractAddress : simpleStorage.address})
    })*/
  }

  withProps(Component, props) {
    return function(matchProps) {
      return <Component {...props} {...matchProps} />
    }
  }

  render() {
    return (
      <div>
        <Router history={browserHistory}>
          <Router path={"/"} component={this.withProps(Shell, {application : this})}>
            <IndexRoute component={this.withProps(SignUp, {application : this})}/> 

            <Route path={"signup"} component={this.withProps(SignUp, {application : this})}/> 
            <Route path={"login"} component={this.withProps(LogIn, {application : this})}/>             
            <Route path={"profile"} component={this.withProps(Profile, { application : this })}/>
            <Route path={"documents"} component={AllDocuments}/>

          </Router>
        </Router>
      </div>
    );
  }
}