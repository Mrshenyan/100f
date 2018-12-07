import Global from "./Global";
import Http from "./Http";

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

    /**
     * 玩家信息
     */
    USERINFO = {
        userId:"",
        score:0,
    }

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
        let uInf = Math.random();
        this.Login();
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

        /**
     * 登录
     */
    protected Login(){
        let self = this;
        Http.sendRequest("/login",{channel:"test",userId:"playerB1"},function(msg){//channel:渠道,userId:渠道Id
            let code = JSON.parse(msg.code);
            console.log(msg);
            if(code!=0){
                Global.instance.NetStatus = false;
            }
            let mmsg = JSON.parse(msg.msg);
            self.USERINFO.userId = mmsg.userId;
            self.USERINFO.score = mmsg.score;
            Global.instance.SetUser(self.USERINFO);//联网获取分数
        });
        let ux = {
            userId:'',
        }
        ux.userId = self.USERINFO.userId;
        Http.sendRequest("/rank",ux,function(mmsg) {
            let MM = JSON.parse(mmsg.msg)//不能实时更新名次，只请求一次排名的话，名次是上一次的排名。逻辑错了？
            //console.log(mmsg);
            if(Global.instance.GetR()==null||Global.instance.GetR().rank==undefined||Global.instance.GetR().rank<MM.my.rank){
                Global.instance.SetR(MM.my.rank);
                Global.instance.setRemoteScore(MM.other);
            }
            self.scheduleOnce(function(){
                return;
            },0.3);
        });
    }
    
}
