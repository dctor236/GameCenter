
@Component
export default class WUIFollow extends mw.Script {
    @mw.Property({ displayName: "距离", group: "属性" })
    distance: number = 16000 * 100

    private _wuiLoc: Vector
    protected async onStart() {
        await this.gameObject.asyncReady()
        if (SystemUtil.isServer())
            return
        this.useUpdate = true
        this._wuiLoc = this.gameObject.worldTransform.position
    }

    private _updateTime: number = 0
    protected onUpdate(dt: number): void {
        if (++this._updateTime % 2 != 0) return;
        let ch = Player.localPlayer.character
        let chLoc = ch.worldTransform.position
        if (Vector.squaredDistance(chLoc, this._wuiLoc) <= this.distance) {
            let chRot = ch.worldTransform.rotation
            let rot = chLoc.subtract(this._wuiLoc).toRotation()
            this.gameObject.worldTransform.rotation = new Rotation(chRot.x, chRot.y, rot.z)
        }
    }


    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {
    }
}