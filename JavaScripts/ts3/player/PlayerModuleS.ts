import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
/*
 * @Author: 代纯 chun.dai@appshahe.com
 * @Date: 2023-06-12 20:09:21
 * @LastEditors: 代纯 chun.dai@appshahe.com
 * @LastEditTime: 2023-07-04 21:11:23
 * @FilePath: \vine-valley\JavaScripts\ts3\player\PlayerModuleS.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { EventsName } from "../../const/GameEnum";
import { GlobalData } from "../../const/GlobalData";
import { BuffModuleS } from "../../modules/buff/BuffModuleS";
import { EBuffHostType } from "../../modules/buff/comon/BuffCommon";
import { Attribute } from "../../modules/fight/attibute/Attribute";
import FightMgr from "../../modules/fight/FightMgr";
import { updater } from "../../modules/fight/utils/Updater";
import { addScript } from "../com/Tool";
import { PlayerData } from "./PlayerData";
import { GamePlayerState, PlayerDefine } from "./PlayerDefine";
import { PlayerModuleC } from "./PlayerModuleC";

/** 
 * @Author       : xianjie.xia
 * @LastEditors  : xianjie.xia
 * @Date         : 2023-04-02 14:04
 * @LastEditTime : 2023-05-24 16:51
 * @description  : 
 */

export class PlayerModuleS extends ModuleS<PlayerModuleC, null> {
    public dataInfo: PlayerData;
    private deadPlayer: Set<string> = new Set();
    private playerBeHitTimeStampRecode: Map<string, number> = new Map();
    protected override onStart(): void {
        super.onStart();
        this.dataInfo = new PlayerData();

        Event.addLocalListener(EventsName.PlayerBattle, (pid: number, sate: boolean) => {
            const player = Player.getPlayer(pid)
            if (!player) return
            const tmpp = this.dataInfo.getPlayer(player.userId)
            if (!sate) {
                this.recodePlayerFightState(player.userId)
                tmpp?.setPlayerState(GamePlayerState.OutofBattle)
            } else {
                this.playerBeHitTimeStampRecode.delete(player.userId);
                tmpp?.setPlayerState(GamePlayerState.Battle)
            }
        })
    }
    protected onPlayerEnterGame(player: mw.Player): void {
        super.onPlayerEnterGame(player);
        FightMgr.instance.onPlayerEnterGame(player)
        // this.addPlayer(player);
    }

    protected onPlayerLeft(player: mw.Player): void {
        let uid = player.userId;
        const p = this.dataInfo.getPlayer(uid)
        p?.stopPlayVictorEff()
        FightMgr.instance.onPlayerLeft(player)
        this.dataInfo.delPlayer(uid)
        this.deadPlayer.delete(uid);
        this.playerBeHitTimeStampRecode.delete(uid);
    }

    // 记录玩家活跃状态(攻击/受击),做脱战回血逻辑
    recodePlayerFightState(uid: string) {
        this.playerBeHitTimeStampRecode.set(uid, Date.now());
    }

    // 玩家死亡
    private setPlayerDeadState(playerID: string) {
        let player = this.dataInfo.getPlayer(playerID);
        if (!player) return;
        // 不可移动
        const cha = player.character;
        cha.movementEnabled = cha.jumpEnabled = false;
        const anim = PlayerManagerExtesion.rpcPlayAnimation(cha, "52998", 1, 1);
        setTimeout(() => {
            cha.setVisibility(mw.PropertyStatus.Off)
        }, anim.length * 1000)
        this.deadPlayer.add(playerID);
        this.getClient(player.mwPlayer).net_dead();
        setTimeout(() => {
            this.resurgence(playerID)
        }, 5000);
    }

    protected onUpdate(dt: number): void {

    }

    // 玩家请求复活
    resurgence(playerID: string) {
        const p = this.dataInfo.getPlayer(playerID)
        if (p.mwPlayer) {
            this.getClient(p.mwPlayer).net_resurgence();
            this.deadPlayer.delete(playerID);
            p.character.setVisibility(mw.PropertyStatus.On)
            ModuleService.getModule(BuffModuleS).clearAlllBuff(playerID)
            ModuleService.getModule(BuffModuleS).addABuff(playerID, 9, EBuffHostType.Player, false)
            ModuleService.getModule(BuffModuleS).addABuff(playerID, 10, EBuffHostType.Player, false)
            // 可移动
            p.character.movementEnabled = p.character.jumpEnabled = true;
            p.setHp(p.getAtt(Attribute.EAttType.maxHp))
            // 传送回复活点
        }
    }

    // 玩家受击脱战后1秒恢复生命值1%的血量
    @updater.updateByFrameInterval(1 / 0.1, "onUpdate")
    private checkPlayerRestTick() {
        let now = Date.now();
        for (let player of Player.getAllPlayers()) {
            let playerID = player.userId;
            const p = this.dataInfo.getPlayer(playerID)
            // 未初始化
            if (!p) continue
            // 死亡
            if (this.deadPlayer.has(playerID)) continue

            let lastBeHitTime: number;
            if (this.playerBeHitTimeStampRecode.has(playerID)) {
                lastBeHitTime = this.playerBeHitTimeStampRecode.get(playerID);
            } else {
                continue
            }
            // 十秒
            if (now - lastBeHitTime < 10000) continue;

            let maxHp = p.getAtt(Attribute.EAttType.maxHp);
            let hp = p.getAtt(Attribute.EAttType.hp);
            if (hp >= maxHp) continue;
            p.setHp(hp + maxHp * 0.07)
        }
    }


    private async addPlayer(player: mw.Player, oid, nick) {
        await player.character.asyncReady()
        let uid = player.userId
        let tsp = this.dataInfo.getPlayer(uid);
        if (!tsp)
            tsp = await addScript(PlayerDefine.playerScriptGuid, player.character, true);
        tsp?.initPlayer(player);
        tsp?.setInfo(oid, nick);
        //初始化玩家属性
        this.dataInfo.addPlayer(tsp)
    }
    // protected onDestroy(): void {
    //     super.onDestroy();
    // }
    net_upInfo(oid: string, nick: string) {
        this.addPlayer(this.currentPlayer, oid, nick);
    }
    // net_getInfo(uid: string): string {
    //     let tsp = this.dataInfo.getPlayer(uid);
    //     let data = {
    //         uid: uid,
    //         oid: tsp.openId,
    //         nick: tsp.nickName
    //     }
    //     return JSON.stringify(data);
    // }
    net_setTitle(type: number, title: string) {
        let tsp = this.dataInfo.getPlayer(this.currentPlayer.userId);
        tsp.setTitle(type, title);
    }
    net_setChat(msg: string, uid: string) {
        // let uid = this.currentPlayer.userId;
        let ps = this.dataInfo.getRangePlayer(this.currentPlayer.character.worldTransform.position, 1000, uid);
        ps.forEach((tsp) => {
            this.getClient(tsp.mwPlayer).net_Chat(uid, msg);
        });
    }

    public onDamage(num: number, uid: string) {
        if (this.dataInfo.getAtt(uid, Attribute.EAttType.hp) <= 0) {
            return
        }
        const p = this.dataInfo.onDamage(uid, num);
        if (p.isDead()) {
            this.setPlayerDeadState(uid)
        }

    }

    public net_damage(ids: string[], nums: number[]) {
        for (let i = 0; i < ids.length; i++) {
            let dag = i < nums.length ? nums[i] : 0;
            this.onDamage(dag, ids[i]);
        }
    }
}
