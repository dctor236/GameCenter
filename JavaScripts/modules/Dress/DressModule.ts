import { GeneralManager, } from '../../Modified027Editor/ModifiedStaticAPI';
import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
import { ModifiedCameraSystem, CameraModifid, } from '../../Modified027Editor/ModifiedCamera';
import { GameConfig } from "../../config/GameConfig";
import { EClothPart, EventsName } from "../../const/GameEnum";
import { GlobalData } from "../../const/GlobalData";
import { GlobalModule } from "../../const/GlobalModule";
import { EffectManager, SoundManager, UIManager } from "../../ExtensionType";
import P_GameHUD from "../gameModule/P_GameHUD";

export class DressModuleS extends ModuleS<DressModuleC, null> {

    // /**
    //  * 穿上一件装扮
    //  * @param id 商品主id
    //  * @param type 商品类型
    //  */
    // public net_PutOnDress(id: number, type: Enums.EquipDressType): void {
    //     this.currentData.putOnDress(id, type);
    //     Event.dispatchToClient(this.currentPlayer, "CHANGEDRESS", id);
    // }

    // /**
    //  * 设置指定部位的自定义装扮
    //  * @param type 类型 1 face 2 body
    //  * @param data 数据
    //  */
    // public net_setCustomData(type: number, data: {}): void {
    //     this.currentData.setCustomData(type, data);

    //     Event.dispatchToClient(this.currentPlayer, "CHANGCOUSTOM", type);
    // }

    // /**
    //  * 设置初始化人物 （切换性别）
    //  * @param type 性别 1女 2 男
    //  */
    // public net_setInitDress(type: number): void {
    //     this.currentData.setInitDress(type);
    //     Event.dispatchToClient(this.currentPlayer, "CHANGESEX", type);
    // }


    // public net_AddCloth(id: number) {
    //     this.currentData.unlockCloth(id);
    //     this.currentData.save(false);
    // }

    // onExecute() { }
}

/** 装扮模块客户端 */
export class DressModuleC extends ModuleC<DressModuleS, null> {
    private _dressLocation: mw.Vector;
    private _dressRotation: mw.Rotation;
    private _cameraRotation: mw.Rotation;
    private _oriTransform: mw.Transform;
    private _isSave: boolean;
    private _defaultArmLen: number = 0
    private _defaultSlot: Vector
    /**初始服装列表 */
    private _initClothesList: string[] = []
    onStart(): void {
        this._dressLocation = new mw.Vector(100, -3000, 100);
        this._dressRotation = new mw.Rotation(0, 0, 70);
        this._cameraRotation = new mw.Rotation(0, -5, 270);
        this._isSave = false;
        Player.localPlayer.character.asyncReady().then((ch) => {
            //     // 切换性别
            //     if (GlobalData.instance.curCharacterSexStr === 1) {
            //         ToolUtils.getV2(Player.localPlayer.character).setSuit(mw.SomatotypeV2.AnimeFemale, "76618", String(data1.guid), String(data2.guid), String(data3.guid), String(data4.guid), String(data5.guid), guidParts);
            //         PlayerManagerExtesion.changeBaseStanceExtesion(Player.localPlayer.character,"30274");
            //     } else {
            //         ToolUtils.getV2(Player.localPlayer.character).setSuit(mw.SomatotypeV2.AnimeMale, "76619", String(data1.guid), String(data2.guid), String(data3.guid), String(data4.guid), String(data5.guid), guidParts);
            //         PlayerManagerExtesion.changeBaseStanceExtesion(Player.localPlayer.character,"39317");
            //     }
            const camera = Camera.currentCamera
            this._oriTransform = ch.worldTransform;
            this._defaultArmLen = camera.springArm.length
            this._defaultSlot = camera.localTransform.position
        });


        // Player.localPlayer.asyncReady().then(p => {

        // })
        Event.addLocalListener(EventsName.ChangeClothPart, (partID: number) => {
            const res = this.changeClothPart(partID)
            if (res) {
                const character = Player.localPlayer.character
                const anim = PlayerManagerExtesion.loadAnimationExtesion(character, "29772")
                anim.loop = 1;
                anim.play();
                GeneralManager.rpcPlayEffectOnPlayer("158079", Player.localPlayer, mw.HumanoidSlotType.LeftFoot)
                SoundManager.playSound("124713")
            }
        })
    }

    /**
     * 开始换装时调用，修改玩家到换装的地点
    */
    public changeLocation(character: mw.Character | mw.Character, scene: CamearScene) {
        if (this._isSave) return;
        this._oriTransform = character.worldTransform;
        character.movementEnabled = character.jumpEnabled = false
        setTimeout(() => {
            if (scene == CamearScene.Dress) {
                character.worldTransform.position = this._dressLocation;
                character.worldTransform.rotation = this._dressRotation;
            } else if (scene == CamearScene.NpcTalk) {
            }
            this._isSave = true;
        }, 32)
    }

