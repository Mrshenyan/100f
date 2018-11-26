import Global from "./Global";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Playcontroler extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    update (dt) {
        if(!Global.instance.CollisionFlag){
            this.node.y -= Global.instance.InitSpeed;
        }
        if(this.node.x<(-210)){
            this.node.x = -210;
        }
        if(this.node.x>210){
            this.node.x = 210;
        }
    }
}
