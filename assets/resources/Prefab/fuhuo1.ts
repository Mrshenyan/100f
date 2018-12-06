
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.getChildByName("cd").getChildByName("RankScene").active = false;
        this.node.getChildByName("zl").getChildByName("rePlay").active = false;
        this.node.getChildByName("fh").getChildByName("rePlay").active = true;
    }

    start () {

    }

    update (dt) {
        let self = this;
        let Ani;
        let Anistate;
        let PlayOver = false;
        let Countdown = this.node.getChildByName("fh").getChildByName("Countdown").getComponent(cc.Label);
        let time = parseInt(Countdown.string);
        let scheduler = cc.director.getScheduler();
        // scheduler.schedule(aniplayer,this,1,10,1,false);
        this.scheduleOnce(aniplayer,1);//完成使用schedule的情况下，提示warning的问题。
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
                self.node.getChildByName("fh").getChildByName("rePlay").active = false;
                scheduler.pauseTarget(this); 
                PlayOver = true;
            }
            Countdown.string = time.toString();
            if(PlayOver){
                self.scheduleOnce(function(){
                    scheduler.resumeTargets(self);
                    scheduler.pauseAllTargets();
                },0.47);
            }
        }
    }
}
