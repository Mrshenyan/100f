import MainScene from "../../../Script/MainScene";
import Global from "../../../Script/Global";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    /**
     * 落脚点类型 6：地刺
     */
    private KIND_FootHold = 6;
    /**
     * player是否落在落脚点上，默认false，没有
     */
    @property(Boolean)
    public isHold = false;

    @property(Number)
    public NodeH:number = 80;

    GoUp = false;

    private main:MainScene = null;
    /**
     * 落脚点对应动画
     */
    Ani:cc.Animation = null;
    AniState = null;
    gainSc = false;
    
    InjuredF = false;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.y = -500;
        this.node.x = cc.randomMinus1To1()*140;
        this.Ani = this.node.getComponent(cc.Animation);
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
                    Global.instance.CollisionFlag = false;
                    this.node.isHold = false;
                }
                this.node.destroy();
            }
        }
    }
    /**
     * 初始化函数
     * @param main 主场景
     */
    init(main:MainScene){
        this.main = main;
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
            console.log("我被撞到了");
            rootself.main.Score();
            rootself.gainSc = true;
            return;
        }
        else{
            Global.instance.TheHolder = this.node;
            Global.instance.KIND_FootHold = this.KIND_FootHold;
            this.node.isHold = true;
            if(!rootself.InjuredF){
                Global.instance.Injured = true;
                rootself.InjuredF = true;
            }
            // this.main.Score();
            if(!Global.instance.CollisionFlag){
                Global.instance.CollisionFlag = true;
                rootself.AniState = rootself.Ani.play("dici");
                rootself.AniState.repeatCount = 100;
            }
        }
    }
}
/**
 * 地刺的问题貌似还没有解决
 * 不知道哪里有问题
 * 地刺的问题到底是碰撞标志位被修改了。
 * 
 */
