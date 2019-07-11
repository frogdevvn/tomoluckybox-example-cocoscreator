const Web3 = require('web3.min');

const TOMOLUCKYBOX_CONTRACT_ADRESS_TESTNET = '0x48dBECEce748B2E47A577295176E390928435D22';

const PRICE_PER_OPEN = '1'; //1 TOMO

const GAS_PRICE_DEFAULT = '20000000000'; //20Gweis

const isWeb3Enabled = () => !!window.web3;

const Web3Controller = cc.Class({
  extends: cc.Component,

  properties: {
    Web3: null,
    Web3Provider: null,
    Web3ProviderName: 'metamask',

    Contract: null,
    ContractABI: cc.JsonAsset,

    CurrentAccount: '',
  },

  statics: {
    instance: null
  },

  onLoad() {
    Web3Controller.instance = this;

    Web3Controller.instance.initWeb3();
  },

  start() {

  },

  // update (dt) {},

  //Checks if we are using modern dApp browsers or the more recent versions of MetaMask.
  initWeb3() {
    if (isWeb3Enabled()) {
      this.Web3 = new Web3();

      //Request account access for modern dapp browsers
      if (window.ethereum) {
        this.Web3ProviderName = 'metamask';
        this.Web3Provider = window.ethereum;
        this.Web3.setProvider(this.Web3Provider);
        window.ethereum.enable().then((accounts) => {
          Web3Controller.instance.initAccount();
          Web3Controller.instance.initContract();
        })
          .catch((error) => {
            cc.error(error);
          });
      }
      //Request account access for legacy dapp browsers
      else if (window.web3) {
        this.Web3ProviderName = 'tomowallet';
        this.Web3Provider = window.web3.currentProvider;
        this.Web3.setProvider(this.Web3Provider);

        Web3Controller.instance.initAccount();
        Web3Controller.instance.initContract();
      }
    }
    else {
      cc.error('You must enable and login into your TomoWallet or MetaMask accounts!');
    }
  },

  initContract() {
    this.Contract = new this.Web3.eth.Contract(this.ContractABI.json.abi, TOMOLUCKYBOX_CONTRACT_ADRESS_TESTNET);
  },

  //Init current account address
  initAccount() {
    this.Web3.eth.getAccounts().then((accounts) => {
      if (accounts.length > 0) {
        Web3Controller.instance.CurrentAccount = accounts[0].toLowerCase();
        HUDController.instance.updateAccountText(Web3Controller.instance.CurrentAccount);
        Web3Controller.instance.initBalance();
      }
      else
        cc.error('You must enable and login into your TomoWallet or MetaMask accounts!');
    });
  },

  //Init current account balance
  initBalance() {
    this.Web3.eth.getBalance(Web3Controller.instance.CurrentAccount, (err, balance) => {
      if (err) {
        cc.err(err);
        return;
      }

      HUDController.instance.updateBalanceText(Web3Controller.instance.getTOMOFromWei(balance));
    });
  },

  sendRequestOpenLuckyBox() {
    if(GameController.instance.selectedLuckyBoxId != 0) {
      this.Contract.methods.randomLuckyBox(GameController.instance.selectedLuckyBoxId).send({
          from: Web3Controller.instance.CurrentAccount,
          value: Web3Controller.instance.Web3.utils.toWei(PRICE_PER_OPEN, 'ether'),
          gas: 250000,
          gasPrice: GAS_PRICE_DEFAULT
      })
      .on("transactionHash", (hash) => {
         cc.log('transactionHash: ', hash);
      })
      .on("receipt", (receipt) => {
        cc.log('receipt: ', receipt);
        let returnValues = receipt.events.LogRandomLuckyBoxSuccessed.returnValues;
        let result = parseInt(returnValues[1]);
        Web3Controller.instance.initBalance();
        GameController.instance.unselectAllLuckyBox();
        GameController.instance.showResultOpenLuckyBox(result, 3);
     })
      .on("error", (error) => {
          cc.error("sendRequestOpenLuckyBox: ", error);
      });
    }
    else {
        cc.error("sendRequestOpenLuckyBox failed!");
    }
},

  //Convert from Wei to TOMO
  getTOMOFromWei(value) {
    return parseInt(Web3Controller.instance.Web3.utils.fromWei(value, 'ether'))
  }
});

module.exports = Web3Controller;

const GameController = require('GameController');
const HUDController = require('HUDController');
