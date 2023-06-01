import Web3 from "web3";
import simpleContract from "./contracts/simpleContract.json";
import {useState,useEffect} from "react";
import { ethers } from "ethers";

import './App.css';

function App() {
  document.title='Demo App';
  var res = document.getElementById("res");
  var screen1 = document.getElementById("screen1");
  var Done = document.getElementById("Done");
  const [inputValue, setInputValue] = useState("");
  const [num1, setNum1] = useState(Math.floor(Math.random() * 10));
  const [num2, setNum2] = useState(Math.floor(Math.random() * 10));
  const [state,setState]=useState({web3:null,contract:null});
  const [setErrorMessage, setErrorMessgae]=useState(null);
  const [defaultAccount, setDefaultAccount]=useState('');
  const [userBalance, setUserBalance]=useState(null);
  const connectMetamask = () => {
    if (window.ethereum) {
      window.ethereum.request({method: 'eth_requestAccounts'})
      .then(result => {
          accountChangedHandler(result[0]);
      })
    } else {
      setErrorMessgae("Install Metamask");
    }
  };

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    getUserBalance(newAccount);
  }

  const getUserBalance = (address) => {
    window.ethereum.request({method: 'eth_getBalance', params: [String(address), "latest"]})
    .then(balance => {
      setUserBalance(ethers.formatEther(balance));
    })
  }

  const ChangedHandler = () => {
    window.location.reload();
  }
  window.ethereum.on('accountChanged', accountChangedHandler);
  window.ethereum.on('chainChanged', ChangedHandler);
  function Change() {
    screen1.style.backgroundColor = "rgb(117, 117, 239)";
    setInputValue("");
    setNum1(Math.floor(Math.random() * 10));
    setNum2(Math.floor(Math.random() * 10));
  }
  function Check() {
    var sum = parseInt(num1) + parseInt(num2);
    if (parseInt(res.value) === sum) {
      screen1.style.backgroundColor = "green";
      Done.style.display = "none";
      setTimeout(() => {
        Done.style.display = "block";
        Change();
      }, 1000); 
      var x = document.getElementById("yaddr");
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "block";
      }
    } else {
      screen1.style.backgroundColor = "red";
      Done.style.display = "none";
      setTimeout(() => {
        Change();
        Done.style.display = "block";
      }, 1000); 
    }
  }
  async function sendTransaction(e) {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const addr = accounts[0];
      let params = [{
        from: addr,
        to: e.target.value,
        gas: Number(30400).toString(16),
        gasPrice: Number(2500000).toString(16),
        value: Number(1000000000000000000).toString(16),
      }]
      let result = window.ethereum.request({method: "eth_sendTransaction", params}).catch((err) => {
        console.log(err);
      })
  }
  return (
    <div>
      <div className="navBar">
        <h1>M-ETH</h1>
        <div className="token" id="tokenCurrent">
          <p>Current: <b>{userBalance} ETH</b></p>
        </div>
        <div className="user">
          <p><button onClick={connectMetamask}>Connect to Address: </button><b>  { `${defaultAccount}` }</b></p>
        </div>
      </div>
      <div className="main"> 
          <input style={{display: "none", height: "25px", background: "white"}} id="yaddr" className="screen1" type="text" placeholder="Enter your Address: " onChange={sendTransaction}></input>
          <div className="screen1" id="screen1">
          <div className="num" id="num1">{num1}</div>
          <div className="num">+</div>
          <div className="num" id="num2">{num2}</div>
          <div className="num">=</div>
          <div className="num">
            <input id="res" type="number" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          </div>
        </div>
        <div className="screen2">
          <button onClick={Check} id="Done">Done</button>
        </div>
      </div>
    </div>
  );
}

export default App;
