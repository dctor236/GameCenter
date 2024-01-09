import { PlayerManagerExtesion, } from '../../../Modified027Editor/ModifiedPlayer';
import { GameConfig } from "../../../config/GameConfig";
import { ISkillElement } from "../../../config/Skill";
import { ISkillLevelElement } from "../../../config/SkillLevel";
import { EventsName, SkillState } from "../../../const/GameEnum";
import { Class, GlobalData } from "../../../const/GlobalData";
import { MyAction, MyAction as MyAction1, Tween } from "../../../ExtensionType";
import { BehaviorType, ISkillEntity, SkillItemType } from "../define/SkillDefine";
import { SkillRun } from "../runtime/SkillRun";
import SkillMgr from "../SkillMgr";
import SkillModule_Client from "../SkillModule_Client";

export default class SkillBase {
    private _skill: number = 0;
    public set skill(value: number) {
        this._skill = value;
        this.skillConfig = GameConfig.Skill.getElement(this._skill);
        if (this.skillConfig) {
            for (let i = 1; i <= 3; i++) {
                if (this.skillConfig["SkillConfig" + i] != null)
                    SkillRun.register(this._skill * 10 + (i - 1), this.skillConfig["SkillConfig" + i], this.comBehivor);
            }
        }
    }
    public get skill() {
        return this._skill;
    }

    private _skillID: number = 0;
    public set skillID(value: number) {
        this._skillID = value;
        this.skillLevelConfig = GameConfig.SkillLevel.getElement(this._skillID);
        this.maxCharge = this.skillLevelConfig.MaxCharge;
        if (this.cd <= this.skillLevelConfig.SkillCD) this.cdTotol = this.skillLevelConfig.SkillCD;
        if (this.charge === -1) this.charge = this.maxCharge;
    }
    public get skillID() {
        return this._skillID;
    }

    constructor(skill: number, host: string) {
        this.host = host;
        this.skill = skill;
        const go = GameObject.findGameObjectById(host);
        if (this.host && PlayerManagerExtesion.isCharacter(go)) this.character = go;
    }

    public init() { }

    public show(skillID: number, itemID: number) {
        this.skillID = skillID;
        this.itemID = itemID;
        this.State = this._state;
    }

    public disableState: number = 0
    public itemID: number = 0;
    public cdTotol: number = 0;
    public cd: number = -1;
    public host: string;
    public maxCharge: number = 1;
    public onChargeChange: MyAction1 = new MyAction1();
    private charge: number = -1;
    public set Charge(charge: number) {
        this.charge = charge;
        this.onChargeChange.call(this.charge);
    }
    public get Charge() {
        return this.charge;
    }

    protected character: mw.Character;
    public onStateChange: MyAction = new MyAction();
    private _state: SkillState = 0;

    public set State(state: SkillState) {
        this.setState(state);
    }
    public get State() {
        return this._state;
    }
    public setState(state: SkillState, ...params: any[]) {
        if (state == SkillState.Disable) {
            this.onOver();
        }
        this._state = state;
        this.onStateChange.call(this._state, ...params);
    }

    protected runtime: number = 0;
    protected skillConfig: ISkillElement;
    protected skillLevelConfig: ISkillLevelElement;

    public active(...params: any[]) {
        this.cdTotol = this.skillLevelConfig.SkillCD;
        this.onStart(...params);
    }

    public outStart() {
        return this.onStart()
    }

    /**
     * @description: 技能真正的开始
     * @param {array} params
     * @return {*}
     */
    protected onStart(...params: any[]): boolean {
        if (this.Charge == 0 || GlobalData.skillCD > 0 || this.character.isJumping) return false;
        if (!this.skillLevelConfig.CanMove) {
            this.character.movementEnabled = false;
            this.character.jumpEnabled = false;
        }
        let hitObj: string = "";
        if (this.skillConfig["SkillConfig" + (this.State + 1)]) {
            SkillRun.cast(this.character, this.skill * 10 + this.State, { pos: params[0], rot: params[1], diy: [hitObj, this.skillID] });
        }
        /**当一个技能释放成功时需要将所有技能都进入内置cd */
        GlobalData.skillCD = GlobalData.defaultCD;
        if (this.skillLevelConfig.RunTime && this.skillLevelConfig.RunTime[this.State]) {
            this.runtime = this.skillLevelConfig.RunTime[this.State];
            this.State++;
        } else {
            this.onOver();
        }
        Event.dispatchToLocal(EventsName.UseSkill, this.itemID, this.skillID);
        return true;
    }

