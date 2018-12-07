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

    private main:MainScene = null;
    /**
     * 落脚点对应动画
     */
    Ani:cc.Animation = null;
    AniState = null;
    LifeDing = null;
    LorR;

    onLoad () {
        this.node.y = -500;
        this.LorR = Math.random();
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
            this.node.x = cc.randomMinus1To1()*50;
            console.log("我是移动的");
        }
        let self = this;
        
        
        this.LifeDing = this.main.LifeDing.children;
    }

    update (dt) {
        // console.log(Global.instance.CollisionFlag);
        let self = this;
        if(Global.instance.OverFlag){
            self.enabled = false;
        }
        else{
            this.node.active = true;
            if(this.LorR<0.5){
                this.node.x += Global.instance.FHFallSpeed;
                Global.instance.LorR = 1;
            }
            else{
                this.node.x -= Global.instance.FHFallSpeed;
                Global.instance.LorR = 0;
            }
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
        let rootSelf = this;
        Global.instance.KIND_FootHold = this.KIND_FootHold;
        Global.instance.TheHolder = this.node;
        let des;
        let tag = self.tag;
        let scheduler = cc.director.getScheduler();
        
        function Lmove(){
            des = Math.abs(self.node.y) + self.node.parent.parent.width/2;
            rootSelf.node.runAction(cc.moveBy(2,-des,0));
        }
        function Rmove(){
            des = Math.abs(self.node.y) + self.node.parent.parent.width/2;
            rootSelf.node.runAction(cc.moveBy(2,des,0));
        }
        switch(tag){
            case 12:{
                Global.instance.FHFallSpeed = des/2
                if(tag==12){
                    rootSelf.scheduleOnce(Lmove,0);
                    Global.instance.LorR = 0;
                    console.log("向左");
                }
                break;
            }
            case 11:{
                Global.instance.FHFallSpeed = des/2
                if(tag==11){
                    rootSelf.scheduleOnce(Rmove,0);
                    Global.instance.LorR = 1;
                    console.log("向右");
                }
                break;
            }
        }
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
/**
 * 移动落脚点的处理。。。
 */