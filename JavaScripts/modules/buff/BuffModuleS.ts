import { GameConfig } from "../../config/GameConfig";
import { PlayerMgr } from "../../ts3/player/PlayerMgr";
import { BuffModuleC } from "./BuffModuleC";
import { BuffS } from "./base/BuffS";
import { AttibuteBuffS } from "./buffitems/AttibuteBuffS";
import { RigidityBuffS } from "./buffitems/RigidityBuffS";
import { UnControlBuffS } from "./buffitems/UnControlBuffS";
import { EBuffBenefitType, EBuffHostType, EBuffOverlayType } from "./comon/BuffCommon";
import { EventsName } from "../../const/GameEnum";
import Move from "../../SceneScript/Move";


export class BuffModuleS extends ModuleS<BuffModuleC, null>{
    public static ID = 1
    protected buffPools: BuffS[] = []

    override onAwake(): void {
        super.onAwake();
    }

    protected async onStart(): Promise<void> {
        let allElems: any = GameConfig.Buff.getAllElement()
        for (const elem of allElems) {
            if (Number(elem.actionGuid)) {
                await AssetUtil.asyncDownloadAsset(elem.actionGuid)
            }
        }

        allElems = GameConfig.Effect.getAllElement()
        for (const elem of allElems) {
            if (Number(elem.EffectID)) {
                await AssetUtil.asyncDownloadAsset(elem.EffectID)
            }
        }

        Event.addLocalListener(EventsName.ClearBuff, (guid: string, configId: number) => {
            this.clearAllBuffByConfig(guid, configId)
        })
    }

    public clearAllBuffByGuid() {

    }

    public clearAllBuffByConfig(guid: string, config: number) {
        const list = this.getBuffListByConfig(guid, config)
        if (list) {
            list.forEach(e => {
                e.onDestroy()
            })
        }
    }


    bool: boolean = false
    public net_addAbuff(configId: number) {
        this.bool = !this.bool
        Event.dispatchToLocal(Move.MoveEventTitle, this.bool);
        const guid = this.currentPlayer.userId
        this.addABuff(guid, configId, EBuffHostType.Player, false)
    }

    public addABuff(guid: string, configId: number, hostType: EBuffHostType, isClient: boolean = false) {
        const elem = GameConfig.Buff.getElement(configId)
        let tmpBUff: BuffS = null
        if (elem.overlayType == EBuffOverlayType.Only) {
            if (this.getBuffListByConfig(guid, configId).length == 1)
                return
        }

        if (elem.overlayType == EBuffOverlayType.Overlap) {
            for (const buff of this.buffPools) {
                if (buff.configId == configId && !buff.isActive && buff.hostType == hostType) {
                    tmpBUff = buff
                    break
                }
            }
        } else {
            for (const buff of this.buffPools) {
                if (buff.configId == configId && buff.hostType == hostType) {
                    tmpBUff = buff
                    break
                }
            }
        }

        if (!tmpBUff) {

            switch (elem.buffEffectType) {
                case EBuffBenefitType.None:
                    tmpBUff = new BuffS(configId, hostType, elem.buffEffectType, isClient)
                    break
                case EBuffBenefitType.PropertyChange:
                    tmpBUff = new AttibuteBuffS(configId, hostType, elem.buffEffectType, isClient)
                    break
                case EBuffBenefitType.UnControl:
                    tmpBUff = new UnControlBuffS(configId, hostType, elem.buffEffectType, isClient)
                    break
                case EBuffBenefitType.Stun:
                    tmpBUff = new RigidityBuffS(configId, hostType, elem.buffEffectType, isClient)
                    break
                default:
                    tmpBUff = new BuffS(configId, hostType, elem.buffEffectType, isClient)
                    break
            }
            this.buffPools.push(tmpBUff)
        }
        tmpBUff.start(guid)

        if (isClient) {
            //只在客户端单端表现
            const p = PlayerMgr.Inst.getPlayer(guid)
            this.getClient(p.mwPlayer).net_onAddABuff(guid, configId, hostType)
        }
    }

    public reduceABuff(guid: string, configId: number, hostType: EBuffHostType) {
        let tmpBUff: BuffS
        for (const buff of this.buffPools) {
            if (buff.isActive && buff.hostGuid == guid
                && buff.configId == configId && buff.hostType == hostType) {
                tmpBUff = buff
                break
            }
        }
        if (tmpBUff) {
            tmpBUff.onDestroy()
            if (tmpBUff.isClient) {
                //只在客户端单端表现
                const p = PlayerMgr.Inst.getPlayer(guid)
                this.getClient(p.mwPlayer).net_reduceBuffList(guid, [configId])
            }
        }
    }

    public clearAlllBuff(guid: string) {
        const lsit = this.getAllBuff(guid)
        let buffList: number[] = []
        lsit.forEach(e => {
            if (e.isClient) {
                buffList.push(e.configId)
            }
            e.onDestroy()
        })
        if (buffList.length > 0) {
            const p = PlayerMgr.Inst.getPlayer(guid)
            this.getClient(p.mwPlayer).net_reduceBuffList(guid, buffList)
        }
    }

    getBuffListByType(guid: string, type: EBuffBenefitType) {
        return this.buffPools.filter(e => e.hostGuid == guid && e.benefitType == type)
    }

    public getAllBuff(guid: string) {
        return this.buffPools.filter(e => e.hostGuid == guid)
    }

    /**
     *   获取物体身上一种buff
     */
    public getBuffListByConfig(guid: string, config: number) {
        return this.buffPools.filter(e => e.isActive && e.hostGuid == guid && e.configId == config)
    }

    protected onUpdate(dt: number): void {
        this.buffPools.forEach(buff => {
            buff.onUpdate(dt)
        })
    }

    protected onPlayerLeft(player: mw.Player): void {
        const lsit = this.getAllBuff(player.userId)
        lsit.forEach((e, i) => {
            e.onDestroy()
            this.buffPools.splice(i, 1)
        })
    }

}