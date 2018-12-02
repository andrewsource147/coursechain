import Web3 from "web3"


const CONFIG_NETWORK = {
    endPoint: "https://ropsten.infura.io/DtzEYY0Km2BA3YwyJcBG",
    stackAddr: "0xB201Ea420F19a167713AdB5bA63436F7238BFde6",
    kycAddr: "0x5a8e6230662bcdc2cd28a4db50509620ed1a1e5e"
}

const STACKVOTES_ABI = [{ "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "userVotes", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_user", "type": "address" }, { "name": "_isUpVote", "type": "uint256" }], "name": "votesUser", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_adminAddr", "type": "address" }], "name": "transferAdmin", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "admin", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "_user", "type": "address" }, { "indexed": false, "name": "_voter", "type": "address" }, { "indexed": false, "name": "_isUpVote", "type": "uint256" }], "name": "VoteUser", "type": "event" }]
const KYC_ABI = [{ "constant": false, "inputs": [{ "name": "_userName", "type": "string" }, { "name": "_userEmail", "type": "string" }], "name": "addUser", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_userAddr", "type": "address" }], "name": "getUserInfo", "outputs": [{ "name": "", "type": "address" }, { "name": "", "type": "string" }, { "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_adminAddr", "type": "address" }], "name": "transferAdmin", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_userAddr", "type": "address" }], "name": "isUserExisted", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "stackUserMap", "outputs": [{ "name": "userAddr", "type": "address" }, { "name": "userName", "type": "string" }, { "name": "userEmail", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_userAddr", "type": "address" }], "name": "removeUser", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "admin", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_userAddr", "type": "address" }, { "indexed": false, "name": "_userName", "type": "string" }, { "indexed": false, "name": "_userEmail", "type": "string" }], "name": "AddUser", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_userAddr", "type": "address" }], "name": "RemoveUser", "type": "event" }]

export default class EthereumServices {
    constructor() {
        this.rpc = new Web3(new Web3.providers.HttpProvider(CONFIG_NETWORK.endPoint, 3000))
        this.stackContract = new this.rpc.eth.Contract(STACKVOTES_ABI, CONFIG_NETWORK.stackAddr)
        this.kycContract = new this.rpc.eth.Contract(KYC_ABI, CONFIG_NETWORK.kycAddr)
    }

    getStackAddr = () => {
        return CONFIG_NETWORK.stackAddr
    }

    getVoteData = (_user, _isUpVote) => {
        var data = this.stackContract.methods.votesUser(_user, _isUpVote).encodeABI()
        return new Promise((resolve, reject) => {
            resolve(data)
        })
    }

    getVoteUser = (_user) => {
        return new Promise((resolve, reject) => {
            this.stackContract.methods.userVotes(_user).call()
                .then((result) => {
                    if (result != null) {
                        resolve(result)
                    }
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

}