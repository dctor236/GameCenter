import { GeneralManager, } from '../../Modified027Editor/ModifiedStaticAPI';
/**
* @Author       : 田可成
* @Date         : 2023-04-17 14:36:24
* @LastEditors  : 田可成
* @LastEditTime : 2023-06-08 09:28:04
* @FilePath     : \mollywoodschool\JavaScripts\modules\skill\SkillModule_Client.ts
* @Description  :
*/
import { GameConfig } from "../../config/GameConfig";
import { EventsName, PlayerStateType, SkillState } from "../../const/GameEnum";
import { GlobalData } from "../../const/GlobalData";
import { getMyCharacterGuid, UIManager } from "../../ExtensionType";
import { TS3 } from "../../ts3/TS3";
import { Attribute } from "../fight/attibute/Attribute";
import FightMgr from "../fight/FightMgr";
import ComboUI from "../fight/ui/ComboUI";
import { MGSMsgHome } from "../mgsMsg/MgsmsgHome";
import BulletTrrigerMgr from "./bullettrriger/BulletTrrigerMgr";
import SkillBase from "./logic/SkillBase";
import { SkillData } from "./SkillData";
import SkillMgr from "./SkillMgr";
import SkillModule_Server from "./SkillModule_Server";
import BesomMgr from "./skillObj/BesomMgr";
import SkillUI from "./ui/SkillUI";

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
			// let camera = Camera.currentCamera
			// camera.preset = (mw.CameraPreset.TPSOverShoulderAngle)
			// camera.cameraLockTarget
			// this._skillUI.mAim.visibility = mw.SlateVisibility.SelfHitTestInvisible
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

	private registerSkill() {
		for (const config of GameConfig.Skill.getAllElement()) {
			if (!SkillMgr.Inst.skillClassMap.has(config.ID)) {
				SkillMgr.Inst.skillClassMap.set(config.ID, SkillBase);
			}
		}
	}

	protected onDetach(): void {
		this._callArr.length = 0;
		this._skillMap = new Map()
	}

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

	public setState(state: PlayerStateType, isActive: boolean) {
		if (this._skillMap.has(state)) {
			const arr = this._skillMap.get(state)
			for (const skill of arr) {
				if (isActive) skill.State = SkillState.Disable
				else if (skill.State == SkillState.Disable) skill.State = SkillState.Enable
			}
		}
	}

	//dmage 技能伤害
	public onHit(
		hitObj: string,
		buffName: string,
		damage: number,
		damageRate: number,
		effectId: number,
		music: number,
		skillID: number,
		hitLocation?: mw.Vector
	): boolean {
		//XXJ 击中
		// TS3.log('onHit', hitObj, buffName, damage, effectId, music, skillID, hitLocation)
		let m = TS3.monsterMgr.getMonster(hitObj);
		if (m) {
			let attDamage = FightMgr.instance.calculatePDamage()
			let skillDamage = (1 + damageRate / 100) * attDamage.data
			TS3.monsterMgr.onDamage(hitObj, Math.round(skillDamage), attDamage.crit);
			// 音效
			const sound = GameConfig.Music.getElement(music);
			if (sound) {
				const musicRange = sound.MusicRange;
				const range = musicRange
					? {
						innerRadius: musicRange[0],
						falloffDistance: musicRange[1],
					}
					: undefined;
				SoundService.play3DSound(sound.MusicGUID, hitLocation, 1, sound.Music, range);
			}
			//特效
			const effect = GameConfig.Effect.getElement(effectId);
			effect &&
				GeneralManager.rpcPlayEffectAtLocation(
					effect.EffectID,
					hitLocation,
					effect.EffectTime,
					effect.EffectRotate.toRotation(),
					effect.EffectLarge
				);
			ComboUI.instance.setCombo(hitObj);
		}
		// const entity = this.entity as EntityC;
		// let key: TagComponent = ComponentSystem.getComponent(TagComponent, hitObj); //= EntityManagerC.instance.getEntityByEnemy(entity, hitObj)
		// if (key && key.hasAllExact(IdentifierTags.State.Fighting) && buffName != "") {
		// 	BuffScript.addBuffApply(getMyCharacterGuid(), buffName, damage, hitObj, {});
		// 	ComponentSystem.getComponent(BuffComponent, getMyCharacterGuid())?.applyBuffToTarget(buffName, damage, hitObj);
		if (buffName == "") return true;
		return false;
	}

	public getSkill(itemID: number) {
		if (itemID == 0) this.getSkillUI([]);
		else this.getSkillUI(GameConfig.Item.getElement(itemID).Skills, itemID);
	}

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
		BulletTrrigerMgr.instance.update(dt);
		BesomMgr.instance.onUpdate(dt);
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
