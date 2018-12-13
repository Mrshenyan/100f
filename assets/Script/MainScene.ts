import Global from "./Global"
import Http from "./Http";
const {ccclass, property} = cc._decorator;

@ccclass
export default class MainScene extends cc.Component {

    @property(cc.Prefab)
    boli:cc.Prefab = null;
    @property(cc.Prefab)
    dici:cc.Prefab = null;
    @property(cc.Prefab)
    lvdai:cc.Prefab = null;
    @property(cc.Prefab)
    shandian:cc.Prefab = null;
    @property(cc.Prefab)
    tanhuang:cc.Prefab = null;
    @property(cc.Prefab)
    Opplvdai:cc.Prefab = null;
    @property(cc.Prefab)
    GD:cc.Prefab = null;
    @property(cc.Prefab)
    failure:cc.Prefab = null;
    @property(cc.Prefab)
    fuhuo:cc.Prefab = null;

    @property(cc.Node)
    Player:cc.Node = null;
    @property(cc.Node)
    FHolderNode:cc.Node = null;
    @property(cc.Node)
    Bg:cc.Node = null;
    @property(cc.Node)
    LifeDing:cc.Node = null;

    @property(cc.Button)
    LEFT:cc.Button = null;
    @property(cc.Button)
    RIGHT:cc.Button = null;

    // LIFE-CYCLE CALLBACKS:
    /**
     * 上一个落脚点生成时间
     */
    private STime = 0;
    /**
     * 当前落脚点生成时间
     */
    private ETime = 0;

    /** Left*/
    private LkeyDown = false;
    /** Right*/
    private RkeyDown = false;

    USERINFO = {
        userId:"",
        score:0,
    }

    onLoad () {
        
        this.LifeDing.zIndex = 10;
        this.FHolderNode.zIndex = 9;
        Global.instance.setMN(this.node);
        this.STime = Date.now();
        let FHolder = cc.instantiate(this.GD);
        this.FHolderNode.addChild(FHolder,10,"GD");
        FHolder.getComponent("GD").init(this,1);
        FHolder.y = -150;
        let FHolder2 = cc.instantiate(this.tanhuang);
        this.FHolderNode.addChild(FHolder2,10,"tanhuang");
        FHolder2.getComponent("tanhuang").init(this);
        FHolder2.y = -300;
        let FHolder3 = cc.instantiate(this.GD);
        this.FHolderNode.addChild(FHolder3,10,"GD");
        FHolder3.getComponent("GD").init(this,1);
        FHolder3.y = -450;
        // this.Player.active = false;
        this.Player.x = FHolder.x;
        // this.Player.y = FHolder.y+60;
        this.Player.zIndex = 11;
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
        cc.director.getCollisionManager().enabledDrawBoundingBox = true;
    }

