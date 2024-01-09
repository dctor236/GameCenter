import { PlayerManagerExtesion as PlayerManagerExtension, } from '../../../Modified027Editor/ModifiedPlayer';
import { GameConfig } from "../../../config/GameConfig";
import { ResManager } from "../../../ResManager";
import GameUtils from "../../../utils/GameUtils";
import { CameraModuleC } from "../../camera/CameraModule";
import { MGSMsgHome } from "../../mgsMsg/MgsmsgHome";
import { ModuleBaseC, ModuleBaseS } from "../base/ModuleBase";
import FacadMainUI from "../ui/cloth/FacadMainUI";
import FacadTipUI from "../ui/cloth/FacadTipUI";
import { CloseAllUI, ShowAllUI, SoundManager, UIManager } from '../../../ExtensionType';
import P_GameHUD from '../../gameModule/P_GameHUD';
import Tips from '../../../ui/commonUI/P_Tips';
import ShopModuleC from '../../shop/ShopModuleC';
import { CoinType } from '../../shop/ShopDataInfo';


/**
 * @Author       : meta
 * @Date         : 2023-05-08 17:18:52
 * @LastEditors  : meta
 * @LastEditTime : 2023-05-29 15:43:21
 * @FilePath     : \mollywoodschool\JavaScripts\modules\player\modules\ClothModule.ts
 * @Description  : 
 */

/**
 *服装部位 
 */
export enum EmFacadPart {
    /**套装 */
    Suit = 0,
    /**上衣 */
    BodyUpper = 1,
    /**下衣 */
    BodyLower,
    /**前发 */
    HairFront,
    /**后发 */
    HairBack,
    /**手套 */
    Gloves,
    /**鞋子 */
    Shoe,
}

//所要用到的事件
export enum ClothEvent {
    net_CreateStaticModel = "net_CreateStaticModel",
    net_ClearModel = "net_ClearModel",
    net_CreateEffect = "net_CreateEffect",
    net_ClearEffect = "net_ClearEffect",
    net_SaveFacadIDs = "net_SaveFacadIDs",
    net_BuyFacadByID = "net_BuyFacadByID",
    net_HenShinOther = "net_HenShinOther",
    net_controlFlyTend = "net_controlFlyTend",
    net_asyncStaticModel = "net_asyncStaticModel"
}

/**
 * 服装模块客户端 用来控制玩家全身的装扮,附件以及特效
 */
export class ClothModuleC extends ModuleBaseC {
    private _clothUI: FacadMainUI
    private _defaultEquipGuid: string[] = []
    private _lookHuman: mw.Character;
    private _effectIDs: Map<number, { effect: number, configID: number }> = new Map();
    private _models: Map<number, { model: mw.GameObject, configID: number }> = new Map();
    public tempEquipData: number[] = []

    public isHenShin: boolean = false
    public onEnterScene(sceneType: number) {
        this.init()
    }

    /**
     * 初始化
     */
    private async init() {
        this._lookHuman = await GameObject.asyncFindGameObjectById("336D55FD") as mw.Character
        this._lookHuman.displayName = ""
        this._lookHuman.worldTransform.position = Vector.one.multiply(-5555)
        this._lookHuman.complexMovementEnabled = false
        mw.AccountService.downloadData(this._lookHuman);
        setTimeout(() => {
            this.checkHeight()
            if (this._defaultEquipGuid && this._defaultEquipGuid.length < 1)
                this.configChangeCloth()
        }, 4000);
        this._clothUI = UIManager.getUI(FacadMainUI)
        let gameHud = UIManager.getUI(P_GameHUD)
        gameHud.mBtnCloth.onClicked.add(() => {
            MGSMsgHome.setBtnClick("cloth_revert")
            this.resetPlayerCloth()
        })
        gameHud.mBtnChange.onClicked.add(() => {
            MGSMsgHome.setBtnClick("dress_btn")
            this.showClothUI()
        });

        Event.addServerListener(ClothEvent.net_HenShinOther, async (guid: string) => {
            await GameUtils.downAsset(guid)
            this.henShinSkill(guid, 10)
        })
        Event.addServerListener(ClothEvent.net_asyncStaticModel, async (uid: string, guid: string[]) => {
            for (const m of guid) {
                let mm = await GameObject.asyncFindGameObjectById(m)
                mm.tag = uid
            }
        })
    }

