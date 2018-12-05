import Global from "./Global";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Playcontroler extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // parent:cc.Node = null;
    MainScene:cc.Component = null;
    onLoad () {
        // this.parent = this.node.parent;
        this.MainScene = Global.instance.getMN();
    }

    start () {

    }

    update (dt) {
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
    }

    /**
     * player与墙壁的碰撞检测
     * @param other 被撞物体
     * @param self 碰撞体
     */
    onCollisionEnter(other,self){
        switch(other.node.name){
            case "Bg_0CollisionR":{
                self.node.x = 180;
                break;
            }
            case "Bg_0CollisionL":{
                self.node.x = -180;
                break;
            }
            case "Bg_1CollisionR":{
                self.node.x = 180;
                break;
            }
            case "Bg_1CollisionL":{
                self.node.x = -180;
                break;
            }
            case "ding":{
                Global.instance.CollisionWithDing = true;
                
                break;
            }
            default:{
                break;
            }
        }
    }
}

/**
 * 1.下落速度加快；
 * 2.玻璃：先停一会在碎掉；
 * 3.传送带速度快一点；
 * 4.
 */