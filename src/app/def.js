let text = `Luigi Circuit, 1'08"774, Cole, Cole, Canada, 2019-11-26, Funky Kong, Torpedo, GCN Controller, 588;Moo Moo Meadows, 1'15"483, Sosis, Sosis, USA, 2019-11-02, Funky Kong, Bowser Bike, Wiimote+Nunchuck, 612;Mushroom Gorge, 0'20"320, Bryce, MG > DKSC, USA, 2021-04-07, Baby Mario, Quacker, Wii Wheel, 90;Toad's Factory, 1'44"465, Logan, Glιτch O, USA, 2021-05-03, Funky Kong, Bowser Bike, Classic Controller, 64;Mario Circuit, 0'47"715, Logan, Glιτch O, USA, 2021-02-11, Funky Kong, Torpedo, Classic Controller, 145;Coconut Mall, 0'31"481, Braixen, Glιτch V, USA, 2019-07-07, Daisy, Mach Bike, Classic Controller, 730;DK's Snowboard Cross, 1'45"268, Blake, DKSC > RR, USA, 2021-01-10, Funky Kong, Bowser Bike, GCN Controller, 177;Wario's Gold Mine, 0'31"882, Logan, Glιτch O, USA, 2021-03-01, Funky Kong, Bowser Bike, Classic Controller, 127;Daisy Circuit, 1'28"425, Luke, Lυkε, UK, 2019-08-12, Daisy, Mach Bike, Wiimote+Nunchuck, 694;Koopa Cape, 2'14"552, Justin, Glιτch J, USA, 2021-02-27, Funky Kong, Torpedo, Wiimote+Nunchuck, 129;Maple Treeway, 1'35"662, Demon, MT > DKSC, USA, 2021-06-04, Funky Kong, Torpedo, GCN Controller, 32;Grumble Volcano, 0'15"962, Niyake, ニヤケ, Japan, 2021-02-26, Baby Mario, Quacker, GCN Controller, 130;Dry Dry Ruins, 1'46"972, Justin, Glιτch J, USA, 2021-03-14, Funky Kong, Bowser Bike, Wiimote+Nunchuck, 114;Moonview Highway, 1'43"035, Luke, Lυkε, UK, 2021-03-05, Funky Kong, Bowser Bike, Wiimote+Nunchuck, 123;Bowser's Castle, 2'09"074, JT2K, Dr. Foote, USA, 2020-06-27, Daisy, Mach Bike, GCN Controller, 374;Rainbow Road, 2'12"143, Logan, Glιτch O, USA, 2021-04-03, Baby Daisy, Quacker, Classic Controller, 94;GCN Peach Beach, 1'00"049, Arrow, Arrσω, USA, 2020-05-24, Funky Kong, Torpedo, Wiimote+Nunchuck, 408;DS Yoshi Falls, 0'58"648, David, David, UK, 2020-11-08, Funky Kong, Torpedo, Classic Controller, 240;SNES Ghost Valley 2, 0'50"738, Logan, Glιτch O, USA, 2020-10-19, Funky Kong, Bowser Bike, Classic Controller, 260;N64 Mario Raceway, 1'41"335, Sosis, Sosis, USA, 2020-09-30, Funky Kong, Bowser Bike, Wiimote+Nunchuck, 279;N64 Sherbet Land, 1'16"907, Arthur, Arτhυr, France, 2020-08-13, Toadette, Magikruiser, Wiimote+Nunchuck, 327;GBA Shy Guy Beach, 1'21"496, Sosis, Sosis, USA, 2019-01-13, Funky Kong, Torpedo, Wiimote+Nunchuck, 905;DS Delfino Square, 2'04"208, Luke, Lυkε, UK, 2020-08-03, Funky Kong, Bowser Bike, Wiimote+Nunchuck, 337;GCN Waluigi Stadium, 1'40"111, Logan, Glιτch O, USA, 2021-05-26, Baby Daisy, Bullet Bike, Classic Controller, 41;DS Desert Hills, 1'31"016, Logan, Glιτch O, USA, 2020-04-26, Funky Kong, Bowser Bike, Classic Controller, 436;GBA Bowser Castle 3, 1'57"335, Luke, Lυkε, UK, 2021-04-28, Funky Kong, Bowser Bike, Wiimote+Nunchuck, 69;N64 DK's Jungle Parkway, 0'41"072, Invincible, DKJP>DKSC, USA, 2021-04-12, Daisy, Mach Bike, Wiimote+Nunchuck, 85;GCN Mario Circuit, 1'30"513, Luke, Lυkε, UK, 2021-02-26, Funky Kong, Bowser Bike, Wiimote+Nunchuck, 130;SNES Mario Circuit 3, 1'17"889, Luke, Lυkε, UK, 2019-10-28, Daisy, Mach Bike, Wiimote+Nunchuck, 617;DS Peach Gardens, 1'58"986, King Alex, KingAlεx, Canada, 2020-11-14, Funky Kong, Torpedo (Auto), GCN Controller, 234;GCN DK Mountain, 1'58"772, Logan, Oof, USA, 2019-01-29, Daisy, Mach Bike, Classic Controller, 889;N64 Bowser's Castle, 2'20"584, Logan, Glιτch O, USA, 2020-12-17, Funky Kong, Torpedo, Classic Controller, 201`
let array = text.split(";")
for(let i=0; i<array.length; i++) {

	array[i] = array[i].split(", ")

}
const { ['log'] : cl } = console
const { ['table'] : ct } = console
let arrayObj = []
for(let i=0; i<array.length; i++) {

        arrayObj.push({

            Track: array[i][0],
            Time: array[i][1].replaceAll(`"`, "s").replaceAll("'", "m"),
            Player: array[i][2],
            MiiName: array[i][3],
            Nation: array[i][4],
            Date: array[i][5],
            Character: array[i][6],
            Vehicle: array[i][7],
            Controller: array[i][8],
            Duration: array[i][9],

        })

}

