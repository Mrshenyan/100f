import Global from "./Global";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Playcontroler extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    parent:cc.Node = null;
    MainScene:cc.Component = null;
    // onLoad () {
    //     this.parent = this.node.parent;
    //     this.MainScene = this.parent.getComponent("MainScene");
    // }

    start () {

    }

    update (dt) {
        // console.log("PlayerControlerUpdate碰撞标识："+Global.instance.CollisionFlag)
        if(this.node.x<(-165)){
            this.node.x = -165;
        }
        if(this.node.x>165){
            this.node.x = 165;
        }
        if(this.node.y>315||this.node.y<(-500)){//碰到顶，或超出屏幕减一条命/碰到顶就下落。。
            Global.instance.CollisionFlag = false;
        }
        if(!Global.instance.CollisionFlag){
            this.node.y -= Global.instance.InitSpeed;
        }
        else{
            let name = Global.instance.TheHolder.name;
            if(name == ""){
                return;
            }
            this.node.y = Global.instance.TheHolder.y 
                + Global.instance.TheHolder.getComponent(name).NodeH-10;//here ,this way isnot a good Processing method,should be optimizated
        }
        // console.log("PlayerControlerUpdate碰撞标识："+Global.instance.CollisionFlag)
    }
}

/**
 * 1.下落速度加快；
 * 2.玻璃：先停一会在碎掉；
 * 3.传送带速度快一点；
 * 4.
 */