import Global from "./Global"
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

    onLoad () {
        this.LifeDing.zIndex = 10;
        this.FHolderNode.zIndex = 9;
        Global.instance.setMN(this);
        this.STime = Date.now();
        let FHolder = cc.instantiate(this.GD);
        this.FHolderNode.addChild(FHolder,10,"GD");
        FHolder.getComponent("GD").init(this);
        this.Player.x = FHolder.x;
        this.Player.y = 250;
        this.Player.zIndex = 11;
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
        cc.director.getCollisionManager().enabledDrawBoundingBox = true;
    }

    start () {
    }

    update (dt) {
        this.MoveBg();
        let FHolder;
        if((this.ETime-this.STime)>2250){//控制落脚点之间的间距,间距200px
            this.STime = Date.now();
            FHolder = this.FootHoldGenerator();
        }
        this.FHolder();
        this.reduceLife();
        if(Global.instance.CollisionFlag){
            switch(Global.instance.KIND_FootHold){
                case 2:{
                    this.Player.x -=2;
                    break;
                }
                case 5:{
                    this.Player.x +=2;
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
        if(this.Player.y<(-500)){
            this.gameOver();
        }
        if(Global.instance.reLife.length==0){
            this.gameOver();
        }
        this.ETime = Date.now();
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this);
        this.LEFT.node.on(cc.Node.EventType.TOUCH_START,this.BtnTurnLeft,this);
        this.LEFT.node.on(cc.Node.EventType.TOUCH_END,this.BtnTurnLeft,this);
        this.RIGHT.node.on(cc.Node.EventType.TOUCH_START,this.BtnTurnRight,this);
        this.RIGHT.node.on(cc.Node.EventType.TOUCH_END,this.BtnTurnRight,this);
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
                let nameNode:string = FHArray[i].name;
                if(self.Player.x>(FHArray[i].x+80)){
                    Global.instance.CollisionFlag = false;
                    FHArray[i].isHold = false;
                    // this.Score();
                }
                else if(self.Player.x<(FHArray[i].x-80)){
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
        Bg0.y+=(200/60);
        Bg1.y+=(200/60);
        if(Bg0.y>957){
            Bg0.y = -957;
        }
        if(Bg1.y>957){
            Bg1.y = -957;
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
        let KindHolder = Math.ceil(Math.random()*7);
        // KindHolder = 3;
        let FHolder;
        // KindHolder = Math.ceil(Math.random()*7);
        this.ETime = Date.now();
        switch(KindHolder){
            case 1:{
                FHolder = cc.instantiate(self.GD);
                self.FHolderNode.addChild(FHolder,5,"GD");
                FHolder.getComponent("GD").init(self);
                FHolder.isHold = false;
                console.log("产生第一种落脚点");
                break;
            }
            case 2:{
                FHolder = cc.instantiate(self.Opplvdai);
                self.FHolderNode.addChild(FHolder,5,"Opplvdai");
                FHolder.getComponent("Opplvdai").init(self);
                FHolder.isHold = false;
                console.log("产生第二种落脚点");
                break;
            }
            case 3:{
                FHolder = cc.instantiate(self.boli);
                self.FHolderNode.addChild(FHolder,5,"boli");
                FHolder.getComponent("boli").init(self);
                FHolder.isHold = false;
                console.log("产生第三种落脚点");
                break;
            }
            case 4:{
                FHolder = cc.instantiate(self.dici);
                self.FHolderNode.addChild(FHolder,5,"dici");
                FHolder.getComponent("dici").init(self);
                FHolder.isHold = false;
                console.log("产生第四种落脚点");
                break;
            }
            case 5:{
                FHolder = cc.instantiate(self.lvdai);
                self.FHolderNode.addChild(FHolder,5,"lvdai");
                FHolder.getComponent("lvdai").init(self);
                FHolder.isHold = false;
                console.log("产生第五种落脚点");
                break;
            }
            case 6:{
                FHolder = cc.instantiate(self.shandian);
                self.FHolderNode.addChild(FHolder,5,"shandian");
                FHolder.getComponent("shandian").init(self);
                FHolder.isHold = false;
                console.log("产生第五种落脚点");
                break;
            }
            case 7:{
                FHolder = cc.instantiate(self.tanhuang);
                self.FHolderNode.addChild(FHolder,5,"tanhuang");
                FHolder.getComponent("tanhuang").init(self);
                FHolder.isHold = false;
                console.log("产生第五种落脚点");
                break;
            }
            default:{
                FHolder = cc.instantiate(self.GD);
                self.FHolderNode.addChild(FHolder,5,"GD");
                FHolder.getComponent("GD").init(self);
                FHolder.isHold = false;
                console.log("默认产生第一种落脚点");
            }
                break;
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

    BtnLorR(event){
        let self = this;
        let schedule = cc.director.getScheduler();
        let stand = self.Player.getChildByName("stand");
        let runRight = self.Player.getChildByName("runRight");
        let run = self.Player.getChildByName("run");
        let Ani;//the animation of player
        let spawn;//an action queue of player
        let Anistate;//the Ani's state
        let Anistring;//the name of Ani
        let moveByTime = 1.5;
        let moveByDes;
        let scheduleState:boolean = false;//the schedule's state
        let schedulePause:boolean = true;
        let target:cc.Button = null;//the target which is binged to schedule
        if(!Global.instance.CollisionFlag){
            Global.instance.moveSpeed = 0.5;
        }
        moveByDes = Global.instance.moveSpeed*160;
        if(self.LkeyDown){
            target = self.LEFT;
            moveByDes = -moveByDes;
            scheduleState = schedule.isScheduled(func,target);
            schedulePause = schedule.isTargetPaused(target);
            Ani = run.getComponent(cc.Animation);
            Anistring = "run";
            stand.active = false;
            runRight.active = false;
            run.active = true;
            switch(Global.instance.KIND_FootHold){
                case 2:{
                    moveByTime-=0.5;
                    break;
                }
                case 5:{
                    moveByTime+=0.2;
                    break;
                }
            };
        }
        if(self.RkeyDown){
            target = self.RIGHT;
            moveByDes = moveByDes;
            scheduleState = schedule.isScheduled(func,target);
            schedulePause = schedule.isTargetPaused(target);
            Ani = runRight.getComponent(cc.Animation);
            Anistring = "runR";
            stand.active = false;
            runRight.active = true;
            run.active = false;
            switch(Global.instance.KIND_FootHold){
                case 2:{
                    moveByTime+=0.2;
                    break;
                }
                case 5:{
                    moveByTime-=0.5;
                    break;
                }
            };
        }
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
                switch(Anistring){
                    case "run":{
                        run.active = false;
                        runRight.active = false;
                        stand.active = true;
                        self.LkeyDown = false;
                        self.RkeyDown = false;
                        moveByDes = Global.instance.moveSpeed;
                        break;
                    }
                    case "runR":{
                        run.active = false;
                        runRight.active = false;
                        stand.active = true;
                        self.LkeyDown = false;
                        self.RkeyDown = false;
                        moveByDes = Global.instance.moveSpeed;
                        break;
                    }
                }
                break;
            }
        }
        
        function func(){
            if(Global.instance.CollisionFlag){
                moveByTime = 1.5;
            }
            spawn = cc.spawn(cc.callFunc(function(){
                self.Player.runAction(cc.moveBy(moveByTime,moveByDes,0));
            }),cc.callFunc(function(){
                Anistate = Ani.play(Anistring);
                Anistate.speed = 2;
                Anistate.repeatCount = 100;
            }))
            self.Player.runAction(spawn);
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
        let moveByTime = 1.5;
        let moveByDes = Global.instance.moveSpeed*120;
        switch(event.keyCode){
            case cc.KEY.left:{
                self.LkeyDown = true;
                console.log("我按下了左键");
                stand.active = false;
                runRight.active = false;
                run.active = true;
                switch(Global.instance.KIND_FootHold){
                    case 2:{
                        moveByTime-=0.5;
                        break;
                    }
                    case 5:{
                        moveByTime+=0.2;
                        break;
                    }
                };
                if(Global.instance.CollisionFlag){
                    moveByTime = 1.5;
                }
                let Ani = run.getComponent(cc.Animation);
                let spawn = cc.spawn(cc.callFunc(function(){
                    let Anistate = Ani.play("run");
                    Anistate.speed = 2;
                    Anistate.repeatCount = 100;
                }),cc.callFunc(function(){
                    self.Player.runAction(cc.moveBy(moveByTime,-moveByDes,0));
                }))
                self.Player.runAction(spawn);
                break;
            }
            case cc.KEY.right:{
                self.RkeyDown = true;
                console.log("我按下了右键");
                stand.active = false;
                runRight.active = true;
                run.active = false;
                let moveByTime = 1;
                switch(Global.instance.KIND_FootHold){
                    case 2:{
                        moveByTime+=0.2;
                        break;
                    }
                    case 5:{
                        moveByTime-=0.5;
                        break;
                    }
                }
                if(Global.instance.CollisionFlag){
                    moveByTime = 1.5;
                }
                let Ani = runRight.getComponent(cc.Animation);
                let spawn = cc.spawn(cc.callFunc(function(){
                    self.Player.runAction(cc.moveBy(moveByTime,moveByDes,0));
                }),cc.callFunc(function(){
                    let Anistate = Ani.play("runR");
                    Anistate.speed = 2;
                    Anistate.repeatCount = 100;
                }))
                self.Player.runAction(spawn);
                break;
            }
            default:{
                return;
            }
        }
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
    
    gameOver(){
        let self = this;
        let failure;
        let Ani;
        let Anistate;
        if(!Global.instance.OverFlag){
            Global.instance.OverFlag = true;
            console.log("游戏结束！！！");
            failure = cc.instantiate(self.failure);
            self.node.addChild(failure);
            Ani = failure.getComponent(cc.Animation);//the animation of failure;
            Anistate = Ani.play("shibai");//the state of Ani;
            Anistate.speed = 1;
            Anistate.repeatCount = 1;
            self.scheduleOnce(()=>cc.director.pause(),1.5);
        }
        else{
            return;
        }
    }

    restart(){
        cc.director.loadScene("MainScene");
        cc.director.resume();
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
        for(let i=self.LifeDing.children.length-1;i>=0;i--){
            if(self.LifeDing.children[i].name=="lifeBG"){
                if(Global.instance.CollisionFlag&&Global.instance.Injured){
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
                    Global.instance.CollisionWithDing = false;
                }
                Ls.push(self.LifeDing.children[i]);
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
        sc++;
        scLabel.string = sc.toString();
    }
}
