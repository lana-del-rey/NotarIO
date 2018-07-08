import React, { Component } from 'react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import getWeb3 from './utils/getWeb3'
import Document from "./components/Document"


import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'
import { randomBytes } from 'crypto';

const contract = require('truffle-contract')
const simpleStorage = contract(SimpleStorageContract)

const contractAddress = "";

export default class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      address : "...",
      amount : "0",
      storageValue: 0,
      contractAddress : "...",
      web3: null
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
      this.instantiateContract();
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
  }

  instantiateContract() {
    
    simpleStorage.setProvider(this.state.web3.currentProvider)
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
      //el.contractInfo.address = simpleStorage.address; //({address : simpleStorage.address});
      //el.setState({contractAddress : simpleStorage.address});
    })

  }

  toDocuments() {
    //TODO
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a className="pure-menu-heading">Notar.IO</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">

              <h2>Wallet</h2>
              <p>Address : {this.state.address} </p>
              <p>Amount : {this.state.amount} Eth </p>

              <br></br>
              <h2>Smart Contract</h2>
              <p>Address : {this.state.contractAddress} </p>
              <p>storedData : {this.state.storageValue} </p>

              <br></br>
              <button onClick={this.toDocuments}>
                  Документы
              </button>

            </div>
          </div>
        </main>
      </div>
    );
  }
}