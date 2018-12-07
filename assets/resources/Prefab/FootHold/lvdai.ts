import MainScene from "../../../Script/MainScene";
import Global from "../../../Script/Global";

const {ccclass, property} = cc._decorator;

@ccclass
export default class lvdai extends cc.Component {
    /**
     * 落脚点类型 3/4：传送带
     */
    private KIND_FootHold = 0;
    /**
     * player是否落在落脚点上，默认false，没有
     */
    @property(Boolean)
    public isHold = false;

    @property(Number)
    public NodeH:number = 60;

    private main:MainScene = null;
    /**
     * 落脚点对应动画
     */
    Ani:cc.Animation = null;
    AniState = null;

    onLoad () {
        let kind = Math.random();
        this.node.y = -500;
        this.node.x = cc.randomMinus1To1()*140;
        this.Ani = this.node.getComponent(cc.Animation);
        this.AniState = this.Ani.play("lvdai");
        if(kind<=0.5){
            this.KIND_FootHold = 3;   
        }
        else{
            this.KIND_FootHold = 4;
            this.AniState.wrapMode = cc.WrapMode.Reverse;//设置动画的播放方式为倒放
        }
        this.AniState.repeatCount = 100;
        this.AniState.speed = 2;
        /**
         * 这里有点问题，设置模式貌似不奏效。一旦成功可以减小包体
         */
    }

    start () {

    }

    update (dt) {
        // console.log(Global.instance.CollisionFlag);
        let self = this;
        if(Global.instance.OverFlag){
            self.enabled = false;
        }
        else{
            this.node.active = true;
            this.node.y += Global.instance.FHFallSpeed;
            if(this.node.isHold){
                Global.instance.CollisionFlag = true;
                Global.instance.TheHolder = this.node;
            }
            if(this.node.y>360){
                if(this.node.isHold){
                    this.node.isHold = false;
                    Global.instance.CollisionFlag = false;
                }
                this.node.destroy();
            }
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
        let rootself = this;//当前根节点
        Global.instance.KIND_FootHold = this.KIND_FootHold;
        Global.instance.TheHolder = this.node;
        this.main.Score();
        if(!Global.instance.CollisionFlag){
            // console.log(other);
            // console.log("5检测到碰撞！！！");
            // console.log(self);
            self.node.isHold = true;
            Global.instance.CollisionFlag = true;
        }
    }
}
