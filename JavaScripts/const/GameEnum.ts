// 轴类型
export enum Axis {
	X = 0,
	Y,
	Z,
}

//玩家称号名称
export enum ContractType {
	/**无契约 */
	None = "None",
	/**魔法勇士 */
	Brave = "Brave",
	/**契约之戒 */
	Ring = "Ring",
}

//发送的事件
export enum EventsName {
	/**装备道具 */
	EquipProp = "EquipProp",
	/**加载道具 */
	LoadProp = "LoadProp",
	/**卸载道具 */
	UnloadProp = "UnloadProp",
	/**使用技能 */
	UseSkill = "UseSkill",
	/**取消玩家交互 */
	CancelActive = "CancelActive",
	/**埋点事件 */
	NetMsg_MGSMsg_Send = "NET_MSG_SEND_MGS",
	/**打开背包 */
	OpenBagPanel = "OpenBagPanel",
	/** 玩家跳跃 */
	PLAYER_JUMP = "PLAYER_JUMP",
	/**玩家进入推出飞行姿态 */
	PLAYER_FLY = "PLAYER_FLY",
	/**玩家设置状态 */
	PLAYER_STATE = "PLAYER_STATE",
	/** 刷新GetItem的描述 */
	REFRESH_GETITEM = "REFRESH_GETITEM",
	/**完成任务 */
	DoneTask = 'DoneTask',
	/**刷新任务 */
	RefreshTask = 'RefreshTask',
	/**改变任务对话状态 */
	SetTaskTalkState = 'SetTaskTalkState',
	/**出现npc举起按钮 */
	ShowNpcInterect = 'ShowNpcInterect',
	/**是否显示引导 */
	ShowGuide = "ShowGuid",
	/**解除所有跟随npc */
	UnFollowNpc = 'UnFollowNpc',
	/**显示屏幕特效并且加速 */
	ShowScreenEff = 'ShowScreenEff',
	/**点击对话事件 */
	ClickGuidButton = 'ClickGuidButton',
	/**玩家血量改变 */
	OnPlayerHpChange = 'OnPlayerHpChange',
}
/**
 * 角色状态
 */
export enum PlayerStateType {
	Interaction = 1,//和交互物交互
	DoublePeopleAction = 2,//双人动作
	Fly,//飞行
}


//交互触发器种类
export enum TrrigerType {
	None = "0",
	Distance = "1",

	BoxTrigger = "2",

	SphereTrigger = "3",
}

/** 显示GiftItem 的类型 */
export enum ShowItemType {
	None = "None",
	/** 礼包界面 */
	Gift = "Gift",
	/** 获得物品界面 */
	Get = "Get",
	Cloth = 'Cloth'
}
//技能状态
export enum SkillState {
	Disable = -2,
	Hide = -1,
	Enable = 0,
	State1 = 1,
	State2 = 2,
	Creation = 15,
	Relation = 16,
	Designation = 17,
	Using = 20,
}


/**任务状态 */
export enum EmTaskState {
	/**未接取 */
	NoFetch,
	/**未激活 */
	NoAccept = 1,
	/**正在做 */
	Doing = 2,
	/**任务完成 */
	Finish = 3
}

/**任务类型 */
export enum EmTaskType {
	None,
	/**到达指定地点 */
	Pos,
	/**换装 */
	Dress,
	/**乘坐 */
	SitMount,
	/**与NPC玩耍*/
	PlayNPC,
	/**失物招领 */
	Lost,
	/**巨龙 */
	Dragon
}
