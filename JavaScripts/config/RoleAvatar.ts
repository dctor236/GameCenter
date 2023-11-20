import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","mainType","type","name","desc","suit","upWear","underWear","hairfront","hairlate","gloves","shoe","modelIDs","effectIDs","quality","icon","iconByAsset","priceIcon","priceType","price","changeEffect","getTip"],["","","","","","","","","","","","","","","","","","","","","",""],[1,0,1,"黑白棋格","日常穿搭",null,"140330",null,null,null,"75663",null,null,null,1,"174332",null,"120752",2,30,154,null],[2,0,1,"布偶恋歌","加油加油！",null,"119350",null,null,null,"75663",null,null,null,2,"174336",null,"120752",2,60,154,null],[3,0,1,"圣诞甜心","保暖",null,"134944",null,null,null,"75663",null,null,null,3,"174357",null,"120752",2,90,154,null],[4,0,1,"提拉米苏","红红火火恍恍惚惚",null,"119354",null,null,null,"75663",null,null,null,2,"174349",null,"120752",2,60,154,null],[5,0,1,"粉红小兔","police",null,"119366",null,null,null,"75663",null,null,null,2,"174363",null,"120752",2,60,154,null],[6,0,1,"海盐猫猫",null,null,"111253",null,null,null,"75663",null,null,null,3,"174378",null,"120752",2,90,154,null],[7,0,1,"甜酷校花",null,null,"111505",null,null,null,"75663",null,null,null,2,"174365",null,"120752",2,60,154,null],[8,0,1,"工装芭比",null,null,"111241",null,null,null,"75663",null,null,null,4,"174358",null,"120752",2,150,154,null],[9,0,1,"暗夜特工","无",null,"111240",null,null,null,"75663",null,null,null,4,"174370",null,"120752",2,150,154,null],[10,0,1,"智慧战神","无",null,"111088",null,null,null,"111087",null,null,null,4,"174377",null,"120752",2,150,154,null],[11,0,1,"打歌服",null,null,"111714",null,null,null,"75663",null,null,null,4,"175847",null,"120752",2,150,154,null],[12,0,1,"阳光体育男装",null,null,"66414",null,null,null,"75663",null,null,null,2,"175853",null,"120752",2,60,154,null],[13,0,1,"科技偶像男装",null,null,"115938",null,null,null,"75663",null,null,null,4,"175851",null,"120752",2,150,154,null],[14,0,1,"邻家少年男装",null,null,"74113",null,null,null,"75663",null,null,null,3,"175848",null,"120752",2,90,154,null],[22,0,2,"圣诞王子男装","dddddddddd",null,null,"134943",null,null,"75663","134945",null,null,2,"174368",null,"120752",2,60,155,null],[23,0,2,"黑白棋格","dddddddddd",null,null,"140329",null,null,"75663","63541",null,null,1,"174359",null,"120752",2,30,155,null],[24,0,2,"智慧战神","dddddddddd",null,null,"125734",null,null,"75663","127315",null,null,4,"174381",null,"120752",2,150,155,null],[25,0,2,"暗夜特工","dddddddddd",null,null,"111248",null,null,"75663","111252",null,null,4,"174345",null,"120752",2,150,155,null],[26,0,2,"海盐牛仔","dddddddddd",null,null,"64152",null,null,"75663","65009",null,null,2,"174346",null,"120752",2,60,155,null],[27,0,2,"湛蓝美梦男装","dddddddddd",null,null,"66425",null,null,"75663","75658",null,null,2,"174333",null,"120752",2,60,155,null],[28,0,2,"明日之星男装","dddddddddd",null,null,"115941",null,null,"75663","66709",null,null,3,"174354",null,"120752",2,90,155,null],[29,0,2,"奇异博士男装","dddddddddd",null,null,"111613",null,null,"75663","140484",null,null,2,"174355",null,"120752",2,60,155,null],[30,0,2,"布偶恋歌男装","dddddddddd",null,null,"74119",null,null,"75663","127498",null,null,3,"174334",null,"120752",2,90,155,null],[31,0,2,"猫猫奇迹",null,null,null,"63313",null,null,"75663","63301",null,null,2,"175846",null,"120752",2,60,155,null],[32,0,2,"传奇大副",null,null,null,"63650",null,null,"75663","74458",null,null,3,"175855",null,"120752",2,90,155,null],[33,0,2,"浅蓝日常",null,null,null,"64457",null,null,"75663","111618",null,null,3,"175852",null,"120752",2,90,155,null],[34,0,2,"探险家",null,null,null,"65665",null,null,"75663","129937",null,null,3,"175844",null,"120752",2,90,155,null],[35,0,2,"马戏团",null,null,null,"65983",null,null,"75663","63541",null,null,3,"175854",null,"120752",2,90,155,null],[36,0,2,"古墓丽影",null,null,null,"66302",null,null,"75663","64456",null,null,3,"175856",null,"120752",2,90,155,null],[37,0,2,"浅咖校园",null,null,null,"66356",null,null,"75663","66687",null,null,4,"175858",null,"120752",2,150,155,null],[38,0,2,"街舞偶像",null,null,null,"111718",null,null,"75663","143667",null,null,4,"175843",null,"120752",2,150,155,null],[39,0,2,"圣诞之歌",null,null,null,"134487",null,null,"75663","64541",null,null,4,"175857",null,"120752",2,150,155,null],[40,0,2,"将首",null,null,null,"144575",null,null,"75663","74116",null,null,4,"175845",null,"120752",2,150,155,null],[41,0,3,"暗黑洛丽塔","dddddddddd",null,"60981",null,null,null,"75663",null,null,null,3,"131161",null,"120752",2,300,156,null],[42,0,3,"缤纷嘉年华","dddddddddd",null,"62535",null,null,null,"75663",null,null,null,1,"110759",null,"120752",2,100,156,null],[43,0,3,"人鱼恋歌","dddddddddd",null,"124880",null,null,null,"75663",null,null,null,3,"174362",null,"120752",2,300,156,null],[44,0,3,"古堡公主","dddddddddd",null,"63954",null,null,null,"75663",null,null,null,3,"123184",null,"120752",2,300,156,null],[45,0,3,"守护甜心","dddddddddd",null,"63538",null,null,null,"75663",null,null,null,1,"123183",null,"120752",2,100,156,null],[46,0,3,"荷露妖姬","dddddddddd",null,"63871",null,null,null,"75663",null,null,null,4,"123222",null,"120752",2,500,156,null],[47,0,3,"樱粉落霞","宽松舒适",null,"64141",null,null,null,"75663",null,null,null,4,"110627",null,"120752",2,500,156,null],[48,0,3,"狐妖小红娘","干巴爹",null,"64138",null,null,null,"75663",null,null,null,3,"174383",null,"120752",2,300,156,null],[49,0,3,"暗黑女仆","(*^▽^*)",null,"66712",null,null,null,"75663",null,null,null,3,"174328",null,"120752",2,300,156,null],[50,0,3,"奇异博士男","风度",null,"111612",null,null,null,"75663",null,null,null,3,"174352",null,"120752",2,300,156,null],[51,0,3,"零之使魔","风度",null,"119745",null,null,null,"75663",null,null,null,4,"123142",null,"120752",2,500,156,null],[52,0,3,"海盗王男装","这就是个性！",null,"126920",null,null,null,"75663",null,null,null,4,"174367",null,"120752",2,500,156,null],[53,0,3,"奶咖女仆",null,null,"63291",null,null,null,"75663",null,null,null,1,"123227",null,"120752",2,100,156,null],[54,0,3,"旋律女王",null,null,"63290",null,null,null,"75663",null,null,null,3,"123229",null,"120752",2,300,156,null],[55,0,3,"赫敏","美丽的魔法服饰！",null,"66353",null,null,null,"75663",null,null,null,3,"164193",null,"120752",2,0,156,"星星商店"],[56,0,3,"小丑女",null,null,"63539",null,null,null,"75663",null,null,null,1,"123169",null,"120752",2,100,156,null],[58,0,4,"天竺玉兔","高",null,null,null,"63546","63549",null,null,null,null,2,"174344",null,"120752",2,100,154,null],[59,0,4,"恶魔紫罗兰","短",null,null,null,"60988","60990",null,null,null,null,2,"174361",null,"120752",2,100,154,null],[60,0,4,"圣洁玛丽亚","古风",null,null,null,"64255","64717",null,null,null,null,3,"174340",null,"120752",2,150,154,null],[61,0,4,"团团红发","凉快",null,null,null,"74317","63305",null,null,null,null,1,"174335",null,"120752",2,50,154,null],[62,0,4,"萨拉芬妮101","女王大人",null,null,null,"118590","64777",null,null,null,null,3,"174351",null,"120752",2,150,154,null],[63,0,4,"黑化学生头","运动",null,null,null,"64146","64150",null,null,null,null,3,"174372",null,"120752",2,150,154,null],[64,0,4,"孪生法音公主","源头",null,null,null,"67588","67586",null,null,null,null,4,"174369",null,"120752",2,200,154,null],[65,0,4,"切发丸子头","皮",null,null,null,"109834","109838",null,null,null,null,1,"174356",null,"120752",2,50,154,null],[66,0,4,"机械兔女郎","啊啊啊",null,null,null,"65664","73212",null,null,null,null,2,"175850",null,"120752",2,100,154,null],[67,0,4,"蓬松双马尾",null,null,null,null,"119428","119430",null,null,null,null,2,"174329",null,"120752",2,100,154,null],[68,0,4,"偶像男子天团",null,null,null,null,"66162","66161",null,null,null,null,1,"174343",null,"120752",2,50,154,null],[69,2,5,"稚蓝光子",null,null,null,null,null,null,null,null,null,[74],1,"110691",null,"120752",2,50,155,null],[70,2,5,"冥炎",null,null,null,null,null,null,null,null,null,[75],1,"110723",null,"120752",2,50,155,null],[71,2,5,"弥赛亚",null,null,null,null,null,null,null,null,null,[76],1,"110755",null,"120752",2,50,155,null],[72,2,5,"荒寂之炎",null,null,null,null,null,null,null,null,null,[77],1,"110719",null,"120752",2,50,155,null],[73,2,5,"斑斓极光",null,null,null,null,null,null,null,null,null,[78],1,"110686",null,"120752",2,50,155,null],[74,2,5,"星星之火",null,null,null,null,null,null,null,null,null,[79],1,"110718",null,"120752",2,50,155,null],[75,2,5,"偶像幻景",null,null,null,null,null,null,null,null,null,[80],2,"110751",null,"120752",2,100,155,null],[76,2,5,"彩虹",null,null,null,null,null,null,null,null,null,[81],2,"110715",null,"120752",2,100,155,null],[77,2,5,"恣意",null,null,null,null,null,null,null,null,null,[82],2,"110682",null,"120752",2,100,155,null],[78,2,5,"冰魄之魂",null,null,null,null,null,null,null,null,null,[83],3,"110761",null,"120752",2,150,155,null],[79,2,5,"黄金之风",null,null,null,null,null,null,null,null,null,[84],1,"123245",null,"120752",2,50,155,null],[80,2,5,"渐渡",null,null,null,null,null,null,null,null,null,[85],2,"123182",null,"120752",2,100,155,null],[81,2,5,"点点星光",null,null,null,null,null,null,null,null,null,[86],2,"123138",null,"120752",2,100,155,null],[82,2,5,"绚烂烟花",null,null,null,null,null,null,null,null,null,[87],2,"123164",null,"120752",2,100,155,null],[83,2,5,"原子",null,null,null,null,null,null,null,null,null,[88],2,"123165",null,"120752",2,100,155,null],[84,2,5,"斑斓彩虹",null,null,null,null,null,null,null,null,null,[89],3,"123156",null,"120752",2,150,155,null],[85,2,5,"冰蓝海岛",null,null,null,null,null,null,null,null,null,[90],2,"123181",null,"120752",2,100,155,null],[86,2,5,"双子",null,null,null,null,null,null,null,null,null,[91],3,"123204",null,"120752",2,150,155,null],[87,2,5,"音乐之声",null,null,null,null,null,null,null,null,null,[92],3,"123163",null,"120752",2,150,155,null],[88,2,5,"爆炸彩虹",null,null,null,null,null,null,null,null,null,[93],3,"123205",null,"120752",2,150,155,null],[89,2,5,"眩晕",null,null,null,null,null,null,null,null,null,[94],2,"158621",null,"120752",2,100,155,null],[90,2,5,"行星质粒",null,null,null,null,null,null,null,null,null,[95],2,"174337",null,"120752",2,100,155,null],[91,2,5,"气泡",null,null,null,null,null,null,null,null,null,[96],1,"148843",null,"120752",2,50,155,null],[92,2,5,"勇闯天涯",null,null,null,null,null,null,null,null,null,[97],1,"148831",null,"120752",2,50,155,null],[93,2,5,"爆竹声声",null,null,null,null,null,null,null,null,null,[98],1,"148834",null,"120752",2,50,155,null],[94,2,5,"翌年",null,null,null,null,null,null,null,null,null,[99],2,"148836",null,"120752",2,100,155,null],[95,2,5,"礼物",null,null,null,null,null,null,null,null,null,[100],1,"148844",null,"120752",2,50,155,null],[96,2,5,"爱心",null,null,null,null,null,null,null,null,null,[101],2,"148835",null,"120752",2,100,155,null],[97,2,5,"香蕉皮",null,null,null,null,null,null,null,null,null,[102],2,"148824",null,"120752",2,100,155,null],[98,2,5,"钱",null,null,null,null,null,null,null,null,null,[103],2,"148829",null,"120752",2,100,155,null],[99,2,5,"糖果",null,null,null,null,null,null,null,null,null,[104],2,"148827",null,"120752",2,100,155,null],[100,2,5,"芝士漩涡",null,null,null,null,null,null,null,null,null,[105],2,"148830",null,"120752",2,100,155,null],[101,2,5,"彩纸",null,null,null,null,null,null,null,null,null,[106],1,"148841",null,"120752",2,50,155,null],[102,2,5,"缤纷",null,null,null,null,null,null,null,null,null,[107],2,"174364",null,"120752",2,100,155,null],[103,2,5,"足球",null,null,null,null,null,null,null,null,null,[108],2,"148833",null,"120752",2,100,155,null],[104,2,5,"清冷之声",null,null,null,null,null,null,null,null,null,[109],2,"148845",null,"120752",2,100,155,null],[105,2,5,"亡魂",null,null,null,null,null,null,null,null,null,[110],2,"148825",null,"120752",2,100,155,null],[106,2,5,"漫天繁星",null,null,null,null,null,null,null,null,null,[111],1,"148826",null,"120752",2,50,155,null],[107,2,6,"海盐天使",null,null,null,null,null,null,null,null,null,[112],1,"110634",null,"120752",2,80,156,null],[108,2,6,"金色丘比特",null,null,null,null,null,null,null,null,null,[113],1,"110633",null,"120752",2,80,156,null],[109,2,6,"雷电天使",null,null,null,null,null,null,null,null,null,[114],2,"110637",null,"120752",2,160,156,null],[110,2,6,"芋圆天使",null,null,null,null,null,null,null,null,null,[115],2,"110635",null,"120752",2,160,156,null],[111,2,6,"翡翠天使",null,null,null,null,null,null,null,null,null,[116],2,"110636",null,"120752",2,160,156,null],[112,2,6,"浴火凤凰",null,null,null,null,null,null,null,null,null,[117],2,"110638",null,"120752",2,160,156,null],[113,2,6,"哥特天使",null,null,null,null,null,null,null,null,null,[118],2,"110622",null,"120752",2,160,156,null],[114,2,6,"火热节奏",null,null,null,null,null,null,null,null,null,[119],2,"110619",null,"120752",2,160,156,null],[115,2,6,"湛蓝深空",null,null,null,null,null,null,null,null,null,[120],2,"110639",null,"120752",2,160,156,null],[116,2,6,"淘金者",null,null,null,null,null,null,null,null,null,[121],2,"110679",null,"120752",2,160,156,null],[117,2,6,"梦幻天使",null,null,null,null,null,null,null,null,null,[122],2,"123187",null,"120752",2,160,156,null],[118,2,6,"蓝色妖姬",null,null,null,null,null,null,null,null,null,[123],3,"123151",null,"120752",2,240,156,null],[119,2,6,"金色传说",null,null,null,null,null,null,null,null,null,[124],3,"123223",null,"120752",2,240,156,null],[120,2,6,"火焰魅影",null,null,null,null,null,null,null,null,null,[125],3,"123158",null,"120752",2,240,156,null],[121,2,6,"爱之神",null,null,null,null,null,null,null,null,null,[126],3,"123244",null,"120752",2,240,156,null],[122,2,6,"黄金闪电",null,null,null,null,null,null,null,null,null,[127],3,"123141",null,"120752",2,240,156,null],[123,2,6,"炫紫雷电",null,null,null,null,null,null,null,null,null,[128],3,"123186",null,"120752",2,240,156,null],[124,2,6,"黄金烈焰",null,null,null,null,null,null,null,null,null,[129],3,"123137",null,"120752",2,240,156,null],[125,2,6,"海王之翼",null,null,null,null,null,null,null,null,null,[130],3,"123225",null,"120752",2,240,156,null],[126,2,6,"流光溢紫",null,null,null,null,null,null,null,null,null,[131],2,"123157",null,"120752",2,160,156,null],[127,2,6,"枫之翼",null,null,null,null,null,null,null,null,null,[132],2,"174376",null,"120752",2,160,156,null],[128,2,6,"小恶魔",null,null,null,null,null,null,null,null,null,[133],3,"174374",null,"120752",2,240,156,null],[129,2,6,"蝴蝶仙子",null,null,null,null,null,null,null,null,null,[134],2,"174338",null,"120752",2,160,156,null],[130,2,6,"维纳斯之翼",null,null,null,null,null,null,null,null,null,[135],3,"174330",null,"120752",2,240,156,null],[131,2,6,"蝶之梦",null,null,null,null,null,null,null,null,null,[136],2,"174348",null,"120752",2,160,156,null],[132,2,6,"纯白天使",null,null,null,null,null,null,null,null,null,[137],2,"174382",null,"120752",2,160,156,null],[133,2,6,"幽蓝天使",null,null,null,null,null,null,null,null,null,[138],2,"174347",null,"120752",2,160,156,null],[134,2,6,"梦幻飞马",null,null,null,null,null,null,null,null,null,[139],2,"174326",null,"120752",2,160,156,null],[135,2,6,"蝉之梦",null,null,null,null,null,null,null,null,null,[140],2,"174373",null,"120752",2,160,156,null],[136,2,6,"炽天使",null,null,null,null,null,null,null,null,null,[141],3,"174380",null,"120752",2,240,156,null],[137,2,6,"芭蕾光影",null,null,null,null,null,null,null,null,null,[142],3,"174366",null,"120752",2,240,156,null],[138,2,6,"蝴蝶梦",null,null,null,null,null,null,null,null,null,[143],3,"174339",null,"120752",2,240,156,null],[139,2,6,"艾斯帕之翼",null,null,null,null,null,null,null,null,null,[144],3,"174341",null,"120752",2,240,156,null],[140,2,6,"琉璃之翼",null,null,null,null,null,null,null,null,null,[145],3,"174342",null,"120752",2,240,156,null],[141,2,6,"天使之翼",null,null,null,null,null,null,null,null,null,[146],3,"164433",null,"120752",2,240,156,"星星商店"],[142,2,6,"心有灵犀",null,null,null,null,null,null,null,null,null,[147],4,"174360",null,"120752",2,300,156,null],[143,2,6,"海洋之心",null,null,null,null,null,null,null,null,null,[148],4,"174375",null,"120752",2,300,156,null],[144,2,6,"金丝雀",null,null,null,null,null,null,null,null,null,[149],4,"174353",null,"120752",2,400,156,null],[145,2,6,"萤火流光",null,null,null,null,null,null,null,null,null,[150],4,"174371",null,"120752",2,300,156,null],[146,2,6,"浮世绘",null,null,null,null,null,null,null,null,null,[151],4,"174331",null,"120752",2,300,156,null],[147,2,6,"仲夏夜之梦",null,null,null,null,null,null,null,null,null,[152],4,"174327",null,"120752",2,400,156,null],[148,2,6,"炼狱使者",null,null,null,null,null,null,null,null,null,[153],4,"174379",null,"120752",2,400,156,null],[149,0,0,"啦啦队男",null,"11CBA58A4889ECB2ED379B87524A3998",null,null,null,null,null,null,null,null,4,"174379",null,null,2,0,156,null],[150,0,0,"啦啦队女",null,"79390FF34FFBF4B9B5FADBAFE4EB0F90",null,null,null,null,null,null,null,null,4,"174379",null,null,2,0,156,null],[151,0,0,"男服务生",null,"4B0F6A3746EE2E705D4D12B104BE8DAD",null,null,null,null,null,null,null,null,4,"174379",null,null,2,0,156,null],[152,0,0,"女服务生",null,"72F40D2143ED287E6E70A28350217AF7",null,null,null,null,null,null,null,null,4,"174379",null,null,2,0,156,null],[153,0,0,"魔法男老师",null,"39CBD00A4BBA5858A762E78BEA7E770C",null,null,null,null,null,null,null,null,4,"174379",null,null,2,0,156,null],[154,0,0,"魔法女老师",null,"9BEB44B14914FCA5CA1E068F70416287",null,null,null,null,null,null,null,null,4,"174379",null,null,2,0,156,null],[155,0,0,"篮球男",null,"5D18CD3149AB59B59C693CAB30602E02",null,null,null,null,null,null,null,null,4,"174379",null,null,2,0,156,null],[156,0,0,"篮球女",null,"6B0BF09140A38E377083B78945272D70",null,null,null,null,null,null,null,null,4,"174379",null,null,2,0,156,null],[157,0,0,"音乐男老师",null,"E18BCAA3438AA58B19E1A38367753DE5",null,null,null,null,null,null,null,null,4,"174379",null,null,2,0,156,null],[158,0,0,"音乐女老师",null,"1FA626AA4ABE410A53FC20A7D293577A",null,null,null,null,null,null,null,null,4,"174379",null,null,2,0,156,null],[159,0,0,"校服男",null,"7632B580400488A49554A3B271214A96",null,null,null,null,null,null,null,null,4,"174379",null,null,2,0,156,null],[160,0,0,"校服女",null,"70F8184B47B8C79AE111F6B3F6E42C4F",null,null,null,null,null,null,null,null,4,"174379",null,null,2,0,156,null],[161,0,0,"魔法男学生",null,"7A80919F440351735852B9869A10AFC1",null,null,null,null,null,null,null,null,4,"174379",null,null,2,0,156,null],[162,0,0,"魔法女学生",null,"826167AE45BEB81C9221D8AE4CFDC673",null,null,null,null,null,null,null,null,4,"174379",null,null,2,0,156,null],[163,0,0,"音乐男学生",null,"54BD09F146C544CF59BCA8A00BFDBE89",null,null,null,null,null,null,null,null,4,"174379",null,null,2,0,156,null],[164,0,0,"音乐女学生",null,"76FDA28D48FC8DBFD08DE6ACC41C02EC",null,null,null,null,null,null,null,null,4,"174379",null,null,2,0,156,null],[165,0,0,"化妆男老师",null,"817F981246A8D4F0F5E556BA9B52C522",null,null,null,null,null,null,null,null,4,"174379",null,null,2,0,156,null],[166,0,0,"化妆女老师",null,"5D97096345C55269704DD6B426BE117D",null,null,null,null,null,null,null,null,4,"174379",null,null,2,0,156,null],[167,0,0,"摇滚男学生",null,"3F0E643841F8FC4F2E06799AEFCC6BD4",null,null,null,null,null,null,null,null,4,"174379",null,null,2,0,156,null],[168,0,0,"摇滚女学生",null,"75CBF22040F33CEBCCF7028A1FF94E07",null,null,null,null,null,null,null,null,4,"174379",null,null,2,0,156,null],[169,0,0,"泳装男",null,"65681A66407A12E61C06568A70D3C3AE",null,null,null,null,null,null,null,null,4,"174379",null,null,2,0,156,null],[170,0,0,"泳装女",null,"13CCEBFB4477BB0AE38A67943FA05590",null,null,null,null,null,null,null,null,4,"174379",null,null,2,0,156,null],[1001,0,1,"潮流泳衣","来自童话小镇的特产，数量极其稀少",null,"111497",null,null,null,null,null,null,null,3,"122339",null,"137787",3,10,154,"童话小镇"],[1002,0,1,"圣诞麋鹿上衣","来自童话小镇的特产，数量极其稀少",null,"134234",null,null,null,null,null,null,null,3,"135037",null,"137787",3,10,154,"童话小镇"],[1003,0,1,"祥瑞上衣","来自童话小镇的特产，数量极其稀少",null,"137385",null,null,null,null,null,null,null,3,"171994",null,"137787",3,10,154,"童话小镇"],[1004,0,1,"七分袖和服","来自童话小镇的特产，数量极其稀少",null,"117491",null,null,null,null,null,null,null,3,"123658",null,"137787",3,10,154,"童话小镇"],[1005,0,1,"浅黄外套","来自童话小镇的特产，数量极其稀少",null,"59857",null,null,null,null,null,null,null,3,"172181",null,"137787",3,10,154,"童话小镇"],[1006,0,1,"运动T恤","来自童话小镇的特产，数量极其稀少",null,"63686",null,null,null,null,null,null,null,3,"172389",null,"137787",3,10,154,"童话小镇"],[1007,0,1,"蓝白交领上衣","来自童话小镇的特产，数量极其稀少",null,"65780",null,null,null,null,null,null,null,3,"172388",null,"137787",3,10,154,"童话小镇"],[1008,0,3,"埃及风情","来自童话小镇的特产，数量极其稀少",null,"127852",null,null,null,null,null,null,null,4,"131160",null,"137787",4,99999,156,"童话小镇"],[1009,0,4,"兔兔头套","来自童话小镇的特产，数量极其稀少",null,null,null,"120576","120576",null,null,null,null,3,"123375",null,"137787",3,10,154,"童话小镇"],[1010,0,4,"光之巨人头套","来自童话小镇的特产，数量极其稀少",null,null,null,"64546","64546",null,null,null,null,3,"131101",null,"137787",3,10,154,"童话小镇"],[1011,0,4,"玩具熊头套","来自童话小镇的特产，数量极其稀少",null,null,null,"125481","125481",null,null,null,null,3,null,"125481","137787",3,20,154,"童话小镇"],[1012,0,4,"小黑头套","来自童话小镇的特产，数量极其稀少",null,null,null,"119113","119113",null,null,null,null,3,"123377",null,"137787",3,50,154,"童话小镇"],[1013,0,4,"奶酪宝宝头套","来自童话小镇的特产，数量极其稀少",null,null,null,"125305","125305",null,null,null,null,3,null,"125305","137787",3,10,154,"童话小镇"],[1014,0,4,"玩具兔头套","来自童话小镇的特产，数量极其稀少",null,null,null,"129089","129089",null,null,null,null,3,null,"129089","137787",3,20,154,"童话小镇"],[1015,0,4,"小黎头套","来自童话小镇的特产，数量极其稀少",null,null,null,"63873","63873",null,null,null,null,3,"131155",null,"137787",3,20,154,"童话小镇"],[1016,0,4,"舞龙舞狮头套","来自童话小镇的特产，数量极其稀少",null,null,null,"142679","142679",null,null,null,null,4,null,"142679","137787",3,999,156,"童话小镇"]];
export interface IRoleAvatarElement extends IElementBase{
 	/**id*/
	ID:number
	/**主分类(0=外观 1=挂件类 2=特效类)*/
	mainType:number
	/**分类(显示用标签)*/
	type:number
	/**名字*/
	name:string
	/**简介*/
	desc:string
	/**套装*/
	suit:string
	/**上衣*/
	upWear:string
	/**下衣*/
	underWear:string
	/**前发*/
	hairfront:string
	/**后发*/
	hairlate:string
	/**手套*/
	gloves:string
	/**鞋*/
	shoe:string
	/**挂件*/
	modelIDs:Array<number>
	/**特效*/
	effectIDs:Array<number>
	/**质量*/
	quality:number
	/**装备图标*/
	icon:string
	/**资源转图标*/
	iconByAsset:string
	/**价格图标*/
	priceIcon:string
	/**价格类型(1=正常购买 2=活动获得)*/
	priceType:number
	/**价格*/
	price:number
	/**换装特效*/
	changeEffect:number
	/**获取路径*/
	getTip:string
 } 
export class RoleAvatarConfig extends ConfigBase<IRoleAvatarElement>{
	constructor(){
		super(EXCELDATA);
	}

}