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
        FHolder.isHold = false;
        Global.instance.CollisionFlag = false;
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

        for(let i=0;i<Global.instance.reLife.length;i++){//命数判断
            let reLCount=0;
            if(Global.instance.reLife[i].active){
                reLCount++;
            }
            if(reLCount==0){
                this.gameOver();
            }
        }
        if(Global.instance.CollisionFlag){
            // console.log("MainSceneUpdateIF碰撞标识："+Global.instance.CollisionFlag)
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
        if(this.Player.x<-165){
            this.Player.x = -165;
        }
        if(this.Player.x>165){
            this.Player.x = 165;
        }
        // console.log("MainSceneUpdate碰撞标识："+Global.instance.CollisionFlag)
        this.ETime = Date.now();
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this);
        this.LEFT.node.on(cc.Node.EventType.TOUCH_START,this.BtnTurnLeft,this);
    }
    /**
     * 
     */
    FHolder(){
        let self = this
        let FHArray = this.FHolderNode.children;
        for(let i=FHArray.length-1;i>=0;i--){
            if(FHArray[i].isHold){
                let nameNode:string = FHArray[i].name;
                // self.Player.y = FHArray[i].y + FHArray[i].getComponent(nameNode).NodeH;
                // Global.instance.TheHolder = FHArray[i];
                if(self.Player.x>(FHArray[i].x+80)){
                    Global.instance.CollisionFlag = false;
                    // console.log("MainSceneFHold碰撞标识："+Global.instance.CollisionFlag)
                    FHArray[i].isHold = false;
                }
                if(self.Player.x<(FHArray[i].x-80)){
                    Global.instance.CollisionFlag = false;
                    // console.log("MainSceneFHold碰撞标识："+Global.instance.CollisionFlag);
                    FHArray[i].isHold = false;
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
    BtnTurnLeft(){
        let self = this;
        let btnL = self.node.getChildByName("LEFT");
        console.log("点击了左按钮");

    }

    /**
     * 按钮触发，向右,长按事件,长按响应未解决
     */
    BtnTurnRight(){
        let self = this;
        let btnR = self.node.getChildByName("RIGHT");
        console.log("点击了右按钮");
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
        // if(self.LkeyDown||this.RkeyDown){
        //     console.log("还没松手呢！！！");
        //     if(self.LkeyDown){
        //         let Ani = run.getComponent(cc.Animation);
        //         let spawn = cc.spawn(cc.callFunc(function(){
        //             let Anistate = Ani.play("run");
        //         }),cc.callFunc(function(){
        //             self.Player.runAction(cc.moveBy(moveByTime,-moveByDes/4,0));
        //         }))
        //         self.Player.runAction(spawn);
        //         console.log("接着跑！！");
        //     }
        //     else{
        //         let Ani = runRight.getComponent(cc.Animation);
        //         let spawn = cc.spawn(cc.callFunc(function(){
        //             self.Player.runAction(cc.moveBy(moveByTime,+moveByDes/4,0));
        //         }),cc.callFunc(function(){
        //             let Anistate = Ani.play("runR");
        //             Anistate.repeatCount = 100;
        //         }))
        //         self.Player.runAction(spawn);
        //         console.log("接着跑！！");
        //     }
        // }
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
        console.log("游戏结束！！！");
    }

    restart(){
        this.destroy();
        cc.director.loadScene("MainScene");
    }
}
