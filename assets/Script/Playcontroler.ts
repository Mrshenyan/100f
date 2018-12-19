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
        if(Global.instance.OverFlag){
            this.enabled = false;
        }
        else{
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
        if(Global.instance.CollisionWithDing){
            this.node.stopAllActions();
            Global.instance.CollisionWithDing = false;
            Global.instance.CollisionFlag = false;
        }
    }

    /**
     * player与墙壁的碰撞检测
     * @param other 被撞物体
     * @param self 碰撞体
     */
    onCollisionEnter(other,self){
        let rootSelf = this;

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
            // case "tanhuang":{
            //     if(other.node.x+75>self.node.x&&other.node.x-75<self.node.x){
            //         let main = Global.instance.getMN();
            //         main.getChildByName("output").getComponent(cc.Label).string = "tanhuang";

            //     }
            // }
            case "ding":{
                Global.instance.CollisionWithDing = true;
                self.node.stopAllActions();
                rootSelf.LifeZero();
                Global.instance.CollisionFlag = false;
                self.node.getComponent(cc.BoxCollider).enabled = false;
                rootSelf.scheduleOnce(function(err){
                    self.node.getComponent(cc.BoxCollider).enabled = true;
                },0.3);
                break;
            }
            default:{
                // this.MainScene.getComponent("MainScene").Score();//得分
                break;
            }
        }
    }

    LifeZero(){
        let main = Global.instance.getMN();
        let lifeChil = main.getChildByName("BgNode").getChildByName("LifeDing").children;
        let life = new Array();
        let lifeNum=0;
        for(let i=0;i<lifeChil.length;i++){
            if(lifeChil[i].name == "lifeBG"){
                life.push(lifeChil[i]);
            }
        }
        for(let i=0;i<life.length;i++){
            if(life[i].active){
                lifeNum++;
            }
        }
        if(lifeNum==0){
            return;
        }
    }
}

/**
 * 1.下落速度加快；
 * 2.玻璃：先停一会在碎掉；
 * 3.传送带速度快一点；
 * 4.
 */