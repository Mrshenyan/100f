import MainScene from "../../../Script/MainScene";
import Global from "../../../Script/Global";

const {ccclass, property} = cc._decorator;

@ccclass
export default class tanhuang extends cc.Component {
    /**
     * 落脚点类型 2：tanhuang
     */
    private KIND_FootHold = 2;
    /**
     * player是否落在落脚点上，默认false，没有
     */
    @property(Boolean)
    public isHold = false;
    @property(Number)
    public NodeH:number = 60;


    private gainSc = false;//弹簧加分标志
    private main:MainScene = null;
    /**
     * 落脚点对应动画
     */
    Ani:cc.Animation = null;
    AniState = null;
    Ding;

    onLoad () {
        this.node.y = -500;
        this.node.x = cc.randomMinus1To1()*140;
        this.Ani = this.node.getComponent(cc.Animation);
    }

    start () {
        this.Ding = this.main.node.getChildByName("BgNode").getChildByName("LifeDing").getChildByName("ding");
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
    public init(main:MainScene){
        this.main = main;
    }
    /**
     * 获取落脚点类型
     */
    public getKind(){
        return this.KIND_FootHold;
    }

    /**
     * 碰撞
     * @param other 碰撞主体player
     * @param self 碰撞主体落脚点tanhuang
     */
    onCollisionEnter(other,self){
        let rootself = this;//当前根节点
        if(other.tag == 111){
            console.log("我被撞到了");
            rootself.main.Score();
            rootself.gainSc = true;
            rootself.main.output.getComponent(cc.Label).string = Global.instance.CollisionFlag.toString()+"1";
            if(other.node.parent.x>self.node.x-75&&other.node.parent.x<self.node.x+75){
                if(Global.instance.CollisionWithDing){
                    return;
                }
                rootself.isHold = true;
                Global.instance.CollisionFlag = true;
            }
            return;
        }
        Global.instance.KIND_FootHold = rootself.KIND_FootHold;
    
        if(rootself.main ==null){
            rootself.main = Global.instance.getMN();
        }
        if(!rootself.gainSc){
            // rootself.main.Score();
            rootself.gainSc = true;
        }
        if(!Global.instance.CollisionFlag){
            Global.instance.TheHolder = rootself.node;
            Global.instance.CollisionFlag = true;
            rootself.main.output.getComponent(cc.Label).string = Global.instance.CollisionFlag.toString()+"2";
            rootself.isHold = true;
            other.y = self.y+60;
            let spawn
            spawn = cc.spawn(cc.callFunc(function(){
                if(rootself.Ani==null){
                    return;
                }
                rootself.AniState = rootself.Ani.play("tanhuang");
                rootself.AniState.speed = 0.8;
            }),cc.callFunc(function(){
                other.node.runAction(cc.moveBy(0.15,0,50));
                Global.instance.CollisionFlag = false;
                rootself.isHold = false;
                other.node.getComponent("Playcontroler").enabled = false;
            }));
            rootself.scheduleOnce(()=>{
                other.node.getComponent("Playcontroler").enabled = true;
            },0.3);
            rootself.scheduleOnce(function(){
                Global.instance.CollisionFlag = false;
                rootself.isHold = false;
                rootself.Ani.stop();
                
            },0.41);
            other.node.runAction(spawn);

        }
    }
}
