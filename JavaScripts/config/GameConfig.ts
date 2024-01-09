import {ConfigBase, IElementBase} from "./ConfigBase";
import {AssetsConfig} from "./Assets";
import {CameraConfig} from "./Camera";
import {ChatExpressionConfig} from "./ChatExpression";
import {ChatWordConfig} from "./ChatWord";
import {EffectConfig} from "./Effect";
import {FilterConfig} from "./Filter";
import {GlobalConfigConfig} from "./GlobalConfig";
import {GlobalConfig} from "./Global";
import {InteractConfigConfig} from "./InteractConfig";
import {ItemConfig} from "./Item";
import {ModelConfig} from "./Model";
import {MusicConfig} from "./Music";
import {NPCConfigConfig} from "./NPCConfig";
import {NPCTalkConfig} from "./NPCTalk";
import {PropActionConfig} from "./PropAction";
import {PropFlyConfig} from "./PropFly";
import {PropPlacementConfig} from "./PropPlacement";
import {RoleAvatarConfig} from "./RoleAvatar";
import {ShopConfig} from "./Shop";
import {SkillLevelConfig} from "./SkillLevel";
import {SkillConfig} from "./Skill";
import {SpirtConfig} from "./Spirt";
import {SquareActionConfigConfig} from "./SquareActionConfig";
import {SquareLanguageConfig} from "./SquareLanguage";
import {TalkEventConfig} from "./TalkEvent";
import {TaskConfig} from "./Task";
import {TitleStyleConfig} from "./TitleStyle";
import {WeatherConfig} from "./Weather";

export class GameConfig{
	private static configMap:Map<string, ConfigBase<IElementBase>> = new Map();
	/**
	* 多语言设置
	* @param languageIndex 语言索引(-1为系统默认语言)
	* @param getLanguageFun 根据key获取语言内容的方法
	*/
	public static initLanguage(languageIndex:number, getLanguageFun:(key:string|number)=>string){
		ConfigBase.initLanguage(languageIndex, getLanguageFun);
		this.configMap.clear();
	}
	public static getConfig<T extends ConfigBase<IElementBase>>(ConfigClass: { new(): T }): T {
		if (!this.configMap.has(ConfigClass.name)) {
			this.configMap.set(ConfigClass.name, new ConfigClass());
		}
		return this.configMap.get(ConfigClass.name) as T;
	}
	public static get Assets():AssetsConfig{ return this.getConfig(AssetsConfig) };
	public static get Camera():CameraConfig{ return this.getConfig(CameraConfig) };
	public static get ChatExpression():ChatExpressionConfig{ return this.getConfig(ChatExpressionConfig) };
	public static get ChatWord():ChatWordConfig{ return this.getConfig(ChatWordConfig) };
	public static get Effect():EffectConfig{ return this.getConfig(EffectConfig) };
	public static get Filter():FilterConfig{ return this.getConfig(FilterConfig) };
	public static get GlobalConfig():GlobalConfigConfig{ return this.getConfig(GlobalConfigConfig) };
	public static get Global():GlobalConfig{ return this.getConfig(GlobalConfig) };
	public static get InteractConfig():InteractConfigConfig{ return this.getConfig(InteractConfigConfig) };
	public static get Item():ItemConfig{ return this.getConfig(ItemConfig) };
	public static get Model():ModelConfig{ return this.getConfig(ModelConfig) };
	public static get Music():MusicConfig{ return this.getConfig(MusicConfig) };
	public static get NPCConfig():NPCConfigConfig{ return this.getConfig(NPCConfigConfig) };
	public static get NPCTalk():NPCTalkConfig{ return this.getConfig(NPCTalkConfig) };
	public static get PropAction():PropActionConfig{ return this.getConfig(PropActionConfig) };
	public static get PropFly():PropFlyConfig{ return this.getConfig(PropFlyConfig) };
	public static get PropPlacement():PropPlacementConfig{ return this.getConfig(PropPlacementConfig) };
	public static get RoleAvatar():RoleAvatarConfig{ return this.getConfig(RoleAvatarConfig) };
	public static get Shop():ShopConfig{ return this.getConfig(ShopConfig) };
	public static get SkillLevel():SkillLevelConfig{ return this.getConfig(SkillLevelConfig) };
	public static get Skill():SkillConfig{ return this.getConfig(SkillConfig) };
	public static get Spirt():SpirtConfig{ return this.getConfig(SpirtConfig) };
	public static get SquareActionConfig():SquareActionConfigConfig{ return this.getConfig(SquareActionConfigConfig) };
	public static get SquareLanguage():SquareLanguageConfig{ return this.getConfig(SquareLanguageConfig) };
	public static get TalkEvent():TalkEventConfig{ return this.getConfig(TalkEventConfig) };
	public static get Task():TaskConfig{ return this.getConfig(TaskConfig) };
	public static get TitleStyle():TitleStyleConfig{ return this.getConfig(TitleStyleConfig) };
	public static get Weather():WeatherConfig{ return this.getConfig(WeatherConfig) };
}