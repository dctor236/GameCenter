export namespace GlobalItemType {
	export class Make {
		readonly sound: string = "160547";
	}
	export class Fly {
		readonly haloEffct: string = "21653";
		readonly ribbonEffect: string = "73401"
		readonly guideEffect: string = "57199"
		readonly getPointSound: string = "131831"
	}
}
export namespace GlobalConfig {
	export const Make = new GlobalItemType.Make();
	export const Fly = new GlobalItemType.Fly();
}
