import { IClothPartElement } from "../../config/ClothPart";
import { UIHide, UIManager } from "../../ExtensionType";
import battleitem_Generate from "../../ui-generate/beautybattle/battleitem_generate";
import { DressModuleC } from "../Dress/DressModule";
import { IItemRender } from "../taskModule/UIMultiScroller";
import BattleUI from "./BattleUI";

export default class BattleItemUI extends battleitem_Generate implements IItemRender {
    private _data: IClothPartElement;

    onStart(): void {
        Event.addLocalListener("Reset_Select", (dataID: number) => {
            if (dataID != this._data.ID) {
                this.setSelect(false)
            } else {
                this.setSelect(true)
            }
        })
    }

    get clickObj(): mw.StaleButton {
        throw new Error("Method not implemented.");
    }
    setSelect(bool: boolean): void {
        if (bool) {
            this.mSelect.visibility = mw.SlateVisibility.SelfHitTestInvisible
        } else {
            this.mSelect.visibility = mw.SlateVisibility.Collapsed
        }
    }

    setData(data: IClothPartElement): void {
        if (data == null) return;
        this.setSelect(false)
        this._data = data;
        this.mBtn.onClicked.clear()
        this.mIcon.imageGuid = data.icon
        this.mBtn.onClicked.add(() => {
            UIManager.getUI(BattleUI).action.call(this._data.ID)
            Event.dispatchToLocal("Reset_Select", this._data.ID)
            ModuleService.getModule(DressModuleC).changeClothPart(this._data.ID)
        })
    }
}