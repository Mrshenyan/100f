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

    }

    update (dt) {
        // this.scheduleOnce(function(){

        //     this.Ani = this.rInfo.getComponent(cc.Animation);
        //     this.Anistate = this.Ani.play();
        //     this.Anistate.speed = 1;
        //     this.Anistate.repeatCount = 10
        // })
    }
}
