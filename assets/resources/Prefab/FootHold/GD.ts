import MainScene from "../../../Script/MainScene";
import Global from "../../../Script/Global";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GD extends cc.Component {
    /**
     * 落脚点类型 1：向左传送带
     */
    private KIND_FootHold = 0;
    /**
     * player是否落在落脚点上，默认false，没有
     */
    @property(Boolean)
    public isHold = false;
    @property(Number)
    public NodeH:Number = 70;

    GoUp = false;

    private main:MainScene = null;
    /**
     * 落脚点对应动画
     */
    Ani:cc.Animation = null;
    AniState = null;
    LifeDing = null;
    gainSc = false;
    onLoad () {
        this.node.y = -500;
        // this.KIND_FootHold==7
        
    }

    start () {
        let moveStartT=0;
        let moveEndT = 0;
        
        if(this.KIND_FootHold==1){
            // this.KIND_FootHold = 1;   
            this.node.x = cc.randomMinus1To1()*140;
        }
        if(this.KIND_FootHold==7){
            // this.KIND_FootHold = 7;
            this.node.x = cc.randomMinus1To1()*140;

        }
        if(this.KIND_FootHold==1){
            this.node.getChildByName("gd").getComponent("CliGD").enabled = false;
        }
        else{
            this.node.getChildByName("gd").getComponent("CliGD").enabled = true;
        }
        
        this.LifeDing = this.main.LifeDing.children;
    }

    update (dt) {
        // console.log(Global.instance.CollisionFlag);
        let self = this;
        // console.log("状态："+ self.node.active+"，位置："+self.node.x);
        if(Global.instance.OverFlag){
            self.enabled = false;
        }
        else{
            this.node.active = true;
            if(this.node.isHold){
                Global.instance.CollisionFlag = true;
                Global.instance.TheHolder = this.node;
                this.node.y += Global.instance.FHFallSpeed;
            }
            else{
                this.node.y += Global.instance.FHFallSpeed;
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

    public MoveThis(){

    }
    /**
     * 初始化函数
     * @param main 主场景
     */
    public init(main:MainScene,kind?){
        this.main = main;
        this.KIND_FootHold = kind;
    }
    /**
     * 获取落脚点类型
     */
    public getKind(){
        return this.KIND_FootHold;
    }
    onCollisionEnter(other,self){
        let rootself = this;
        if(rootself.GoUp){
            return;
        }
        if(other.tag == 111){
            // console.log("我被撞到了");
            rootself.main.Score();
            rootself.gainSc = true;
            rootself.GoUp = true;
            return;
        }
        Global.instance.TheHolder = this.node;
        Global.instance.KIND_FootHold = this.KIND_FootHold;
        Global.instance.CollisionFlag = true;
        this.node.isHold = true;
        // this.main.Score();
    }
}