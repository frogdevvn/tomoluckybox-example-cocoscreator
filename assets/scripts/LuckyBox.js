const GameController = require("GameController");

cc.Class({
  extends: cc.Component,

  properties: {
    isSelected: false,
    _animation: cc.Animation

  },

  onLoad() {
    this._animation = this.getComponent(cc.Animation);
  },

  start() {

  },

  // update (dt) {},

  onSelectClicked() {
    if (!this.isSelected) {
      GameController.instance.setSelectedLuckyBox(this.node);
      GameController.instance.setEnableOpenButton(true);
    }
  },

  select() {
    this.isSelected = true;
    this._animation.play('LuckyBox-selected');
  },

  unselect() {
    this.isSelected = false;
    this._animation.stop('LuckyBox-selected');
    this.node.setScale(1);
  }
});
