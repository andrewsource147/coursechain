
import Web3 from "web3"


export default class DappBrowser {
  constructor() {
    this.web3 = new Web3(Web3.givenProvider)
  }

  getWalletType = () => {
    return "dapp"
  }

  getNetworkId = () => {
    return new Promise((resolve, reject) => {
      this.web3.eth.net.getId((error, result) => {
        if (error || !result) {
          var error = new Error("Cannot get network id")
          reject(error)
        } else {
          resolve(result)
        }
      })
    })
  }

  getCoinbase() {
    return new Promise((resolve, reject) => {
      this.web3.eth.getAccounts((error, result) => {
        if (error || result.length === 0) {
          var error = new Error("Cannot get coinbase")
          reject(error)
        } else {
          resolve(result[0])
        }
      })
    })
  }


  sendTx = (txObj) => {
    return new Promise((resolve, reject) => {
      this.web3.eth.sendTransaction(txObj, function(err, transactionHash) {
        if (!err){
          resolve(transactionHash)
        }else{
          console.log(err)
          reject(err.message)
        }
      })
    })
  }

  setDefaultAddress(address) {
    this.web3.eth.defaultAccount = address
  }
}