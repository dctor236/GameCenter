import ShopDataInfo, { CoinType } from "./ShopDataInfo";
import ShopModuleC from "./ShopModuleC";

export default class ShopModuleS extends ModuleS<ShopModuleC, ShopDataInfo> {


    net_BuyShop(cost: number, type: CoinType) {
        this.addCoin(type, -cost, this.currentPlayerId)
    }

    addCoin(type: CoinType, num: number, pid: number, callBack: boolean = false) {
        let player = Player.getPlayer(pid);
        if (!player) return;
        let data = this.getPlayerData(pid)
        data.addCoin(type, num);
        data.save(false);
        if (callBack) {
            this.getClient(pid).net_onAddCoin(type, num, true)
        }
    }

    net_AddCoin(type: CoinType, num: number) {
        this.addCoin(type, num, this.currentPlayerId)
    }

    net_SetCoin(type: CoinType, num: number) {
        switch (type) {
            case CoinType.GoldCoin:
                this.currentData.goldCoin = num
                break
            case CoinType.PeaCoin:
                this.currentData.peaCoin = num
                break
            default: break
        }
        this.currentData.save(false);
    }

}

