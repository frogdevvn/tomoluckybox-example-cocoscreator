const GameController = require("GameController");

cc.Class({
  extends: cc.Component,

  properties: {
    
  },

  onLoad() {

  },

  start() {

  },

  // update (dt) {},

  onBuyButtonClicked() {
    GameController.instance.showMainGameContainer();
  }
});
