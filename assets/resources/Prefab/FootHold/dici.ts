import MainScene from "../../../Script/MainScene";
import Global from "../../../Script/Global";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    /**
     * 落脚点类型 1：向左传送带
     */
    private KIND_FootHold = 4;
    /**
     * player是否落在落脚点上，默认false，没有
     */
    @property(Boolean)
    public isHold = false;

    @property(Number)
    public NodeH:number = 80;

    private main:MainScene = null;
    /**
     * 落脚点对应动画
     */
    Ani:cc.Animation = null;
    AniState = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.y = -500;
        this.node.x = cc.randomMinus1To1()*140;
        this.Ani = this.node.getComponent(cc.Animation);
    }

    start () {

    }

    update (dt) {
        this.node.active = true;
        this.node.y += 2;
        if(this.node.y>360){
            if(this.node.isHold){
                Global.instance.CollisionFlag = false;
            }
            this.node.isHold = false;
            this.node.destroy();
        }

        if(!Global.instance.CollisionFlag){
            this.node.isHold = false;
        }
    }

    onCollisionEnter(other,self){
        let rootself = this;
        console.log("我被撞到了");
        // Global.instance.CollisionFlag = true;
        Global.instance.TheHolder = this.node;
        this.node.isHold = true;
        Global.instance.Injured = true;
        this.main.Score();
        if(!Global.instance.CollisionFlag){
            Global.instance.CollisionFlag = true;
            let spawn
            spawn = cc.spawn(cc.callFunc(function(){
                if(rootself.Ani==null){
                    return;
                }
                rootself.AniState = rootself.Ani.play("dici");
                rootself.AniState.repeatCount = 100;
            }),cc.callFunc(function(){
            }));
            other.node.runAction(spawn);
        }
    }

    init(main:MainScene){
        this.main = main;
    }
}
