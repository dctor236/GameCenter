
/** 
 * @Author       : 陆江帅
 * @Date         : 2023-04-03 14:24:28
 * @LastEditors  : songxing
 * @LastEditTime : 2023-05-19 15:25:21
 * @FilePath     : \mollywoodschool\JavaScripts\const\GlobalData.ts
 * @Description  : 
 */
export type Class<T> = { new(...args): T; };

export function MyBoolean(bool: any): boolean {
    if (typeof bool === "boolean") {
        return bool
    }
    if (typeof bool === "string") {
        if (["1", "true", "True"].includes(bool.toString())) {
            return true
        } else {
            return false
        }
    }
    if (typeof bool === "number") {
        if (bool == 0) return false
        else return true
    }
    return false
}
export class GlobalData {
    /**出生点位置 */
    public static globalPos: mw.Vector = null;
    /**是否本地背包 */
    public static isLocalBag: boolean = false;
    /**是否打开GM */
    public static isOpenGM: boolean = false;
    /**现实1s，游戏内多少秒 */
    public static timeScale: number = 0;
    /**开始显示时间，小时 */
    public static dayBeginShow: number = 0;

    /**当前衣服id */
    public static clothConfigID: number = -1;
    /**是否可操作快捷栏 */
    public static isChangeBar: boolean = true;
    /** 快捷栏最大数量 */
    public static maxShortcutBar = 5;
    /**空插槽图片 */
    public static blankSlotBg = "115575";

    /**道具给予距离 */
    public static giveDis = 500;
    /**交互物父节点 */
    public static interactorParent: string = "0E7D8D73";

    /**技能内置CD */
    public static skillCD: number = 0
    /**默认内置CD */
    public static defaultCD: number = 0.5

    /**造物时动作 */
    public static creationAnim: string = "156436"
    /**飞行准备动作 */
    public static flyStandbyAnim: string = "157058"
    /**飞行动作 */
    public static flyAnim: string = "157056"

    /**飞行结束动作 */
    public static flyOverAnim: string = "157057"

    /** 使用技能时的下落速度 */
    public static glideFallingSpeed: number = 500;
    /** 下落控制 0 - 1 */
    public static glideAirControl: number = 1;

    /** 滑翔伞特效 */
    public static glideEffectGuid: string = "155683";
    /** 下落控制提升速率阈值 */
    public static glideAirControlBoostVelocityThreshold: number = 40000;

    /**契约之戒一阶段id */
    public static ringFirst: number = 70007;
    /**契约之戒二阶段id */
    public static ringSecond: number = 70008;
    /** 新玩家ID(用于夜晚怪物) */
    public static NEW_PLAYERID: number[] = [];
    /**正在对话的nPC */
    public static CurTalkNpc: number = -1
    /**正在交互的nPC */
    public static CurInteractNpc: number = -1
    /**是否使用233形象 */
    public static isPlatFormChar: boolean = false
    /**坐骑对象 */
    public static MountRoot: string = '298DAA83'
    /**玩家返回主游戏的时间 s */
    public static returnSchoolTime: number = 600
    /**最大小精灵跟随数量 */
    public static maxFollowSpirit: number = 2
    /**关闭cg */
    public static openCG: boolean = true
    /**小精灵契约时间 */
    public static spiritTime: number = 180
    public static curBuffID: number = 1
    /**龙是否还在 */
    public static isDragon: boolean = true
    public static forceToMain: boolean = false
    static globalCameraRot: Rotation = Rotation.zero;

}