    /**
     * 恢复原transform
     */
    private resetTransform() {
        Player.localPlayer.character.worldTransform = this._oriTransform;
        this._isSave = false;
    }


    public get isSave(): boolean {
        return this._isSave;
    }

    /**加载默认服饰 */
    public loadDefaultCloth() {
        // 进游戏默认换装
        //判断玩家性别，获取对应装扮ID
        // this.changeCloth(this.getSex())
    }


    /**
     * 加载自定义形状数据
     */
    public loadCustomShapData() {
        // // 如果是RP就不执行 或者特殊处理
        // if (GlobalData.instance.isRPMode) return;
        // // 开始换自定义数据
        // const customData = GameConfig.Custom.getAllElement();
        // const allData = {};
        // Object.assign(allData, GlobalData.instance.customFaceData, GlobalData.instance.customBodyData);
        // customData.forEach(item => {
        //     const apiName = item.api;
        //     const id = item.id;
        //     const value = allData[id];
        //     if (value !== null && apiName !== null) {
        //         this.setCustomFunc(Player.localPlayer.character, apiName, value);
        //     }
        // });
        // // oTrace("bmnsabdmnasbdasdbadnmasbdmad");
        // // 同步到
        // ToolUtils.getV2(Player.localPlayer.character).syncDescription();
    }

    /**
     * 获取指定类型的自定义结构
     * @param type 类型 1 面部 2 身体
     * @returns 自定义数据
     */
    public getCustomData(type: number) {
        // return this.data.getCustomData(type);
        // return DataCenterC.getData(DressData).getCustomData(type);
    }

    /**
     * 获取当前性别
     * @returns 1 女 2 男
     */
    public getSex() {
        const humanV2 = Player.localPlayer.character
        const sexStr = humanV2.description.advance.base.characterSetting.somatotype;
        let isWoman: number = 1
        if (sexStr == mw.SomatotypeV2.AnimeFemale || sexStr == mw.SomatotypeV2.LowpolyAdultFemale || sexStr == mw.SomatotypeV2.RealisticAdultFemale) {
            isWoman = 1
        } else if (sexStr == mw.SomatotypeV2.LowpolyAdultMale || sexStr == mw.SomatotypeV2.AnimeMale || sexStr == mw.SomatotypeV2.RealisticAdultMale) {
            isWoman = 2
        }
        return isWoman
    }

    /**
    * 试穿套装
    * @param curClothConfigID 
    * @returns 
    */
    // changeCloth(curClothConfigID: number) {
    //     if (!curClothConfigID || GlobalData.clothConfigID == curClothConfigID) {
    //         return;
    //     }
    //     const clothModule = GlobalModule.MyPlayerC.Cloth
    //     const clothConfig = GameConfig.Cloth.getElement(curClothConfigID)
    //     GlobalData.clothConfigID = curClothConfigID;
    //     //清除上个装扮的特效和静态模型
    //     clothModule.resetPlayerCloth();
    //     //生成特效和静态模型
    //     if (clothConfig.Effects) {
    //         clothModule.createEffect(clothConfig.Effects)
    //     }
    //     if (clothConfig.Slots) {
    //         clothModule.createStaticModel(clothConfig.Slots)
    //     }

    //     const character = Player.localPlayer.character
    //     let humanV2 = character.getAppearance() as mw.HumanoidV2;

    //     if (clothConfig.Head) {
    //         humanV2.description.advance.headFeatures.head.style = clothConfig.Head, true
    //     }
    //     if (clothConfig.Jacket) {
    //         humanV2.description.advance.clothing.upperCloth.style = clothConfig.Jacket, true
    //     }
    //     if (clothConfig.Underwear) {
    //         humanV2.description.advance.clothing.lowerCloth.style = clothConfig.Underwear, true
    //     }
    //     if (clothConfig.Gloves) {
    //         humanV2.description.advance.clothing.gloves.style = clothConfig.Gloves, true;
    //     }
    //     if (clothConfig.Shoe) {
    //         humanV2.description.advance.clothing.shoes.style = clothConfig.Shoe, true;
    //     }
    //     if (clothConfig.fontHair) {
    //         humanV2.description.advance.hair.frontHair.style = clothConfig.fontHair, true;
    //     }

