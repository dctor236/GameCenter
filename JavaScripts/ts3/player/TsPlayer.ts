import { GeneralManager, } from '../../Modified027Editor/ModifiedStaticAPI';
import { LogMgr } from "../com/LogMgr";
import HeadUI from "./PlayerHeadUI";
import { PlayerDefine, GamePlayerState } from "./PlayerDefine";
import { PlayerMgr } from "./PlayerMgr";
import { EventsName } from "../../const/GameEnum";
import { GameConfig } from "../../config/GameConfig";

@Component
export default class TsPlayer extends mw.Script {
    public userId: string;
    /***玩家信息 */
    @mw.Property({ replicated: true })
    public openId: string;
    @mw.Property({ replicated: true })
    public nickName: string;
    @mw.Property({ replicated: true })
    public title: string = '';
    @mw.Property({ replicated: true, onChanged: 'onTitleChanged' })
    public titleType: number = 0;
    // @mw.Property({ replicated: true })
    // public avatar: string;
    public readonly onHpChangeCb: Action1<number> = new Action1();//RMB变化
    /***属性信息 */
    @mw.Property({ replicated: true, onChanged: 'onHpChanged' })
    public hpMax: number = 100;
    /***属性信息 */
    @mw.Property({ replicated: true, onChanged: 'onHpChanged' })
    public hp: number = 100;
    @mw.Property({ replicated: true, onChanged: '' })
    public critRate: number = 100;
    @mw.Property({ replicated: true, onChanged: '' })
    public critDamgeRate: number = 100;
    @mw.Property({ replicated: true, onChanged: '' })
    public defense: number = 100;
    @mw.Property({ replicated: true, onChanged: '' })
    public atk: number = 100;
    public lastHp: number = 0
    /***状态信息,暂不同步 */
    @mw.Property({ replicated: true, onChanged: 'onStateChange' })
    public state: GamePlayerState = GamePlayerState.None;

    /***对象信息 */
    public mwPlayer: mw.Player;
    public character: mw.Character;
    public headUI: HeadUI;

    //播放胜利特效
    public vicotrEffTimer = null
    public isContineue: boolean = false
    public effid: number = -1

    public playVictorEff() {
        if (this.effid != -1) return
        this.isContineue = true
        const effElm = GameConfig.Effect.getElement(69)
        this.effid = GeneralManager.rpcPlayEffectOnPlayer(effElm.EffectID, this.mwPlayer, effElm.EffectPoint, 0,
            new Vector(effElm.EffectLocation), new Rotation(effElm.EffectRotate), new Vector(effElm.EffectLarge))
    }

    public stopPlayVictorEff(time: number = 0) {
        if (time == 0) {
            this.isContineue = false
            if (this.vicotrEffTimer) {
                clearTimeout(this.vicotrEffTimer)
                this.vicotrEffTimer = null
            }
            if (this.effid != -1) {
                EffectService.stop(this.effid)
                this.effid = -1
            }
        } else {
            this.vicotrEffTimer = setTimeout(() => {
                if (this.vicotrEffTimer) {
                    clearTimeout(this.vicotrEffTimer)
                    this.vicotrEffTimer = null
                }
                if (this.effid != -1) {
                    EffectService.stop(this.effid)
                    this.effid = -1
                }
                this.isContineue = false
            }, time * 1000);
        }
    }

    setPlayerState(state: GamePlayerState) {
        this.state = state
        if (this.state == GamePlayerState.OutofBattle) {
            this.stopPlayVictorEff(5)
        }
    }

    private inited = false;
    onStart() {
        if (!this.gameObject)
            return;
        if (SystemUtil.isClient()) {
            this.onInit()
        }
    }

    async onInit() {
        await this.gameObject.asyncReady()
        await TimeUtil.delaySecond(1.5)
        this.useUpdate = true;
        let char = this.gameObject as mw.Character;
        if (char && char.player)
            this.initPlayer(char.player);
        else {
            let ps = Player.getAllPlayers();
            for (let p of ps) {
                if (p.character && p.character.gameObjectId == this.gameObject.gameObjectId) {
                    this.initPlayer(p);
                    break;
                }
            }
        }
        if (PlayerDefine.headBit > 0) {
            this.setHeadUI(PlayerDefine.otherHeadRes, PlayerDefine.HeadUI);
            this.showHead(PlayerDefine.headBit);
        }
    }