    /**
     * 配置表去改玩家服装
     */
    public async configChangeCloth() {
        for (let i = 0; i < this.data.equipID.length; i++) {
            const id = this.data.equipID[i]
            const config = GameConfig.RoleAvatar.getElement(id);
            if (config && this.tempEquipData[config.type] != id) {
                await this.changeRoleAvatar(this.data.equipID[i])
            }
        }
        this.getDefalutEquipID()
        this.saveAvatarData()
    }


    /**
    * 服装数组去改玩家服装
    */
    public meshChangeCloth(meshArr: string[]) {
        const v2 = this.currentPlayer.character
        toolKey.forEach((value, key) => {
            v2.description.advance[value[0]][value[1]].style = meshArr[key]
        });
        v2.syncDescription()
    }

    /**
     * 获取默认的服装配置
     * @returns 
     */
    public getDefalutEquipID(): string[] {
        const v2 = this.currentPlayer.character
        toolKey.forEach((value, key) => {
            this._defaultEquipGuid[key] = v2.description.advance[value[0]][value[1]].style
        });
        return this._defaultEquipGuid
    }

    /**
    * 设置默认的服装配置
    * @param meshArr 
    */
    public setDefalutEquipID(meshArr: string[]) {
        this._defaultEquipGuid = meshArr
        this.meshChangeCloth(this._defaultEquipGuid)
    }

    /**
    * 将玩家服装还原成233默认
    */
    public resetPlayerCloth() {
        if (this.isHenShin) {
            Tips.show("请先解除变身状态")
            return
        }
        // this.currentPlayer.character.characterType = mw.AppearanceType.HumanoidV2;
        mw.AccountService.downloadData(this.currentPlayer.character);
        mw.AccountService.downloadData(this._lookHuman);
        this.tempEquipData.length = 0
        this.saveAvatarData()
        setTimeout(() => { this.checkHeight() }, 2000);

        if (this._clothUI.visible) this._lookHuman.worldTransform.rotation = this._initRotation
    }

    private checkHeight() {
        let char = Player.localPlayer.character;
        let humanV2 = char.getDescription()
        if (humanV2 && humanV2.advance.bodyFeatures.body.height > 1.05) {
            humanV2.advance.bodyFeatures.body.height = 1.05, false;
        }
    }

    private _initRotation: mw.Rotation = new mw.Rotation(0, 0, -20)
    public showClothUI() {
        if (this.isHenShin) {
            Tips.show("变身状态下无法更换服装")
            return;
        }
        if (!this._clothUI.visible) {
            CloseAllUI();
            UIManager.showUI(this._clothUI)
            this._lookHuman.worldTransform.rotation = mw.Rotation.zero
            ModuleService.getModule(CameraModuleC).facadPlayerRotation(true, this._lookHuman, 160, -130, -20)
            this._lookHuman.worldTransform.rotation = this._initRotation
        }
    }

    public hideClothUI() {
        UIManager.hideUI(this._clothUI)
        ShowAllUI();
        ModuleService.getModule(CameraModuleC).facadPlayerRotation(false)
    }

    public addRoatation(dir: number) {
        if (this._lookHuman) {
            this._lookHuman.worldTransform.rotation = this._lookHuman.worldTransform.rotation.add(new mw.Rotation(0, 0, -20 * dir))
        }
    }

    /**
     * 玩家是否有这件服装
     * @param configID 配置表id
     * @returns 
     */
    public hasSuit(configID: number): boolean {
        return this.data.allSuit.includes(configID)
    }

