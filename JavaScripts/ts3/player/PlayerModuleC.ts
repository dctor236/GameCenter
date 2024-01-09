import { InputManager } from "../../InputManager";
import { GameModuleC } from "../../modules/gameModule/GameModuleC";
import { MGSMsgHome } from "../../modules/mgsMsg/MgsmsgHome";
import GameUtils from "../../utils/GameUtils";
import { PlayerData } from "./PlayerData";
import { PlayerDefine } from "./PlayerDefine";
import { PlayerModuleS } from "./PlayerModuleS";
import TsPlayer from "./TsPlayer";


export class PlayerModuleC extends ModuleC<PlayerModuleS, null> {
    public mPlayer: TsPlayer = null;
    public dataInfo: PlayerData;

    private mUserId = '';
    private damageList: Map<string, number> = new Map<string, number>();
    private needUpDamage = false;
    private updateTime = 1;
    // 玩家是否死亡
    private playerDead: boolean = false;
    public async init() {
        this.dataInfo = new PlayerData();
        Event.addLocalListener(PlayerDefine.Event_Player_Start, this.onPlayerEnter)
        let player = await Player.asyncGetLocalPlayer();
        await player.character.asyncReady()
        this.mUserId = player.userId;
        PlayerDefine.inited = true;
        this.upInfo();
        await this.onMainInited();
    }
    public onPlayerEnter = (player: TsPlayer) => {
        this.dataInfo.addPlayer(player)
        if (player.userId == this.mUserId) {
            this.mPlayer = player;
            this.mPlayer.setInfo(this.userOpenId(), this.userName());
            RoomService.registerMGSChatMessageEvent(this.sendChat.bind(this));
            InputManager.instance.onTouch.add(this.onTouchThis, this);
        }
    }
    protected onEnterScene(sceneType: number): void {
    }

    protected onUpdate(dt: number): void {
        this.updateTime -= dt;
        if (this.updateTime < 0) {
            this.updateTime = 1;
            this.upDamage();
        }
    }


    /**查看名片cd */
    private isLook = true;
    /**
   * 点击角色显示233名片
   * @param hitResArr
   */
    private onTouchThis(hitResArr: Array<mw.HitResult>) {
        for (let hit of hitResArr) {
            if (!this.isLook) {
                return;
            }

            if (GameUtils.isPlayerCharacter(hit.gameObject)) {
                continue;
            }
            let character = hit.gameObject as mw.Character;
            if (!character || !character.player) {
                continue;
            }
            let openId = character.player.userId;
            console.info("233playerID===   openId  " + openId + "    =====<");
            mw.RoomService.showUserProfile(null, openId);
            this.isLook = false;
            setTimeout(() => {
                this.isLook = true;
            }, 1000);
            return;
        }
    }

    public async onMainInited() {
        return new Promise((resolve) => {
            let idx = 0;
            const intervalId = setInterval(() => {
                if (this.mPlayer) {
                    clearInterval(intervalId);
                    resolve(true);
                }
                idx++;
                if (idx > 30) {
                    clearInterval(intervalId);
                    resolve(true);
                }
            }, 100);
        });
    }
    /**
     * 服务准备好，客户端上传账户数据
     * 也可延迟执行
     */
    public upInfo() {
        //需要客户端上报的数据都走这
        this.server.net_upInfo(this.userOpenId(), this.userName());
        //console.log('net', this.mPlayer.openId)
    }
    public showHead(bit: number, uid: string) {
        if (uid) {
            let p = this.dataInfo.getPlayer(uid);
            p && p.showHead(bit);
        }
        let list = this.dataInfo.getAll();
        list.forEach((p) => {
            p && p.showHead(bit);
        });
    }
    public setTitle(type: number, title: string) {
        this.mPlayer.showTitle(type, title);
        this.server.net_setTitle(type, title);
    }
    public sendChat = (msg: string): void => {
        if (this.mPlayer) {
            this.mPlayer.showChat(msg);
            this.server.net_setChat(msg, this.mPlayer.userId);
        }
    }
    public net_Chat(uid, msg: string) {
        let tsp = this.dataInfo.getPlayer(uid);
        if (tsp)
            tsp.showChat(msg);
    }


    net_dead() {
        // 死亡动画
        this.playerDead = true
        MGSMsgHome.uploadMGS('ts_game_result', '玩家每次死亡打一个点', { record: 'player_dead' })

    }

    net_resurgence() {
        // mw.UIService.hide(ResurgenceWindow);
        ModuleService.getModule(GameModuleC).resetPos()
        this.playerDead = false
        // this.onPlayerResurgenceEvent.call()
    }


    private upDamage() {
        if (!this.needUpDamage)
            return;
        // let ids = Array.from(this.damageList.keys());
        // let dmgs = Array.from(this.damageList.values());
        let ids = [];
        let dmgs = [];
        for (let [k, v] of this.damageList) {
            ids.push(k);
            dmgs.push(v);
        }
        this.damageList.clear();
        this.needUpDamage = false;
    }
    private userOpenId(): string {
        if (SystemUtil.isPIE)
            return "openid" + this.mUserId;
        return AccountService.getUserId();
    }
    private userName(): string {
        if (SystemUtil.isPIE)
            return "TS" + this.mUserId;
        return AccountService.getNickName();
    }

    // private getMwPlayer(uid): mw.Player {
    //     let aps = Player.getAllPlayers()
    //     for (let p of aps) {

    //     }
    //     return this.mPlayer;
    // }
}
