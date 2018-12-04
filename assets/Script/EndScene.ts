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
        // this.scheduleOnce(function(){
        //     this.PlayAni();
        // },1);
    }

    start () {
        this.PlayAni();
    }

    update (dt) {
    }

    PlayAni(){
        this.Ani = this.rInfo.getComponent(cc.Animation);
        this.Anistate = this.Ani.play();
    }
}