    /**
     * @description: 假人的换装
     * @param {number} id
     * @param {boolean} isSelect
     * @return {*}
     */
    public async changeRoleAvatar(id: number, isSelect: boolean = false, ch: mw.Character = null) {
        if (!id || id == 0) return;
        const v2 = ch ? ch : this._lookHuman
        const config = GameConfig.RoleAvatar.getElement(id);
        if (config) {
            //如果是套装，就全卸下换套装
            if (config.suit && config.suit.length > 0) {
                this.tempEquipData = []
            }
            //如果换的是已经装扮上的，就卸下
            if (this.tempEquipData[config.type] != id) {
                this.tempEquipData[config.type] = id
            } else {
                this.tempEquipData[config.type] = 0
            }

            if (config.mainType == 0) {
                const partList: { type: EmFacadPart, value: string }[] = []

                if (config.suit) {
                    partList.push({ type: EmFacadPart.Suit, value: config.suit })
                }
                if (config.upWear) {
                    partList.push({ type: EmFacadPart.BodyUpper, value: config.upWear })
                }
                if (config.underWear) {
                    partList.push({ type: EmFacadPart.BodyLower, value: config.underWear })
                }
                if (config.hairfront) {
                    partList.push({ type: EmFacadPart.HairFront, value: config.hairfront })
                }
                if (config.hairlate) {
                    partList.push({ type: EmFacadPart.HairBack, value: config.hairlate })
                }
                if (config.gloves) {
                    partList.push({ type: EmFacadPart.Gloves, value: config.gloves })
                }
                if (config.shoe) {
                    partList.push({ type: EmFacadPart.Shoe, value: config.shoe })
                }
                if (v2 && partList.length > 0) {
                    for (let i = 0; i < partList.length; i++) {
                        const type = partList[i].type;
                        let value = this._defaultEquipGuid[type]
                        if (this.tempEquipData[config.type] && this.tempEquipData[config.type] != 0) {
                            value = partList[i].value;
                        }
                        await GameUtils.downAsset(value)
                        if (value.length < 10) {
                            if (value != "" && value != null) {
                                const tool = toolKey.get(type)
                                v2.description.advance[tool[0]][tool[1]].style = value
                            }
                        } else {
                            v2.setDescription([value])
                        }
                    }
                }
            } else if (config.mainType == 1) {
                let model: mw.GameObject = null
                if (this._models.has(config.type) || this.tempEquipData[config.type] == 0) {
                    ResManager.instance.destoryObj(this._models.get(config.type).model)
                    this._models.delete(config.type)
                }
                if (this.tempEquipData[config.type] != 0) {
                    model = await ResManager.instance.spawnObjOnCharacter(this._lookHuman, config.modelIDs[0])
                    this._models.set(config.type, { model: model, configID: this.tempEquipData[config.type] })
                }
            } else if (config.mainType == 2) {
                let effectID: number = 0
                if (this._effectIDs.has(config.type) || this.tempEquipData[config.type] == 0) {
                    EffectService.stop(this._effectIDs.get(config.type).effect)
                    this._effectIDs.delete(config.type)
                }
                if (this.tempEquipData[config.type] != 0) {
                    effectID = ResManager.instance.playEffectOnPlayer(this._lookHuman, config.effectIDs[0])
                }
                this._effectIDs.set(config.type, { effect: effectID, configID: this.tempEquipData[config.type] })
            }
            if (config.changeEffect && isSelect) {
                SoundManager.stopSound("124713");
                SoundManager.playSound("124713");
                ResManager.instance.playEffectOnPlayer(this._lookHuman, config.changeEffect)
            }
        }
    }

    /**
     * 购买服装
     * @param configID 配置id
     * @param isForce 是否强制
     * @param uiTip 有无提示UI
     * @returns 
     */
    public buyCurSelect(configID: number, isForce: boolean = false, uiTip: boolean = true): boolean {
        if (this.hasSuit(configID)) return false;
        if (configID && configID > 0) {
            const config = GameConfig.RoleAvatar.getElement(configID)
            if (config) {
                if (config.priceType == 2) {
                    if (!isForce) {
                        Tips.show("该物品需要参与活动才能获得")
                        return false;
                    }
                }
                if (!isForce) {
                    if (config.price > ModuleService.getModule(ShopModuleC).getCoin(CoinType.PeaCoin)) {
                        Tips.show(GameConfig.SquareLanguage.Text_Text_552.Value)
                        return false;
                    }
                    ModuleService.getModule(ShopModuleC).req_addCoin(CoinType.PeaCoin, -config.price)
                }
                this.data.buySuit(configID)
                if (!this._clothUI.visible) UIManager.getUI(P_GameHUD).mNewCloth.visibility = mw.SlateVisibility.SelfHitTestInvisible
                Event.dispatchToServer(ClothEvent.net_BuyFacadByID, configID)
                if (uiTip) UIManager.show(FacadTipUI, 2, configID)
                MGSMsgHome.cloth("round_id", configID);
                return true
            }
        }
        return false
    }