let arr = [ // isArray : true // hasArray : true

	["John", "Doe", 34, false, false],
	["Lisa", "Simpson", 10, true, false],
	["Sherlock", "Holmes", 42, false, true],
	["Kilian", "Davies", 21, false, true],

],

obj = { // isArray : false // hasArray : false

	Person1: {first: "John", last: "Doe", age: 34, care: false, funny: false},
	Person2: {first: "Lisa", last: "Simpson", age: 10, care: true, funny: false},
	Person3: {first: "Sherlock",last: "Holmes",age: 42, care: false, funny: true},
	Person4: {first: "Kilian", last: "Davies", age: 21, care: false, funny: true}

},

arrObj = [ // isArray : true // hasArray : false

	{first: "John", last: "Doe", age: 34, care: false, funny: false},
	{first: "Lisa", last: "Simpson", age: 10, care: true, funny: false},
	{first: "Sherlock",last: "Holmes",age: 42, care: false, funny: true},
	{first: "Kilian", last: "Davies", age: 21, care: false, funny: true}

],

objArr = { // isArray : false // hasArray : true

	Person1: ["John", "Doe", 34, false, false],
	Person2: ["Lisa", "Simpson", 10, true, false],
	Person3: ["Sherlock", "Holmes", 42, false, true],
	Person4: ["Kilian", "Davies", 21, false, true],

},

arrSingle = [ "John", "Doe", 34, false, false ],
objSingle = {first: "John", last: "Doe", age: 34, care: false, funny: false},
colToAdd = ["Annoying", "Annoying", "Good", "Good (I hope)"],
colsToAdd = [["Annoying", "Annoying", "Good", "Good (I hope)"], ["Ugly", "Ugly", "Good looking", "Good looking"]],
rowsToAdd = [["Emiru", "Ikuno", 20, false, true], ["Rias", "Gremory", 19, true, true]],
rowToAdd = ["Emiru", "Ikuno", 20, true, true],

isArr = function(obj) { return Array.isArray(obj) },
v = function(obj) { return Object.values(obj) },
k = function(obj) { return Object.keys(obj) },
objToArr = function(obj) { return Object.entries(obj) },
arrToObj = function(arr) { return Object.fromEntries(arr) },
err = function(str) { throw new Error(str) }