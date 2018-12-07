import MainScene from "../../../Script/MainScene";
import Global from "../../../Script/Global";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MoveGD extends cc.Component {
    /**
     * 落脚点类型 7：移动
     */
    private KIND_FootHold = 7;
    /**
     * player是否落在落脚点上，默认false，没有
     */
    @property(Boolean)
    public isHold = false;
    @property(Number)
    public NodeH:Number = 70;

    private main:MainScene = null;
    /**
     * 落脚点对应动画
     */
    Ani:cc.Animation = null;
    AniState = null;
    LifeDing = null;

    onLoad () {
        this.node.y = -500;
        this.node.x = cc.randomMinus1To1()*60;
    }

    start () {
        this.LifeDing = this.main.LifeDing.children;
    }

    update (dt) {
        // console.log(Global.instance.CollisionFlag);
        let self = this;
        let moveBDes = cc.moveBy(0.5,5,0);
        let munisDes = cc.moveBy(0.5,-5,0);
        self.scheduleOnce(()=>{
            self.node.runAction(moveBDes);
        },0);
        self.scheduleOnce(()=>{
            self.node.runAction(munisDes);
        },0.5);
        if(Global.instance.OverFlag){
            self.enabled = false;
        }
        else{
            self.node.active = true;
            self.node.y += Global.instance.FHFallSpeed;
            if(self.node.isHold){
                Global.instance.CollisionFlag = true;
                Global.instance.TheHolder = this.node;
                
            }
            if(self.node.y>360){
                if(self.node.isHold){
                    self.node.isHold = false;
                    Global.instance.CollisionFlag = false;
                }
                self.node.destroy();
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
        Global.instance.KIND_FootHold = this.KIND_FootHold;
        Global.instance.TheHolder = this.node;
        
        if(Global.instance.CollisionFlag){
            return;
        }
        else{
            this.main.Score();
            self.node.isHold = true;
            Global.instance.CollisionFlag = true;
        }
    }
}
