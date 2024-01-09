
import { GameConfig } from "../../../config/GameConfig";
import { SkillState } from "../../../const/GameEnum";
import { UIManager } from "../../../ExtensionType";
import GameUtils from "../../../utils/GameUtils";
import SkillBase from "../logic/SkillBase";

export class skillItem {
	public uiObject: mw.Canvas = undefined;
	public btn: mw.Button = undefined;
	public maskBtn: mw.MaskButton = undefined;
	public charge: mw.TextBlock = undefined;
	public CD: mw.TextBlock = undefined;
	public dis: mw.Image = undefined;
	public des: mw.TextBlock = undefined;
	public skill: SkillBase;
	private _fire: mw.VirtualJoystickPanel = undefined;

	constructor(
		uiObject: mw.Canvas,
		btn: mw.Button,
		maskBtn: mw.MaskButton,
		charge: mw.TextBlock,
		CD: mw.TextBlock,
		dis: mw.Image,
		fire: mw.VirtualJoystickPanel,
		des: mw.TextBlock
	) {
		this.uiObject = uiObject;
		this.btn = btn;
		this.maskBtn = maskBtn;
		this.charge = charge;
		this.CD = CD;
		this.dis = dis;
		this._fire = fire;
		this.des = des;
		this.btn.onClicked.clear();
		this.btn.clickMethod = mw.ButtonClickMethod.MouseDown
	}

	public show(skill: SkillBase) {
		this.btn.onPressed.clear();
		this._fire.onJoyStickUp.clear();
		this.skill = skill;
		this.skill.onChargeChange.add(this.chargeChange);
		this.skill.onStateChange.add(this.stateChange);
		this.stateChange(skill.State)
		this.chargeChange(skill.Charge)
		const config = GameConfig.Skill.getElement(this.skill.skill);
		//技能描述
		if (config.Des != null) {
			this.des.visibility = mw.SlateVisibility.SelfHitTestInvisible
			this.des.text = GameUtils.getTxt(config.Des);
		} else {
			this.des.visibility = mw.SlateVisibility.Collapsed
			this.des.text = ""
		}
		//技能点击两种形式
		if (config.SkillType == 0) {
			this.btn.visibility = mw.SlateVisibility.Visible;
			this._fire.visibility = mw.SlateVisibility.Collapsed;
			this.btn.onPressed.add(() => {
				this.skill.active();
			});
		}
		if (config.SkillType == 1) {
			this._fire.visibility = mw.SlateVisibility.Visible;
			this.btn.visibility = mw.SlateVisibility.Collapsed;
			this._fire.onJoyStickUp.add(() => {
				this.skill.active();
			});
		}
		this._fire.backgroundImageId = config.Icon;
		this.maskBtn.normalImageGuid = config.Icon;
		this.uiObject.visibility = mw.SlateVisibility.SelfHitTestInvisible;
	}

	private chargeChange = (charge: number) => {
		if (charge >= 2) {
			this.charge.visibility = mw.SlateVisibility.SelfHitTestInvisible;
			this.charge.text = charge.toString();
		} else {
			this.charge.visibility = mw.SlateVisibility.Collapsed;
			this.charge.text = ""
		}
	};

	private stateChange = (state: SkillState, ...params: any[]) => {
		if (state == SkillState.Using) {
			this.maskBtn.normalImageColor = mw.LinearColor.red;
		} else {
			this.maskBtn.normalImageColor = mw.LinearColor.white;
		}
		if (state < 0) {
			this.dis.visibility = mw.SlateVisibility.SelfHitTestInvisible;
		} else {
			this.dis.visibility = mw.SlateVisibility.Collapsed;
		}
	};

	public hide() {
		if (!this.skill) {
			return;
		}
		this.skill.onChargeChange.remove(this.chargeChange, this);
		this.skill.onStateChange.remove(this.stateChange, this);
		this.maskBtn.circleValue = 1;
		this.uiObject.visibility = mw.SlateVisibility.Collapsed;
	}
}
