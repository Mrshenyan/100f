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

    // LIFE-CYCLE CALLBACKS:
    /**
     * 上一个落脚点生成时间
     */
    private STime = 0;
    /**
     * 当前落脚点生成时间
     */
    private ETime = 0;

    private LkeyDown = false;
    private RkeyDown = false;

    onLoad () {
        this.LifeDing.zIndex = 10;
        this.FHolderNode.zIndex = 9;
        Global.instance.setMN(this);
        this.STime = Date.now();
        let FHolder = cc.instantiate(this.GD);
        this.FHolderNode.addChild(FHolder,10,"GD");
        FHolder.isHold = false;
        Global.instance.CollisionFlag = false;
        this.Player.x = FHolder.x;
        this.Player.y = 200;
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
        if((this.ETime-this.STime)>1500){//控制落脚点之间的间距
            this.STime = Date.now();
            FHolder = this.FootHoldGenerator();
        }
        let FHArray = this.FHolderNode.children;
        if(FHArray!=null){
            for(let i=0;i<FHArray.length;i++){
                if((FHArray[i].isHold)&&Global.instance.CollisionFlag){
                    if((this.Player.x-27>FHArray[i].x+135)||(this.Player.x+27<FHArray[i].x-135)){
                        this.Player.y-=1;
                        Global.instance.CollisionFlag = false;
                        FHArray[i].isHold = false;
                    }
                }
            }
        }
        if(FHArray!=null){
            for(let i=0;i<FHArray.length;i++){
                if(this.Player.y<310&&(this.Player.y>(-480))){
                    if((FHArray[i].isHold)&&Global.instance.CollisionFlag){
                        this.Player.y = FHArray[i].y + 55;
                        if(this.Player.y>310){
                            FHArray[i].isHold = false;
                            return;
                        }
                    }
                }
                if(this.Player.y>(-280)&&(!Global.instance.CollisionFlag)){
                    // this.gameOver();
                    this.Player.y -= 2;
                }
                else {
                    // this.Player.y -= 2;
                }
            }
        }
        
        
        if(this.Player.x<-210){
            this.Player.x = -210;
        }
        if(this.Player.x>210){
            this.Player.x = 210;
        }
        this.ETime = Date.now();
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this);
    }
    

    /**
     * 移动背景
     */
    MoveBg(){
        let Bg0 = this.Bg.getChildByName("Bg_0");
        let Bg1 = this.Bg.getChildByName("Bg_1");
        Bg0.y+=1;
        Bg1.y+=1;
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
        this
        let KindHolder;
        let FHolder;
        KindHolder = Math.ceil(Math.random()*7);
        this.ETime = Date.now();
        switch(KindHolder){
            case 1:{
                FHolder = cc.instantiate(this.boli);
                self.FHolderNode.addChild(FHolder,5,"boli");
                //FHolder.getComponent("boli").init(this);
                FHolder.isHold = false;
                console.log("产生第一种落脚点");
                break;
            }
            case 2:{
                FHolder = cc.instantiate(this.dici);
                self.FHolderNode.addChild(FHolder,5,"dici");
                //FHolder.getComponent("dici").init(this);
                FHolder.isHold = false;
                console.log("产生第二种落脚点");
                break;
            }
            case 3:{
                FHolder = cc.instantiate(this.lvdai);
                self.FHolderNode.addChild(FHolder,5,"lvdai");
                //FHolder.getComponent("lvdai").init(this);
                FHolder.isHold = false;
                console.log("产生第三种落脚点");
                break;
            }
            case 4:{
                FHolder = cc.instantiate(this.shandian);
                self.FHolderNode.addChild(FHolder,5,"shandian");
               // FHolder.getComponent("shandian").init(this);
               FHolder.isHold = false;
                console.log("产生第四种落脚点");
                break;
            }
            case 5:{
                FHolder = cc.instantiate(this.tanhuang);
                self.FHolderNode.addChild(FHolder,5,"tanhuang");
                //FHolder.getComponent("tanhuang").init(this);
                FHolder.isHold = false;
                console.log("产生第五种落脚点");
                break;
            }
            case 6:{
                FHolder = cc.instantiate(this.Opplvdai);
                self.FHolderNode.addChild(FHolder,5,"Opplvdai");
                //FHolder.getComponent("tanhuang").init(this);
                FHolder.isHold = false;
                console.log("产生第五种落脚点");
                break;
            }
            case 7:{
                FHolder = cc.instantiate(this.GD);
                self.FHolderNode.addChild(FHolder,5,"GD");
                //FHolder.getComponent("tanhuang").init(this);
                FHolder.isHold = false;
                console.log("产生第五种落脚点");
                break;
            }
            default:{
                FHolder = cc.instantiate(this.boli);
                self.FHolderNode.addChild(FHolder,5,"boli");
                //FHolder.getComponent("boli").init(this);
                FHolder.isHold = false;
                console.log("默认产生第一种落脚点");
            }
                break;
        }
        return FHolder;
    }

    /**
     * 按钮触发，向左
     */
    BtnTurnLeft(){
        console.log("向左！");
    }

    /**
     * 按钮触发，向右
     */
    BtnTurnRight(){
        console.log("向右！");
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
        switch(event.keyCode){
            case cc.KEY.left:{
                self.LkeyDown = true;
                console.log("我按下了左键");
                stand.active = false;
                runRight.active = false;
                run.active = true;
                let Ani = run.getComponent(cc.Animation);
                let spawn = cc.spawn(cc.callFunc(function(){
                    let Anistate = Ani.play("run");
                    Anistate.speed = 2;
                    Anistate.repeatCount = 10;
                    // self.Player.runAction(cc.moveBy(1.33,-10,0));
                }),cc.callFunc(function(){
                    // let Anistate = Ani.play("run");
                    // Anistate.repeatCount = 10;
                    self.Player.runAction(cc.moveBy(0.665,-15,0));
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
                let Ani = runRight.getComponent(cc.Animation);
                let spawn = cc.spawn(cc.callFunc(function(){
                    // let Anistate = Ani.play("run");
                    // Anistate.repeatCount = 10;
                    self.Player.runAction(cc.moveBy(0.665,+10,0));
                }),cc.callFunc(function(){
                    let Anistate = Ani.play("runR");
                    Anistate.speed = 2;
                    Anistate.repeatCount = 10;
                    // self.Player.runAction(cc.moveBy(0,0,-1));
                }))
                self.Player.runAction(spawn);
                break;
            }
            default:{
                return;
            }
        }
        if(self.LkeyDown||this.RkeyDown){
            console.log("还没松手呢！！！");
            if(self.LkeyDown){
                let Ani = run.getComponent(cc.Animation);
                let spawn = cc.spawn(cc.callFunc(function(){
                    let Anistate = Ani.play("run");
                    // Anistate.repeatCount = 100;
                    // self.Player.runAction(cc.moveBy(1.33,-10,0));
                }),cc.callFunc(function(){
                    // let Anistate = Ani.play("run");
                    // Anistate.repeatCount = 10;
                    self.Player.runAction(cc.moveBy(1.33,-6.65,0));
                }))
                self.Player.runAction(spawn);
                console.log("接着跑！！");
            }
            else{
                let Ani = runRight.getComponent(cc.Animation);
                let spawn = cc.spawn(cc.callFunc(function(){
                    // let Anistate = Ani.play("run");
                    // Anistate.repeatCount = 10;
                    self.Player.runAction(cc.moveBy(0.5,+10,0));
                }),cc.callFunc(function(){
                    let Anistate = Ani.play("runR");
                    Anistate.repeatCount = 100;
                    // self.Player.runAction(cc.moveBy(0,0,-1));
                }))
                self.Player.runAction(spawn);
                console.log("接着跑！！");
            }
        }

        // if(){

        // }
    }
    /**
     * 抬起动画停止
     * @param event 抬起左右键触发
     */
    onKeyUp(event){

        let self = this;
        self.Player.stopAllActions();
        let stand = this.Player.getChildByName("stand");
        let runRight = this.Player.getChildByName("runRight");
        let run = this.Player.getChildByName("run");
        stand.active = true;
        run.active = false;
        runRight.active = false;
    }
    

    OutOfHolder(){

    }

    gameOver(){
        console.log("游戏结束！！！");
    }
}
