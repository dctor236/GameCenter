import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
import TsPlayer from "./TsPlayer";
import { LogMgr } from "../com/LogMgr";
import { PlayerModuleS } from "./PlayerModuleS";
import { PlayerModuleC } from "./PlayerModuleC";
import PlayerHeadUI from "./PlayerHeadUI";
import { PlayerDefine } from "./PlayerDefine";
import { GameConfig } from "../../config/GameConfig";

export class PlayerMgr {
    public mainUserId: string = '';
    public mainGuid: string = '';
    private static _inst: PlayerMgr;
    public static get Inst() {
        if (!this._inst)
            this._inst = new PlayerMgr();
        return this._inst;
    }
    private moduleC: PlayerModuleC;
    private moduleS: PlayerModuleS;
    private tsPlayer: TsPlayer;
    private tsChar: mw.Character;
    private inited = 0;
    private posTime = -1;
    private curPos: mw.Vector;

    private curStance: mw.SubStance;

    public async init() {
        if (this.inited > 0)
            return;
        this.inited = 1;
        ModuleService.registerModule(PlayerModuleS, PlayerModuleC, null);
        if (SystemUtil.isClient()) {
            this.moduleC = ModuleService.getModule(PlayerModuleC);
            await this.moduleC.init();
            this.tsPlayer = this.moduleC.mPlayer;
            if (!this.tsPlayer) {
                LogMgr.Inst.coreLog('玩家模块初始化失败')
                return;
            }
            this.tsPlayer = this.moduleC.mPlayer;
            this.tsChar = this.tsPlayer.character;
            this.mainGuid = this.tsChar.gameObjectId;
            this.mainUserId = this.tsPlayer.userId;
            this.inited = 2;

            //开启头顶UI
            this.setMyHeadUI()
            this.setOtherHeadUI()
            this.showHeadView(1 + 2 + 4);
        }
        else {
            this.inited = 2;
            this.moduleS = ModuleService.getModule(PlayerModuleS);
        }
        LogMgr.Inst.coreLog('玩家模块初始化完成')
    }
    /**
     * 主玩家，客户端使用
     */
    public get mainPlayer(): TsPlayer {
        if (this.isVoid)
            return null;
        return this.tsPlayer;
    }
    /**
     * 主玩家角色，客户端使用
     */
    public get mainCharacter(): mw.Character {
        if (this.isVoid)
            return null;
        this.tsChar
        return this.tsChar;
    }
    /**
     * 主玩家的位置，若获取到位置要进行修改，请clone()
     */
    public get mainPos(): mw.Vector {
        if (this.isVoid)
            return mw.Vector.zero;
        else {
            let nt = TimeUtil.elapsedTime()
            if (nt - this.posTime > 0.1) //100毫秒內不会更新位置
            {
                this.curPos = this.tsChar.worldTransform.position;
                this.posTime = nt;
            }
        }
        return this.curPos;
    }

    /**
     * 是否为主玩家
     * @param uid 用户ID
     * @Effect 双端调用 
     * @returns 
     */
    public getPlayer(uid: string): TsPlayer {
        if (this.isVoid)
            return null;
        if (SystemUtil.isClient()) {
            return this.moduleC.dataInfo.getPlayer(uid);
        }
        else
            return this.moduleS.dataInfo.getPlayer(uid);
    }
    /**
     * 获取所有玩家
     * @param uid 排除的uid,默认不排除
     * @returns 
     */
    public getPlayers(uid?: string): TsPlayer[] {
        if (this.isVoid)
            return [];
        if (SystemUtil.isClient())
            return this.moduleC.dataInfo.getAll(uid);
        else
            return this.moduleS.dataInfo.getAll(uid);
    }
    /**
     * 获取范围內的玩家
     * @param range 范围
     * @param pos 中心点，默认主角位置
     * @param uid 排除的uid,默认不排除
     */
    public getRangePlayer(range: number, uid?: string, pos?: mw.Vector): TsPlayer[] {
        if (this.isVoid)
            return [];
        range = range ? range : 10000;
        if (SystemUtil.isClient()) {
            pos = pos ? pos : this.mainCharacter.worldTransform.position;
            return this.moduleC.dataInfo.getRangePlayer(pos, range, uid);
        }
        else if (pos) {
            return this.moduleS.dataInfo.getRangePlayer(pos, range, uid);
        }
        else {
            LogMgr.Inst.error('服务器获取最近玩家需要传入位置');
            return null;
        }
    }
    /**
     * 获取最近的玩家（可设范围）
     * @param range 范围
     * @param pos 中心点，默认主角位置，服务器需要传入
     * @param uid 排除的uid,默认不排除
     */
    public getNearPlayer(range?: number, uid?: string, pos?: mw.Vector): TsPlayer {
        if (this.isVoid)
            return null
        range = range ? range : 10000;
        if (SystemUtil.isClient()) {
            pos = pos ? pos : this.mainCharacter.worldTransform.position;
            return this.moduleC.dataInfo.getNearPlayer(pos, range, uid);
        }
        else if (pos) {
            return this.moduleS.dataInfo.getNearPlayer(pos, range, uid);
        }
        else {
            LogMgr.Inst.error('服务器获取最近玩家需要传入位置');
            return null;
        }
    }
    /**
     * 是否为主玩家
     * @param obj GameObject、Player、Character、TsPlayer
     * @Effect 客户端调用 
     * @returns 
     */
    public isMainPlayer(obj: mw.GameObject | TsPlayer) {
        if (this.isVoid || !obj)
            return false;
        if (obj instanceof mw.Player) {
            let player = obj as mw.Player;
            return player.userId == this.mainUserId;
        }
        if (obj instanceof TsPlayer) {
            let player = obj as TsPlayer;
            return player.userId == this.mainUserId;
        }
        else if (!obj.gameObjectId)
            return false;
        return obj.gameObjectId == this.mainGuid;
    }

