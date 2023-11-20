/*
 * @Author: 代纯 chun.dai@appshahe.com
 * @Date: 2023-06-10 10:54:51
 * @LastEditors: 代纯 chun.dai@appshahe.com
 * @LastEditTime: 2023-06-17 15:33:51
 * @FilePath: \vine-valley\JavaScripts\modules\shop\ShopUI.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { GameConfig } from "../../config/GameConfig";
import { IItemElement } from "../../config/Item";
import { IShopElement } from "../../config/Shop";
import { EventsName } from "../../const/GameEnum";
import { GlobalData } from "../../const/GlobalData";
import { GlobalModule } from "../../const/GlobalModule";
import { UIHide, UIManager } from "../../ExtensionType";
import ShopCityBasePanel_Generate from "../../ui-generate/shop/ShopCityBasePanel_generate";
import GameUtils from "../../utils/GameUtils";
import { MGSMsgHome } from "../mgsMsg/MgsmsgHome";
import FacadMainUI from "../player/ui/cloth/FacadMainUI";
import ShopDataInfo, { CoinType } from "./ShopDataInfo";
import ShopModuleC from "./ShopModuleC";

export default class ShopUI extends ShopCityBasePanel_Generate {
    protected shopElem: IShopElement
    protected itemElem: IItemElement
    onStart() {
        this.mClose_btn.onClicked.add(() => {
            UIHide(this)
        })

        let bData = DataCenterC.getData(ShopDataInfo)
        let silverCb = bData.onSilverCoinChange
        silverCb.add((num) => {
            this.mMoneyTex1.text = num + ''
        })

        this.mTipsBuy_btn.onClicked.add(() => {
            ModuleService.getModule(ShopModuleC).req_BuyCloth(this.shopElem.id, this.shopElem.money[0], CoinType.PeaCoin)
            ModuleService.getModule(ShopModuleC).haveItem(this.shopElem.clothID) ?
                this.mTipsBuy_btn.normalImageColor = mw.LinearColor.gray
                : this.mTipsBuy_btn.normalImageColor = mw.LinearColor.white
        })

        this.mReset.onClicked.add(() => {
            UIHide(this)
            GlobalModule.MyPlayerC.Cloth.resetPlayerCloth();
            GlobalData.clothConfigID = -1
        })

        this.mTry.onClicked.add(() => {
            //换装
            UIHide(this)
            this.changeCloth()
        })

    }

    async changeCloth() {
        if (GlobalData.clothConfigID == this.shopElem.clothID) { return }
        // await GlobalModule.MyPlayerC.Cloth.resetPlayerCloth();
        // setTimeout(async () => {
        await GlobalModule.MyPlayerC.Cloth.changeRoleAvatar(this.shopElem.clothID)
        GlobalModule.MyPlayerC.Cloth.saveAvatarData(false)
        // }, 100);
        GlobalData.clothConfigID = this.shopElem.clothID;
        Event.dispatchToLocal(EventsName.DoneTask, 1001, 1)
        UIManager.getUI(FacadMainUI).curSelect = this.shopElem.clothID
        MGSMsgHome.uploadMGS('ts_game_result', '每次游戏试穿服装的次数', { record: 'dress_sussess' })
    }

    protected onShow(itemID: number): void {
        this.shopElem = GameConfig.Shop.getElement(itemID)
        this.itemElem = GameConfig.Item.getElement(this.shopElem.goodID)
        if (!this.shopElem || !this.itemElem) {
            UIHide(this)
            return
        } else {
            if (!this.shopElem.money) {
                this.buyCanvas.visibility = mw.SlateVisibility.Collapsed
                this.tryCanvas.position = this.resetCanvas.position = new Vector2(71, 105)
            } else {
                ModuleService.getModule(ShopModuleC).haveItem(this.shopElem.clothID) ?
                    this.mTipsBuy_btn.normalImageColor = mw.LinearColor.gray
                    : this.mTipsBuy_btn.normalImageColor = mw.LinearColor.white

                this.buyCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible
                this.mTipsBuy_txt.text = this.shopElem.money[0] + ''
                this.tryCanvas.position = this.resetCanvas.position = new Vector2(223, 105)
            }
            if (GlobalData.clothConfigID == this.shopElem.clothID) {
                this.resetCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible
                this.tryCanvas.visibility = mw.SlateVisibility.Collapsed
            } else {
                this.resetCanvas.visibility = mw.SlateVisibility.Collapsed
                this.tryCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible
            }
        }
        this.showInfo()
    }

    protected showInfo() {
        this.mTipsGoodsName_txt.text = this.shopElem.Name
        if (this.itemElem.haveicon == 1) {
            this.mTipsIco_img.imageGuid = this.itemElem.Icon
        } else {
            GameUtils.setIconByAsset(this.itemElem.Icon, this.mTipsIco_img)
        }
        this.mTipsMsg_txt.text = this.itemElem.description
        let bData = DataCenterC.getData(ShopDataInfo)
        this.mMoneyTex1.text = bData.getCoin(CoinType.PeaCoin) + ''
    }

}