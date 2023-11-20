import { GameConfig } from "../../config/GameConfig";
import { IShopElement } from "../../config/Shop";
import { ShowItemType } from "../../const/GameEnum";
import { GlobalModule } from "../../const/GlobalModule";
import { UIManager } from "../../ExtensionType";
import { TS3 } from "../../ts3/TS3";
import Tips from "../../ui/commonUI/P_Tips";
import GameUtils from "../../utils/GameUtils";
import { BagModuleC } from "../bag/BagModuleC";
import { GetItem } from "../bag/ui/GetItem";
import { MGSMsgHome } from "../mgsMsg/MgsmsgHome";
import ShopDataInfo, { CoinType } from "./ShopDataInfo";
import ShopModuleS from "./ShopModuleS";
import ShopUI from "./ShopUI";

export enum ShopItemType {
    None,
    //物品
    Item,
    //衣服
    Cloth
}

export class ClothItem {
    tri: mw.Trigger
    wui: mw.UIWidget
    clothID: number
    wuiLoc: Vector
    canTry: boolean = false

    init(id: number) {
        this.clothID = id
        const shopElem = GameConfig.Shop.getElement(id)
        let triUI = this.wui.getTargetUIWidget()
        this.wui.widgetSpace = mw.WidgetSpaceMode.World
        // this.wui.drawSize.set(new Vector2(0.5, 0.5))
        this.wui.headUIMaxVisibleDistance = 1000;
        this.wui.scaledByDistanceEnable = false
        this.wui.pivot = new mw.Vector2(0.5, 0.5);
        this.wui.selfOcclusion = true
        this.wui.occlusionEnable = true
        // this.wui.interaction = true
        const mBtnTry = triUI.findChildByPath('RootCanvas/mBtnTry') as mw.Button
        const mClothTex = triUI.findChildByPath('RootCanvas/mClothName') as mw.TextBlock
        mBtnTry.onClicked.add(async () => {

        })
        mClothTex.text = shopElem.Name
        this.wuiLoc = this.wui.worldTransform.position
        this.wui.refresh()

        if (!this.tri) {
            console.error("服装触发器没有", this.clothID)
        }

        //初始化触发器
        this.tri.onEnter.add((go) => {
            if (GameUtils.isPlayerCharacter(go)) {
                UIManager.show(ShopUI, id)
            }
        })

        this.tri.onLeave.add((go) => {
            if (GameUtils.isPlayerCharacter(go)) {
                UIManager.hide(ShopUI)
            }
        })
    }
    update() {
        let ch = Player.localPlayer.character
        let chLoc = ch.worldTransform.position
        if (Vector.squaredDistance(chLoc, this.wuiLoc) <= 20000 * 100) {
            this.canTry = true
            let chRot = ch.worldTransform.rotation
            let rot = chLoc.subtract(this.wuiLoc).toRotation()
            this.wui.worldTransform.rotation = new Rotation(chRot.x, chRot.y, rot.z)
        } else {
            this.canTry = false
        }
    }

}

const RoomItrm = "24B13492"
export default class ShopModuleC extends ModuleC<ShopModuleS, ShopDataInfo> {
    public itemList: ClothItem[] = []

    private _setStr: mw.SomatotypeV2
    protected onStart(): void {

    }
    protected onEnterScene(sceneType: number): void {
        this.init()
    }

    public leaveMgs() {
        MGSMsgHome.uploadMGS('ts_game_result', '玩家每次离开游戏时神奇豌豆的数量', { record: 'exit_game_diamond', recover: this.data.getCoin(CoinType.PeaCoin) })
    }