    private get isVoid() {
        // if (this.inited < 2)
        //     LogMgr.Inst.error('玩家还未初始化好');
        return this.inited < 2;
    }

    /********************HeadUI *************************/
    /**
     * 设置主玩家 头顶UI
     * @param resId  头顶资源ID
     * @param ui UI类
     * @param pos 相等偏移位置
     * @returns 
     */
    public setMyHeadUI(resId?: string, ui?: new () => PlayerHeadUI) {
        if (this.isVoid || SystemUtil.isServer())
            return;
        if (resId)
            PlayerDefine.mainHeadRes = resId;
        if (!ui)
            ui = PlayerHeadUI;
        this.tsPlayer.setHeadUI(PlayerDefine.mainHeadRes, ui);
        this.tsPlayer.showHp()
    }
    /**
     * 设置其他玩家 头顶UI
     * @param resId 头顶资源ID
     * @param ui UI类
     * @param pos 相等偏移位置                 
     * @returns 
     */
    public setOtherHeadUI(resId?: string, ui?: new () => PlayerHeadUI) {
        if (this.isVoid || SystemUtil.isServer())
            return;
        if (resId)
            PlayerDefine.otherHeadRes = resId;
        if (ui)
            PlayerDefine.HeadUI = ui;
        this.getPlayers(this.mainUserId).forEach((p) => {
            p.setHeadUI(PlayerDefine.otherHeadRes, PlayerDefine.HeadUI);
        })
    }

    /**
     * 设置称号
     * @param type 自定义类别
     * @param title 称号
     * @returns 
     */
    public setTitle(type: number, title: string) {
        if (this.isVoid)
            return;
        if (SystemUtil.isClient())
            this.moduleC.setTitle(type, title);
        else
            this.moduleS.net_setTitle(type, title);
    }

    public resetTitle(type: number) {
        if (this.isVoid)
            return;
        let name = GameConfig.SquareLanguage.Danmu_Content_1106.Value
        if (SystemUtil.isClient())
            this.moduleC.setTitle(type, name);
        else
            this.moduleS.net_setTitle(type, name);
    }

    /**
     * 发送一个聊天
     * @param chat  聊天内容
     * @param uid  发送者，默认主玩家
     * @returns 
     */
    public sendChat(chat: string, uid?: string) {
        if (this.isVoid)
            return;
        if (SystemUtil.isClient())
            this.moduleC.sendChat(chat);
        else if (uid)
            this.moduleS.net_setChat(chat, uid);
    }
    /**
     * 玩家头顶HP信息显示
     * @param uid 哪个玩家,不传就是所有玩家
     * @param bit 显示位
     * 1:名字
     * 2:称号
     * 4:血条
     */
    public showHeadView(bit: number, uid?: string) {
        if (this.isVoid || SystemUtil.isServer())
            return;
        PlayerDefine.headBit = bit;
        this.moduleC.showHead(bit, uid);
    }
}
