
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property
    zIndex = 0

    onLoad () {
        if(this.zIndex%1<1){
            this.zIndex = 0;
        }
        this.node.zIndex = this.zIndex;
    }

    // start () {}

    // update (dt) {}
}
