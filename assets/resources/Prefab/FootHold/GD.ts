import MainScene from "../../../Script/MainScene";
import Global from "../../../Script/Global";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GD extends cc.Component {
    /**
     * 落脚点类型 1：向左传送带
     */
    private KIND_FootHold = 1;
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
        this.node.y = -512;
        this.node.x = cc.randomMinus1To1()*140;
        
    }

    start () {
        this.LifeDing = this.main.LifeDing.children;
    }

    update (dt) {
        this.node.active = true;
        this.node.y += 2;
        if(this.node.isHold){
            Global.instance.TheHolder = this.node;
        }
        if(this.node.y>360){
            this.node.isHold = false;
            this.node.destroy();
            Global.instance.CollisionFlag = false;
        }
        this.CheckLife();
    }

    /**
     * 剩余命数检查
     * @param  
     */
    CheckLife(){
        let self = this;
        let Ls = new Array();
        for(let i=0;i<self.LifeDing.length;i++){
            if(self.LifeDing[i].name=="lifeBG"){
                Ls.push(self.LifeDing[i]);
            }
        }
        for(let i=0;i<Ls.length;i++){
            if(Ls[i].active){
                Global.instance.reLife.push(Ls[i]);//player剩余的命数
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
        if(other.node.x<(-165)){
            other.node.x = -165;
        }
        if(other.node.x>165){
            other.node.x = 165;
        }
        if(!Global.instance.CollisionFlag){
            console.log(other);
            console.log("1检测到碰撞！！！");
            console.log(self);
            self.node.isHold = true;
            Global.instance.CollisionFlag = true;
            // other.node.position = self.node.position;
        }
    }
}
