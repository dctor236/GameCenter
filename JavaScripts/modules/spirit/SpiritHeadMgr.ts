import { SpawnManager,SpawnInfo, } from '../../Modified027Editor/ModifiedSpawn';

export default class SpiritHeadMgr {
    private static _instance: SpiritHeadMgr;
    public srcPool: mw.UIWidget[] = []
    public static get instance() {
        if (!this._instance) {
            this._instance = new SpiritHeadMgr();
        }
        return this._instance
    }

    constructor() {

    }

    public async spawn() {
        let obj = this.srcPool.pop()
        if (!obj) {
            obj = await SpawnManager.asyncSpawn({
                guid: "UIWidget",
                replicates: false,
            })
            obj.widgetSpace = mw.WidgetSpaceMode.OverheadUI
            obj.headUIMaxVisibleDistance = 2500;
            obj.scaledByDistanceEnable = false
            obj.pivot = new mw.Vector2(0.5, 0.5);
            obj.selfOcclusion = false
            obj.occlusionEnable = false
            obj.localTransform.position = new Vector(0, 0, 100)
        }
        obj.setVisibility(PropertyStatus.On)
        return obj
    }

    public unSpawn(widget: mw.UIWidget) {
        widget.worldTransform.position = Vector.one.multiply(-5000)
        widget.parent = null
        this.srcPool.push(widget)
    }
}