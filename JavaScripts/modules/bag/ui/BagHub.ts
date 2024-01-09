import { GeneralManager, } from '../../../Modified027Editor/ModifiedStaticAPI';
/**
 * @Author       : meta
 * @Date         : 2023-03-06 10:44:59
 * @LastEditors  : meta
 * @LastEditTime : 2023-06-06 11:26:24
 * @FilePath     : \mollywoodschool\JavaScripts\modules\bag\ui\BagHub.ts
 * @Description  :
 */
import { EventsName } from "../../../const/GameEnum";
import { GlobalData } from "../../../const/GlobalData";
import { Tween, UIManager } from "../../../ExtensionType";
import BagHub_Generate from "../../../ui-generate/bag/BagHub_generate";
import { MGSMsgHome } from "../../mgsMsg/MgsmsgHome";
import { ItemInfo } from "../BagDataHelper";
import { BagModuleC } from "../BagModuleC";
import { BagInteraction } from "./BagInteraction";
import { GoodsItem } from "./GoodsItem";

const creationViewPos = mw.Vector2.zero;

const outPixelPos = mw.Vector2.zero;

const outViewPos = mw.Vector2.zero;

export class BagHub extends BagHub_Generate {
    /**快捷栏物品 */
    private _equipItems: ItemInfo[];
    /**选中物品 */
    private _selectEquip: GoodsItem;
    /**UI激活状态 */
    private _active: boolean;
    /**插槽 */
    private _allSlot: GoodsItem[] = [];
    /**快捷栏状态 */
    private _isShow: boolean = true;
    /**选中物品时长埋点 */
    private _selectTime: number;

    private get bagModuleC() {
        return ModuleService.getModule(BagModuleC);
    }

    protected onStart(): void {
        this.initEvents();
        /**初始化快捷栏 */
        for (let index = 1; index <= GlobalData.maxShortcutBar; index++) {
            const item = mw.UIService.create(GoodsItem);
            item.clickBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
            this.mShortcutBar.addChild(item.uiObject);
            item.uiObject.size = item.rootCanvas.size;
            item.restore();
            item.clickBtn.onClicked.add(() => {
                /** 埋点 */
                MGSMsgHome.bagClickEvent("backpack_click6");
                if (GlobalData.skillCD > 0) {
                    return;
                }
                this.selectItem(item);
            });
            item.closeBtn.onClicked.add(() => {
                if (GlobalData.skillCD > 0 || !GlobalData.isChangeBar) {
                    return;
                }
                if (this._selectEquip && this._selectEquip.id === item.id) {
                    this.unloadItem(item);
                }
                this.bagModuleC.removeShortcutBarItem(item.id);
            });
            this._allSlot.push(item);
        }
        this.guideBtn.visibility = mw.SlateVisibility.Hidden;
        this.mGuideBtn.visibility = mw.SlateVisibility.Hidden;
    }

    protected initButtons(): void {
        super.initButtons();

        this.mClearBar.onClicked.add(() => {
            if (GlobalData.skillCD > 0 || !GlobalData.isChangeBar) {
                return;
            }
            /** 埋点 */
            MGSMsgHome.bagClickEvent("backpack_click5");
            this.bagModuleC.clearShortCutBar();
        });

        this.mHideBar.onClicked.add(() => {
            /** 埋点 */
            MGSMsgHome.bagClickEvent("backpack_click4");
            const angle = this._isShow ? 180 : 0;
            const visibility = this._isShow ? mw.SlateVisibility.Collapsed : mw.SlateVisibility.SelfHitTestInvisible;
            this.mBarCon.visibility = visibility;
            this.mHideBar.renderTransformAngle = angle;
            this._isShow = !this._isShow;
        });
    }

    private initEvents() {
        /**刷新快捷栏 */
        this.bagModuleC.onRefreshBar.add(this.refreshShortcutBar, this);

        // Event.addLocalListener(EventsName.CreationSkills, (itemID: number, loc: mw.Vector) => {
        //     this.creationFly(itemID, loc);
        // });
    }

    protected onShow(...params: any[]): void {
        this.canUpdate = true;
        this._active = true;
        this.refreshShortcutBar();
    }

    protected onHide(): void {
        this.canUpdate = false;
        this._active = false;
    }

    /**
     * 刷新快捷栏
     * @return
     */
    private refreshShortcutBar() {
        if (!this._active) {
            return;
        }
        let visible = mw.SlateVisibility.Collapsed;
        const curEquip = this.bagModuleC.curEquip;
        this._equipItems = this.bagModuleC.getEquipItems(false);
        if (!curEquip && this._selectEquip && this._selectEquip.id) {
            this.unloadItem(this._selectEquip);
        }

        for (let index = 0; index < this._equipItems.length; index++) {
            const info = this._equipItems[index];
            const item = this._allSlot[index];
            item.setData(info);
            if (curEquip && curEquip === item.id) {
                item.mSelect.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                if (!this._selectEquip) {
                    this.selectItem(item);
                }
            }
            if (item.id && visible === mw.SlateVisibility.Collapsed) {
                visible = mw.SlateVisibility.SelfHitTestInvisible;
            }
        }
        this.mContent.visibility = visible;
        if (!this._isShow) {
            this.mHideBar.onClicked.broadcast();
        }
    }

    /**
     * 选中物品
     * @param  item
     * @return
     */
    private selectItem(item: GoodsItem) {
        if (!item.id) {
            return;
        }
        if (this._selectEquip && this._selectEquip.id) {
            this._selectEquip.mSelect.visibility = mw.SlateVisibility.Collapsed;
            this.unloadItem(this._selectEquip, false);
            if (this._selectEquip.id === item.id) {
                UIManager.hide(BagInteraction);
                this._selectEquip = null;
                this.bagModuleC.changEquipItem("");
                return;
            }
        }
        this.bagModuleC.changEquipItem(item.id);
        /**埋点 */
        this._selectTime = Date.now();
        MGSMsgHome.clickBagHub(item.config.ID);
        this._selectEquip = item;
        this._selectEquip.mSelect.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        Event.dispatchToServer(EventsName.LoadProp, item.config.Resource);
        Event.dispatchToLocal(EventsName.EquipProp, item.config.ID);
        if (item.config.isCanGive) {
            UIManager.show(BagInteraction);
        } else {
            UIManager.hide(BagInteraction);
        }
    }

    /**
     * 解除物品
     * @param item 物品
     * @param isNull  是否置为空
     */
    public unloadItem(item: GoodsItem, isNull: boolean = true) {
        let prop = 0;
        const config = item?.config;
        if (config) {
            prop = config.Resource;
            if (config.isCanGive) {
                UIManager.hide(BagInteraction);
            }
            /**埋点 */
            const time = Date.now() - this._selectTime;
            if (time >= 5000) {
                this._selectTime && MGSMsgHome.selectItemTime(config.ID, time);
                this._selectTime = 0;
            }
        }
        prop && Event.dispatchToServer(EventsName.UnloadProp, prop);
        if (isNull) {
            this._selectEquip = null;
        }
    }

}