    //     if (clothConfig.backHair) {
    //         humanV2.description.advance.hair.backHair.style = clothConfig.backHair, true;
    //     }
    //     // const anim = PlayerManagerExtesion.loadAnimationExtesion(character, "29772")
    //     // anim.loop = 1;
    //     // anim.play();
    //     // GeneralManager.rpcPlayEffectOnPlayer("158079", Player.localPlayer, mw.HumanoidSlotType.LeftFoot)
    //     // SoundManager.playSound("124713")
    // }




    /**
     * 试穿单个服装
     * @param partID 
     * @returns 
     */
    changeClothPart(partID: number) {
        const elem = GameConfig.ClothPart.getElement(partID)
        if (!partID || GlobalData.clothConfigID == partID) { return false }
        GlobalData.clothConfigID = partID

        const character = Player.localPlayer.character
        let humanV2 = character
        switch (elem.ClothPart) {
            case EClothPart.Jacket:
                humanV2.description.advance.clothing.upperCloth.style = elem.guid, true
                break
            case EClothPart.Underwear:
                humanV2.description.advance.clothing.lowerCloth.style = elem.guid, true
                break
            case EClothPart.Gloves:
                humanV2.description.advance.clothing.gloves.style = elem.guid, true;
                break
            case EClothPart.Shoes:
                humanV2.description.advance.clothing.shoes.style = elem.guid, true;
                break
            case EClothPart.BackHair:
                humanV2.description.advance.hair.backHair.style = elem.guid, true;
                break
            case EClothPart.FrontHair:
                humanV2.description.advance.hair.frontHair.style = elem.guid, true;
                break
            default: break
        }
        return true
    }


    /**
     * 切换性别
     * @param type 性别
     */
    public setSexDress(type: number) {
        // // 更新数据
        // GlobalData.instance.curCharacterSexStr = type;
        // // 刷新装扮界面UI
        // Event.dispatchToLocal(Enums.RPLocalEvent.REFRESHDRESSUI);
        // // 设置新装扮
        // const upperCloth = GameConfig.Dress.getElement(type === 1 ? 3 : 4).guid;
        // const lowerCloth = GameConfig.Dress.getElement(type === 1 ? 5 : 6).guid;
        // const gloves = GameConfig.Dress.getElement(type === 1 ? 9 : 10).guid;
        // const shoe = GameConfig.Dress.getElement(type === 1 ? 11 : 12).guid;
        // const dataHair = GameConfig.Dress.getElement(type === 1 ? 7 : 8);
        // const frontHair = dataHair.guid;
        // const behindHair = GameConfig.Dress.getElement(dataHair.partsID).guid;

        // const character = Player.localPlayer.character;

        // /**
        // * @description 加载一套角色数据
        // * @effect 只在客户端调用生效
        // * @precautions 如果没有预加载对应的GUID，则是异步的,监听onLoadAppearanceDataAllCompleted获取加载完成回调
        // * @param somatotype usage: 主Model类型："None"不能作为参数
        // * @param head usage: 头部资源的GUID(MWEditor左侧资源列表里面的GUID)
        // * @param upperCloth usage: 上衣资源的GUID(MWEditor左侧资源列表里面的GUID)
        // * @param lowerCloth usage: 下衣资源的GUID(MWEditor左侧资源列表里面的GUID)
        // * @param gloves usage: 手套资源的GUID(MWEditor左侧资源列表里面的GUID)
        // * @param shoe usage: 鞋子资源的GUID(MWEditor左侧资源列表里面的GUID)
        // * @param frontHair usage: 前发资源的GUID(MWEditor左侧资源列表里面的GUID)
        // * @param behindHair usage: 后发资源的GUID(MWEditor左侧资源列表里面的GUID)
        // */
        // switch (type) {
        //     case 1: //女
        //         ToolUtils.getV2(character).setSuit(mw.SomatotypeV2.AnimeFemale, "76618", String(upperCloth), String(lowerCloth), String(gloves), String(shoe), String(frontHair), String(behindHair));
        //         PlayerManagerExtesion.changeBaseStanceExtesion(character,"30274")
        //         break;
        //     case 2: //男
        //         ToolUtils.getV2(character).setSuit(mw.SomatotypeV2.AnimeMale, "76619", String(upperCloth), String(lowerCloth), String(gloves), String(shoe), String(frontHair), String(behindHair));
        //         PlayerManagerExtesion.changeBaseStanceExtesion(character,"39317")
        //         break;
        // }

    }

    /**
     * 将摄像机移动到NPC身上
     * @param character NPC character
     */
    public moveCameraToCh(character: mw.Character | mw.Character): void {
        const camera = Camera.currentCamera;
        camera.lock(character);
    }

