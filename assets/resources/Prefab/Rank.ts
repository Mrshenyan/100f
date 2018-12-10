import Global from "../../Script/Global";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Rank extends cc.Component {
    // LIFE-CYCLE CALLBACKS:

    Ani = null;
    Anistate = null;
    onLoad () {
        let RemoteS = Global.instance.GetS();
        let phb = this.node.getChildByName("phb").children;
        let phbRank;
        let phbName;
        let phbFloor;
        let j=0;
        let i=RemoteS.length-1
        for(;j<phb.length;){//length = 8
            for(;i>=0;i--){
                phbName = phb[j].getChildByName("id").getComponent(cc.Label)
                phbRank = phb[j].getChildByName("rank").getComponent(cc.Label)
                phbFloor = phb[j].getChildByName("floor").getComponent(cc.Label)
                if(phbName.string==RemoteS[i].userId){
                    i++;
                }
                phbName.string = RemoteS[i].userId;
                phbRank.string = RemoteS[i].rank;
                phbFloor.string = RemoteS[i].score; 
                j++ 
            }
            j++;
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
        Global.instance.OverFlag = false;
        cc.director.loadScene("StartScene");
    }
}
