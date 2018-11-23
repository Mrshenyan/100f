import Global from "./Global";

const {ccclass, property} = cc._decorator;

@ccclass
export default class StartScene extends cc.Component {

    @property(cc.Node)
    StartAniNode:cc.Node = null;
    @property(cc.Node)
    LifeDing:cc.Node = null;


    // LIFE-CYCLE CALLBACKS:

    mainNode = null;

    
    Anis=null;
    AniFootHoldState = null;
    run = null;
    runAni = null;
    runState = null
    lvdai = null;
    lvdaiAni = null;
    lvdaiState = null;

    onLoad () {
        this.LifeDing.zIndex = 5;
        Global.instance.setSN(this);
        this.lvdai = this.StartAniNode.getChildByName("lvdai");
        this.run = this.StartAniNode.getChildByName("run");
        this.runAni = this.run.getComponent(cc.Animation);
        this.lvdaiAni = this.lvdai.getComponent(cc.Animation);
        this.playAni();
    }

    start () {

    }

    update (dt) {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyBackSpace,this);
    }

    /**
     * play a start animation 
     */
    playAni(){
       // if(this.Anis!=undefined||this.Anis!=null){
            this.lvdaiState = this.lvdaiAni.play("lvdai");
            this.lvdaiState.wrapMode = cc.WrapMode.Loop;
            this.lvdaiState.speed = 1;
            this.lvdaiState.repeatCount = 1000;
            this.lvdaiState.duration = 1.33;
            this.runState = this.runAni.play("run");
            this.runState.wrapMode = cc.WrapMode.Loop;
            this.runState.speed = 1;
            this.runState.repeatCount = 1000;
            this.runState.duration = 0.62;
       // }
            
    }

    /**
     * start game
     */
    StartGame(){
        let self = this;
        self.node.runAction(cc.sequence(cc.fadeOut(0.5),cc.callFunc(function(){
            cc.director.loadScene("MainScene");
            console.log("场景跳转成功");
        })));
        self.destroy();
    }

    onKeyBackSpace(event){
        if(event.keyCode == cc.KEY.space){
            this.StartGame();
        }
    }
}
