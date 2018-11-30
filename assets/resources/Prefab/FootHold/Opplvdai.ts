import MainScene from "../../../Script/MainScene";
import Global from "../../../Script/Global";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Opplvdai extends cc.Component {

    /**
     * 落脚点类型 1：向左传送带
     */
    private KIND_FootHold = 2;
    /**
     * player是否落在落脚点上，默认false，没有
     */
    @property(Boolean)
    public isHold = false;

    @property(Number)
    public NodeH:number = 69;

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
        this.AniState = this.Ani.play("Opplvdai");
        this.AniState.repeatCount = 100;
        this.AniState.speed = 2;
    }

    start () {

    }

    update (dt) {
        console.log(Global.instance.CollisionFlag);
        this.node.active = true;
        this.node.y += Global.instance.FHFallSpeed;
        if(this.node.isHold){
            Global.instance.TheHolder = this.node;
        }
        if(this.node.y>360){
            this.node.isHold = false;
            this.node.destroy();
            Global.instance.CollisionFlag = false;
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
        this.main.Score();
        if(!Global.instance.CollisionFlag){
            console.log(other);
            console.log("2检测到碰撞！！！");
            console.log(self);
            // other.node.y = this.node.y+50;
            self.node.isHold = true;
            Global.instance.CollisionFlag = true;
        }
    }
}
