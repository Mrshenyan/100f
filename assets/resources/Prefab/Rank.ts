import Global from "../../Script/Global";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Rank extends cc.Component {
    // LIFE-CYCLE CALLBACKS:

    Ani = null;
    Anistate = null;
    onLoad () {
        let localS = Global.instance.getLocalScore();
        for(let i=0;i<localS.length;i++){
            
        }
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