    public buySelectCart(): { result: boolean, notBuyArr: number[] } {
        let bool = false
        const notBuyArr: number[] = []
        for (let i = 0; i < this.tempEquipData.length; i++) {
            const equip = this.tempEquipData[i];
            if (equip && !this.hasSuit(equip)) {
                notBuyArr.push(equip)
                bool = true;
            }
        }
        return { result: bool, notBuyArr: notBuyArr };
    }

    /**
    * @description: 真人的换装
    * @param {boolean} isSny 是否同步到233服务器
    * @return {*}
    */
    public async saveAvatarData(isSny: boolean = true) {
        const v2 = this.currentPlayer.character
        for (let i = 0; i < this.tempEquipData.length; i++) {
            const id = this.tempEquipData[i];
            if (!id || id == 0) continue;
            const config = GameConfig.RoleAvatar.getElement(id)
            if (config.mainType == 0) {
                const partList: { type: EmFacadPart, value: string }[] = []

                if (config.suit) {
                    partList.push({ type: EmFacadPart.Suit, value: config.suit })
                }
                if (config.upWear) {
                    partList.push({ type: EmFacadPart.BodyUpper, value: config.upWear })
                }
                if (config.underWear) {
                    partList.push({ type: EmFacadPart.BodyLower, value: config.underWear })
                }
                if (config.hairfront) {
                    partList.push({ type: EmFacadPart.HairFront, value: config.hairfront })
                }
                if (config.hairlate) {
                    partList.push({ type: EmFacadPart.HairBack, value: config.hairlate })
                }
                if (config.gloves) {
                    partList.push({ type: EmFacadPart.Gloves, value: config.gloves })
                }
                if (config.shoe) {
                    partList.push({ type: EmFacadPart.Shoe, value: config.shoe })
                }
                if (v2 && partList.length > 0) {
                    for (let i = 0; i < partList.length; i++) {
                        const type = partList[i].type;
                        let value = this._defaultEquipGuid[type]
                        if (this.tempEquipData[config.type] && this.tempEquipData[config.type] != 0) {
                            value = partList[i].value;
                        }
                        await GameUtils.downAsset(value)
                        if (value.length < 10) {
                            if (value != "" && value != null) {
                                const tool = toolKey.get(type)
                                v2.description.advance[tool[0]][tool[1]].style = value
                            }
                        } else {
                            v2.setDescription([value])
                        }
                    }
                }
            } else if (config.mainType == 1) {
                let model: mw.GameObject = null
                if (this._models.has(config.type) || this.tempEquipData[config.type] == 0) {
                    ResManager.instance.destoryObj(this._models.get(config.type).model)
                    this._models.delete(config.type)
                }
                if (this.tempEquipData[config.type] != 0) {
                    model = await ResManager.instance.spawnObjOnCharacter(this._lookHuman, config.modelIDs[0])
                    this._models.set(config.type, { model: model, configID: this.tempEquipData[config.type] })
                }
            } else if (config.mainType == 2) {
                let effectID: number = 0
                if (this._effectIDs.has(config.type) || this.tempEquipData[config.type] == 0) {
                    EffectService.stop(this._effectIDs.get(config.type).effect)
                    this._effectIDs.delete(config.type)
                }
                if (this.tempEquipData[config.type] != 0) {
                    effectID = ResManager.instance.playEffectOnPlayer(this._lookHuman, config.effectIDs[0])
                }
                this._effectIDs.set(config.type, { effect: effectID, configID: this.tempEquipData[config.type] })
            }
        }
        v2.syncDescription()
        if (isSny) {
            this.data.saveEquips(this.tempEquipData)
            Event.dispatchToServer(ClothEvent.net_SaveFacadIDs, this.tempEquipData, this._defaultEquipGuid)
        }
    }

    public henShinSkill(guid: string, henShinTime?: number) {
        this.isHenShin = true;
        PlayerManagerExtension.changeBaseStanceExtesion(this.currentPlayer.character, "154704")
        let appearance = this.currentPlayer.character.getDescription();
        appearance.base.wholeBody = guid;
        this.currentPlayer.character.syncDescription();
        if (henShinTime) {
            setTimeout(() => {
                this.isHenShin = false;
                this.resetPlayerCloth()
            }, henShinTime * 1000);
        }
    }

