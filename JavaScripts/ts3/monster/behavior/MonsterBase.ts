import { GameConfig } from "../../../config/GameConfig";
import { IMonsterElement } from "../../../config/Monster";
import MonsterSkillMS from "../../../modules/fight/monsterSkill/MonsterSkillMS";
import { updater } from "../../../modules/fight/utils/Updater";
import { MGSMsgHome } from "../../../modules/mgsMsg/MgsmsgHome";
import { StateMachine } from "../../../utils/StateMachine";
import { MonsterCfg, EMonsterBehaviorState, EMonserState } from "../MonsterDefine";

//怪物基础行为
export class MonsterBase {
    protected host: mw.GameObject;
    protected info: MonsterCfg = null
    public pos: mw.Vector;
    protected config: IMonsterElement
    protected fsm: StateMachine<EMonsterBehaviorState> = new StateMachine();
    /**存活时间 */
    protected lifeTime: number = 0
    /**当前的目标 */
    protected target: mw.GameObject = null
    protected targetPos: Vector = Vector.zero
    /**用到的计时器 */
    protected timerList = []
    public hpCallBack: Action2<number, boolean> = new Action2()
    protected curHp: number = 0
    protected maxHp: number = 0
    //所有技能id
    protected ownSkills: number[] = []
    /**是否是强制死亡 */
    isForce: boolean = false
    protected monsterStateCb: (state: EMonserState) => void
    constructor(obj: mw.GameObject, cfg: MonsterCfg, monsterStateCb: (state: EMonserState) => void) {
        this.init(obj, cfg)
        this.monsterStateCb = monsterStateCb
    }

    protected async init(obj: mw.GameObject, cfg: MonsterCfg) {
        await obj.asyncReady()
        await TimeUtil.delaySecond(1)
        this.host = obj;
        this.info = cfg;
        this.config = GameConfig.Monster.getElement(cfg.config)
        this.lifeTime = 0
        this.hpCallBack.add(this.onHpChange.bind(this))
        this.fsm.register(EMonsterBehaviorState.Idle, { enter: this.onIdle.bind(this), update: this.idleUpdate.bind(this), exit: this.idleExit.bind(this) })
        this.fsm.register(EMonsterBehaviorState.Attack, { enter: this.onAtk.bind(this), update: this.atkUpdate.bind(this), exit: this.atkExit.bind(this) })
        this.fsm.register(EMonsterBehaviorState.AttackPrepare, { enter: this.onAtkPrepare.bind(this), update: this.atkPrepareUpdate.bind(this), exit: this.atkPrepareExit.bind(this) })
        this.fsm.register(EMonsterBehaviorState.Move, { enter: this.onMove.bind(this), update: this.moveUpdate.bind(this), exit: this.moveExit.bind(this) })
        this.fsm.register(EMonsterBehaviorState.Target, { enter: this.onTarget.bind(this), update: this.targetUpdate.bind(this), exit: this.targetExit.bind(this) })
        this.fsm.register(EMonsterBehaviorState.TargetPrepare, { enter: this.onTargetPrepare.bind(this), update: this.targetPrepareUpdate.bind(this), exit: this.targetPrepareExit.bind(this) })
        this.fsm.register(EMonsterBehaviorState.Dead, { enter: this.onDead.bind(this), update: this.deadUpdate.bind(this), exit: this.deadExit.bind(this) })
        this.fsm.register(EMonsterBehaviorState.Show, { enter: this.onShow.bind(this), update: this.showUpdate.bind(this), exit: this.showExit.bind(this) })
        this.fsm.register(EMonsterBehaviorState.Sleep, { enter: this.onSleep.bind(this), update: this.sleeptUpdate.bind(this), exit: this.sleepExit.bind(this) })
    }

