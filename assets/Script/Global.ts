
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
     * player初始下落速度,8.5px/帧
     */
    public InitSpeed = 8.5;
    /**
     * player移动速度,1px/帧
     */
    public moveSpeed = 10;

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
        ThirdScore:0,
        CurrentScore:0,
        length:3,
    }
    /**
     * 远程分数存储
     */
    private remoteScore = new Array();
    /**
     * 网络连接标志位
     */
    public NetStatus = false;
    /**
     * stop Animations falg;
     */
    public AniFalg = false;

    Channel;
    /**
     * info
     */
    private USERINFO = {
        userId:"",
        uTim:Number,
        score:0,
    }
    /**
     * player排行
     */
    private MyRank = null;

    public LorR = 0;//0 for right
    public static readonly instance = new Global();//全局下不可少
    private constructor() { };
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

    public setRemoteScore(score){
        this.remoteScore = score;
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
/**
     * 获取玩家信息
     */
    public GetUSer(){
        return this.USERINFO;
    }

    /**
     * 设置玩家信息
     * @param user 玩家
     */
    public SetUser(user){
        this.USERINFO = user;
    }

     /**
     * 获取个人排行
     */
    public GetR(){
        return this.MyRank;
    }
    /**
     * 设置个人排行
     * @param r 排行
     */
    public SetR(r){
        this.MyRank = r;
    }
     /**
     * 获取排行分数
     */
    public GetS(){
        return this.remoteScore;
    }

    /**
     * 设置排行分数
     * @param s 分数
     */
    public SetS(s){
        this.remoteScore = s;
    }
}

/**
 * 这里应当添加当前局分数存储，
 * 只需要游戏最高分
 * 从服务器获取的分数也是先与本地分数对比，交换，
 * 拿到最高分，上传；
 * 之后刷新排行榜
 */