    protected onUpdate(dt: number): void {
        if (PlayerDefine.inited && !this.inited) {
            Event.dispatchToLocal(PlayerDefine.Event_Player_Start, this);
            this.inited = true;
        }
        if (!this.inited)
            return;
        if (this.headUI)
            this.headUI.update(dt);
    }
    /**
     * 初始化玩家
     * @param player 玩家
     * @returns 
     */
    public initPlayer(player: mw.Player) {
        if (!player) {
            LogMgr.Inst.error('player is null')
            return;
        }
        this.userId = player.userId;
        this.mwPlayer = player;
        this.character = player.character;
    }

    public setInfo(oid, name) {
        this.openId = oid;
        this.nickName = name;
    }
    public setTitle(type: number, title: string) {
        this.titleType = type;
        this.title = title;
    }
    /**
     * 是否已退出
     */
    public isOut() {
        return !this.mwPlayer || !this.mwPlayer.userId;
    }


    /*****属性操作 */
    public setHp(num: number) {
        if (num == undefined)
            return;
        this.hp = num;
        if (this.hp <= 0) {
            this.hp = 0;
            this.onDead();
        } else if (this.hp > this.hpMax)
            this.hp = this.hpMax;
        if (this)
            this.showHp();
    }
    public setHpMax(num: number) {
        if (num == undefined)
            return;
        this.hpMax = num;
        this.showHp();
    }
    public setCritRate(num: number) {
        if (num == undefined)
            return;
        this.critRate = num;
    }

    public setCriteDamageRate(num: number) {
        if (num == undefined)
            return;
        this.critDamgeRate = num;
    }
    public setDefence(num: number) {
        if (num == undefined)
            return;
        this.defense = num;
    }

    public setAtk(num: number) {
        if (num == undefined)
            return;
        this.atk = num;
    }

    public isDead() {
        return this.hp <= 0
    }

    /**
     * 设置头顶UI
     */
    public setHeadUI(resId: string, view) {
        if (SystemUtil.isServer())
            return;
        let widget = this.character.overheadUI;
        widget.setUIbyID(resId);
        //widget.drawSize = pos;
        this.headUI = new view();
        this.headUI.init(widget);
        this.showName(this.nickName);
        let name = GameConfig.SquareLanguage.Danmu_Content_1106.Value
        this.showTitle(1, name);
        this.showHp();
        return widget;
    }

    /**
     * 头顶显示聊天信息
     * @param msg 信息
     */
    public showChat(msg: string) {
        if (this.headUI)
            this.headUI.showChat(msg);
    }
    public showTitle(type: number, title: string) {
        if (this.headUI)
            this.headUI.showTitle(type, title);
    }
    public showName(name: string) {
        if (this.headUI)
            this.headUI.showName(name);
    }
    public showHp(damage: number = 0) {
        if (PlayerMgr.Inst.isMainPlayer(this)) {
            Event.dispatchToLocal(EventsName.OnPlayerHpChange, this.hp / this.hpMax * 100)
        }
        if (this.headUI && PlayerMgr.Inst.getPlayer(this.userId)) {
            this.headUI.showHp(this.hp, this.hpMax);
        }
    }

    public showHead(bit: number) {
        if (SystemUtil.isServer())
            return;
        if (!this.headUI)
            this.setHeadUI(PlayerDefine.otherHeadRes, PlayerDefine.HeadUI);
        if (this.headUI)
            this.headUI.showHead(bit);
    }

    public onDamage(num: number) {
        let hp = this.hp - num;
        this.setHp(hp);
    }

    onTitleChanged() {
        this.showTitle(this.titleType, this.title);
    }

    /*****交互操作 */
    onInteract(enter: boolean) {

    }
    onHpChanged() {
        const damage = this.lastHp - this.hp
        this.lastHp = this.hp
        this.showHp(damage);
    }

    private onDead() {

    }

    onDestroy() {
        super.onDestroy()
        this.headUI?.onDestroy()
        this.headUI = null
    }

    private onStateChange() {

    }
}

