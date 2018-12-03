import MainScene from "../../../Script/MainScene";
import Global from "../../../Script/Global";

const {ccclass, property} = cc._decorator;

@ccclass
export default class shandian extends cc.Component {
    /**
     * 落脚点类型 1：向左传送带
     */
    private KIND_FootHold = 6;
    /**
     * player是否落在落脚点上，默认false，没有
     */
    @property(Boolean)
    public isHold = false;

    @property(Number)
    public NodeH:number = 50;

    private main:MainScene = null;
    /**
     * 落脚点对应动画
     */
    Ani:cc.Animation = null;
    AniState = null;
    onLoad () {
        this.node.y = -512;
        this.node.x = cc.randomMinus1To1()*140;
        this.Ani = this.node.getComponent(cc.Animation);
        this.AniState = this.Ani.play("shandian");
        this.AniState.repeatCount = 100;
    }

    start () {

    }

    update (dt) {
        // console.log(Global.instance.CollisionFlag);
        this.node.active = true;
        this.node.y += Global.instance.FHFallSpeed;
        if(this.node.y>360){
            if(this.node.isHold){
                this.node.isHold = false;
                Global.instance.CollisionFlag = false;
            }
            this.node.destroy();
        }
    }


    /**
     * 初始化函数
     * @param main 主场景
     */
    public init(main:MainScene){
        this.main = main;
    }
    /**
     * 获取落脚点类型
     */
    public getKind(){
        return this.KIND_FootHold;
    }

    onCollisionEnter(other,self){
        Global.instance.KIND_FootHold = this.KIND_FootHold;
        Global.instance.TheHolder = this.node;
        Global.instance.Injured = true;
        this.main.Score();
        if(!Global.instance.CollisionFlag){
            // console.log(other);
            // console.log("6检测到碰撞！！！");
            // console.log(self);
            self.node.isHold = false;
            Global.instance.CollisionFlag = false;
        }
    }
}
