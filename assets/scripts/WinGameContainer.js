const GameController = require('GameController');

cc.Class({
  extends: cc.Component,

  properties: {
    resultText: cc.Label
  },

  onLoad() {

  },

  start() {

  },

  // update (dt) {},

  show(amountWin) {
    this.resultText.string = cc.js.formatStr('Got a lucky box!\nYou won %d TOMO', amountWin);
    this.node.active = true;
  },

  onPlayAgainButtonClicked() {
    GameController.instance.showHomeContainer();
  }
});