    /**
     * @description: 代表一个技能放完并进入CD
     * @return {*}
     */
    protected onOver() {
        if (this.Charge == this.maxCharge) this.cd = GameConfig.SkillLevel.getElement(this.skillID).SkillCD;
        this.Charge--;
        this.State = SkillState.Enable;
        this.runtime = 0;
    }

    /**
     * @description: 技能命中后的回调
     * @return {*}
     */
    public onHit(hitObj: string, buffName: string, damage: number, damageRate: number, effect: number, music: number, hitLocation?: mw.Vector): boolean {
        if (this.host && hitObj != "") {
            if (!hitLocation) hitLocation = GameObject.findGameObjectById(hitObj).worldTransform.position
            return true
        }
        return true;
    }

    /**
     * @description: 当技能被从技能组中移除时
     * @return {*}
     */
    public onRemove() {
        this.onStateChange.clear();
        this.onChargeChange.clear();
    }

    public onUpdate(dt: number) {
        if (this.cd >= 0) {
            this.cd -= dt;
            if (this.cd <= 0) {
                this.Charge++;
            }
        }
        if (this.runtime > 0) {
            this.runtime -= dt;
            if (this.runtime <= 0) {
                this.onOver();
            }
        }
    }

    public comBehivor = (entity: ISkillEntity, type: BehaviorType, ...params) => {
        const character = Player.localPlayer.character;
        const config = GameConfig.SkillLevel.getElement(entity.param.diy[1]);
        switch (type) {
            case BehaviorType.CastStart:
                // console.log('开始释放引导');
                break;
            case BehaviorType.CastBreak:
                // console.log('释放中断')
                break;
            case BehaviorType.CastEnd:
                // console.log('释放引导完成')
                break;
            case BehaviorType.Event: //编辑器中事件模块的返回
                //事件ID
                break;
            case BehaviorType.ItemStart: //模块执行
                //模块类型
                if (params[0] == SkillItemType.Action && entity.value != 1) {
                    GlobalData.skillCD = params[2];
                }
                if (params[0] == SkillItemType.Put || (params[0] == SkillItemType.Effect && entity.value == 1)) {
                    if (config.SkillType != 1) break;
                }
                break;
            case BehaviorType.ItemEnd: //模块执行完成
                // console.log('模块执行完成')
                break;
            case BehaviorType.End: //所有技能模块执行完返回
                if (character && character.gameObjectId == entity.host.gameObjectId && !config.CanMove) {
                    character.movementEnabled = true;
                    character.jumpEnabled = true;
                }
                if (character && character.gameObjectId == entity.host.gameObjectId && config.SkillType == 2) {
                    let trrigerConfig = config.TrrigerConfig;
                    trrigerConfig = trrigerConfig.split("effect=")[1];
                    const effect = Number(trrigerConfig.substring(0, trrigerConfig.indexOf(",")));
                    const music = Number(trrigerConfig.split("music=")[1]) || 50;
                    this.onHit(entity.param.diy[0], config.BuffName ? config.BuffName[0] : "", config.Damage[0], config.DamageRate[0], effect, music);
                }
                // console.log('释放完成')
                break;
        }
    };
}
export function registerSkill(skill: number) {
    return function <T extends SkillBase>(constructor: Class<T>) {
        if (SystemUtil.isClient()) {
            SkillMgr.Inst.skillClassMap.set(skill, constructor);
        }
    };
}
