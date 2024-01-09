import { GameConfig } from "../../config/GameConfig";
import { EventsName, PlayerStateType, SkillState } from "../../const/GameEnum";
import { GlobalData } from "../../const/GlobalData";
import { UIManager } from "../../ExtensionType";
import { MGSMsgHome } from "../mgsMsg/MgsmsgHome";
import SkillBase from "./logic/SkillBase";
import { SkillData } from "./SkillData";
import SkillMgr from "./SkillMgr";
import SkillModule_Server from "./SkillModule_Server";
import SkillUI from "./ui/SkillUI";


/**
 * 技能模块 客户端 控制非广场物品的技能
 */
export default class SkillModule_Client extends ModuleC<SkillModule_Server, SkillData> {
	private _skillMap: Map<PlayerStateType, SkillBase[]> = new Map()
	private _callArr: any[] = []
	private _skillUI: SkillUI;
	private _curSkill: SkillBase[] = [null, null, null, null];
	protected onStart(): void {
		this._skillUI = UIManager.show(SkillUI);

		playerScale.x = playerScale.y = playerScale.z = this.localPlayer.character.worldTransform.scale.x;

		Event.addLocalListener(EventsName.UseSkill, (itemID: number, skillID: number) => {
			MGSMsgHome.useSkill(skillID);
		});
		const guid = this.localPlayer.character.gameObjectId;
		this.registerSkill();
		for (const element of SkillMgr.Inst.skillClassMap) {
			setTimeout(() => {
				this._callArr.push(() => {
					let skill = new element[1](element[0], guid)
					skill.init()
					if (!this._skillMap.has(skill.disableState)) {
						this._skillMap.set(skill.disableState, []);
					}
					let arr = this._skillMap.get(skill.disableState);
					arr.push(skill)
				})
			}, 2000);
		}
		Event.addLocalListener(EventsName.PLAYER_STATE, (stateType: number, active: boolean) => {
			this.setState(stateType, active)
		})
	}


	/**
	 * 注册技能
	 */
	private registerSkill() {
		for (const config of GameConfig.Skill.getAllElement()) {
			if (!SkillMgr.Inst.skillClassMap.has(config.ID)) {
				SkillMgr.Inst.skillClassMap.set(config.ID, SkillBase);
			}
		}
	}

	/**
	 * 通过技能id查找技能
	 * @param skillID 技能id
	 * @returns 
	 */
	public findSkill(skillID: number): SkillBase {
		let skillbase: SkillBase = null
		this._skillMap.forEach(arr => {
			for (const skill of arr) {
				if (skill.skill == skillID) {
					skillbase = skill
					return;
				}
			}
		});
		return skillbase;
	}

	/**
	 * 设置技能状态
	 * @param state 状态
	 * @param isActive on/off
	 */
	public setState(state: PlayerStateType, isActive: boolean) {
		if (this._skillMap.has(state)) {
			const arr = this._skillMap.get(state)
			for (const skill of arr) {
				if (isActive) skill.State = SkillState.Disable
				else if (skill.State == SkillState.Disable) skill.State = SkillState.Enable
			}
		}
	}

	/**
	 * 使用技能
	 * @param skills 技能id列表
	 * @param itemID 物品id
	 * @param isStart 是否技能start
	 */

	public getSkillUI(skills: number[], itemID: number = 0, isStart: boolean = false) {
		if (!skills) {
			skills = [];
		}
		const skillItemArr = this._skillUI.skillItemArr;
		for (const iterator of skillItemArr) {
			iterator.hide();
		}
		for (let i = 0; i < this._curSkill.length; i++) {
			if (this._curSkill[i]) {
				this._curSkill[i].onRemove();
				this._curSkill[i] = null;
			}
		}
		for (let i = 0; i < skills.length; i++) {
			const ID = Number((skills[i] / 100).toFixed(0));
			const skill: SkillBase = this.findSkill(ID);
			if (skill) {
				if (isStart) {
					skill.outStart()
				}
				console.log("技能UI显示 + ", skills[i], ID)
				skill.show(skills[i], itemID);
				skillItemArr[i].show(skill);
				this._curSkill[i] = skill;
			}
		}
	}

	protected onUpdate(dt: number): void {
		if (GlobalData.skillCD >= 0) {
			GlobalData.skillCD -= dt;
		}
		if (this._callArr.length > 0) {
			this._callArr.pop()();
		}
		this._skillMap.forEach(arr => {
			for (const skill of arr) {
				skill.onUpdate(dt)
			}
		});
	}
}
export const playerScale: mw.Vector = new mw.Vector();
