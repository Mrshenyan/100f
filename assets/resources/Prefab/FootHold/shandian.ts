import MainScene from "../../../Script/MainScene";
import Global from "../../../Script/Global";

const {ccclass, property} = cc._decorator;

@ccclass
export default class shandian extends cc.Component {
    /**
     * 落脚点类型 8：闪电
     */
    private KIND_FootHold = 8;
    /**
     * player是否落在落脚点上，默认false，没有
     */
    @property(Boolean)
    public isHold = false;

    @property(Number)
    public NodeH:number = 50;

    private 

    private main:MainScene = null;
    /**
     * 落脚点对应动画
     */
    Ani:cc.Animation = null;
    AniState = null;
    gainSc = false;
    onLoad () {
        this.node.y = -500;
        this.node.x = cc.randomMinus1To1()*140;
        this.Ani = this.node.getComponent(cc.Animation);
        this.AniState = this.Ani.play("shandian");
        this.AniState.repeatCount = 100;
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
        let rootself = this;
        
        switch(other.tag){
            case 0:{
                Global.instance.KIND_FootHold = this.KIND_FootHold;
                Global.instance.TheHolder = this.node;
                Global.instance.Injured = true;
                break;
            }
            case 111:{
                console.log("我被撞到了");
                rootself.main.Score();
                rootself.gainSc = true;
                return;
            }
        }
        // this.main.Score();
        if(!Global.instance.CollisionFlag){
            self.node.isHold = false;
            Global.instance.CollisionFlag = false;
        }
    }
}
