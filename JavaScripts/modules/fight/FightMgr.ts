import { GameConfig } from "../../config/GameConfig";
import { EventsName } from "../../const/GameEnum";
import { MyBoolean } from "../../const/GlobalData";
import { EMonsterBehaviorState } from "../../ts3/monster/MonsterDefine";
import { MonsterMgr } from "../../ts3/monster/MonsterMgr";
import { GamePlayerState } from "../../ts3/player/PlayerDefine";
import { PlayerMgr } from "../../ts3/player/PlayerMgr";
import TsPlayer from "../../ts3/player/TsPlayer";
import SpiritModuleC from "../spirit/SpiritModuleC";
import { Attribute } from "./attibute/Attribute";
import { EMonsterType } from "./FightDefine";

export default class FightMgr {
    private static _instance: FightMgr;

    public static get instance(): FightMgr {
        if (FightMgr._instance == null) {
            FightMgr._instance = new FightMgr();
        }
        return FightMgr._instance;
    }
    public playerAttributeMap: Map<string, Attribute.AttributeValueObject> = new Map();
    public monsterAttributeMap: Map<string, Attribute.AttributeValueObject> = new Map();
    public damageMap: Map<string, { pid: number, damage: number, leader: number }[]> = new Map()
    private timeList = []
    //前一个第一名
    private lastOne: number = -1

    public onPlayerEnterGame(player: mw.Player) {
        this.initPlayeyAtt(player)
    }


    public onPlayerLeft(player: mw.Player): void {
        const uid = player.userId
        this.playerAttributeMap.delete(uid);
        this.damageMap.forEach(vec => {
            let index = vec.findIndex(e => e.pid == player.playerId)
            if (index != -1) {
                vec.splice(index, 1)
            }
        })
    }

    public creatMonsterInfo(guid: string) {
        if (!this.damageMap.has(guid)) {
            this.damageMap.set(guid, [])
            this.timeList.push(setInterval(() => {
                this.showNumOne(guid)
            }, 1000))
        }

    }

    public loadPlayerDamage(guid: string, pid: number, damgae: number) {
        let vec = []
        vec = this.damageMap.get(guid)
        let playerInfo = vec.find(e => e.pid == pid)
        if (!playerInfo) {
            playerInfo = {
                pid: pid, damage: 0, leader: 0
            }
            vec.push(playerInfo)
            // this.print()
        }
        playerInfo.damage = playerInfo.damage + damgae
        this.damageMap.set(guid, vec)
    }

    public getPlayerDamage(guid: string, pid: number) {
        if (!this.damageMap.has(guid)) { return null }
        const vec = this.damageMap.get(guid).sort((a, b) => {
            return b.damage - a.damage
        })
        let res = vec.find(e => e.pid == pid)
        if (!res) return null
        res.leader = vec.indexOf(res)
        return res
    }

    public clearMonsterDamageInfo(guid: string) {
        if (!this.damageMap.has(guid)) { return }
        this.damageMap.delete(guid)
    }

    //todo 玩家第一显示特效
    private showNumOne(mid: string) {
        if (!this.damageMap.has(mid)) { return }
        if (this.damageMap.get(mid).length <= 0) {
            return
        }
        let vec = this.damageMap.get(mid).sort((a, b) => {
            return b.damage - a.damage
        })
        this.damageMap.set(mid, vec)

        if (vec[0].damage == 0) {
            return
        }
        let curP: TsPlayer = null
        const curOne = vec.find(e => {
            const p = Player.getPlayer(e.pid)
            if (!p) {
                return false
            } else {
                const curPid = p.userId
                curP = PlayerMgr.Inst.getPlayer(curPid)
                return (curP.state == GamePlayerState.Battle)
            }
        })

        if (!curOne) {
            return
        }

        let lstTsP: TsPlayer = null
        if (this.lastOne != -1) {
            let lastP = Player.getPlayer(this.lastOne)
            if (!lastP) {
                this.lastOne = -1
            } else {
                const latsPid = lastP.userId
                lstTsP = PlayerMgr.Inst.getPlayer(latsPid)
            }
        }

        if (this.lastOne != -1 && this.lastOne != curOne.pid && vec[0].pid != this.lastOne) {
            lstTsP.stopPlayVictorEff()
        }

        if (!lstTsP || !lstTsP.isContineue) {
            this.lastOne = curOne.pid
            curP.playVictorEff()
        }
    }

    print() {
        this.damageMap.forEach((k, v) => {
        })
    }



    protected particleList: mw.Effect[] = []

    protected EffList: string[] = []

