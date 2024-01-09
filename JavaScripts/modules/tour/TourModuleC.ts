import { UIManager } from "../../ExtensionType";
import MountHead_Generate from "../../ui-generate/tour/MountHead_generate";
import TourModuleS, { MountName, MountType } from "./TourModuleS";
/**
 * 熊猫向导模块服务器端 控制向导的行为
 */
export default class TourModuleC extends ModuleC<TourModuleS, null>  {

    public mountMap: Map<MountType, mw.Character> = new Map()

    public net_InitMounName(index: MountType, objGuid: string) {
        GameObject.asyncFindGameObjectById(objGuid).then((o) => {
            let mount: mw.Character = o as mw.Character
            const nameWUI = mount.overheadUI
            const nameUI = UIManager.getUI(MountHead_Generate, true)
            nameWUI.setTargetUIWidget(nameUI.uiWidgetBase)
            nameWUI.selfOcclusion = false
            nameWUI.occlusionEnable = false
            nameWUI.scaledByDistanceEnable = true
            nameUI.mName.text = MountName[index - 1]
            mount.overheadUI.setVisibility(mw.PropertyStatus.On)
            nameWUI.drawSize.set(nameUI.rootCanvas.size)
            nameWUI.localTransform.position = new Vector(0, 0, 50)
            nameWUI.refresh()
            this.mountMap.set(index, mount)
        })
    }

    public getMount(type: MountType) {
        return this.mountMap.get(type)
    }
}