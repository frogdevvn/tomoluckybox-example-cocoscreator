const Web3Controller = require('Web3Controller');

cc.Class({
  extends: cc.Component,

  properties: {
    openButton: cc.Button,
    statusText: cc.Label
  },

  onLoad() {

  },

  onEnable() {
    this.statusText.string = 'Choose your lucky box!';
  },

  start() {

  },

  // update (dt) {},

  onOpenButtonClicked() {
    this.openButton.interactable = false;
    this.statusText.string = 'Waitting network confimations...';
    Web3Controller.instance.sendRequestOpenLuckyBox();
  }
});
