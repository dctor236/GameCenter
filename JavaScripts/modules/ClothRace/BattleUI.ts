import { EClothPart } from "../../const/GameEnum";
import { GlobalModule } from "../../const/GlobalModule";
import { UIHide } from "../../ExtensionType";
import battleui_Generate from "../../ui-generate/beautybattle/battleui_generate";
import { DressModuleC } from "../Dress/DressModule";
import ShopModuleC from "../shop/ShopModuleC";
import { UIMultiScroller } from "../taskModule/UIMultiScroller";
import BattleItemUI from "./BattleItemUI";
import ClothRaceC from "./ClothRaceC";

export default class BattleUI extends battleui_Generate {

    protected barItemList: mw.StaleButton[] = []
    protected selClothID: number = -1
    private _scroll: UIMultiScroller = null;
    public action: Action1<number> = new Action1()
    onStart(): void {
        for (let i = 1; i <= 6; i++) {
            const barItem = this["barItem" + i] as mw.StaleButton
            barItem.onClicked.add(() => {
                this.swithTag(i)
            })
            this.barItemList.push(barItem)
        }
        this._scroll = new UIMultiScroller(	//初始化动作滑动框
            this.mScroll,
            this.mContent,
            BattleItemUI,
            3, 0, 0, 180, 180, 4, 20, 60);

        this.mClose.onClicked.add(() => {
            UIHide(this)
        })
        this.accept.onClicked.add(() => {
            // if (this.selClothID != -1)
            //     ModuleService.getModule(DressModuleC).changeClothPart(this.selClothID)
        })
        this.action.add((id: number) => {
            this.selClothID = id
        })

        this.reset.onClicked.add(() => {
            GlobalModule.MyPlayerC.Cloth.resetPlayerCloth();
        })
    }

    onShow() {
        ModuleService.getModule(DressModuleC).moveCameraToBody(Player.localPlayer.character)
        this.swithTag(1)
    }

    swithTag(index: EClothPart) {
        this.selClothID = -1
        switch (index) {
            case EClothPart.Jacket:
            case EClothPart.Underwear:
            case EClothPart.Gloves:
            case EClothPart.Shoes:
                ModuleService.getModule(DressModuleC).moveCameraToBody(Player.localPlayer.character)
                break
            case EClothPart.BackHair:
            case EClothPart.FrontHair:
                ModuleService.getModule(DressModuleC).moveCameraToHead(Player.localPlayer.character)
                break
            default: break
        }
        const clothList = ModuleService.getModule(ClothRaceC).getClothPartByType(index)
        this._scroll.setData(clothList)
        Event.dispatchToLocal("Reset_Select", clothList[0].ID)
        this.selClothID = clothList[0].ID
    }

    onHide() {
        ModuleService.getModule(DressModuleC).resetCameraAndTransform()
    }
}