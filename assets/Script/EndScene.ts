const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    RankInfo:cc.Prefab = null;
    // LIFE-CYCLE CALLBACKS:
    Ani = null;
    Anistate = null;
    rInfo =  null;
    onLoad () {
        this.rInfo = cc.instantiate(this.RankInfo);
        this.node.addChild(this.rInfo);
    }

    start () {
        this.PlayAni();
    }

    update (dt) {
        
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this);
    }

    /**
     * 排行榜的动画播放
     */
    PlayAni(){
        this.Ani = this.rInfo.getComponent(cc.Animation);
        this.scheduleOnce(function(){
            this.Anistate = this.Ani.play();
            
        })
    }

    onKeyDown(event){
        switch(event.keyCode){
            case cc.KEY.back:{
                if(cc.sys.os == cc.sys.OS_ANDROID){
                    cc.game.end();
                }
            }
        }
    }
}
