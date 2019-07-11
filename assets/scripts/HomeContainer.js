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

  onPlayNowButtonClicked() {
    GameController.instance.showMainGameContainer();
  }
});
