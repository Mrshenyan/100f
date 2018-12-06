import Global from "./Global";

const {ccclass, property} = cc._decorator;

@ccclass
export default class StartScene extends cc.Component {

    @property(cc.Node)
    StartAniNode:cc.Node = null;
    @property(cc.Node)
    LifeDing:cc.Node = null;
    @property(cc.Button)
    testBtn:cc.Button = null;


    // LIFE-CYCLE CALLBACKS:

    mainNode = null;

    UpAni = null;
    DownAni = null;
    UpAnistate;
    DownAnistate;

    onLoad () {
        // this.LifeDing.zIndex = 5;
        Global.instance.setSN(this);
        Global.instance.OverFlag = false;
        let startNode = this.node.getChildByName("BgNode").getChildByName("kaiji");
        let Ani = startNode.getComponent(cc.Animation);
        let Anistate = Ani.play("kaiji");
        Anistate.wrapMode = cc.WrapMode.Loop;
        this.UpAni = startNode.getChildByName("Up").getComponent(cc.Animation);
        this.DownAni = startNode.getChildByName("Down").getComponent(cc.Animation);
    }

    start () {

    }

    update (dt) {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyBackSpace,this);
    }



    /**
     * start game
     */
    StartGame(){
        let self = this;
        let startTime = Date.now();
        let endTime;
        self.UpAnistate = self.UpAni.play();
        self.DownAnistate = self.DownAni.play();
        self.scheduleOnce(function(){
            self.node.runAction(cc.sequence(cc.fadeOut(0.5),cc.callFunc(function(){
                cc.director.loadScene("MainScene");
                endTime = Date.now();
                if(endTime-startTime>330){
                    self.destroy();
                }
                console.log("场景跳转成功");
            })));
        },0.33);
        
    }

    /**
     * use the backSpace start game
     * @param event 
     */
    onKeyBackSpace(event){
        if(event.keyCode == cc.KEY.space){
            this.StartGame();
        }
    }

    
}
