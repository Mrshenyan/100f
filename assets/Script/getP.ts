
const {ccclass, property} = cc._decorator;

@ccclass
export default class getP extends cc.Component {


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    update (dt) {}

    onCollisionEnter(){
        console.log("碰撞到了");
    }
}