    public henShinOther(guid: string, player: mw.Player) {
        Event.dispatchToServer(ClothEvent.net_HenShinOther, guid, player.playerId)
    }

    /**创建静态模型 */
    public async createStaticModel(modelIDs: number[], isSny: boolean = true, isCloth: boolean = false) {
        for (let i = 0; i < modelIDs.length; i++) {
            await GameUtils.downAsset(GameConfig.Model.getElement(modelIDs[i]).ModelGuid)
        }
        if (isSny) Event.dispatchToServer(ClothEvent.net_CreateStaticModel, modelIDs, isCloth)
    }

    /**
     * 销毁模型
     * @param modelID 
     */
    public clearModel(modelID: number) {
        Event.dispatchToServer(ClothEvent.net_ClearModel, modelID)
    }

    /**
     *摧毁特效 
     * @param effectID 
     * @param isSny 
     */
    public clearEffect(effectID: number[], isSny: boolean = true) {
        if (isSny) Event.dispatchToServer(ClothEvent.net_ClearEffect, effectID)
    }

    /**创建一个特效 */
    public async createEffect(effectIDs: number[], isSny: boolean = true, isCloth: boolean = false) {
        for (let i = 0; i < effectIDs.length; i++) {
            await GameUtils.downAsset(GameConfig.Effect.getElement(effectIDs[i]).EffectID)
        }
        if (isSny) Event.dispatchToServer(ClothEvent.net_CreateEffect, effectIDs, isCloth)
    }
    protected onUpdate(dt: number): void {
    }

}

/**
 * 服装模块服务器端 用来控制玩家全身的装扮,附件以及特效
 */
export class ClothModuleS extends ModuleBaseS {
    /**存储玩家对应的特效ID */
    private _savePlayerEffect: Map<number, { type: number, isCloth: boolean, effectID: number, effect: number }[]> = new Map();
    /**存储玩家对应的静态模型ID */
    private _savePlayerModel: Map<number, { type: number, isCloth: boolean, modelID: number, obj: mw.GameObject }[]> = new Map();
    private _tempEquipData: number[] = []
    private _defaultEquipGuid: string[] = []
    onStart() {
        this.eventInit()
    }

    private eventInit() {
        Event.addClientListener(ClothEvent.net_CreateStaticModel, (player: mw.Player, modelIDs: number[], isCloth: boolean) => {
            this.net_CreateStaticModel(player.playerId, modelIDs, isCloth)
        })

        Event.addClientListener(ClothEvent.net_ClearModel, (player: mw.Player, modelID: number) => {
            this.net_ClearModel(player.playerId, modelID)
        })

        Event.addClientListener(ClothEvent.net_CreateEffect, (player: mw.Player, effectIDs: number[], isCloth: boolean) => {
            this.net_CreateEffect(player.playerId, effectIDs, isCloth)
        })

        Event.addClientListener(ClothEvent.net_ClearEffect, (player: mw.Player, effectID: number[]) => {
            this.net_ClearEffect(player.playerId, effectID)
        })

        Event.addClientListener(ClothEvent.net_HenShinOther, (player: mw.Player, guid: string, playerID: number) => {
            Event.dispatchToClient(Player.getPlayer(playerID), ClothEvent.net_HenShinOther, guid)
        })

        Event.addClientListener(ClothEvent.net_SaveFacadIDs, (player: mw.Player, facadIDs: number[], equipGuid: string[]) => {
            try {
                const v2 = player.character
                this._defaultEquipGuid = equipGuid
                for (let i = 0; i < facadIDs.length; i++) {
                    if (facadIDs[i] != this._tempEquipData[i]) {
                        if (facadIDs[i] == 0) {
                            this.saveAvatarData(v2, this._tempEquipData[i], player)
                        } else {
                            this.saveAvatarData(v2, facadIDs[i], player)
                        }
                    }
                }
                player.character.syncDescription()
                this.getPlayerData(player)?.saveEquips(facadIDs)
            }
            catch (e) {
                console.error("服务器换装报错")
            }
        })

        Event.addClientListener(ClothEvent.net_BuyFacadByID, (player: mw.Player, facadID: number) => {
            try {
                this.getPlayerData(player)?.buySuit(facadID)
            }
            catch (e) {
                console.error("服务器买衣服报错")
            }
        })
    }

