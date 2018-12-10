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
    @property(Boolean)
    public RClis = false;
    @property(Boolean)
    public LClis = false;

    private main:MainScene = null;
    /**
     * 落脚点对应动画
     */
    Ani:cc.Animation = null;
    AniState = null;
    LifeDing = null;

    onLoad () {
        this.node.y = -500;
        this.RClis = false;
        this.LClis = false;
        if(Math.random()<0.5){
            this.RClis = false;
            this.LClis = true;
        }
        else{
            this.RClis = true;
            this.LClis = false;
        }
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
        // console.log("状态："+ self.node.active+"，位置："+self.node.x);
        if(Global.instance.OverFlag){
            self.enabled = false;
        }
        else{
            this.node.active = true;
            if(this.RClis&&this.LClis==false){
                this.node.x -= Global.instance.FHFallSpeed;
                this.node.y += Global.instance.FHFallSpeed;
            }
            else if(this.LClis&&this.RClis==false){
                this.node.x += Global.instance.FHFallSpeed;
                this.node.y += Global.instance.FHFallSpeed;
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
        let LR = other.node.name;
        rootSelf.RClis = false;
        rootSelf.LClis = false;
        function Lmove(){
            self.node.x -=1;
            // rootSelf.Clis = false;
        }
        function Rmove(){
            self.node.x +=1;
            // rootSelf.Clis = false;
        }
        switch(tag){
            case 11:{
                rootSelf.LClis = true;
                Global.instance.LorR = 1;
                break;
            }
            case 12:{
                rootSelf.RClis = true;
                Global.instance.LorR =0;
                break;
            }
        }
        if(Global.instance.CollisionFlag){
            return;
        }
        else if(self.node.isHold){
            this.main.Score();
            Global.instance.CollisionFlag = true;
        }
    }
}