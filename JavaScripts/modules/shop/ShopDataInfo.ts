export enum CoinType {
    GoldCoin = 1,
    PeaCoin = 2
}

//商城数据
export default class ShopDataInfo extends Subdata {
    @Decorator.persistence()
    public peaCoin: number = 0;//
    @Decorator.persistence()
    public goldCoin: number = 0;//

    public readonly onSilverCoinChange: Action1<number> = new Action1();//RMB变化
    public readonly onGoldCoinChange: Action1<number> = new Action1();//RMB变化

    protected onDataInit(): void {
        if (this.peaCoin < 0) this.peaCoin = 0;
        if (this.goldCoin < 0) this.goldCoin = 0;
    }


    getCoin(coinType: CoinType): number {
        switch (coinType) {
            case CoinType.GoldCoin:
                return this.goldCoin;
            case CoinType.PeaCoin:
                return this.peaCoin;
            default:
                return 0;
        }
    }

    addCoin(coinType: CoinType, num: number) {
        switch (coinType) {
            case CoinType.GoldCoin:
                if (this.goldCoin + num < 0) return
                this.goldCoin += num;
                this.onGoldCoinChange.call(this.getCoin(coinType));
                break;
            case CoinType.PeaCoin:
                if (this.peaCoin + num < 0) return
                this.peaCoin += num;
                this.onSilverCoinChange.call(this.getCoin(coinType));
                break;
            default:
                break;
        }
    }

}