    private init() {
        MGSMsgHome.uploadMGS('ts_game_result', '玩家每次进入游戏时神奇豌豆的数量', { record: 'enter_game_diamond', box: this.data.getCoin(CoinType.PeaCoin) })
        Player.asyncGetLocalPlayer().then(async p => {
            await p.character.asyncReady()
            let humanV2 = p.character
            this._setStr = humanV2.description.advance.base.characterSetting.somatotype;
            let flag = 1
            if (this._setStr == mw.SomatotypeV2.AnimeFemale || this._setStr == mw.SomatotypeV2.LowpolyAdultFemale || this._setStr == mw.SomatotypeV2.RealisticAdultFemale) {
                //女性
                flag = 2
            } else if (this._setStr == mw.SomatotypeV2.LowpolyAdultMale || this._setStr == mw.SomatotypeV2.AnimeMale || this._setStr == mw.SomatotypeV2.RealisticAdultMale) {
                //男性
                flag = 1
            }
            let allShopElems: IShopElement[] = []
            GameConfig.Shop.getAllElement().forEach(e => {
                allShopElems.push(e)
            })

            // //获取主游戏数据并覆盖当前金币
            this.setCoin()

            GameObject.asyncFindGameObjectById(RoomItrm).then(o => {
                const triGroup = o.getChildByName('triGroup').getChildren()
                const wuiGroup = o.getChildByName('wordUIGroup').getChildren()
                for (let i = 0; i < triGroup.length; i++) {
                    const shopElem = allShopElems[i]
                    const tri = triGroup[i] as mw.Trigger
                    const wui = wuiGroup[i] as mw.UIWidget
                    let item = new ClothItem()
                    item.tri = tri
                    item.wui = wui
                    item.init(shopElem.id)
                    this.itemList.push(item)
                }
            })
        })

    }


    public async setCoin() {
        await TS3.userMgr.dataReady();
        this.req_setCoin(CoinType.PeaCoin, TS3.userMgr.getItemCount(110009))
    }

    getAllClothPos(): Vector[] {
        let res: Vector[] = []
        this.itemList.forEach(e => {
            if (e.tri.worldTransform.scale != Vector.zero) {
                res.push(e.tri.worldTransform.position.clone())
            }
        })
        return res
    }


    req_addCoin(type: CoinType, num: number, showUI: boolean = true) {
        this.net_onAddCoin(type, num, showUI)
        this.server.net_AddCoin(type, num);
    }

    net_onAddCoin(type: CoinType, num: number, showUI: boolean = true) {
        if (type == CoinType.GoldCoin) {
            if (num < 0) {
                TS3.userMgr.costCoin(1, num)
            } else {
                TS3.userMgr.addCoin(1, num)
            }
        } else if (type == CoinType.PeaCoin) {
            if (num < 0) {
                ModuleService.getModule(BagModuleC).useItem(110009, num)
            } else {
                if (showUI) {
                    let gitfMap = new Map([[110009, num]]);
                    UIManager.hide(GetItem)
                    mw.UIService.show(GetItem, gitfMap, ShowItemType.Get);
                }
                TS3.userMgr.addItem(110009, num)
            }
        }
        this.data.addCoin(type, num);
        this.data.save(false);
    }

    req_setCoin(type: CoinType, num: number) {
        if (num < 0)
            return
        switch (type) {
            case CoinType.GoldCoin:
                this.data.goldCoin = num
                break
            case CoinType.PeaCoin:
                this.data.peaCoin = num
                break
            default: break
        }
        this.data.save(false);
        this.server.net_SetCoin(type, num)
    }

    haveItem(clothID: number) {
        return GlobalModule.MyPlayerC.Cloth.hasSuit(clothID)
    }


    req_BuyCloth(itemID: number, cost: number, coinType: CoinType) {
        const shopElem = GameConfig.Shop.getElement(itemID)
        const clothID = shopElem.clothID
        if (GlobalModule.MyPlayerC.Cloth.hasSuit(clothID)) {
            Tips.show("已经有该商品了")
            return
        }
        if (this.data.getCoin(coinType) >= cost) {
            if (coinType == CoinType.GoldCoin) {
                TS3.userMgr.costCoin(1, cost)
                MGSMsgHome.uploadMGS('ts_game_result', '玩家每次使用魔莱坞金币成功购买服饰，打一个点', { record: 'buy_success_gold' })
            } else if (coinType == CoinType.PeaCoin) {
                //消耗主游戏豌豆道具数量
                ModuleService.getModule(BagModuleC).useItem(110009, cost)
                MGSMsgHome.uploadMGS('ts_game_result', '玩家每次使用神奇豌豆成功购买服饰，打一个点', { record: 'buy_success_diamond' })
            }
            // this.data.addCoin(coinType, -cost);
            GlobalModule.MyPlayerC.Cloth.buyCurSelect(clothID, false, false)
            let gitfMap = new Map([[clothID, 1]]);
            UIManager.show(GetItem, gitfMap, ShowItemType.Cloth);
            this.server.net_BuyShop(cost, coinType)
        } else {
            Tips.show('您没有这么多的货币')
        }
    }

    private _updateTime: number = 0
    protected onUpdate(dt: number): void {
        if (++this._updateTime % 2 != 0) return;
        this.itemList.forEach(e => {
            e.update()
        })
    }

}

