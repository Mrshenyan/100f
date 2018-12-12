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
        // let len;
        let x=0;
        if(RemoteS.length>=8){
            x = RemoteS.length - 8;
        }
        for(;j<phb.length-x;){//length = 8
            for(;(i>=0&&j<RemoteS.length-x);i--){
                phbName = phb[j].getChildByName("id").getComponent(cc.Label);
                phbRank = phb[j].getChildByName("rank").getComponent(cc.Label);
                phbFloor = phb[j].getChildByName("floor").getComponent(cc.Label);
                if(phbName.string==RemoteS[i].userId){
                    i++;
                }
                phbName.string = RemoteS[i].userId.slice(4);
                phbRank.string = RemoteS[i].rank;
                phbFloor.string = RemoteS[i].score; 
                if(phbName.string == Global.instance.GetUSer().userId.slice(4)){
                    this.node.getChildByName("phbd1").getChildByName("myrank").getComponent(cc.Label).string
                         = phb[j].getChildByName("rank").getComponent(cc.Label).string; 
                    this.node.getChildByName("phbd1").getChildByName("myfloor").getComponent(cc.Label).string
                         = phb[j].getChildByName("floor").getComponent(cc.Label).string;
                }
                switch(RemoteS[i].rank){
                    case 1:{
                        phb[j].getChildByName("model").active = true;
                        break;
                    }
                    case 2:{
                        phb[j].getChildByName("model").active = true;
                        break;
                    }
                    case 3:{
                        phb[j].getChildByName("model").active = true;
                        break;
                    }
                    default:{
                        break;
                    }
                }
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
