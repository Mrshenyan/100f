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
        this.testBtnEvent();
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

    /**
     * use the backSpace start game
     * @param event 
     */
    onKeyBackSpace(event){
        if(event.keyCode == cc.KEY.space){
            this.StartGame();
        }
    }

    /**
     * testBtn event
     */
    testBtnEvent(){
        let self = this;
        let btnClicked = false;
        let target;
        
        // let BtnEventType = cc.Node.EventType;
        self.testBtn.node.on(cc.Node.EventType.TOUCH_START,onTouchBegan,self.testBtn);
        self.testBtn.node.on(cc.Node.EventType.TOUCH_MOVE,onTouchBegan,self.testBtn);
        self.testBtn.node.on(cc.Node.EventType.TOUCH_CANCEL,onTouchBegan,self.testBtn);
        self.testBtn.node.on(cc.Node.EventType.TOUCH_END,onTouchBegan,self.testBtn);
        
        function onTouchBegan(event){
            let func = function(){
                console.log("按下按钮，事件开始")
            };
            let sch =  cc.director.getScheduler()
            let schAlive = sch.isScheduled(func,self.testBtn);
            let schPause = sch.isTargetPaused(self.testBtn)
            switch(event.type){
                case "touchstart":{
                    console.log("schAlive: "+schAlive+" schPause :"+schPause);
                    if(!schAlive){
                        sch.schedule(func,self.testBtn,0);
                    };
                    if(schPause){
                       sch.resumeTarget(self.testBtn);
                    }
                    btnClicked = true;
                    break;
                }
                case "touchend":{
                    sch.pauseTarget(self.testBtn);
                    btnClicked = false;
                    break;
                }
            }
        }
    }
    
}
