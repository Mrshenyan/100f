import Global from "../../Script/Global";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Rank extends cc.Component {
    // LIFE-CYCLE CALLBACKS:

    Ani = null;
    Anistate = null;
    onLoad () {
        // let localS = Global.instance.getLocalScore();
        // let remoteS = Global.instance.getRemoteScore();
        // this.Ani = this.node.getComponent(cc.Animation);
        // this.Anistate = this.Ani.play();
        // this.Anistate.speed = 1;
    }

    start () {
        
    }

    update (dt) {
    }

    /**
     * close the rank Scene and load the start scene.
     */
    CloseRank(){
        console.log("this button is used to close this rank Scene");
        this.destroy();
        cc.director.loadScene("StartScene");
    }
}