    public onPlayerEnterGame(player: mw.Player): void {
        this._savePlayerEffect.set(player.playerId, []);
        this._savePlayerModel.set(player.playerId, []);
    }

    public onPlayerLeft(player: mw.Player): void {
        let pid = player?.playerId
        this.net_ClearAllCloth(pid, false);
        this._savePlayerEffect.delete(pid);
        this._savePlayerModel.delete(pid);
    }

    /**
     * @description: 真人的换装
     * @param {boolean} isSny 是否同步到233服务器
     * @return {*}
     */
    private saveAvatarData(v2: mw.Character, id: number, player: mw.Player) {
        if (id == undefined) return;
        const config = GameConfig.RoleAvatar.getElement(id);
        const playerID = player.playerId
        if (config) {
            //如果是套装，就全卸下换套装
            if (config.suit && config.suit.length > 0) {
                this._tempEquipData = []
            }
            //如果换的是已经装扮上的，就卸下
            if (this._tempEquipData[config.type] != id) {
                this._tempEquipData[config.type] = id
            } else {
                this._tempEquipData[config.type] = 0
            }
            if (config.mainType == 0) {
                const partList: { type: EmFacadPart, value: string }[] = []

                if (config.suit) {
                    partList.push({ type: EmFacadPart.Suit, value: config.suit })
                }
                if (config.upWear) {
                    partList.push({ type: EmFacadPart.BodyUpper, value: config.upWear })
                }
                if (config.underWear) {
                    partList.push({ type: EmFacadPart.BodyLower, value: config.underWear })
                }
                if (config.hairfront) {
                    partList.push({ type: EmFacadPart.HairFront, value: config.hairfront })
                }
                if (config.hairlate) {
                    partList.push({ type: EmFacadPart.HairBack, value: config.hairlate })
                }
                if (config.gloves) {
                    partList.push({ type: EmFacadPart.Gloves, value: config.gloves })
                }
                if (config.shoe) {
                    partList.push({ type: EmFacadPart.Shoe, value: config.shoe })
                }
                if (v2 && partList.length > 0) {
                    for (let i = 0; i < partList.length; i++) {
                        const type = partList[i].type;
                        let value = this._defaultEquipGuid[type]
                        if (this._tempEquipData[config.type] && this._tempEquipData[config.type] != 0) {
                            value = partList[i].value
                        }
                        if (value.length < 10) {
                            if (value != "" && value != null) {
                                const tool = toolKey.get(type)
                                v2.description.advance[tool[0]][tool[1]].style = value
                            }
                        } else {
                            v2.setDescription([value])
                        }
                    }
                }
            } else if (config.mainType == 1) {
                if (this._tempEquipData[config.type] == 0) {
                    for (const modelID of config.modelIDs) {
                        this.net_ClearModel(playerID, modelID)
                    }
                } else {
                    const modelArr = this._savePlayerModel.get(playerID);
                    for (const arr of modelArr) {
                        if (arr.type == config.type) {
                            this.net_ClearModel(playerID, arr.modelID)
                        }
                    }
                    this.net_CreateStaticModel(playerID, config.modelIDs, true, config.type)
                }
            } else if (config.mainType == 2) {
                if (this._tempEquipData[config.type] == 0) {
                    this.net_ClearEffect(playerID, config.effectIDs)
                } else {
                    const effectArr = this._savePlayerEffect.get(playerID);
                    for (const arr of effectArr) {
                        if (arr.type == config.type) {
                            this.net_ClearEffect(playerID, [arr.effectID])
                        }
                    }
                    this.net_CreateEffect(playerID, config.effectIDs, true, config.type)
                }
            }
        }
    }

