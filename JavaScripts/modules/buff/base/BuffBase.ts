import { GeneralManager, } from '../../../Modified027Editor/ModifiedStaticAPI';
import { PlayerManagerExtesion, } from '../../../Modified027Editor/ModifiedPlayer';
import { IBuffElement } from "../../../config/Buff";
import { IEffectElement } from "../../../config/Effect";
import { GameConfig } from "../../../config/GameConfig";
import { EventsName } from "../../../const/GameEnum";
import { MonsterMgr } from "../../../ts3/monster/MonsterMgr";
import { PlayerMgr } from "../../../ts3/player/PlayerMgr";
import { EBuffBenefitType, EBuffHostType, EBuffLifecycleType, EBuffOverlayType } from "../comon/BuffCommon";

export abstract class BuffBase {
    /**
     * 动态唯一id
     */
    protected _id: number = 0;
    public get id(): number {
        return this._id;
    }

    protected eff: number = null

    protected _active: boolean = false;
    public get isActive(): boolean {
        return this._active;
    }

    protected _hostGuid: string = null;
    public get hostGuid(): string {
        return this._hostGuid;
    }


    protected _host: mw.GameObject = null;
    public get host(): mw.GameObject {
        return this._host;
    }

    protected anim: mw.Animation = null

    //特效音效  在客戶端表現還是全部玩家都可以看见
    public isClient: boolean = true
    public benefitType: EBuffBenefitType = EBuffBenefitType.None
    constructor(configId: number, hostType: EBuffHostType, benefitType: EBuffBenefitType, isClient: boolean) {
        this.hostType = hostType
        this.isClient = isClient
        this._configId = configId
        this.benefitType = benefitType
        this._config = GameConfig.Buff.getElement(configId)
        this.onInit()
        if (this.config.actionGuid) {
            AssetUtil.asyncDownloadAsset(this.config.actionGuid)
        }
    }

    onInit() {

    }

    public hostType: EBuffHostType

    protected _configId: number = 0;
    public get configId(): number {
        return this._configId;
    }


    protected _config: IBuffElement;
    public get config(): IBuffElement {
        return this._config;
    }

    /**经过时间 */
    protected _elspseTime: number = 0;
    public get elspse(): number {
        return this._elspseTime;
    }

    /**生命时间 */
    protected _duration: number = 0;
    public get duration(): number {
        return this._duration;
    }


    public onStart() {
        //消除buff
        if (this.config.removeBuff && this.hostGuid) {
            this.config.removeBuff.forEach(e => {
                Event.dispatchToLocal(EventsName.ClearBuff, this.hostGuid, e)
            })
        }

        if (this.elspse == 0) {
            this._active = true
        } else {
            //续上buff
            switch (this.config.overlayType) {
                case EBuffOverlayType.AddTime:
                    this._duration += this.config.duration
                    break
                case EBuffOverlayType.RefreshTime:
                    // this._duration = this.config.duration
                    this._elspseTime = 0
                    break
                default:
                    break
            }
        }
    }

    protected onExcete() {
    }

    public onUpdate(dt: number) {
        if (!this._active || this.config.lifecycleType == EBuffLifecycleType.Forever) return
        this._elspseTime += dt
        // console.log("onUpdate", this._configId, this._id, this._elspseTime, this._duration)
        if (this._elspseTime >= this.duration) {
            this.onDestroy()
        }

        if (this.isClient && SystemUtil.isServer()) { return }
        if (!this.isClient && SystemUtil.isClient()) { return }

        if (this._elspseTime >= this.config.effectDelayTime) {
            this.onExcete()
            if (this.eff || !Number(this.config.effect)) {
                return
            }
            this.playAction()
            const effElem = GameConfig.Effect.getElement(this.config.effect)
            switch (this.hostType) {
                case EBuffHostType.None:
                    this.playEffectInPlace(effElem)
                    break
                case EBuffHostType.Player:
                    this.playEffectInPlayer(effElem)
                    break
                case EBuffHostType.GameObject:
                    this.playEffectInGameObject(effElem)
                    break
            }
        }
    }

    public start(host: string) {
        this._hostGuid = host
        switch (this.hostType) {
            case EBuffHostType.None:
                this._host = null
                break;
            case EBuffHostType.GameObject:
                this._host = MonsterMgr.Inst.getMonster(this.hostGuid).gameObject
                break;
            case EBuffHostType.Player:
                this._host = PlayerMgr.Inst.getPlayer(this.hostGuid).mwPlayer.character
                break;
        }
        this.onStart()
    }

    public playEffectInGameObject(effElem: IEffectElement) {
        this.eff = GeneralManager.rpcPlayEffectOnGameObject(effElem.EffectID, this.host, effElem.EffectTime, effElem.EffectLocation, new Rotation(effElem.EffectRotate), effElem.EffectLarge);
    }

    public playEffectInPlace(effElem: IEffectElement) {
        this.eff = GeneralManager.rpcPlayEffectAtLocation(effElem.EffectID, effElem.EffectLocation, effElem.EffectTime, new Rotation(effElem.EffectRotate), effElem.EffectLarge);
    }


    //播放特效音效
    public playEffectInPlayer(effElem: IEffectElement) {
        if (this.host instanceof mw.Player) {
            this.eff = GeneralManager.rpcPlayEffectOnPlayer(
                effElem.EffectID, this.host, effElem.EffectPoint, effElem.EffectTime, effElem.EffectLocation, new Rotation(effElem.EffectRotate), effElem.EffectLarge);
        }
    }
    protected _curStance: mw.SubStance
    protected playAction() {
        if (this.anim || !Number(this.config.actionGuid)) return
        if (this.host instanceof mw.Player) {
            // this._curStance = PlayerManagerExtesion.loadStanceExtesion(this.host.character, "4175");
            // if (this._curStance) {
            //     this._curStance.blendMode = mw.StanceBlendMode.BlendUpper;
            //     this._curStance.play()
            // }
            this.anim = PlayerManagerExtesion.rpcPlayAnimation(this.host.character, this.config.actionGuid, this.config.loop, 1)
            // this.anim = PlayerManagerExtesion.loadAnimationExtesion(this.host.character, this.config.actionGuid, true)
            // this.anim.play()
            // this.anim.loop = this.config.loop
        }
    }

    public onDestroy() {
        if (this.eff) {
            EffectService.stop(this.eff);
            this.eff = null
        }
        this._curStance?.stop()
        if (this.anim) {
            this.anim.stop()
            this.anim = null
        }
        this.benefitType = EBuffBenefitType.None
        this._active = false
        this._host = null;
        this._hostGuid = null
        this._elspseTime = 0
        this._duration = this.config.duration
    }
}