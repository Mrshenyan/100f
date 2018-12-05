
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.getChildByName("cd").getChildByName("RankScene").active = false;
        this.node.getChildByName("zl").getChildByName("rePlay").active = false;
    }

    start () {

    }

    update (dt) {
        let self = this;
        let Ani;
        let Anistate;
        let Countdown = this.node.getChildByName("fh").getChildByName("Countdown").getComponent(cc.Label);
        let time = parseInt(Countdown.string);
        let scheduler = cc.director.getScheduler();
        scheduler.schedule(aniplayer,this,1,false);

        /**
         * 结束页面的动画播放
         */
        function aniplayer(){
            let self = this;
            if(time>0){
                time--;
            }
            if(time==0){
                this.isScheduled = false;

                Ani = self.getComponent(cc.Animation);
                Anistate = Ani.play();
                Countdown.string = time.toString();
                self.node.getChildByName("cd").getChildByName("RankScene").active = true;
                self.node.getChildByName("zl").getChildByName("rePlay").active = true;
                scheduler.pauseTarget(this); 
                return;
            }
            Countdown.string = time.toString();
        }
    }
}
