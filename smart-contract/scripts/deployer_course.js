#!/usr/bin/env node

const Web3 = require("web3");
const fs = require("fs");
const path = require('path');
const RLP = require('rlp');
const BigNumber = require('bignumber.js')

process.on('unhandledRejection', console.error.bind(console))

const { configPath, gasPriceGwei, printPrivateKey, rpcUrl, signedTxOutput, dontSendTx, chainId: chainIdInput } = require('yargs')
  .usage('Usage: $0 --config-path [path] --gas-price-gwei [gwei] --print-private-key [bool] --rpc-url [url] --signed-tx-output [path] --dont-send-tx [bool] --chain-id')
  .demandOption(['configPath', 'gasPriceGwei', 'rpcUrl'])
  .boolean('printPrivateKey')
  .boolean('dontSendTx')
  .argv;
const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));
const solc = require('solc')

const rand = web3.utils.randomHex(7);

// 0xD8b47E7eAdF58286521b0aC6B9790c34F5B61BA7
let privateKey = web3.utils.sha3("cail_dev");

if (printPrivateKey) {
  console.log("privateKey", privateKey);
  let path = "privatekey_" + web3.utils.randomHex(7) + ".txt";
  fs.writeFileSync(path, privateKey, function (err) {
    if (err) {
      return console.log(err);
    }
  });
}

// Copy & Paste this
Date.prototype.getUnixTime = function () { return this.getTime() / 1000 | 0 };
if (!Date.now) Date.now = function () { return new Date(); }
Date.time = function () { return Date.now().getUnixTime(); }

const account = web3.eth.accounts.privateKeyToAccount(privateKey);
const sender = account.address;
const gasPrice = BigNumber(gasPriceGwei).multipliedBy(10 ** 9);
const signedTxs = [];
let nonce;
let chainId = chainIdInput;

// let IEOAddress;
// let rateContractAddress;

console.log("from", sender);

async function sendTx(txObject) {
  const txTo = txObject._parent.options.address;


  let gasLimit = 3000000
  const txData = txObject.encodeABI();
  const txFrom = account.address;
  const txKey = account.privateKey;

  const tx = {
    from: txFrom,
    to: txTo,
    nonce: nonce,
    data: txData,
    gas: gasLimit,
    chainId,
    gasPrice
  };

  const signedTx = await web3.eth.accounts.signTransaction(tx, txKey);
  nonce++;
  // don't wait for confirmation
  signedTxs.push(signedTx.rawTransaction)
  if (!dontSendTx) {
    web3.eth.sendSignedTransaction(signedTx.rawTransaction, { from: sender });
  }
}

async function deployContract(solcOutput, contractName, ctorArgs) {

  const actualName = contractName;
  const bytecode = solcOutput.contracts[actualName].bytecode;
  console.log("XXX");
  console.log(bytecode.length);

  const abi = solcOutput.contracts[actualName].interface;
  const myContract = new web3.eth.Contract(JSON.parse(abi));
  const deploy = myContract.deploy({ data: "0x" + bytecode, arguments: ctorArgs });
  let address = "0x" + web3.utils.sha3(RLP.encode([sender, nonce])).slice(12).substring(14);
  address = web3.utils.toChecksumAddress(address);

  await sendTx(deploy);

  myContract.options.address = address;


  return [address, myContract];
}

const contractPath = path.join(__dirname, "../contracts/");

const input = {
  "CourseChain.sol": fs.readFileSync(contractPath + 'CourseChain.sol', 'utf8'),  
};



async function main() {
  nonce = await web3.eth.getTransactionCount(sender);
  console.log("nonce", nonce);
  chainId = chainId || await web3.eth.net.getId()
  console.log('chainId', chainId);

  console.log("starting compilation");
  const output = await solc.compile({ sources: input }, 1);
  console.log(output.errors);
  //console.log(output);
  console.log("finished compilation");

  if (!dontSendTx) {
    await waitForEth();
  }


  console.log("deploying CourseChain contract - set sender as admin");
  let CourseChainContract;
  [CourseChainAddress, CourseChainContract] = await deployContract(output, "CourseChain.sol:CourseChain", []);

  console.log("CourseChain address", CourseChainAddress);


  const signedTxsJson = JSON.stringify({ from: sender, txs: signedTxs }, null, 2);
  if (signedTxOutput) {
    fs.writeFileSync(signedTxOutput, signedTxsJson);
  }

  //printParams(jsonInput);
}

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

async function waitForEth() {
  while (true) {
    const balance = await web3.eth.getBalance(sender);
    console.log("waiting for balance to account " + sender);
    if (balance.toString() !== "0") {
      console.log("received " + balance.toString() + " wei");
      return;
    }
    else await sleep(10000)
  }
}

let filename;
let content;
let jsonInput;

main();

