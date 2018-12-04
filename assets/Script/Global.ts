
export default class Global {
    /**
     * 开始场景节点
     */
    private StartNode = null;
    /**
     * 主场景节点
     */
    private MainNode = null;
    /**
     * 落脚点碰撞标志，默认未碰撞，false
     */
    public CollisionFlag = false;
    /**
     * 顶碰撞标准，默认未碰撞，false
     */
    public CollisionWithDing = false;
    /**
     * 落脚点碰撞标签
     */
    public KIND_FootHold = 0;
    /**
     * player初始下落速度,5px/帧
     */
    public InitSpeed = 10;
    /**
     * player移动速度,1px/帧
     */
    public moveSpeed = 1;

    /**
     * 落脚点移动速度
     */
    public FHFallSpeed = 2;

    /**
     * 碰撞的落脚点
     */
    public TheHolder;

    /**
     * 剩余命数
     */
    public reLife = new Array();
    /**
     * 受到伤害标志
     */
    public Injured = false;

    /**
     * 失败标志
     */
    public OverFlag = false;

    /**
     * 等级增加标志位,0表示未增加，当前为1级
     */
    LevelAddFlag = 0;

    /**
     * 本地分数存储
     */
    private LocalScore = {
        BestScore:0,
        SecondScore:0,
        ThirdScore:0
    }
    /**
     * 远程分数存储
     */
    private remoteScore = new Array();
    /**
     * 网络连接标志位
     */
    public NetStatus = false;
    public static readonly instance = new Global();//全局下不可少
    private constructor() { }

    /**
     * return the local score
     */
    public getLocalScore(){
        return this.LocalScore;
    }

    /**
     * return the remote score
     */
    public getRemoteScore(){
        return this.remoteScore;
    }

    /**
     * 开始场景节点获取
     */
    public getSN(){
        return this.StartNode;
    }
    /**
     * 
     * @param sn 开始场景节点
     */
    public setSN(sn){
        this.StartNode = sn;
    }
    /**
     * 主场景节点获取
     */
    public getMN(){
        return this.MainNode;
    }
    /**
     * 
     * @param mn 主场景节点
     */
    public setMN(mn){
        this.MainNode = mn
    }


}

/**
 * 这里应当添加当前局分数存储，
 * 只需要游戏最高分
 * 从服务器获取的分数也是先与本地分数对比，交换，
 * 拿到最高分，上传；
 * 之后刷新排行榜
 */
