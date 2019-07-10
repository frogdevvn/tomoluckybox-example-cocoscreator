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

  show() {
    this.node.active = true;
  },

  onPlayAgainButtonClicked() {
    GameController.instance.showHomeContainer();
  }
});