    start () {
    }
    update (dt) {
        // console.log(Global.instance.CollisionFlag);
        this.MoveBg();
        Global.instance.moveSpeed = 1;
        let FHolder;

        if((this.ETime-this.STime)>1200){//控制落脚点之间的间距,间距144px
            this.STime = Date.now();
            if(!Global.instance.OverFlag){
                FHolder = this.FootHoldGenerator();
                // this.Score();
            }
        }
        this.FHolder();
        this.reduceLife();
        if(Global.instance.CollisionFlag){//左右传送带减速
            switch(Global.instance.KIND_FootHold){
                case 3:{
                    this.Player.x += 1;
                    break;
                }
                case 4:{
                    this.Player.x -= 1;
                    break;
                }
                case 7:{
                    if(Global.instance.LorR==1){
                        this.Player.x --;
                    }
                    else{
                        this.Player.x ++;
                    }
                    break;
                }
                default:{
                    break;
                }
            }
        }
        if(this.Player.x<-180){
            this.Player.x = -180;
        }
        if(this.Player.x>180){
            this.Player.x = 180;
        }
        if(this.Player.y<(-510)){
            this.gameOver();
        }
        if(Global.instance.reLife.length==0){
            this.gameOver();
        }
        this.ETime = Date.now();
        let AllChildren = new Array();
        let GDChildren = new Array();
        AllChildren = this.node.getChildByName("BgNode").getChildByName("FHolder").children;
        for(let i=0;i<AllChildren.length;i++){
            if(AllChildren[i].name=="GD"){
                GDChildren.push(AllChildren[i]);
            }
        }
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this);
        this.LEFT.node.on(cc.Node.EventType.TOUCH_START,this.BtnTurnLeft,this);
        this.LEFT.node.on(cc.Node.EventType.TOUCH_END,this.BtnTurnLeft,this);
        this.RIGHT.node.on(cc.Node.EventType.TOUCH_START,this.BtnTurnRight,this);
        this.RIGHT.node.on(cc.Node.EventType.TOUCH_END,this.BtnTurnRight,this);
    }

    StopAni(self){

        if(!Global.instance.AniFalg){
            let FHolder = self.node.getChildByName("BgNode").getChildByName("FHolder").children;
            let Fname;
            for(let i=0;FHolder.length;i++){
                if(i == FHolder.length-1){
                    Global.instance.AniFalg = true;
                    return;
                }
                Fname = FHolder[i].name;
                FHolder[i].getComponent(Fname).enabled = false;
            }
        }
    }
    /**
     * player 移出落脚点
     */
    FHolder(){
        let self = this
        let FHArray = this.FHolderNode.children;
        let Ani;//the Animation of Player when player fall down
        let Anistate;//the state of Ani;
        for(let i=FHArray.length-1;i>=0;i--){
            if(FHArray[i].isHold){
                // let nameNode:string = FHArray[i].name;
                if(self.Player.x>(FHArray[i].x+85)){
                    Global.instance.CollisionFlag = false;
                    FHArray[i].isHold = false;
                    // this.Score();
                }
                else if(self.Player.x<(FHArray[i].x-85)){
                    Global.instance.CollisionFlag = false;
                    FHArray[i].isHold = false;
                    // this.Score();
                }
            }
        }
    }

    /**
     * 移动背景,初始移动速度200px/s
     */
    MoveBg(){
        let Bg0 = this.Bg.getChildByName("Bg_0");
        let Bg1 = this.Bg.getChildByName("Bg_1");
        if(Global.instance.OverFlag){
        }
        else{
            Bg0.y+=(200/60);
            Bg1.y+=(200/60);
            if(Bg0.y>957){
                Bg0.y = -957;
            }
            if(Bg1.y>957){
                Bg1.y = -957;
            }
        }
        
    }
    /**
     * 移动落脚点,暂空
     */
    MoveFHold(){
    }
    /**
     * 生成落脚点
     */
    FootHoldGenerator(){
        let self = this;
        let Magnification = 0;
        let f = parseInt(self.LifeDing.getChildByName("Floor").getComponent(cc.Label).string);
        if(f<20){
            Magnification = 2
        }
        else if(f<40){
            Magnification = 4;
        }
        else if(f<60){
            Magnification = 6;
        }
        else if(f<80){
            Magnification = 8;
        }
        else{
            Magnification = 8;
        }
        let KindHolder = Math.ceil(Math.random()*Magnification);
        // KindHolder = 1;
        let FHolder;
        // KindHolder = Math.ceil(Math.random()*7);
        this.ETime = Date.now();
        switch(KindHolder){
            case 1:{
                FHolder = cc.instantiate(self.GD);
                self.FHolderNode.addChild(FHolder,5,"GD");
                FHolder.getComponent("GD").init(self,1);
                FHolder.isHold = false;
                // console.log("产生第一种落脚点");
                break;
            }
            case 2:{
                FHolder = cc.instantiate(self.tanhuang);
                self.FHolderNode.addChild(FHolder,5,"tanhuang");
                FHolder.getComponent("tanhuang").init(self);
                FHolder.isHold = false;
                // console.log("产生第五种落脚点");
                break;
            }
            case 3:{
                FHolder = cc.instantiate(self.lvdai);
                self.FHolderNode.addChild(FHolder,5,"lvdai");
                FHolder.getComponent("lvdai").init(self);
                FHolder.isHold = false;
                // console.log("产生第二种落脚点");
                break;
            }
            case 4:{
                FHolder = cc.instantiate(self.lvdai);
                self.FHolderNode.addChild(FHolder,5,"lvdai");
                FHolder.getComponent("lvdai").init(self);
                FHolder.isHold = false;
                // console.log("产生第五种落脚点");
                break;
            }
            case 5:{
                FHolder = cc.instantiate(self.boli);
                self.FHolderNode.addChild(FHolder,5,"boli");
                FHolder.getComponent("boli").init(self);
                FHolder.isHold = false;
                // console.log("产生第三种落脚点");
                break;
            }
            case 6:{
                FHolder = cc.instantiate(self.dici);
                self.FHolderNode.addChild(FHolder,5,"dici");
                FHolder.getComponent("dici").init(self);
                FHolder.isHold = false;
                // console.log("产生第四种落脚点");
                break;
            }
            case 7:{
                FHolder = cc.instantiate(self.GD);
                self.FHolderNode.addChild(FHolder,5,"GD");
                FHolder.getComponent("GD").init(self,7);
                FHolder.isHold = false;
                break;
            }
            case 8:{
                FHolder = cc.instantiate(self.shandian);
                self.FHolderNode.addChild(FHolder,5,"shandian");
                FHolder.getComponent("shandian").init(self);
                FHolder.isHold = false;
                break;
            }
            // default:{
            //     FHolder = cc.instantiate(self.GD);
            //     self.FHolderNode.addChild(FHolder,5,"GD");
            //     FHolder.getComponent("GD").init(self);
            //     FHolder.getComponent("GD").enabled = true;
            //     FHolder.getComponent("MoveGD").init(self);
            //     FHolder.getComponent("MoveGD").enabled = false;
            //     FHolder.isHold = false;
            //     // console.log("默认产生第一种落脚点");
            // }
                // break;
        }
        return FHolder;
    }
    /**
     * 按钮触发，向左，长按事件
     */
    BtnTurnLeft(event){
        let self = this;
        self.LkeyDown = true;
        this.BtnLorR(event);
    }

    /**
     * 按钮触发，向右,长按事件,长按响应未解决
     */
    BtnTurnRight(event){
        let self = this;
        self.RkeyDown = true;
        console.log("点击了右按钮");
        this.BtnLorR(event);
    }

    /**
     * btn触发事件
     * @param event 按钮触发事件
     */
    BtnLorR(event){
        let self = this;
        Global.instance.moveSpeed = 1;
        let schedule = cc.director.getScheduler();
        let stand = self.Player.getChildByName("stand");
        let runRight = self.Player.getChildByName("runRight");
        let run = self.Player.getChildByName("run");
        let Ani;//the animation of player
        let Anistate;//the Ani's state
        let Anistring;//the name of Ani
        let moveByTime = 1;
        let scheduleState:boolean = false;//the schedule's state
        let schedulePause:boolean = true;
        let target:cc.Button = null;//the target which is binged to schedule
        let moveByDes = Global.instance.moveSpeed*60+40;
        if(self.LkeyDown){
            target = self.LEFT;
            moveByTime = 1;
            moveByDes = -moveByDes;
            scheduleState = schedule.isScheduled(func,target);
            schedulePause = schedule.isTargetPaused(target);
            Ani = run.getComponent(cc.Animation);
            Anistring = "run";
            stand.active = false;
            runRight.active = false;
            run.active = true;
            if(!Global.instance.CollisionFlag){
                moveByTime = 1;
            }
            else{
                switch(Global.instance.KIND_FootHold){
                    case 2:{
                        moveByTime = 4.1;
                        break;
                    }
                    case 5:{
                        moveByTime = 3.9;
                        break;
                    }
                };
            }
        }
        if(self.RkeyDown){
            target = self.RIGHT;
            moveByTime = 1;
            moveByDes = moveByDes;
            scheduleState = schedule.isScheduled(func,target);
            schedulePause = schedule.isTargetPaused(target);
            Ani = runRight.getComponent(cc.Animation);
            Anistring = "runR";
            stand.active = false;
            runRight.active = true;
            run.active = false;
            if(!Global.instance.CollisionFlag){
                moveByTime = 1;
            }
            else{
                switch(Global.instance.KIND_FootHold){
                    case 2:{
                        moveByTime = 4.1;
                        break;
                    }
                    case 5:{
                        moveByTime = 3.9;
                        break;
                    }
                };
            }
        }
        
        let funcFlag = false;
        switch(event.type){
            case "touchstart":{
                if(!scheduleState){
                    
                    schedule.schedule(func,target,0);
                };
                if(schedulePause){
                    schedule.resumeTarget(target);
                };
                break;
            }
            case "touchend":{
                schedule.pauseTarget(target);
                self.Player.stopAllActions();
                Ani.stop(Anistring);
                moveByTime = 1;
                moveByDes = Global.instance.moveSpeed*160+40;
                switch(Anistring){
                    case "run":{
                        run.active = false;
                        runRight.active = false;
                        stand.active = true;
                        self.LkeyDown = false;
                        self.RkeyDown = false;
                        moveByDes = Global.instance.moveSpeed/2;
                        break;
                    }
                    case "runR":{
                        run.active = false;
                        runRight.active = false;
                        stand.active = true;
                        self.LkeyDown = false;
                        self.RkeyDown = false;
                        moveByDes = Global.instance.moveSpeed/2;
                        break;
                    }
                }
                funcFlag = false;
                break;
            }
        }
        function func(){
            if(funcFlag){
                return;
            }
            if(Global.instance.CollisionFlag){
                moveByTime = 1;
                // moveByTime = 10;
            }
            let spawn = cc.spawn(cc.callFunc(function(){
                self.Player.runAction(cc.moveBy(moveByTime,moveByDes,0)); 
                // console.log(self.Player.y);
            }),cc.callFunc(function(){
                Anistate = Ani.play(Anistring);
                Anistate.speed = 2;
                Anistate.repeatCount = 100;
                Anistate = Ani.playAdditive(Anistring);
            }))
            self.Player.runAction(spawn);
            funcFlag = true;
        }
    }


    /**
     * 向左，向右
     * @param event 按下左右键触发
     */
    onKeyDown(event){
        let self = this;
        let stand = this.Player.getChildByName("stand");
        let runRight = this.Player.getChildByName("runRight");
        let run = this.Player.getChildByName("run");
        let moveByTime = 1;
        let moveByDes = 200;// Global.instance.moveSpeed*120;
        let Ani;
        let Anistate;
        let AniName;
        switch(event.keyCode){
            case cc.KEY.left:{
                self.LkeyDown = true;
                stand.active = false;
                runRight.active = false;
                run.active = true;
                AniName = "run";
                moveByDes = -(moveByDes+100);
                switch(Global.instance.KIND_FootHold){
                    case 2:{
                        moveByTime = 0.9;
                        break;
                    }
                    case 5:{
                        moveByTime = 1.1;
                        break;
                    }
                };
                if(Global.instance.CollisionFlag){
                    moveByTime = 1;
                }
                else{
                    moveByTime = 1;
                }
                self.AniPlayer(Ani,Anistate,moveByTime,moveByDes,run,AniName,self);
                break;
            }
            case cc.KEY.right:{
                self.RkeyDown = true;
                stand.active = false;
                runRight.active = true;
                run.active = false;
                let moveByTime = 1;
                AniName = "runR";
                moveByDes = moveByDes+100;
                switch(Global.instance.KIND_FootHold){
                    case 2:{
                        moveByTime = 1.1;
                        break;
                    }
                    case 5:{
                        moveByTime = 0.9;
                        break;
                    }
                }
                if(Global.instance.CollisionFlag){
                    moveByTime = 1;
                }
                else{
                    moveByTime = 1;
                }
                self.AniPlayer(Ani,Anistate,moveByTime,moveByDes,runRight,AniName,self);
                break;
            }
            default:{
                return;
            }
        }
    }
    AniPlayer(Ani,Anistate,moveByTime,moveByDes,Key,AniName,self?){
        Ani = Key.getComponent(cc.Animation);
        let spawn = cc.spawn(cc.callFunc(function(){
            self.Player.runAction(cc.moveBy(moveByTime,moveByDes,0));
        }),cc.callFunc(function(){
            Anistate = Ani.play(AniName);
            Anistate.speed = 2;
            Anistate.repeatCount = 100;
        }))
        self.Player.runAction(spawn);
    }
    /**
     * 抬起动画停止
     * @param event 抬起左右键触发
     */
    onKeyUp(event){
        let self = this;
        self.LkeyDown = false;
        this.RkeyDown = false;
        self.Player.stopAllActions();
        let stand = this.Player.getChildByName("stand");
        let runRight = this.Player.getChildByName("runRight");
        let run = this.Player.getChildByName("run");
        stand.active = true;
        run.active = false;
        runRight.active = false;
    }
    
    /**
     * gameover
     */
    gameOver(){
        let self = this;
        let AllFH = self.node.getChildByName("BgNode").getChildByName("FHolder").children;
        for(let i=0;i<AllFH.length;i++){
            let FHNA = AllFH[i].name;
            AllFH[i].getComponent(FHNA).enabled = false;
            if(FHNA =="GD"){
                AllFH[i].getChildByName("gd").getComponent("CliGD").enabled = false;
            }
        }
        self.StopAni(self);
        let failure;
        let Ani;
        let Anistate;
        let BestScore
        let thisScore;
        let lessScore;
        let Score;
        let fuhuo;
        let FAni;
        let FAnistate;
        self.LEFT.node.active = false;
        self.RIGHT.node.active = false;
        failure = cc.instantiate(self.failure);
        fuhuo = cc.instantiate(self.fuhuo);
        let fhuoBtnRank = fuhuo.getChildByName("cd").getChildByName("RankScene").getComponent(cc.Button);
        let fhuoBtnreGame = fuhuo.getChildByName("zl").getChildByName("rePlay").getComponent(cc.Button);
        let fhuoBtnFhuo = fuhuo.getChildByName("fh").getChildByName("rePlay").getComponent(cc.Button);
        let RankEventHandler = new cc.Component.EventHandler();
        let reGameEventHandler = new cc.Component.EventHandler();
        let FhuoEventHandler = new cc.Component.EventHandler();
        //open the ranking
        RankEventHandler.target = self.node;
        RankEventHandler.component = "MainScene";
        RankEventHandler.handler = "FBtnCB_Rank";
        RankEventHandler.customEventData = null;
        fhuoBtnRank.clickEvents.push(RankEventHandler);
        //replay
        reGameEventHandler.target = self.node;
        reGameEventHandler.component = "MainScene";
        reGameEventHandler.handler = "restart";
        reGameEventHandler.customEventData = null;
        fhuoBtnreGame.clickEvents.push(reGameEventHandler);
        //fh立即复活会有其他功能暂时用重新开始代替
        FhuoEventHandler.target = self.node;
        FhuoEventHandler.component = "MainScene";
        FhuoEventHandler.handler = "restart";
        FhuoEventHandler.customEventData = null;
        fhuoBtnFhuo.clickEvents.push(FhuoEventHandler);
        if(!Global.instance.OverFlag){
            Global.instance.OverFlag = true;
            self.StoregeScore();
            
            // self.UpdateScore();
            failure.y = -20;
            fuhuo.y = 0;
            thisScore = parseInt(self.LifeDing.getChildByName("Floor").getComponent(cc.Label).string);
            lessScore = failure.getChildByName("jl").getChildByName("LessScore");
            BestScore = Global.instance.getLocalScore().BestScore;
            
            Global.instance.GetUSer().score = BestScore;
            self.UpLoadScore();
            if(BestScore - thisScore<=0){
                failure.getChildByName("jl").active = false;
            }
            else{
                lessScore.getComponent(cc.Label).string = (BestScore - thisScore).toString();
            }
            Score = failure.getChildByName("cj").getChildByName("Score");
            self.node.addChild(failure);
            self.node.addChild(fuhuo);
            Score.getComponent(cc.Label).string = self.LifeDing.getChildByName("Floor").getComponent(cc.Label).string;
            Ani = failure.getComponent(cc.Animation);//the animation of failure;
            FAni = fuhuo.getComponent(cc.Animation);
            Anistate = Ani.play("shibai");//the state of Ani;
            Anistate.speed = 1;
            Anistate.repeatCount = 1;
        }
        else{
            return;
        }
        console.log("游戏结束！！！");
        // cc.director.pause();
        // self.UpdateScore();
    }


    /**
     * 复活按钮的回调函数：打开排行榜
     */
    FBtnCB_Rank(self){
        this.destroy();
        cc.director.loadScene("EndScene");
    }
    /**
     * restart
     */
    restart(){
        cc.director.loadScene("MainScene");
        cc.director.resume();
        Global.instance.OverFlag = false;
        Global.instance.AniFalg = false;
        Global.instance.LorR = 0;
        this.LEFT.node.active = true;
        this.RIGHT.node.active = true;
        this.destroy();
        // this.Score();
    }

    /** 
     * 受到伤害，命数减一
    */
    reduceLife(){
        let self = this;
        let Ls = new Array();
        let reLCount=0;
        let FHolder = self.node.getChildByName("BgNode").getChildByName("FHolder").children;
        for(let i=self.LifeDing.children.length-1;i>=0;i--){
            if(self.LifeDing.children[i].name=="lifeBG"){
                if(Global.instance.Injured){
                    self.LifeDing.children[i].destroy();
                    Global.instance.Injured = false;
                }
                Ls.push(self.LifeDing.children[i]);
            }
        }
        for(let i=self.LifeDing.children.length-1;i>=0;i--){
            if(self.LifeDing.children[i].name=="lifeBG"){
                if(Global.instance.CollisionWithDing){
                    self.LifeDing.children[i].destroy();
                    Global.instance.CollisionFlag = false;
                    Global.instance.CollisionWithDing = false;
                }
                Ls.push(self.LifeDing.children[i]);
            }
        }
        for(let i=0;i<FHolder.length;i++){
            if(FHolder[i].isHold){
                if(!Global.instance.CollisionFlag){
                    FHolder[i].isHold = false;
                    let box = FHolder[i].getComponent(cc.BoxCollider);
                    box.enabled = false;
                }
            }
        }
        Global.instance.reLife = [];
        for(let i=0;i<Ls.length;i++){
            if(Ls[i].active){
                Global.instance.reLife.push(Ls[i]);//player剩余的命数
            }
        }
    }

    /**
     * 每下落一层，分数加一。
     */
    Score(){
        let self = this.node;
        let scLabel = this.LifeDing.getChildByName("Floor").getComponent(cc.Label);
        let sc = parseInt(scLabel.string);
        sc = sc+1;
        console.log("打印一下");
        scLabel.string = sc.toString();
        let lv = sc%50;
        if(lv>Global.instance.LevelAddFlag){
            Global.instance.LevelAddFlag = lv;
            Global.instance.InitSpeed+=0.25;//每下落50层，player下落速度加0.25
            Global.instance.FHFallSpeed+=0.5;//没下落50层，落脚点下落速度加快0.5.
        }
    }

    /**
     * 本地分数存储
     */
    StoregeScore(){
        let self = this;
        let localS = Global.instance.getLocalScore();//the temp of local score;
        let CurrentScore = parseInt(
                this.LifeDing.getChildByName("Floor").getComponent(cc.Label).string);
        if(CurrentScore>localS.ThirdScore){
            if(CurrentScore>localS.SecondScore){
                if(CurrentScore>localS.BestScore){
                    localS.BestScore = CurrentScore;
                    return;
                }
                localS.SecondScore = CurrentScore;
                
            }
            localS.ThirdScore = CurrentScore;
        }
    }

    /**
     * upload the best score
     */
    UpLoadScore(){
        let self = this;
        let tmp = Global.instance.GetUSer();
        Http.sendRequest("/updateScore",tmp,function(msg){
            let x = msg;
            if(msg.code!=0){
                Global.instance.NetStatus = false;
            }
            let ux = {
                userId:'',
            }
            console.log(x);
            ux.userId = Global.instance.GetUSer().userId;
            Http.sendRequest("/rank",ux,function(mmsg){
                let MM = JSON.parse(mmsg.msg);
                console.log(MM);
                if(Global.instance.GetR()==null||Global.instance.GetR().rank==undefined||Global.instance.GetR().rank<MM.my.rank){
                    Global.instance.SetR(MM.my.rank);
                    Global.instance.setRemoteScore(MM.other);
                }
            });
        });
    }
    
    /**
     * Update the best score rank
     */
    // UpdateScore(){
    //     let self = this;
    // }
}
/**
 * 这边，玩家死亡之后销魂游戏主场景，打开游戏结算场景
 * 进行后续的排行榜绘制。
 * 
 * player速度忽然变快通过打印是因为同一个移动放法调用了两次，效果叠加。
 * 分数上传问题
 */