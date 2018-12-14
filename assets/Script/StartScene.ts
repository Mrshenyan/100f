import Global from "./Global";
import Http from "./Http";

const {ccclass, property} = cc._decorator;

@ccclass
export default class StartScene extends cc.Component {

    @property(cc.Prefab)
    paihangbang:cc.Prefab = null;


    // LIFE-CYCLE CALLBACKS:

    mainNode = null;

    UpAni = null;
    DownAni = null;
    UpAnistate;
    DownAnistate;

    CheckBtn:cc.Button;
    /**
     * 玩家信息
     */
    USERINFO={
        userId:'12312313',
        score:0,
    }
    private channel = "test";

    onLoad () {
        // // this.LifeDing.zIndex = 5;
        // cc.sys.localStorage.removeItem("info");
        this.USERINFO = JSON.parse(cc.sys.localStorage.getItem("info"));
        if(this.USERINFO==null||this.USERINFO==undefined){

            this.USERINFO={
                userId:'',
                score:0,
            }
            this.LoadData();
            this.USERINFO = JSON.parse(cc.sys.localStorage.getItem("info"));
        }
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
        let self = this;
        // self.USERINFO.userId = "playerB10";
        // self.USERINFO.score = 0;
        self.scheduleOnce(function(){
            Global.instance.SetUser(self.USERINFO);
            Global.instance.Channel = self.channel;
            this.Login();
        },0.5);
        
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
        Global.instance.OverFlag = false;
        Global.instance.AniFalg = false;
        Global.instance.LorR = 0;
        Global.instance.InitSpeed = 8.5;
        Global.instance.moveSpeed = 1;
        Global.instance.FHFallSpeed = 2;
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
        let channelStr = Global.instance.Channel;
        let uNam = Global.instance.GetUSer().userId;
        Http.sendRequest("/login",{channel:channelStr,userId:uNam},function(msg){
            let code = JSON.parse(msg.code);
            console.log(code);
            if(code!=0){
                Global.instance.NetStatus = false;
            }
            let mmsg = JSON.parse(msg.msg);
            self.USERINFO.userId = mmsg.userId;
            self.USERINFO.score = mmsg.score;
            Global.instance.getLocalScore().BestScore = mmsg.score;
            Global.instance.SetUser(self.USERINFO);
        });
        let ux={
            userId:'',
        }
        ux.userId = channelStr+Global.instance.GetUSer().userId;
        Http.sendRequest("/rank",ux,function(mmsg){
            let MM = JSON.parse(mmsg.msg);
            console.log(MM);
            if(Global.instance.GetR()==null||Global.instance.GetR().rank==undefined||Global.instance.GetR().rank<MM.my.rank){
                Global.instance.SetR(MM.my.rank);
                Global.instance.SetS(MM.other);
            }
        });
    }

    CheckRank(){
        this.destroy();
        cc.director.loadScene("EndScene");
    }

    IdGenerater(){
        let str=""
        let suffix=""
        let Id;
        let Word;
        for(let i=0;i<2;i++){
            let ranNum = Math.ceil(Math.random()*25);
            Word =String.fromCharCode(65+ranNum);
            str += Word;
        }
        for(let i=0;i<7;i++){
            let suffixNum = Math.ceil(Math.random()*9);
            suffix += suffixNum.toString();
        }
        Id = str+suffix;
        return Id
    }

    private LoadData(){
        let self = this;
        let id = self.IdGenerater();
        self.USERINFO.userId = id;
        self.USERINFO.score = 0;
        cc.sys.localStorage.setItem("info",JSON.stringify(self.USERINFO));
        // cc.sys.localStorage.removeItem("info");
        // let url = cc.url.raw("resources/INFO/data.json");
        // let infotem;
        // cc.loader.load(url,function(err,res){
        //     if(err){
        //     console.log("load"+url,err+"err result:"+JSON.stringify(res));
        //     }
        //     infotem = res;
        // });
    }
}
/**
 * 联网登录放在开始游戏的时候，期间获取一次排行数据
 * 这里有一个逻辑上的问题：如果第一次玩的分数是0，就
 */
