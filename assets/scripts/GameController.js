const GameController = cc.Class({
  extends: cc.Component,

  properties: {
    openButton: cc.Button,
    selectedLuckyBox: cc.Node,
    arrLuckyBox: [cc.Node],
  },

  statics: {
    instance: null
  },

  onLoad() {
    GameController.instance = this;

    this.selectedLuckyBox = null;
  },

  start() {

  },

  // update (dt) {},

  setEnableOpenButton(value) {
    this.openButton.interactable = value;
  },

  setSelectedLuckyBox(luckyBox) {
    this.selectedLuckyBox = luckyBox;
    luckyBox.getComponent("LuckyBox").select();
    this.arrLuckyBox.forEach(luckyBox => {
      if(luckyBox != this.selectedLuckyBox)
        luckyBox.getComponent("LuckyBox").unselect();
    });
  },

  onOpenButtonClicked() {
    
  }
});