    /**
     *创建静态模型 
     * @param playerID 玩家id
     * @param modelIDs 模型ids
     * @param isCloth 是否是衣服
     * @param type 种类
     */
    public async net_CreateStaticModel(playerID: number, modelIDs: number[], isCloth: boolean = true, type: number = 0) {
        let char = Player.getPlayer(playerID).character;
        let vec: string[] = []
        for (let i = 0; i < modelIDs.length; i++) {
            const modelID = modelIDs[i];
            if (!this._savePlayerModel.has(playerID)) {
                this._savePlayerModel.set(playerID, []);
            }
            let modelArr = this._savePlayerModel.get(playerID);

            let modelObj = await ResManager.instance.spawnObjOnCharacter(char, modelID)
            if (modelObj) {
                modelArr.push({ type: type, isCloth: isCloth, modelID: modelID, obj: modelObj })
            }
        }
        Event.dispatchToAllClient(ClothEvent.net_asyncStaticModel, Player.getPlayer(playerID).userId, vec)
    }

    /**
     * 创建特效
     * @param playerId 玩家id
     * @param effectIDs 特效ids
     * @param isCloth 是否衣服
     * @param type 种类
     */
    public net_CreateEffect(playerId: number, effectIDs: number[], isCloth: boolean = true, type: number = 0) {
        for (const effID of effectIDs) {
            let effectID = ResManager.instance.playEffectOnPlayer(Player.getPlayer(playerId), effID)
            if (!this._savePlayerEffect.has(playerId)) {
                this._savePlayerEffect.set(playerId, []);
            }

            let effArr = this._savePlayerEffect.get(playerId);
            if (effectID) {
                effArr.push({ type: type, isCloth: isCloth, effectID: effID, effect: effectID })
            }
        }
    }

    /**
     * 清除特效
     * @param playerId 玩家id
     * @param effectID 需要清除的特效列表
     */
    public net_ClearEffect(playerId: number, effectID: number[]) {
        if (this._savePlayerEffect.has(playerId)) {
            const effectArr = this._savePlayerEffect.get(playerId)
            for (const effID of effectID) {
                for (let i = 0; i < effectArr.length; i++) {
                    const effect = effectArr[i];
                    if (effID == effect.effectID) {
                        EffectService.stop(effect.effect);
                        effectArr.splice(i, 1)
                        break;
                    }
                }
            }
        }
    }

    /**
     * 清除模型
     * @param playerId 玩家id 
     * @param modelID 模型id
     * @returns 
     */
    public net_ClearModel(playerId: number, modelID: number) {
        if (this._savePlayerModel.has(playerId)) {
            const modelArr = this._savePlayerModel.get(playerId)
            for (let i = 0; i < modelArr.length; i++) {
                const model = modelArr[i];
                if (modelID == model.modelID && model.obj) {
                    ResManager.instance.destoryObj(model.obj)
                    modelArr.splice(i, 1)
                    return;
                }
            }
        }
    }

    /**
     * @description: 清除所有绑定
     * @param {number} playerId
     * @return {*}
     */
    public net_ClearAllCloth(playerId: number, isCloth: boolean = true) {
        if (this._savePlayerModel.has(playerId)) {
            const models = this._savePlayerModel.get(playerId)
            const effects = this._savePlayerEffect.get(playerId)
            if (isCloth) {
                for (let i = 0; i < models.length; i++) {
                    const element = models[i];
                    if (element.isCloth) {
                        ResManager.instance.destoryObj(element.obj)
                        models.splice(i, 1)
                        i--;
                    }
                }
                for (let i = 0; i < effects.length; i++) {
                    const element = effects[i];
                    if (element.isCloth) {
                        EffectService.stop(element.effect);
                        effects.splice(i, 1)
                        i--;
                    }
                }
            } else {
                models.forEach((model) => {
                    ResManager.instance.destoryObj(model.obj)
                })
                models.length = 0
                effects.forEach((effect) => {
                    EffectService.stop(effect.effect);
                })
                effects.length = 0
                this._savePlayerEffect.delete(playerId)
                this._savePlayerModel.delete(playerId)
            }
        }
    }
}
const toolKey: Map<EmFacadPart, string[]> = new Map([
    [EmFacadPart.BodyUpper, ["clothing", "upperCloth"]],
    [EmFacadPart.BodyLower, ["clothing", "lowerCloth"]],
    [EmFacadPart.HairFront, ["hair", "frontHair"]],
    [EmFacadPart.HairBack, ["hair", "backHair"]],
    [EmFacadPart.Gloves, ["clothing", "gloves"]],
    [EmFacadPart.Shoe, ["clothing", "shoes"]],
]);