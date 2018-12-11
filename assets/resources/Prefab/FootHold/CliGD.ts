import Global from "../../../Script/Global";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    /**0 for right */
    @property(Number)
    CliLorR:Number = 0;


    onLoad () {
        if(Math.random()<0.5){
            this.CliLorR = 0;
        }
        else{
            this.CliLorR = 1;
        }
    }

    start () {

    }

    update (dt) {
        if(this.CliLorR==0){
            this.node.parent.x++;
            let x = this.node.parent.isHold;
            if(x||this.node.parent.getComponent("GD").isHold){
                Global.instance.LorR = 0;
            }
        }
        else{
            this.node.parent.x--;
            let x = this.node.parent.isHold;
            if(x||this.node.parent.getComponent("GD").isHold){
                Global.instance.LorR = 1;
            }
        }
    }

    onCollisionEnter(){
        let self = this;
        if(self.CliLorR == 0){
            self.CliLorR = 1;
            Global.instance.LorR = 1;
            // console.log("这里是CliGD的if"+Global.instance.LorR);
        }
        else{
            self.CliLorR = 0;
            Global.instance.LorR = 0;
            // console.log("这里是CliGD的else"+Global.instance.LorR);
        }
    }
}