    /**
     * 将摄像机移动到全身画面
     */
    public moveCameraToBody(character: mw.Character | mw.Character, scene: CamearScene = CamearScene.Dress): void {
        this.changeLocation(character, scene);
        if (scene == CamearScene.Dress) {
            this.changeCamera(new mw.Vector(-100, 40, -40), 110)
        } else if (scene == CamearScene.NpcTalk) {
            this.changeCamera(new mw.Vector(-100, 40, -40), 110)
        }
    }

    /**
     * 将摄像机移动到头部画面
     */
    public moveCameraToHead(character: mw.Character | mw.Character, scene: CamearScene = CamearScene.Dress): void {
        this.changeLocation(character, scene);
        if (scene == CamearScene.Dress) {
            this.changeCamera(new mw.Vector(0, 8, -30 + 45 + 10), 50)
        }
    }

    private changeCamera(slotOffset: Vector, targerLen: number) {
        UIManager.getUI(P_GameHUD).changeJoyStickState(false)
        const camera = Camera.currentCamera;
        camera.springArm.collisionEnabled = false;
        camera.localTransform.position = slotOffset;
        ModifiedCameraSystem.setOverrideCameraRotation(this._cameraRotation);
        camera.springArm.length = targerLen;
    }

    /**
     * 还原摄像机
     */
    public resetCameraAndTransform(scene: CamearScene = CamearScene.Dress): void {
        const character = Player.localPlayer.character;
        character.movementEnabled = character.jumpEnabled = true
        UIManager.getUI(P_GameHUD).changeJoyStickState(true)
        const camera = Camera.currentCamera;
        camera.unlock();
        camera.localTransform.position = new mw.Vector(0, 0, 0);
        ModifiedCameraSystem.setOverrideCameraRotation(new Rotation(0, 0, 180));
        setTimeout(() => {
            ModifiedCameraSystem.resetOverrideCameraRotation();
        }, 32);
        camera.springArm.collisionEnabled = true;
        camera.springArm.length = this._defaultArmLen;
        camera.localTransform.position = this._defaultSlot
        if (scene == CamearScene.Dress)
            this.resetTransform();

    }


    // /**
    //  * 设置自定义数据
    //  * @param character 角色对象
    //  * @param apiName api 名字
    //  * @param value 对应的数值
    //  */
    // public setCustomFunc(character: mw.Character | mw.Character, apiName: string, value: number) {
    //     // oTrace("调用换形状", apiName, value);
    //     const appearance = character
    //     if (value != null && apiName != null)
    //         appearance.shape[apiName](value, false);
    //     // ToolUtils.getV2(character).description.advance.headFeatures.faceShape.jawline.jawlineRoundness = value, false;
    // }


    loadAppearanceToNpc(npc: mw.Character, dressData) {
        // let allCloth = dressData.clothes;
        // if (allCloth.length < 5) {
        //     allCloth = [3, 5, 7, 9, 11];
        // }
        // // 新换装方式 一次一套
        // const data1 = GameConfig.Dress.getElement(allCloth[0]);
        // const data2 = GameConfig.Dress.getElement(allCloth[1]);
        // const data3 = GameConfig.Dress.getElement(allCloth[3]);
        // const data4 = GameConfig.Dress.getElement(allCloth[4]);
        // const data5 = GameConfig.Dress.getElement(allCloth[2]);
        // const dataParts = GameConfig.Dress.getElement(data5.partsID)
        // let guidParts: string = "60116";
        // if (dataParts) {
        //     guidParts = String(dataParts.guid);
        // }

        // ToolUtils.getV2(npc).clearDescription()

        // // 切换性别
        // if (dressData.curSex === 1) {
        //     ToolUtils.getV2(npc).setSuit(mw.SomatotypeV2.AnimeFemale, "76618", String(data1.guid), String(data2.guid), String(data3.guid), String(data4.guid), String(data5.guid), guidParts);
        //     PlayerManagerExtesion.changeBaseStanceExtesion(npc,"30274")
        // } else {
        //     ToolUtils.getV2(npc).setSuit(mw.SomatotypeV2.AnimeMale, "76619", String(data1.guid), String(data2.guid), String(data3.guid), String(data4.guid), String(data5.guid), guidParts);
        //     PlayerManagerExtesion.changeBaseStanceExtesion(npc,"39317")
        // }
        // npc.onDescriptionComplete.add(() => {
        //     const customData = GameConfig.Custom.getAllElement();
        //     const allData = {};
        //     Object.assign(allData, dressData.customFaceData, dressData.customBodyData);
        //     customData.forEach(item => {
        //         const apiName = item.api;
        //         const id = item.id;
        //         const value = allData[id];
        //         if (value !== null && apiName !== null) {
        //             this.setCustomFunc(npc, apiName, value);
        //         }
        //     });

        // });

    }
}


export enum CamearScene {
    Dress,
    NpcTalk
}