    protected isBegin = false
    protected isPush = false
    /**正在刷新时间 */
    protected isRefresh = false
    private lifeUpdate(dt: number) {
        this.lifeTime += dt
        if (!this.isRefresh) {
            if (!this.isBegin && this.lifeTime >= 10) {
                this.isBegin = true
                this.changeState(EMonsterBehaviorState.Show)
                this.monsterStateCb(EMonserState.Relive)
            } else if (!this.isPush && this.lifeTime >= this.config.PushNoticeTime) {
                this.isPush = true
            } else if (this.lifeTime >= 10 + this.config.ActiveTime) {
                this.isForce = true
                this.changeState(EMonsterBehaviorState.Dead)
                this.monsterStateCb(EMonserState.Dead)
            }
        } else {
            if (this.lifeTime >= this.config.AppearTime) {
                this.lifeTime = 0
                this.isRefresh = false
            }
        }
    }

    /**一血 */
    protected isFirstBlood: boolean = false

    protected onHpChange(hp: number, isForce: boolean) {
        this.isForce = isForce
        if (!this.isForce && !this.isFirstBlood && hp < this.curHp) {
            this.isFirstBlood = true
            const p = Player.getAllPlayers()[0]
            MGSMsgHome.uploadMGS('ts_game_result', '每次刷新后火龙第一次受到伤害，打一个点', { record: 'hurt_dragon' }, p)
        }
        this.curHp = hp;
        if (this.maxHp == 0) {
            this.maxHp = hp;
        }
    }

    protected onIdle(...data: any) {
    }
    protected idleUpdate(dt: number, eslapsed: number) {
        this.lifeUpdate(dt)
    }
    protected idleExit() {
        //10s延迟以防龙的位置歪了
        this.lifeTime = 10
    }

    protected onAtk(...data: any) {
    }
    protected atkUpdate(dt: number, eslapsed: number) {
    }
    protected atkExit() {
    }

    protected onAtkPrepare(...data: any) {
    }
    protected atkPrepareUpdate(dt: number, eslapsed: number) {
    }
    protected atkPrepareExit() {
    }

    protected onMove(...data: any) {
    }
    protected moveUpdate(dt: number, eslapsed: number) {
    }
    protected moveExit() {
    }

    protected onTargetPrepare(...data: any) {
    }
    protected targetPrepareUpdate(dt: number, eslapsed: number) {
    }
    protected targetPrepareExit() {
    }

    protected onTarget(...data: any) {
    }
    protected targetUpdate(dt: number, eslapsed: number) {
    }
    protected targetExit() {
    }

    protected onDead(...data: any) {
        this.timerList.forEach(e => {
            clearInterval(e)
            clearTimeout(e)
            e = null
        })
        this.timerList.length = 0
        // this.clearAllSkills()
        this.ownSkills.length = 0
    }
    protected deadUpdate(dt: number, eslapsed: number) {
    }
    protected deadExit() {
        this.isFirstBlood = false
        this.isBegin = false
        this.isPush = false
        this.isRefresh = true
        this.lifeTime = 0
    }
    protected onShow(...data: any) {
        this.changeState(EMonsterBehaviorState.Idle)
    }
    protected showUpdate(dt: number, eslapsed: number) {
        this.lifeUpdate(dt)
    }
    protected showExit() {
    }

    protected onSleep(...data: any) {
    }
    protected sleeptUpdate(dt: number, eslapsed: number) {
        this.lifeUpdate(dt)
    }
    protected sleepExit() {
    }


    public changeState(state: EMonsterBehaviorState, ...data: any) {
        this.fsm.switch(state, ...data)
    }

    @updater.updateByFrameInterval(20)
    public update(dt: number) {
        this.fsm.update(dt)
    }

    public getCurState() {
        return this.fsm.getStateInfo().state
    }

    public clearAllSkills() {
        if (this.ownSkills && this.ownSkills.length > 0) {
            ModuleService.getModule(MonsterSkillMS).InvokeSkill(this.host.gameObjectId, this.ownSkills)
        }
    }

}