    public init() {
        if (SystemUtil.isServer()) {
            let state = true
            Event.addClientListener("CloshAllMonset", (player, bool: boolean) => {
                const m = MonsterMgr.Inst.getAllMonser()
                state = !state
                for (const item of m) {
                    if (state) {
                        item.setBehaviorState(EMonsterBehaviorState.Show)
                    }
                    else {
                        item.setBehaviorState(EMonsterBehaviorState.Dead)
                    }
                }
            })


        } else {
            Event.addServerListener("InitDraggonEff", (DragonBodyEff: string[], DragonDeadEff: string[], DragonFlashEff: string[]) => {
                if (this.EffList.length > 0) return
                this.EffList = DragonBodyEff.concat(DragonDeadEff).concat(DragonFlashEff)
                this.EffList.forEach(effID => {
                    GameObject.asyncFindGameObjectById(effID).then(o => {
                        const eff = o as mw.Effect
                        eff.loop = true
                        eff.play()
                        if (DragonDeadEff.indexOf(effID) != -1 ||
                            DragonFlashEff.indexOf(effID) != -1) {
                            this.setVisable(false, eff)
                        } else {
                            this.setVisable(true, eff)
                        }
                        this.particleList.push(eff)

                    })
                })

                Event.addServerListener(EventsName.ControlDragonEffList, (list: string[], bool: boolean) => {
                    list.forEach(e => {
                        const res = this.particleList.find(eff => eff.gameObjectId == e)
                        if (res) {
                            this.setVisable(bool, res)
                        }
                    })

                    this.EffList.forEach(E => {
                        const res = this.particleList.find(eff => eff.gameObjectId == E)
                        if (!list.find(e => e == E)) {
                            this.setVisable(!bool, res)
                        }
                    })
                })
            })
        }
    }

    setVisable(state: boolean, obj: mw.GameObject) {
        if (state) {
            obj.setVisibility(mw.PropertyStatus.On)
        } else {
            obj.setVisibility(mw.PropertyStatus.Off)
        }
    }

    public registAttibuteMonser(guid: string, att: Attribute.AttributeValueObject) {
        this.monsterAttributeMap.set(guid, att)
    }

    /**获取怪物属性 */
    public getMAttibuteList(uid: string) {
        return this.monsterAttributeMap.get(uid)
    }


    /**           玩家                   */
    //刚进游戏初始化玩家属性
    initPlayeyAtt(player: mw.Player) {
        let attrVo: Attribute.AttributeValueObject
        let playerID = player.userId;
        let originalHp: number
        if (this.playerAttributeMap.has(playerID)) {
            let origVo = this.getPAttibuteList(playerID)
            originalHp = origVo.getValue(Attribute.EAttType.hp) // 缓存变更前血量
            attrVo = origVo.clear()
        }
        else {
            attrVo = new Attribute.AttributeValueObject();
        }
        // 初始属性
        const elem = GameConfig.BaseAttribute.getElement(1)
        for (let i = 0; i < elem.AttrType.length; i++) {
            const attType = elem.AttrType[i]
            const val = elem.AttrValueFactor[i][MathUtil.randomInt(0, 1)]
            attrVo.addValue(attType, val);
        }
        this.playerAttributeMap.set(playerID, attrVo);
    }

    public getPAttibuteList(uid: string) {
        return this.playerAttributeMap.get(uid)
    }

    //                   计算伤害
    calculatePDamage() {
        const p = PlayerMgr.Inst.mainPlayer
        const isCrit = p.getAtt(Attribute.EAttType.crit) > Math.random() * 100 ? 1 : 0
        const atk = p.getAtt(Attribute.EAttType.atk)
        // 暴击系数
        let critDamage = p.getAtt(Attribute.EAttType.critDamage) / 100
        let critSeries = isCrit * critDamage + 1
        let damage = atk * critSeries
        // 向下取整
        damage = Math.round(damage)
        return { data: damage, crit: MyBoolean(isCrit) }
    }

    calculateMDamage(mid: string) {
        const m = MonsterMgr.Inst.getMonster(mid)
        if (!m) { return }
        const atk = m.getAtt(Attribute.EAttType.atk)
        // 暴击系数
        let damage = atk
        // 向下取整
        damage = Math.round(damage)
        return damage
    }

    calculateSDamage(spiritID: string, atk: number) {
        const s = ModuleService.getModule(SpiritModuleC).getSpiritByGuid(spiritID)
        if (!s) { return }
        const isCrit = s.att.getValue(Attribute.EAttType.crit) > Math.random() * 100 ? 1 : 0
        // const atk = GameConfig.BaseAttribute.getElement(s.id)
        // const atk = s.att.getValue(Attribute.EAttType.atk)
        // 暴击系数
        let critDamage = s.att.getValue(Attribute.EAttType.critDamage) / 100
        let critSeries = isCrit * critDamage + 1
        let damage = atk * critSeries
        // 向下取整
        damage = Math.round(damage)
        return { data: damage, crit: MyBoolean(isCrit) }
    }

}

export enum EDragonEffControl {
    Flash,
    Dead,
    Body
}