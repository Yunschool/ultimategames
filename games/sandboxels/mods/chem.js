var runAfterAutogenMod = "mods/runAfterAutogen and onload restructure.js";
if(enabledMods.includes(runAfterAutogenMod)){


elements.fluorine = {
	color: "#FFFFBF",
	behavior: behaviors.GAS,
	ignore: ["FOOF","solid_FOOF","oxygen","liquid_oxygen","oxygen_ice","chlorine","liquid_chlorine","liquid_hydrogen_fluoride","liquid_fluorine","fluorine","fluorine_ice","hydrogen_fluoride","hydrofluoric_acid","hydrofluoric_ice","hydrofluoric_acid_gas","fire","smoke","acid_gas","neutral_acid","acid","acid_cloud","water","salt_water","sugar_water","dirty_water","steam","gold","hydrogen","polytetrafluoroethylene","molten_polytetrafluoroethylene","tungsten","tungsten_hexafluoride"],
	tick: function(pixel) {
		let change = false;
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				if (!(i === 0 && j === 0) && !isEmpty(pixel.x+i,pixel.y+j,true)
					&& !elements[pixel.element].ignore.includes(pixelMap[pixel.x+i][pixel.y+j].element)) {
					if(!elements[pixelMap[pixel.x+i][pixel.y+j].element].hardness || Math.random() > elements[pixelMap[pixel.x+i][pixel.y+j].element].hardness) {
						changePixel(pixelMap[pixel.x+i][pixel.y+j],"fire");
						change = true;
					}
				}
			}
		}
		if (change) {
			changePixel(pixel,"fire");
		}
	},
	reactions: {
		"water": { "elem1": "hydrofluoric_acid", "elem2": "hydrogen" },
		"salt_water": { "elem1": "hydrofluoric_acid", "elem2": "hydrogen" },
		"sugar_water": { "elem1": "hydrofluoric_acid", "elem2": "hydrogen" },
		"dirty_water": { "elem1": "hydrofluoric_acid", "elem2": "hydrogen" },
		"steam": { "elem1": "hydrofluoric_acid_gas", "elem2": "hydrogen" },
		"neutral_acid": { "elem1": "hydrofluoric_acid", "elem2": "hydrogen" },
		"liquid_oxygen": { "elem1": "FOOF", "elem2": null },
		"hydrogen": { "elem1": "hydrogen_fluoride", "elem2":null },
		"tungsten": { "elem1": "tungsten_hexafluoride", "elem2": null},
	},
	tempLow: -188.1,
	stateLow: "liquid_fluorine",
	state: "gas",
	category:"gases",
	density: 1.7,
	stain: 0.005,
};

elements.liquid_fluorine = {
	color: "#ffff3b",
	behavior: behaviors.LIQUID,
	ignore: ["FOOF","solid_FOOF","oxygen","liquid_oxygen","oxygen_ice","chlorine","liquid_chlorine","liquid_hydrogen_fluoride","liquid_fluorine","fluorine","fluorine_ice","hydrogen_fluoride","hydrofluoric_acid","hydrofluoric_ice","hydrofluoric_acid_gas","fire","smoke","acid_gas","neutral_acid","acid","acid_cloud","water","salt_water","sugar_water","dirty_water","steam","gold","hydrogen","polytetrafluoroethylene","molten_polytetrafluoroethylene","tungsten","tungsten_hexafluoride"],
	tick: function(pixel) {
		let change = false;
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				if (!(i === 0 && j === 0) && !isEmpty(pixel.x+i,pixel.y+j,true)
					&& !elements[pixel.element].ignore.includes(pixelMap[pixel.x+i][pixel.y+j].element)) {
					if(Math.random() < 0.01 && (!elements[pixelMap[pixel.x+i][pixel.y+j].element].hardness || Math.random() > elements[pixelMap[pixel.x+i][pixel.y+j].element].hardness)) {
						changePixel(pixelMap[pixel.x+i][pixel.y+j],"fire");
						change = true;
					}
				}
			}
		}
		if (change && Math.random() < 0.02) {
			changePixel(pixel,"fire");
		}
	},
	reactions: {
		"water": { "elem1": "hydrofluoric_acid", "elem2": "hydrogen" },
		"salt_water": { "elem1": "hydrofluoric_acid", "elem2": "hydrogen" },
		"sugar_water": { "elem1": "hydrofluoric_acid", "elem2": "hydrogen" },
		"dirty_water": { "elem1": "hydrofluoric_acid", "elem2": "hydrogen" },
		"steam": { "elem1": "hydrofluoric_acid_gas", "elem2": "hydrogen" },
		"neutral_acid": { "elem1": "hydrofluoric_acid", "elem2": "hydrogen" },
		"hydrogen": { "elem1": "hydrogen_fluoride", "elem2":null },
		"tungsten": { "elem1": "tungsten_hexafluoride", "elem2": null },
	},
	temp: -198.1,
	tempHigh: -188.1,
	stateHigh: "fluorine",
	tempLow: -219.7,
	state: "liquid",
	category:"liquids",
	density: 1505,
	stain: 0.005,
};

elements.hydrofluoric_acid = {
	color: ["#c8cf91","#efff5e","#a0cc39"],
	ignore: ["fire","liquid_hydrogen_fluoride","liquid_fluorine","fluorine","fluorine_ice","hydrogen_fluoride","hydrofluoric_acid","hydrofluoric_ice","hydrofluoric_acid_gas","acid_gas","neutral_acid","acid","acid_cloud","water","salt_water","sugar_water","dirty_water","steam","gold","polytetrafluoroethylene","molten_polytetrafluoroethylene","chloroform","chloroform_gas","chloroform_ice","tetrafluoroethylene","tungsten","tungsten_hexafluoride"],
	tick: function(pixel) {
		let change = false;
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				if (!(i === 0 && j === 0) && !isEmpty(pixel.x+i,pixel.y+j,true)
					&& !elements[pixel.element].ignore.includes(pixelMap[pixel.x+i][pixel.y+j].element)) {
					if(!elements[pixelMap[pixel.x+i][pixel.y+j].element].hardness || Math.random() > elements[pixelMap[pixel.x+i][pixel.y+j].element].hardness) {
						changePixel(pixelMap[pixel.x+i][pixel.y+j],"fire");
						change = true;
					}
				}
			}
		}
		if (change) {
			if(Math.random() < 0.2) {
				changePixel(pixel,"hydrogen_fluoride");
			} else {
				deletePixel(pixel.x,pixel.y);
				return;
			}
		} else {
			behaviors.LIQUID(pixel);
		}
	},
	reactions: {
		"water": { "elem1": "hydrofluoric_acid", "elem2": "dirty_water" },
		"salt_water": { "elem1": "hydrofluoric_acid", "elem2": "dirty_water" },
		"sugar_water": { "elem1": "hydrofluoric_acid", "elem2": "dirty_water" },
	},
	state: "liquid",
	category:"liquids",
    density: 1150,
	stain: 0.005,
	tempHigh: 100,
	stateHigh: "hydrofluoric_acid_gas",
	tempLow: -58.88,
};


elements.hydrofluoric_acid_gas = {
	color: ["#acb37d","#bfcc4b","#668224"],
	ignore: ["liquid_hydrogen_fluoride","liquid_fluorine","fluorine","fluorine_ice","hydrogen_fluoride","hydrofluoric_acid","hydrofluoric_ice","hydrofluoric_acid_gas","acid_gas","neutral_acid","acid","acid_cloud","water","salt_water","sugar_water","dirty_water","steam","gold","polytetrafluoroethylene","molten_polytetrafluoroethylene","chloroform","chloroform_gas","chloroform_ice","tetrafluoroethylene","tungsten","tungsten_hexafluoride"],
	tick: function(pixel) {
		let change = false;
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				if (!(i === 0 && j === 0) && !isEmpty(pixel.x+i,pixel.y+j,true)
					&& !elements[pixel.element].ignore.includes(pixelMap[pixel.x+i][pixel.y+j].element)) {
					if(!elements[pixelMap[pixel.x+i][pixel.y+j].element].hardness || Math.random() > elements[pixelMap[pixel.x+i][pixel.y+j].element].hardness) {
						changePixel(pixelMap[pixel.x+i][pixel.y+j],"fire");
						change = true;
					}
				}
			}
		}
		if (change) {
			if(Math.random() < 0.2) {
				changePixel(pixel,"hydrogen_fluoride");
			} else {
				deletePixel(pixel.x,pixel.y);
			}
		} else {
			behaviors.GAS(pixel);
		}
	},
	reactions: {
		"water": { "elem1": "hydrofluoric_acid_gas", "elem2": "dirty_water" },
		"salt_water": { "elem1": "hydrofluoric_acid_gas", "elem2": "dirty_water" },
		"sugar_water": { "elem1": "hydrofluoric_acid_gas", "elem2": "dirty_water" },
	},
	state: "gas",
    density: 1.63,
	stain: 0.005,
	tempHigh: 400,
	stateHigh: "fire",
	tempLow: -10,
	stateLow: "hydrofluoric_acid",
	category:"gases",
};

elements.hydrogen_fluoride = {
	color: "#f2f28d",
	behavior: behaviors.GAS,
	ignore: ["liquid_hydrogen_fluoride","liquid_fluorine","fluorine","fluorine_ice","hydrogen_fluoride","hydrofluoric_ice","hydrofluoric_acid","hydrofluoric_acid_gas","fire","smoke","acid_gas","neutral_acid","acid","acid_cloud","water","salt_water","sugar_water","dirty_water","steam","gold","hydrogen","polytetrafluoroethylene","molten_polytetrafluoroethylene","chloroform","chloroform_gas","chloroform_ice","tetrafluoroethylene"],
	tick: function(pixel) {
		let change = false;
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				if (!(i === 0 && j === 0) && !isEmpty(pixel.x+i,pixel.y+j,true)
					&& !elements[pixel.element].ignore.includes(pixelMap[pixel.x+i][pixel.y+j].element)) {
					if(!elements[pixelMap[pixel.x+i][pixel.y+j].element].hardness || Math.random() > elements[pixelMap[pixel.x+i][pixel.y+j].element].hardness) {
						changePixel(pixelMap[pixel.x+i][pixel.y+j],"fire");
						change = true;
					}
				}
			}
		}
		if (change && Math.random() < 0.2) {
			changePixel(pixel,"fire");
		}
	},
	reactions: {
		"water": { "elem1": "hydrofluoric_acid", "elem2": null },
		"salt_water": { "elem1": "hydrofluoric_acid", "elem2": null },
		"sugar_water": { "elem1": "hydrofluoric_acid", "elem2": null },
		"dirty_water": { "elem1": "hydrofluoric_acid", "elem2": null },
		"steam": { "elem1": "hydrofluoric_acid_gas", "elem2": null },
		"acid_gas": { "elem1": "hydrofluoric_acid_gas", "elem2": null },
		"neutral_acid": { "elem1": "hydrofluoric_acid", "elem2": null },
		"acid": { "elem1": "hydrofluoric_acid", "elem2": null },
	},
	state: "gas",
	category:"gases",
	density: 1.7,
	stain: 0.005,
	tempLow: -19.5,
	stateLow: "liquid_hydrogen_fluoride",
};

elements.liquid_hydrogen_fluoride = {
	color: "#e2e28d",
	behavior: behaviors.LIQUID,
	ignore: ["liquid_hydrogen_fluoride","liquid_fluorine","fluorine","fluorine_ice","hydrogen_fluoride","hydrofluoric_acid","hydrofluoric_ice","hydrofluoric_acid_gas","fire","smoke","acid_gas","neutral_acid","acid","acid_cloud","water","salt_water","sugar_water","dirty_water","steam","gold","hydrogen","polytetrafluoroethylene","molten_polytetrafluoroethylene","chloroform","chloroform_gas","chloroform_ice","tetrafluoroethylene"],
	tick: function(pixel) {
		let change = false;
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				if (!(i === 0 && j === 0) && !isEmpty(pixel.x+i,pixel.y+j,true)
					&& !elements[pixel.element].ignore.includes(pixelMap[pixel.x+i][pixel.y+j].element)) {
					if(!elements[pixelMap[pixel.x+i][pixel.y+j].element].hardness || Math.random() > elements[pixelMap[pixel.x+i][pixel.y+j].element].hardness) {
						changePixel(pixelMap[pixel.x+i][pixel.y+j],"fire");
						change = true;
					}
				}
			}
		}
		if (change && Math.random() < 0.2) {
			changePixel(pixel,"fire");
		}
	},
	reactions: {
		"water": { "elem1": "hydrofluoric_acid", "elem2": null },
		"salt_water": { "elem1": "hydrofluoric_acid", "elem2": null },
		"sugar_water": { "elem1": "hydrofluoric_acid", "elem2": null },
		"dirty_water": { "elem1": "hydrofluoric_acid", "elem2": null },
		"steam": { "elem1": "hydrofluoric_acid_gas", "elem2": null },
		"acid_gas": { "elem1": "hydrofluoric_acid_gas", "elem2": null },
		"neutral_acid": { "elem1": "hydrofluoric_acid", "elem2": null },
		"acid": { "elem1": "hydrofluoric_acid", "elem2": null },
	},
	state: "liquid",
	hidden: true,
	density: 1.7,
	stain: 0.005,
	temp: -20.5,
	tempHigh: -19.5,
	stateHigh: "hydrogen_fluoride",
	tempLow: -83.6,
};

elements.FOOF = {
	color: "#fa1e1e",
	behavior: behaviors.LIQUID,
	ignore: ["FOOF","solid_FOOF","fluorine","liquid_fluorine","fluorine_ice","liquid_oxygen","oxygen_ice","oxygen","fire","polytetrafluoroethylene","molten_polytetrafluoroethylene"],
	tick: function(pixel) {
		let change = false;
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				if (!(i === 0 && j === 0) && !isEmpty(pixel.x+i,pixel.y+j,true)
					&& !elements[pixel.element].ignore.includes(pixelMap[pixel.x+i][pixel.y+j].element)) {
					if(!elements[pixelMap[pixel.x+i][pixel.y+j].element].hardness || Math.random() > elements[pixelMap[pixel.x+i][pixel.y+j].element].hardness) {
						changePixel(pixelMap[pixel.x+i][pixel.y+j],"fire");
						change = true;
					}
				}
			}
		}
		if (change && Math.random() < 0.01) {
			changePixel(pixel,"explosion");
		} else if (Math.random() < 0.0001) {
			if(Math.random() < 0.5) {
				changePixel(pixel,"oxygen");
			} else {
				changePixel(pixel,"fluorine");
			}
		}
	},
	state: "liquid",
	category:"liquids",
	density: 1450,
	stain: 0.01,
	temp: -120,
	tempHigh: -57,
	stateHigh: ["oxygen","fluorine","explosion"],
	tempLow: -154,
	stateLow: "solid_FOOF",
};

elements.solid_FOOF = {
	color: "#fa4a1e",
	behavior: behaviors.WALL,
	ignore: ["FOOF","solid_FOOF","fluorine","liquid_fluorine","fluorine_ice","liquid_oxygen","oxygen_ice","oxygen","fire","polytetrafluoroethylene","molten_polytetrafluoroethylene"],
	tick: function(pixel) {
		let change = false;
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				if (!(i === 0 && j === 0) && !isEmpty(pixel.x+i,pixel.y+j,true)
					&& !elements[pixel.element].ignore.includes(pixelMap[pixel.x+i][pixel.y+j].element)) {
					if(!elements[pixelMap[pixel.x+i][pixel.y+j].element].hardness || Math.random() > elements[pixelMap[pixel.x+i][pixel.y+j].element].hardness) {
						changePixel(pixelMap[pixel.x+i][pixel.y+j],"fire");
						change = true;
					}
				}
			}
		}
		if (change && Math.random() < 0.01) {
			changePixel(pixel,"explosion");
		} else if (Math.random() < 0.00005) {
			if(Math.random() < 0.5) {
				changePixel(pixel,"oxygen");
			} else {
				changePixel(pixel,"fluorine");
			}
		}
	},
	state: "solid",
	category: "solids",
	density: 1450,
	stain: 0.01,
	temp: -160,
	tempHigh: -154,
	stateHigh: "FOOF",
};

elements.tungsten_hexafluoride = {
	color: "#f5f57a",
	behavior: behaviors.GAS,
	reactions: {
		"water": { "elem1": "hydrofluoric_acid", "elem2": "tungsten" },
		"salt_water": { "elem1": "hydrofluoric_acid", "elem2": "tungsten" },
		"sugar_water": { "elem1": "hydrofluoric_acid", "elem2": "tungsten" },
		"dirty_water": { "elem1": "hydrofluoric_acid", "elem2": "tungsten" },
		"steam": { "elem1": "hydrofluoric_acid_gas", "elem2": "tungsten" },
		"neutral_acid": { "elem1": "hydrofluoric_acid", "elem2": "tungsten" },
	},
	tempLow: 17.1,
	state: "gas",
	category:"gases",
	density: 12.4,
	stain: 0.005,
};

elements.liquid_tungsten_hexafluoride = {
	density: 4560,
	tempLow: 2.3,
};

if (!elements.acid.ignore) {
	elements.acid.ignore = [];
};
if (!elements.acid_gas.ignore) {
	elements.acid_gas.ignore = [];
};
defaultAcidIgnore = structuredClone(elements.acid.ignore);
defaultAcidGasIgnore = structuredClone(elements.acid_gas.ignore);



let defaultAcidReactions = {
	"ash": { "elem1":"neutral_acid", "elem2":null },
	"limestone": { "elem1":"neutral_acid", "elem2":null },
	"quicklime": { "elem1":"neutral_acid", "elem2":null },
	"slaked_lime": { "elem1":"neutral_acid", "elem2":null },
	"borax": { "elem1":"neutral_acid", "elem2":null },
	"ammonia": { "elem1":"neutral_acid", "elem2":null },
	"bleach": { "elem1":"neutral_acid", "elem2":null },
	"water": { "elem1":null, "elem2":"dirty_water" },
	"salt_water": { "elem1":null, "elem2":"water" },
	"sugar_water": { "elem1":null, "elem2":"water" },
	"charcoal": { "elem1":null, "elem2":"carbon_dioxide" },
	"grape": { "elem2":"juice", "color1":"#291824" },
	"soap": { "elem1": "hydrogen" },
	"sodium": { "elem1":"explosion" },
	"meat": { "elem2":"rotten_meat", "elem1":null, "chance":0.5 },
};

let defaultAcidGasReactions = {
	"acid_gas": { "elem1": null, "elem2": "acid_cloud", "chance":0.3, "y":[0,12], "setting":"clouds" },
	"rain_cloud": { "elem1": null, "elem2": "acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" },
	"cloud": { "elem1": null, "elem2": "acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" },
	"snow_cloud": { "elem1": null, "elem2": "acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" },
	"hail_cloud": { "elem1": null, "elem2": "acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" },
	"pyrocumulus": { "elem1": null, "elem2": "acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" },
	"fire_cloud": { "elem1": null, "elem2": "acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" },
	"ash": { "elem1":"hydrogen", "elem2":null, "chance":0.05 },
	"limestone": { "elem1":"hydrogen", "elem2":null, "chance":0.05 },
	"quicklime": { "elem1":"hydrogen", "elem2":null, "chance":0.05 },
	"slaked_lime": { "elem1":"hydrogen", "elem2":null, "chance":0.05 },
	"borax": { "elem1":"hydrogen", "elem2":null, "chance":0.05 },
	"ammonia": { "elem1":"hydrogen", "elem2":null, "chance":0.05 },
	"bleach": { "elem1":"hydrogen", "elem2":null, "chance":0.05 },
	"grape": { "elem2":"juice", "color1":"#291824" },
	"soap": { "elem1": "hydrogen" },
	"sodium": { "elem1":"explosion" },
	"meat": { "elem2":"rotten_meat", "elem1":null, "chance":0.4 },
};

acids = [elements.acid, elements.acid_gas, elements.fluorine, elements.liquid_fluorine, elements.hydrofluoric_acid, elements.hydrofluoric_acid_gas, elements.hydrogen_fluoride, elements.liquid_hydrogen_fluoride];
ignoreAcid = [];
trueAcids = ["acid", "hydrofluoric_acid"];
trueAcidGases = ["acid_gas", "hydrofluoric_acid_gas"];


if (enabledMods.includes("mods/generative_mods.js")) {
    runAfterLoad(function() {
        generateCloud("hydrofluoric_acid");
    });
    elements["hydrofluoric_acid_gas"].reactions["hydrofluoric_acid_gas"]= { "elem1": null, "elem2": "hydrofluoric_acid_cloud", "chance":0.3, "y":[0,12], "setting":"clouds" };
    elements["hydrofluoric_acid_gas"].reactions["rain_cloud"]= { "elem1": null, "elem2":  "hydrofluoric_acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
    elements["hydrofluoric_acid_gas"].reactions["cloud"]= { "elem1": null, "elem2":  "hydrofluoric_acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
    elements["hydrofluoric_acid_gas"].reactions["snow_cloud"]= { "elem1": null, "elem2":  "hydrofluoric_acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
    elements["hydrofluoric_acid_gas"].reactions["hail_cloud"]= { "elem1": null, "elem2":  "hydrofluoric_acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
    elements["hydrofluoric_acid_gas"].reactions["pyrocumulus"]= { "elem1": null, "elem2":  "hydrofluoric_acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
    elements["hydrofluoric_acid_gas"].reactions["fire_cloud"]= { "elem1": null, "elem2":  "hydrofluoric_acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
}
function createAcid(name,reactions, gasReactions, color, colorGas, category, categoryGas, tempHigh, tempLowGas, tempLow, tempHighGas, density, densityGas)
{
	elements[name] = {
		color: color,
		behavior: [
			"XX|DB%5|XX",
			"DB%5 AND M2|XX|DB%5 AND M2",
			"DB%5 AND M2|DB%10 AND M1|DB%5 AND M2",
		],
		ignore: defaultAcidIgnore.concat(ignoreAcid),
		reactions: reactions,
		category: category,
        hidden: category === "hidden",
		tempHigh: tempHigh,
		stateHigh: name + "_gas",
		tempLow: tempLow,
		burn: 30,
		burnTime: 1,
		state: "liquid",
		density: density,
	}
	elements[name+"_gas"] = {
		color: colorGas,
		behavior: [
			"M1|DB%5 AND M1|M1",
			"DB%5 AND M1|XX|DB%5 AND M1",
			"DB%5 AND M1|DB%10 AND M1|DB%5 AND M1",
		],
		ignore: defaultAcidGasIgnore.concat(ignoreAcid),
		reactions: gasReactions,
		category: categoryGas,
        hidden: categoryGas === "hidden",
		tempHigh: tempHighGas,
		stateHigh: "fire",
		tempLow: tempLowGas,
        stateLow: name,
        temp: tempLowGas + 20,
		burn: 30,
		burnTime: 1,
		state: "gas",
		density: densityGas,
	}
    elements.bless.reactions[name] = { elem2: "hydrogen" };
    elements.bless.reactions[name+"_gas"] = { elem2: "hydrogen" };
    if (enabledMods.includes("mods/generative_mods.js")) {
        runAfterLoad(function() {
            generateCloud(name);
        });
        elements[name+"_gas"].reactions[name+"_gas"]= { "elem1": null, "elem2": name + "_cloud", "chance":0.3, "y":[0,12], "setting":"clouds" };
        elements[name+"_gas"].reactions["rain_cloud"]= { "elem1": null, "elem2":  name + "_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
        elements[name+"_gas"].reactions["cloud"]= { "elem1": null, "elem2":  name + "_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
        elements[name+"_gas"].reactions["snow_cloud"]= { "elem1": null, "elem2":  name + "_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
        elements[name+"_gas"].reactions["hail_cloud"]= { "elem1": null, "elem2":  name + "_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
        elements[name+"_gas"].reactions["pyrocumulus"]= { "elem1": null, "elem2":  name + "_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
        elements[name+"_gas"].reactions["fire_cloud"]= { "elem1": null, "elem2":  name + "_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
    }
    else
    {
        elements[name+"_gas"].reactions[name+"_gas"]= { "elem1": null, "elem2": "acid_cloud", "chance":0.3, "y":[0,12], "setting":"clouds" };
    }
    acids.push(elements[name], elements[name+"_gas"]);
    acidIgnore([name, name + "_gas", name + "_ice", name + "_cloud"]);
}

function acidIgnore(ignore)
{
    for(let i = 0; i < acids.length; i++)
    {
        acids[i].ignore = acids[i].ignore.concat(ignore);
    }
    ignoreAcid = ignoreAcid.concat(ignore);
}


acidIgnore(["acid", "acid_gas", "acid_ice", "liquid_fluorine","fluorine","fluorine_ice","hydrogen_fluoride","liquid_hydrogen_fluoride","hydrogen_fluoride_ice","hydrofluoric_acid_ice","hydrofluoric_acid","hydrofluoric_acid_gas","hydrofluoric_acid_cloud","acid_cloud"]);
elements.acid.name = "hydrochloricAcid";
elements.acid_gas.name = "hydrochloricAcidGas";

createAcid("generic_acid",defaultAcidReactions,defaultAcidGasReactions,"#80d488","#9bf4a4","hidden","hidden",110,100,-10,400,1020,1)
elements.generic_acid.name = "acid";
elements.generic_acid_gas.name = "acid_gas";

trueAcids.push("generic_acid")
trueAcidGases.push("generic_acid_gas");

if (!enabledMods.includes("mods/generative_mods.js")) {
    elements.acid_cloud.behavior = [
                        "XX|XX|XX",
                        "XX|CH:generic_acid%0.05|M1%2.5 AND BO",
                        "XX|XX|XX",
                    ];
}

createAcid("nitric_acid",defaultAcidReactions,defaultAcidGasReactions,["#91993c","#6b7041","#5f614b"],["#c9d457","#94996e","#abb07f"],"liquids","gases",83,70,-42,400,1500,1.5)

elements.nitric_acid.reactions["ammonia"] = { "elem1": "fertilizer", "elem2": null};
elements.nitric_acid_gas.reactions["ammonia"] = { "elem1": "fertilizer", "elem2": null};

trueAcids.push("nitric_acid")
trueAcidGases.push("nitric_acid_gas");

elements.nitric_oxide = {
	color: "#b8926c",
	behavior: behaviors.GAS,
	reactions: {
		"steam": { "elem1": "smog", "elem2": null, "chance":0.01 },
		"oxygen": { "elem1": "nitrogen_dioxide", "elem2": null},
	},
	tempLow: -152,
	category: "gases",
	state: "gas",
	density: 1.34,
};

elements.liquid_nitric_oxide = {
	tempLow: -164,
	hidden: true,
};
elements.nitrogen_dioxide = {
	color: "#964B00",
	behavior: behaviors.GAS,
	reactions: {
		"steam": { "elem1": "smog", "elem2": null, "chance":0.01 },
		"blood": { "elem1":null, "elem2":"infection", "chance":0.01 },
		"water": { "elem1":null, "elem2":"nitric_acid", "chance":0.01 },
		"dirty_water": { "elem1":null, "elem2":"nitric_acid", "chance":0.01 },
		"plant": { "elem1":null, "elem2":"dead_plant", "chance":0.01 },
		"grass": { "elem1":null, "elem2":"dead_plant", "chance":0.01 },
		"algae": { "elem1":null, "elem2":null, "chance":0.01 },
		"mushroom_spore": { "elem1":null, "elem2":null, "chance":0.01 },
		"lichen": { "elem1":null, "elem2":null, "chance":0.01 },
		"rat": { "elem1":null, "elem2":"rotten_meat", "chance":0.01 },
		"frog": { "elem1":null, "elem2":"rotten_meat", "chance":0.01 },
		"fish": { "elem1":null, "elem2":"rotten_meat", "chance":0.01 },
		"head": { "elem1":null, "elem2":"rotten_meat", "chance":0.01 },
		"body": { "elem1":null, "elem2":"rotten_meat", "chance":0.01 },
		"ant": { "elem1":null, "elem2":null, "chance":0.01 },
		"worm": { "elem1":null, "elem2":null, "chance":0.01 },
		"fly": { "elem1":null, "elem2":null, "chance":0.01 },
		"firefly": { "elem1":null, "elem2":null, "chance":0.01 },
		"bee": { "elem1":null, "elem2":null, "chance":0.01 },
		"slug": { "elem1":null, "elem2":"slime", "chance":0.01 },
		"snail": { "elem1":null, "elem2":"calcium", "chance":0.01 },
		"sapling": { "elem1":null, "elem2":"dead_plant", "chance":0.01 },
		"root": { "elem1":null, "elem2":"dead_plant", "chance":0.01 },
		"flower_seed": { "elem1":null, "elem2":"dead_plant", "chance":0.01 },
		"pistil": { "elem1":null, "elem2":"dead_plant", "chance":0.01 },
		"petal": { "elem1":null, "elem2":"dead_plant", "chance":0.01 },
		"grass_seed": { "elem1":null, "elem2":"dead_plant", "chance":0.01 },
		"meat": { "elem1":null, "elem2":"rotten_meat", "chance":0.01 }
	},
	temp: 30,
	tempLow: 21.15,
	category: "gases",
	state: "gas",
	density: 1.88,
};

elements.liquid_nitrogen_dioxide = {
	tempLow: -9.3,
	hidden: true,
	reactions: structuredClone(elements.nitrogen_dioxide.reactions),
};

if (enabledMods.includes("mods/generative_mods.js")) {
    elements["nitrogen_dioxide"].reactions["rain_cloud"]= { "elem1": null, "elem2":  "nitric_acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
    elements["nitrogen_dioxide"].reactions["cloud"]= { "elem1": null, "elem2":  "nitric_acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
    elements["nitrogen_dioxide"].reactions["snow_cloud"]= { "elem1": null, "elem2":  "nitric_acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
    elements["nitrogen_dioxide"].reactions["hail_cloud"]= { "elem1": null, "elem2":  "nitric_acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
    elements["nitrogen_dioxide"].reactions["pyrocumulus"]= { "elem1": null, "elem2":  "nitric_acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
    elements["nitrogen_dioxide"].reactions["fire_cloud"]= { "elem1": null, "elem2":  "nitric_acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
    elements["nitrogen_dioxide"].reactions["thunder_cloud"]= { "elem1": null, "elem2":  "nitric_acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
}
else
{
    elements["nitrogen_dioxide"].reactions["rain_cloud"]= { "elem1": null, "elem2":  "acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
    elements["nitrogen_dioxide"].reactions["cloud"]= { "elem1": null, "elem2":  "acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
    elements["nitrogen_dioxide"].reactions["snow_cloud"]= { "elem1": null, "elem2":  "acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
    elements["nitrogen_dioxide"].reactions["hail_cloud"]= { "elem1": null, "elem2":  "acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
    elements["nitrogen_dioxide"].reactions["pyrocumulus"]= { "elem1": null, "elem2":  "acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
    elements["nitrogen_dioxide"].reactions["fire_cloud"]= { "elem1": null, "elem2":  "acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
    elements["nitrogen_dioxide"].reactions["thunder_cloud"]= { "elem1": null, "elem2":  "acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
}

acidIgnore(["nitric_oxide","liquid_nitric_oxide","nitric_oxide_ice","nitrogen_dioxide","liquid_nitrogen_dioxide","nitrogen_dioxide_ice"]);

elements.fertilizer = {
	color: "#e6c3a1",
	behavior: behaviors.POWDER,
	reactions: {
		"plant": { "elem1":"plant", "chance":0.5 },
		"wheat_seed": { "elem1":"wheat", "chance":0.5 },
		"grass": { "elem1":"grass", "chance":0.5 },
		"grass_seed": { "elem1":"grass", "chance":0.5 },
		"bamboo_plant": { "elem1":"bamboo", "chance":0.5 },
		"flower_seed": { "elem1":"flower_seed", "chance":0.5 },
		"petal": { "elem1":"flower_seed", "chance":0.5 },
		"vine": { "elem1":"vine", "chance":0.5 },
		"sapling": { "elem1":"tree_branch", "chance":0.5 },
		"tree_branch": { "elem1":"tree_branch", "chance":0.5 },
		"corn_seed": { "elem1":"corn", "chance":0.5 },
		"root": { "elem1":"root", "chance":0.5 },
		"dirt": { "elem1":"grass", "chance":0.5 },
		"mud": { "elem1":"grass", "chance":0.5 },
		"potato_seed": { "elem1":"potato", "chance":0.5 },
		"yeast": { "elem1":"yeast", "chance":0.5 },
	},
    tempHigh: 169.6,
	stateHigh: "fire",
	category: "powders",
	state: "solid",
	density: 1725,
};

elements.ammonia.reactions["oxygen"] = { "elem1": "steam", "elem2": "nitric_oxide" };

elements.supernova.behavior = [
	"XX|XX|XX",
	"XX|EX:80>plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,molten_iron,molten_uranium,molten_lead AND CH:neutronium,neutronium,quark_matter,void|XX",
	"XX|XX|XX",
];


elements.gamma_ray_burst = {
	color: ["#ffb48f","#ffd991","#ffad91"],
	behavior: [
		"XX|XX|XX",
		"XX|EX:100>plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,molten_uranium,molten_gold,molten_tungsten,molten_lead AND CH:void|XX",
		"XX|XX|XX",
	],
	temp: 99999999700,
	category: "energy",
	state: "gas",
	density: 1000,
	hardness: 1,
	hidden: true,
	excludeRandom: true,
	maxSize: 1,
};


elements.neutronium = {
	color: "#aaffff",
	behavior: [
		"XX|CR:neutron%0.1|XX",
		"CR:neutron%0.1|XX|CR:neutron%0.1",
		"XX|CR:neutron%0.1|XX",
	],
	temp: 1e6,
	tempHigh: 1e7,
	stateHigh: "liquid_neutronium",
	tempLow: 1e5,
	stateLow: ["molten_uranium","molten_gold","molten_tungsten","molten_lead"],
	breakInto: ["gamma_ray_burst","supernova","supernova"],
	category: "special",
	state: "solid",
	density: 4e17,
	hardness: 0.999,
	excludeRandom: true,
};



elements.liquid_neutronium = {
	color: "#ffffaa",
	behavior2: [
		"XX|CR:neutron%0.2|XX".split("|"),
		"M1 AND CR:neutron%0.2|XX|M1 AND CR:neutron%0.2".split("|"),
		"M1|M1|M1".split("|"),
	],
	tick: function(pixel) {
        if(
        ((!isEmpty(pixel.x-1,pixel.y,false) && 
        (isEmpty(pixel.x-1,pixel.y,true) || pixelMap[pixel.x-1][pixel.y].element !== "liquid_neutronium"))) && 
        !(outOfBounds(pixel.x-1,pixel.y-1) ||
        !isEmpty(pixel.x-1,pixel.y-1,true)))
        {
            tryMove(pixel, pixel.x-1, pixel.y-1);
        }
        else if(
        ((!isEmpty(pixel.x+1,pixel.y,false) && 
        (isEmpty(pixel.x+1,pixel.y,true) || pixelMap[pixel.x+1][pixel.y].element !== "liquid_neutronium"))) && 
        !(outOfBounds(pixel.x+1,pixel.y-1) ||
        !isEmpty(pixel.x+1,pixel.y-1,true)))
        {
            tryMove(pixel, pixel.x+1, pixel.y-1);
        }
		else if(
		((!isEmpty(pixel.x+1,pixel.y,false) && 
		(isEmpty(pixel.x+1,pixel.y,true) || pixelMap[pixel.x+1][pixel.y].element !== "liquid_neutronium")) || 
		(!isEmpty(pixel.x-1,pixel.y,false) && 
		(isEmpty(pixel.x-1,pixel.y,true) || pixelMap[pixel.x-1][pixel.y].element !== "liquid_neutronium"))) && 
		!(outOfBounds(pixel.x,pixel.y-1) ||
		!isEmpty(pixel.x,pixel.y-1,true)))
		{
			tryMove(pixel, pixel.x, pixel.y-1);
		}
        else 
		{
			pixelTick(pixel,elements.liquid_neutronium.behavior2);
		}
		doDefaults(pixel);
	},
	temp: 2e7,
	tempLow: 1e7,
	stateLow: "neutronium",
	breakInto: ["gamma_ray_burst","supernova","supernova"],
	category: "special",
	state: "liquid",
	density: 2e17,
	hardness: 0.999,
	excludeRandom: true,
};

elements.liquid_helium.behavior2 = [
		"XX|XX|XX".split("|"),
		"M1|XX|M1".split("|"),
		"M1|M1|M1".split("|"),
	];
elements.liquid_helium.behavior = null;

elements.liquid_helium.tick = function(pixel) {
    if(Math.random() < 0.9)
    {
        if(
        ((!isEmpty(pixel.x-1,pixel.y,false) && 
        (isEmpty(pixel.x-1,pixel.y,true) || pixelMap[pixel.x-1][pixel.y].element !== "liquid_helium"))) && 
        !(outOfBounds(pixel.x-1,pixel.y-1) ||
        !isEmpty(pixel.x-1,pixel.y-1,true)))
        {
            tryMove(pixel, pixel.x-1, pixel.y-1);
        }
        else if(
        ((!isEmpty(pixel.x+1,pixel.y,false) && 
        (isEmpty(pixel.x+1,pixel.y,true) || pixelMap[pixel.x+1][pixel.y].element !== "liquid_helium"))) && 
        !(outOfBounds(pixel.x+1,pixel.y-1) ||
        !isEmpty(pixel.x+1,pixel.y-1,true)))
        {
            tryMove(pixel, pixel.x+1, pixel.y-1);
        }
        else if(
        ((!isEmpty(pixel.x+1,pixel.y,false) && 
        (isEmpty(pixel.x+1,pixel.y,true) || pixelMap[pixel.x+1][pixel.y].element !== "liquid_helium")) || 
        (!isEmpty(pixel.x-1,pixel.y,false) && 
        (isEmpty(pixel.x-1,pixel.y,true) || pixelMap[pixel.x-1][pixel.y].element !== "liquid_helium"))) && 
        !(outOfBounds(pixel.x,pixel.y-1) ||
        !isEmpty(pixel.x,pixel.y-1,true)))
        {
            tryMove(pixel, pixel.x, pixel.y-1);
        }
        else 
        {
            pixelTick(pixel,elements.liquid_helium.behavior2);
        }
    }
    else 
    {
        pixelTick(pixel,elements.liquid_helium.behavior2);
    }
	doDefaults(pixel);
};


elements.quark_matter = {
	color: ["#ff0000","#00ff00","#0000ff"],
	behavior: [
		"XX|CR:neutron%0.1 AND CR:proton%0.1|XX",
		"M2 AND CR:neutron%0.1 AND CR:proton%0.1|XX|M2 AND CR:neutron%0.1 AND CR:proton%0.1",
		"M1|M1|M1",
	],
	tick: function(pixel) {
		pixel.color = pixelColorPick(pixel);
	},
	temp: 2e7,
	breakInto: "gamma_ray_burst",
	category: "special",
	state: "liquid",
	density: 4e18,
	hardness: 0.999,
	excludeRandom: true,
};

elements.sulfur.burnInto = ["sulfur_dioxide"];
elements.molten_sulfur.burnInto = ["sulfur_dioxide"];
elements.sulfur_gas.burnInto = ["sulfur_dioxide"];
elements.sulfur.reactions["hydrogen"] = "hydrogen_sulfide";

elements.sulfur_dioxide = {
	color: "#FFF700",
	behavior: behaviors.GAS,
	reactions: {
		"water": { "elem1": "sulfuric_acid", "elem2": null },
		"salt_water": { "elem1": "sulfuric_acid", "elem2": null },
		"sugar_water": { "elem1": "sulfuric_acid", "elem2": null },
		"dirty_water": { "elem1": "sulfuric_acid", "elem2": null },
		"steam": { "elem1": "sulfuric_acid_gas", "elem2": null },
		"acid_gas": { "elem1": "sulfuric_acid_gas", "elem2": null },
		"neutral_acid": { "elem1": "sulfuric_acid", "elem2": null },
		//poison
		"blood": { "elem1":null, "elem2":"infection" },
		"soap": { "elem1":null, "chance":0.02 },
		"plant": { "elem1":null, "elem2":"dead_plant" },
		"grass": { "elem1":null, "elem2":"dead_plant" },
		"vine": { "elem1":null, "elem2":"dead_plant" },
		"algae": { "elem1":null, "elem2":null },
		"mushroom_spore": { "elem1":null, "elem2":null },
		"lichen": { "elem1":null, "elem2":null },
		"yeast": { "elem1":null, "elem2":null },
		"rat": { "elem1":null, "elem2":"rotten_meat" },
		"frog": { "elem1":null, "elem2":"rotten_meat" },
		"tadpole": { "elem2":null },
		"fish": { "elem1":null, "elem2":"rotten_meat" },
		"bird": { "elem1":null, "elem2":"rotten_meat" },
		"head": { "elem1":null, "elem2":"rotten_meat" },
		"body": { "elem1":null, "elem2":"rotten_meat" },
		"ant": { "elem1":null, "elem2":"dead_bug" },
		"worm": { "elem1":null, "elem2":"dead_bug" },
		"fly": { "elem1":null, "elem2":"dead_bug" },
		"firefly": { "elem1":null, "elem2":"dead_bug" },
		"bee": { "elem1":null, "elem2":"dead_bug" },
		"stink_bug": { "elem1":null, "elem2":"dead_bug" },
		"termite": { "elem1":null, "elem2":"dead_bug" },
		"flea": { "elem1":null, "elem2":"dead_bug" },
		"slug": { "elem1":null, "elem2":"slime" },
		"snail": { "elem1":null, "elem2":"calcium" },
		"sapling": { "elem1":null, "elem2":"dead_plant" },
		"root": { "elem1":null, "elem2":"dead_plant" },
		"flower_seed": { "elem1":null, "elem2":"dead_plant" },
		"pistil": { "elem1":null, "elem2":"dead_plant" },
		"petal": { "elem1":null, "elem2":"dead_plant" },
		"grass_seed": { "elem1":null, "elem2":"dead_plant" },
		"meat": { "elem1":null, "elem2":"rotten_meat" },
		//clouds
		"rain_cloud": { "elem1": null, "elem2": "acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" },
		"cloud": { "elem1": null, "elem2": "acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" },
		"snow_cloud": { "elem1": null, "elem2": "acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" },
		"hail_cloud": { "elem1": null, "elem2": "acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" },
		"pyrocumulus": { "elem1": null, "elem2": "acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" },
		"fire_cloud": { "elem1": null, "elem2": "acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" },
	},
	tempLow: -10,
	stateLow: "liquid_sulfur_dioxide",
	state: "gas",
	category:"gases",
	density: 2.6,
};

elements.liquid_sulfur_dioxide = {
	color: "#d1cb17",
	behavior: behaviors.LIQUID,
	reactions: elements.sulfur_dioxide.reactions,
	tempLow: -72,
	state: "liquid",
	hidden: true,
	density: 1435,
};

elements.hydrogen_sulfide = {
    color: "#d9e366",
    behavior: behaviors.GAS,
    reactions: {
        "oxygen": { "elem2":"stench" },
        "water": { "elem1":null, "elem2":"dirty_water" },
        "nitrogen": { "elem2":"stench" },
        "baking_soda": { "elem1":null }
    },
    category: "gases",
    tempHigh: 1000,
    stateHigh: "fire",
    state: "gas",
    density: 1.539,
    tempLow: -59.55,
    burn: 1,
    burnTime: 10,
    burnInto: ["sulfur_dioxide","steam"],
    fireColor: ["#8180CC","#7F84E6"],
}

acidIgnore(["sulfur_dioxide","liquid_sulfur_dioxide","sulfur_dioxide_ice"]);

elements.acid.ignore.push("pyrite","hydrogen_sulfide","liquid_hydrogen_sulfide","iron_chloride");
elements.acid_gas.ignore.push("pyrite","hydrogen_sulfide","liquid_hydrogen_sulfide","iron_chloride");
elements.acid.reactions["pyrite"] = { "elem1":"iron_chloride", "elem2":"hydrogen_sulfide"};
elements.acid_gas.reactions["pyrite"] = { "elem1":"iron_chloride", "elem2":"hydrogen_sulfide"};

elements.iron_chloride = {
    color: ["#207d09","#b51259"],
    behavior: behaviors.POWDER,
    reactions: {
        "dirty_water": { "elem1": null, "elem2":"water" },
        //"ethylene": { "elem2":"1,2_dichloroethane" }, todo: vinyl chloride
    },
    category: "powders",
    tempHigh: 307.6,
    state: "solid",
    density: 2900,
}

createAcid("sulfuric_acid",structuredClone(defaultAcidReactions),structuredClone(defaultAcidGasReactions),["#e9e05e","#c2bd7a","#9e9c7b"],["#ede579","#ccc88f","#a8a68a"],"liquids","gases",337,337,10,500,1830,1.26)

elements.sulfuric_acid.ignore.push("charcoal");
elements.sulfuric_acid_gas.ignore.push("charcoal");
elements.sulfuric_acid.reactions["water"] = { "elem1":"sulfuric_acid", "elem2":"dirty_water"};
elements.sulfuric_acid.reactions["chocolate"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
elements.sulfuric_acid.reactions["grape"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
elements.sulfuric_acid.reactions["juice"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
elements.sulfuric_acid.reactions["corn"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
elements.sulfuric_acid.reactions["popcorn"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
elements.sulfuric_acid.reactions["potato"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
elements.sulfuric_acid.reactions["bread"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
elements.sulfuric_acid.reactions["toast"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
elements.sulfuric_acid.reactions["wheat"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
elements.sulfuric_acid.reactions["flour"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
elements.sulfuric_acid.reactions["dough"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
elements.sulfuric_acid.reactions["sugar"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
elements.sulfuric_acid.reactions["candy"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
delete elements.sulfuric_acid.reactions["charcoal"];
elements.sulfuric_acid_gas.reactions["chocolate"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
elements.sulfuric_acid_gas.reactions["grape"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
elements.sulfuric_acid_gas.reactions["juice"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
elements.sulfuric_acid_gas.reactions["corn"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
elements.sulfuric_acid_gas.reactions["popcorn"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
elements.sulfuric_acid_gas.reactions["potato"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
elements.sulfuric_acid_gas.reactions["bread"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
elements.sulfuric_acid_gas.reactions["toast"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
elements.sulfuric_acid_gas.reactions["wheat"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
elements.sulfuric_acid_gas.reactions["flour"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
elements.sulfuric_acid_gas.reactions["dough"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
elements.sulfuric_acid_gas.reactions["sugar"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
elements.sulfuric_acid_gas.reactions["candy"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
delete elements.sulfuric_acid_gas.reactions["charcoal"];


elements.sulfuric_acid.ignore.push("magnesium_oxide","epsom_salt");
elements.sulfuric_acid_gas.ignore.push("magnesium_oxide","epsom_salt");
elements.sulfuric_acid.reactions["magnesium_oxide"] = { "elem1": "epsom_salt", "elem2": null};
elements.sulfuric_acid_gas.reactions["magnesium_oxide"] = { "elem1": "epsom_salt", "elem2": null};


trueAcids.push("sulfuric_acid")
trueAcidGases.push("sulfuric_acid_gas");

elements.polytetrafluoroethylene = {
	color: "#efefef",
	behavior: behaviors.WALL,
	properties: {
		colored: false
	},
	tick: function(pixel) {
		if(!pixel.colored)
		{
			let rgb = elements.polytetrafluoroethylene.colorObject; 
			
			let coloroffset = Math.floor(Math.random() * (Math.random() > 0.5 ? -1 : 1) * Math.random() * 2);
			let r = rgb.r + coloroffset;
			let g = rgb.g + coloroffset;
			let b = rgb.b + coloroffset;
			pixel.color = "rgb("+r+","+g+","+b+")";
			pixel.colored = true;
			pixel.origColor = pixel.color;
		}
		if (pixel.origColor != pixel.color) {
			pixel.color = pixel.origColor;
		}
	},
	state: "solid",
	category: "solids",
	density: 1450,
	tempHigh: 327,
}
acidIgnore(["polytetrafluoroethylene", "molten_polytetrafluoroethylene", "tetrafluoroethylene"]);


function doStaining(pixel) {
            if (settings["stainoff"]) { return }
            var stain = elements[pixel.element].stain;
            if (stain > 0) {
                var newColor = pixel.color.match(/\d+/g);
            }
            else {
                var newColor = null;
            }

            for (var i = 0; i < adjacentCoords.length; i++) {
                var x = pixel.x+adjacentCoords[i][0];
                var y = pixel.y+adjacentCoords[i][1];
                if (!isEmpty(x,y,true)) {
                    var newPixel = pixelMap[x][y];
                    if ((elements[pixel.element].ignore && elements[pixel.element].ignore.indexOf(newPixel.element) !== -1) || newPixel.element == "polytetrafluoroethylene") {
                        continue;
                    }
                    if ((elements[newPixel.element].id !== elements[pixel.element].id || elements[newPixel.element].stainSelf) && (solidStates[elements[newPixel.element].state] || elements[newPixel.element].id === elements[pixel.element].id)) {
                        if (Math.random() < Math.abs(stain)) {
                            if (stain < 0) {
                                if (newPixel.origColor) {
                                    newColor = newPixel.origColor;
                                }
                                else { continue; }
                            }
                            else if (!newPixel.origColor) {
                                newPixel.origColor = newPixel.color.match(/\d+/g);
                            }
                            // if newPixel.color doesn't start with rgb, continue
                            if (!newPixel.color.match(/^rgb/)) { continue; }
                            // parse rgb color string of newPixel rgb(r,g,b)
                            var rgb = newPixel.color.match(/\d+/g);
                            if (elements[pixel.element].stainSelf && elements[newPixel.element].id === elements[pixel.element].id) {
                                // if rgb and newColor are the same, continue
                                if (rgb[0] === newColor[0] && rgb[1] === newColor[1] && rgb[2] === newColor[2]) { continue; }
                                var avg = [];
                                for (var j = 0; j < rgb.length; j++) {
                                    avg[j] = Math.round((rgb[j]*(1-Math.abs(stain))) + (newColor[j]*Math.abs(stain)));
                                }
                            }
                            else {
                                // get the average of rgb and newColor, more intense as stain reaches 1 
                                var avg = [];
                                for (var j = 0; j < rgb.length; j++) {
                                    avg[j] = Math.floor((rgb[j]*(1-Math.abs(stain))) + (newColor[j]*Math.abs(stain)));
                                }
                            }
                            // set newPixel color to avg
                            newPixel.color = "rgb("+avg.join(",")+")";
                        }
                    }
                }
            }
        }
elements["bleach"].reactions.vinegar = { "elem1":"chlorine", "elem2":null };
elements["bleach"].reactions.alcohol = { "elem1":"chloroform", "elem2":null };
elements["chlorine"].reactions.methane = { "elem1":"chloroform", "elem2":null };

elements.chloroform = {
	color: "#7f7f7f",
	behavior: behaviors.LIQUID,
    reactions: elements.poison.reactions,
	state: "liquid",
	category: "liquids",
	density: 1564,
    tempLow: -63,
	tempHigh: 61,
}

elements.chloroform_gas = {
	color: "#8f8f8f",
	behavior: behaviors.GAS,
    reactions: elements.poison.reactions,
	state: "gas",
    hidden: true,
	density: 4.12,
    tempLow: 61,
    stateLow: "chloroform"
}

elements["chloroform_gas"].reactions.hydrogen_fluoride = { "elem1":"tetrafluoroethylene", "elem2": null, tempMin: 550 };


elements.tetrafluoroethylene = {
	color: "#8f8f8f",
	behavior: behaviors.GAS,
    reactions: {
        "oxygen": { "elem1":"fire", "elem2":"fire" },
        "sulfuric_acid": { "elem1":"polytetrafluoroethylene", "elem2":"sulfuric_acid", "chance":0.25 },
        "sulfuric_acid_gas": { "elem1":"polytetrafluoroethylene", "elem2":"sulfuric_acid_gas", "chance":0.25 },
    },
	state: "gas",
    hidden: true,
    burn: 100,
    burnTime: 2,
	density: 1.52,
}





elements.polyethylene = {
	color: "#a7a7a7",
	behavior: behaviors.WALL,
	properties: {
		colored: false
	},
	tick: function(pixel) {
		if(!pixel.colored)
		{
			let rgb = elements.polyethylene.colorObject; 
			
			let coloroffset = Math.floor(Math.random() * (Math.random() > 0.5 ? -1 : 1) * Math.random() * 2);
			let r = rgb.r + coloroffset;
			let g = rgb.g + coloroffset;
			let b = rgb.b + coloroffset;
			pixel.color = "rgb("+r+","+g+","+b+")";
			pixel.colored = true;
			pixel.origColor = pixel.color;
		}
	},
	state: "solid",
	category: "solids",
	density: 1450,
	tempHigh: 125,
}


elements.ethane = {
    color: "#afafaf",
    behavior: behaviors.GAS,
    reactions: {
        "steam": { "elem1":"hydrogen", "elem2":"ethylene", "chance":0.01 },
        "chlorine": { "elem1":"chloroethane", "elem2": null, "chance":0.01 }
    },
    category: "gases",
    tempHigh: 400,
    stateHigh: "fire",
    tempLow: -88.5,
    burn: 85,
    burnTime: 5,
    fireColor: ["#00ffff","#00ffdd"],
    state: "gas",
    density: 1.356,
};

elements.chloroethane = {
    color: "#afdfaf",
    behavior: behaviors.GAS,
    reactions: {
        "aluminum": { "elem1":"diethylaluminium_chloride", "elem2": null, "chance":0.1 }
    },
    category: "gases",
    tempHigh: 510,
    stateHigh: "fire",
    tempLow: 12.27,
    burn: 85,
    burnTime: 5,
    fireColor: ["#00ffff","#00ffdd"],
    state: "gas",
    density: 2.879,
};

elements.diethylaluminium_chloride = {
    color: "#7faf7f",
    behavior: behaviors.LIQUID,
    category: "hidden",
    hidden: true,
    tempHigh: 125,
    stateHigh: "fire",
    tempLow: -74,
    burn: 85,
    burnTime: 10,
    state: "liquid",
    density: 2.879,
};

elements.ethylene = {
    color: "#a7a7a7",
    behavior: behaviors.GAS,
    reactions: {
        "titanium_trichloride": { "elem1":"polyethylene", "elem2":"titanium_trichloride", "chance":0.1 },
        "acid_gas": { "elem1":"chloroethane", "elem2":null },
        "diethylaluminium_chloride": { "elem1":"polyethylene", "elem2":"diethylaluminium_chloride", "chance":0.1 },
    },
    category: "gases",
    tempHigh: 400,
    stateHigh: "fire",
    tempLow: -103.7,
    burn: 85,
    burnTime: 5,
    fireColor: ["#00ffff","#00ffdd"],
    state: "gas",
    density: 1.356,
};

elements.acid.ignore.push("ethylene","liquid_ethylene","chloroethane","liquid_chloroethane");
elements.acid_gas.ignore.push("ethylene","liquid_ethylene","chloroethane","liquid_chloroethane");



elements.titanium = {
    color: "#e3e5e6",
    category: "solids",
    density: 4500,
    state: "solid",
    behavior: behaviors.WALL,
    reactions: {
        "acid": { "elem1": "titanium_trichloride", "elem2": null, "elem2":null },
    },
    stateHigh: "molten_titanium",
    tempHigh: 1668,
    conduct: 0.5,
    hardness: 0.7,
};
elements.molten_titanium = {
    density: 4500,
    color: ["#e0921d", "#e89e2e", "#f7b24a", "#fce168", "#fceca2", "#fffcf0"],
    hidden: true,
    state: "liquid",
    behavior: behaviors.LIQUID,
    stateLow: "titanium",
    tempLow: 1668,
    temp: 2000,
    viscosity: 10000
};

elements.rutile = {
    color: "#522614",
    behavior: behaviors.POWDER,
    category: "land",
    density: 4240,
    state: "solid",
    tempHigh: 1843,
    stateHigh: "molten_rutile",
};
elements.molten_rutile = {
    color: ["#e3907f", "#e68f3e"],
    behavior: behaviors.LIQUID,
    hidden: true,
    reactions: {
        "chlorine": { "elem1": "titanium_tetrachloride", "elem2":null },
    },
    density: 4230,
    state: "liquid",
    temp: 2000,
    tempLow: 1843,
    stateLow: "rutile",
    viscosity: 10000
    };
elements.titanium_tetrachloride = {
    color: "#d9d7b2",
    behavior: behaviors.LIQUID,
    category: "liquids",
    density: 1728,
    state: "liquid",
    tempHigh: 136.4,
    stateHigh: "titanium_tetrachloride_gas",
    tempLow: -24,
    stateLow: "titanium_tetrachloride_crystal",
};
elements.titanium_tetrachloride_gas = {
    color: "#e8edd5",
    behavior: behaviors.GAS,
    hidden: true,
    density: 500,
    state: "gas",
    temp: 200,
    tempLow: 136.4,
    stateLow: "titanium_tetrachloride"
};
elements.titanium_tetrachloride_crystal = {
    color: "#f5fffe",
    behavior: behaviors.WALL,
    hidden: true,
    density: 1728,
    state: "solid",
    temp: -50,
    tempHigh: -24,
    stateHigh: "titanium_tetrachloride"
};


elements.titanium_trichloride = {
    color: "#c71585",
    behavior: behaviors.SOLID,
    category: "solids",
    density: 2640,
    state: "solid",
};

elements.magnesium = {
    color: "#dddce6",
    category: "solids",
    state: "solid",
    density: 1738,
    behavior: behaviors.WALL,
    tick: function(pixel) {
        if (pixel.burning) {
            if(pixel.temp < 2200) {
                pixel.temp += 10;
            }
        }
    },
    stateHigh: "molten_magnesium",
    tempHigh: 650,
    conduct: 0.3,
    burn: 1,
    burnTime: 300,
    fireColor: ["#ffffff"],
    burnInto: "magnesium_oxide",
    hardness: 0.5,
};
elements.molten_magnesium = {
    density: 1738,
    color: ["#cc9c7c", "#ebb896", "#f5bb95", "#f7cd9c", "#fcd2a2", "#fff8f0"],
    hidden: true,
    state: "liquid",
    behavior: behaviors.MOLTEN,
    reactions: {
        "titanium_tetrachloride": { "elem1": "titanium", "elem2": "magnesium_chloride"},
        "titanium_tetrachloride_gas": { "elem1": "titanium", "elem2": "magnesium_chloride"},
    },
    tick: function(pixel) {
        if (pixel.burning) {
            if(pixel.temp < 2200) {
                pixel.temp += 10;
            }
        }
    },
    stateLow: "magnesium",
    tempLow: 650,
    temp: 1000,
    viscosity: 10000,
    burn: 1,
    conduct: 0.3,
    burnTime: 300,
    fireColor: ["#ffffff"],
    burnInto: "magnesium_oxide",
};


elements.magnesium_oxide = {
    color: "#f0f0f0",
    behavior: behaviors.POWDER,
    reactions: {
        "quicklime": { "elem1": "cement", "elem2": null},
    },
    category: "powders",
    density: 3600,
    state: "solid",
    tempHigh: 2852,
};


elements.magnesium_chloride = {
    color: "#bfbfbf",
    behavior: behaviors.POWDER,
    category: "powders",
    density: 2640,
    state: "solid",
    tempHigh: 714,
    stateHigh: "molten_magnesium_chloride",
};

elements.molten_magnesium_chloride = {
    color: "#bfbfbf",
    behavior: behaviors.MOLTEN,
    behaviorOn: [
        "XX|CR:fire%2.5|XX",
        "M2|CH:chlorine,magnesium%25|M2",
        "M1|M1|M1",
    ],
    hidden: true,
    temp: 750,
    density: 2620,
    state: "liquid",
    conduct: 0.3,
};

elements.francium = {
    color: "#3eff3b",
    behavior: [
        "XX|CR:radiation%50|XX",
        "CR:radiation%50|CH:radon%0.1|CR:radiation%50",
        "M2|M1|M2",
    ],
    tick: function(pixel) {
        pixel.temp += 5;
    },
    reactions: {
        "water": { "elem1":"radon", "elem2":"rad_pop"},
        "salt_water": { "elem1":"radon", "elem2":"rad_pop"},
        "sugar_water": { "elem1":"radon", "elem2":"rad_pop"},
        "dirty_water": { "elem1":"radon", "elem2":"rad_pop"},
        "seltzer": { "elem1":"radon", "elem2":"rad_pop"},
        "steam": { "elem1":"radon", "elem2":"rad_pop"},
        "rad_steam": { "elem1":"radon", "elem2":"rad_pop"},
        "quark_matter": { "elem1":"stable_francium", "elem2":"quark_matter"}
    },
    tempHigh: 27,
    category: "powders",
    state: "solid",
    density: 2480,
};
elements.molten_francium = {
    color: "#9ff31e",
    behavior: [
        "XX|CR:radiation%50|XX",
        "M2 AND CR:radiation%50|CH:radon%0.1|M2 AND CR:radiation%50",
        "M1|M1|M1",
    ],
    tick: function(pixel) {
        pixel.temp += 5;
    },
    reactions: {
        "water": { "elem1":"radon", "elem2":"rad_pop"},
        "salt_water": { "elem1":"radon", "elem2":"rad_pop"},
        "sugar_water": { "elem1":"radon", "elem2":"rad_pop"},
        "dirty_water": { "elem1":"radon", "elem2":"rad_pop"},
        "seltzer": { "elem1":"radon", "elem2":"rad_pop"},
        "steam": { "elem1":"radon", "elem2":"rad_pop"},
        "rad_steam": { "elem1":"radon", "elem2":"rad_pop"},
        "quark_matter": { "elem1":"molten_stable_francium", "elem2":"quark_matter"}
    },
    tempLow: 27,
    hidden: true,
    state: "liquid",
    density: 2480,
};

elements.radon = {
    color: "#b6ffb5",
    behavior: [
        "M2|M1 AND CR:radiation%10|M2",
        "M1 AND CR:radiation%10|CH:polonium%0.1|M1 AND CR:radiation%10",
        "M2|M1 AND CR:radiation%10|M2",
    ],
    reactions: {
        "quark_matter": { "elem1":"stable_radon", "elem2":"quark_matter"}
    },
    tick: function(pixel) {
        pixel.temp += 1;
    },
    category: "gases",
    state: "gas",
    density: 9.73,
};


elements.polonium = {
    color: "#56b870",
    behavior: [
        "XX|CR:radiation%10|XX",
        "CR:radiation%10|CH:lead%0.1|CR:radiation%10",
        "XX|CR:radiation%10|XX",
    ],
    reactions: {
        "quark_matter": { "elem1":"stable_polonium", "elem2":"quark_matter"}
    },
    tick: function(pixel) {
        pixel.temp += 1;
    },
    tempHigh: 254,
    category: "solids",
    state: "solid",
    density: 9196,
};
elements.molten_polonium = {
    color: ["#ace638","#acb838","ac8a00"],
    behavior: [
        "XX|CR:fire,CR:radiation%12.5|XX",
        "M2 AND CR:radiation%10|CH:lead%0.1|M2 AND CR:radiation%10",
        "M1|M1|M1",
    ],
    reactions: {
        "quark_matter": { "elem1":"molten_stable_polonium", "elem2":"quark_matter"}
    },
    tick: function(pixel) {
        pixel.temp += 1;
    },
    tempLow: 254,
    hidden: true,
    state: "liquid",
    density: 9196,
};

elements.rad_pop = {
    color: ["#ffb48f","#ffd991","#ffad91"],
    behavior: [
        "XX|XX|XX",
        "XX|EX:10>fire,radiation,radiation|XX",
        "XX|XX|XX",
    ],
    category: "energy",
    state: "gas",
    density: 1000,
    excludeRandom: true,
    hidden: true,
};


function blendColors(colorA, colorB, amount = 0.5) {
    const [rA, gA, bA] = colorA.match(/\w\w/g).map((c) => parseInt(c, 16));
    const [rB, gB, bB] = colorB.match(/\w\w/g).map((c) => parseInt(c, 16));
    const r = Math.round(rA + (rB - rA) * amount).toString(16).padStart(2, '0');
    const g = Math.round(gA + (gB - gA) * amount).toString(16).padStart(2, '0');
    const b = Math.round(bA + (bB - bA) * amount).toString(16).padStart(2, '0');
    return '#' + r + g + b;
}


elements.stable_radon = {
    color: [blendColors("#b6ffb5","#ff0000"),blendColors("#b6ffb5","#00ff00"),blendColors("#b6ffb5","#0000ff")],
    behavior: behaviors.GAS,
    category: "gases",
    state: "gas",
    density: 9.73,
    hidden: true,
};


elements.stable_polonium = {
    color: [blendColors("#56b870","#ff0000"),blendColors("#56b870","#00ff00"),blendColors("#56b870","#0000ff")],
    behavior: behaviors.WALL,
    reactions: {
        "oxygen": { "elem1":"polonium_dioxide", "elem2": null},
    },
    tempHigh: 254,
    hidden: true,
    category: "solids",
    state: "solid",
    density: 9196,
};
elements.molten_stable_polonium = {
    color: [blendColors("#ace638","#ff0000"),blendColors("#acb838","#00ff00"),blendColors("#ac8a00","#0000ff")],
    behavior: behaviors.MOLTEN,
    reactions: {
        "oxygen": { "elem1":"polonium_dioxide", "elem2": null},
        "magnesium": { "elem1":"magnesium_polonide", "elem2": null},
        "molten_magnesium": { "elem1":"magnesium_polonide", "elem2": null},
    },
    tempLow: 254,
    hidden: true,
    state: "liquid",
    density: 9196,
};

elements.polonium_dioxide = {
    color: "#ffff7f",
    behavior: behaviors.POWDER,
    tempHigh: 500,
    hidden: true,
    state: "solid",
    density: 8900,
};

elements.magnesium_polonide = {
    color: [blendColors("#b5b5b5","#ff0000",.25),blendColors("#b5b5b5","#00ff00",.25),blendColors("#b5b5b5","#0000ff",.25)],
    behavior: behaviors.POWDER,
    tempHigh: 1800,
    hidden: true,
    state: "solid",
    density: 6700,
};

elements.acid.reactions["magnesium_polonide"] = { "elem1": "polonium_hydride", "elem2": "magnesium_chloride"};
elements.acid_gas.reactions["magnesium_polonide"] = { "elem1": "polonium_hydride", "elem2": "magnesium_chloride"};
elements.acid.reactions["molten_magnesium_polonide"] = { "elem1": "polonium_hydride", "elem2": "magnesium_chloride"};
elements.acid_gas.reactions["molten_magnesium_polonide"] = { "elem1": "polonium_hydride", "elem2": "magnesium_chloride"};
elements.acid.ignore.push("magnesium_polonide","molten_magnesium_polonide","polonium_hydride","polonium_hydride_ice","polonium_hydride_gas","magnesium_chloride","molten_magnesium_chloride");
elements.acid_gas.ignore.push("magnesium_polonide","molten_magnesium_polonide","polonium_hydride","polonium_hydride_ice","polonium_hydride_gas","magnesium_chloride","molten_magnesium_chloride");

elements.polonium_hydride = {
    density: 2450,
    color: "#838396",
    hidden: true,
    state: "liquid",
    behavior: behaviors.LIQUID,
    tempLow: -35.3,
    tempHigh: 36.1,
    burn: 1,
    burnTime: 10,
    burnInto: ["polonium_dioxide","steam"],
};

elements.stable_francium = {
    color: [blendColors("#3eff3b","#ff0000"),blendColors("#3eff3b","#00ff00"),blendColors("#3eff3b","#0000ff")],
    behavior: behaviors.POWDER,
    reactions: {
        "water": { "elem1":"francium_hydroxide", "elem2":"big_pop"},
        "salt_water": { "elem1":"francium_hydroxide", "elem2":"big_pop"},
        "sugar_water": { "elem1":"francium_hydroxide", "elem2":"big_pop"},
        "dirty_water": { "elem1":"francium_hydroxide", "elem2":"big_pop"},
        "seltzer": { "elem1":"francium_hydroxide", "elem2":"big_pop"},
        "steam": { "elem1":"francium_hydroxide", "elem2":"big_pop"},
        "rad_steam": { "elem1":"francium_hydroxide", "elem2":"big_pop"}
    },
    tempHigh: 27,
    category: "powders",
    state: "solid",
    density: 2480,
    hidden: true,
};
elements.molten_stable_francium = {
    color: [blendColors("#9ff31e","#ff0000"),blendColors("#9ff31e","#00ff00"),blendColors("#9ff31e","#0000ff")],
    behavior: behaviors.LIQUID,
    reactions: {
        "water": { "elem1":"francium_hydroxide", "elem2":"big_pop"},
        "salt_water": { "elem1":"francium_hydroxide", "elem2":"big_pop"},
        "sugar_water": { "elem1":"francium_hydroxide", "elem2":"big_pop"},
        "dirty_water": { "elem1":"francium_hydroxide", "elem2":"big_pop"},
        "seltzer": { "elem1":"francium_hydroxide", "elem2":"big_pop"},
        "steam": { "elem1":"francium_hydroxide", "elem2":"big_pop"},
        "rad_steam": { "elem1":"francium_hydroxide", "elem2":"big_pop"}
    },
    tempLow: 27,
    state: "liquid",
    hidden: true,
    density: 2480,
};


elements.big_pop = {
    color: ["#ffb48f","#ffd991","#ffad91"],
    behavior: [
        "XX|XX|XX",
        "XX|EX:10|XX",
        "XX|XX|XX",
    ],
    category: "energy",
    state: "gas",
    density: 1000,
    excludeRandom: true,
    hidden: true,
};

elements.potassium_salt_water = {
    color: "#416ed1",
    behavior: behaviors.LIQUID,
    tempHigh: 102,
    stateHigh: ["steam","potassium_salt"],
    tempLow: -2,
    stateLowName: "potassium_salt_ice",
    category: "liquids",
    reactions: {
        "dirt": { elem1: null, elem2: "mud" },
        "sand": { elem1: null, elem2: "wet_sand" },
        "clay_soil": { elem1: null, elem2: "clay" },
        "dust": { elem1: "dirty_water", elem2: null },
        "ash": { elem1: "dirty_water", elem2: null },
        "carbon_dioxide": { elem1: "dirty_water", elem2: null },
        "sulfur": { elem1: "dirty_water", elem2: null },
        "charcoal": { elem1: "dirty_water", chance:0.005 },
        "rat": { elem1: "dirty_water", chance:0.005 },
        "plague": { elem1: "dirty_water", elem2: null },
        "fallout": { elem1: "dirty_water", chance:0.25 },
        "radiation": { elem1: "dirty_water", chance:0.25 },
        "rust": { elem1: "dirty_water", chance:0.005 },
        "quicklime": { elem1: null, elem2: "slaked_lime" },
        "rock": { elem2: "wet_sand", chance: 0.0005 },
        "fly": { elem2:"dead_bug", chance:0.1, "oneway":true },
        "firefly": { elem2:"dead_bug", chance:0.1, "oneway":true },
        "bee": { elem2:"dead_bug", chance:0.05, "oneway":true },
        "stink_bug": { elem2:"dead_bug", chance:0.1, "oneway":true },
        "cancer": { elem1: "dirty_water", chance:0.25 },
        // electrolysis:
        "aluminum": { elem1:["hydrogen","hydrogen","oxygen","potassium_salt"], charged:true, chance:0.0025 },
        "zinc": { elem1:["hydrogen","hydrogen","oxygen","potassium_salt"], charged:true, chance:0.015 },
        "steel": { elem1:["hydrogen","hydrogen","oxygen","potassium_salt"], charged:true, chance:0.0125 },
        "iron": { elem1:["hydrogen","hydrogen","oxygen","potassium_salt"], charged:true, chance:0.0125 },
        "tin": { elem1:["hydrogen","hydrogen","oxygen","potassium_salt"], charged:true, chance:0.01 },
        "lead": { elem1:["hydrogen","hydrogen","oxygen","potassium_salt"], charged:true, chance:0.01 },
        "brass": { elem1:["hydrogen","hydrogen","oxygen","potassium_salt"], charged:true, chance:0.001 },
        "bronze": { elem1:["hydrogen","hydrogen","oxygen","potassium_salt"], charged:true, chance:0.001 },
        "copper": { elem1:["hydrogen","hydrogen","oxygen","potassium_salt"], charged:true, chance:0.0075 },
        "silver": { elem1:["hydrogen","hydrogen","oxygen","potassium_salt"], charged:true, chance:0.0075 },
        "gold": { elem1:["hydrogen","hydrogen","oxygen","potassium_salt"], charged:true, chance:0.0075 },
    },
    state: "liquid",
    density: 1026,
    conduct: 0.1,
    stain: -0.66
};


elements.potassium = {
    color: ["#8e8ba3","#8797a8","#7d6a75","#879dad"],
    tick: function(pixel) {
        for (var i = 0; i < adjacentCoords.length; i++) {
            var x = pixel.x+adjacentCoords[i][0];
            var y = pixel.y+adjacentCoords[i][1];
            if (isEmpty(x,y)) {
                if (Math.random() < 0.005) { deletePixel(pixel.x,pixel.y) }
                break
            } } },
    reactions: {
        "chlorine": { elem1:"potassium_salt", elem2:"big_pop" },
        "water": { elem1:"big_pop" },
        "salt_water": { elem1:"big_pop" },
        "sugar_water": { elem1:"big_pop" },
        "dirty_water": { elem1:"big_pop" },
        "seltzer": { elem1:"big_pop" },
        "acid": { elem1:"explosion" }
    },
    tempHigh: 63.5,
    category: "solids",
    state: "solid",
    density: 890,
    conduct: 0.85,
    hardness: 0.04,
    burn:40,
    burnTime: 200,
    fireColor: ["#ff00ee","#ff6bf5"]
};
elements.molten_potassium = {
    tempLow: 63.5,
    tempHigh: 757.6,
    burn:40,
    burnTime: 200,
    fireColor: ["#ff00ee","#ff6bf5"],
    reactions: {
        "chlorine": { elem1:"potassium_salt", elem2:"big_pop" },
        "water": { elem1:"big_pop" },
        "salt_water": { elem1:"big_pop" },
        "sugar_water": { elem1:"big_pop" },
        "dirty_water": { elem1:"big_pop" },
        "seltzer": { elem1:"big_pop" },
        "acid": { elem1:"explosion" }
    }
};
elements.potassium_gas = {
    color: "#5e6fdb"
};

runAfterAutogen(function() {
    elements.molten_salt.reactions = {};
    elements.molten_salt.reactions.aluminum = { elem1:["sodium","chlorine"], charged:true, chance:0.0025 };
    elements.molten_salt.reactions.zinc = { elem1:["sodium","chlorine"], charged:true, chance:0.015 };
    elements.molten_salt.reactions.steel = { elem1:["sodium","chlorine"], charged:true, chance:0.0125 };
    elements.molten_salt.reactions.iron = { elem1:["sodium","chlorine"], charged:true, chance:0.0125 };
    elements.molten_salt.reactions.tin = { elem1:["sodium","chlorine"], charged:true, chance:0.01 };
    elements.molten_salt.reactions.lead = { elem1:["sodium","chlorine"], charged:true, chance:0.01 };
    elements.molten_salt.reactions.brass = { elem1:["sodium","chlorine"], charged:true, chance:0.001 };
    elements.molten_salt.reactions.bronze = { elem1:["sodium","chlorine"], charged:true, chance:0.001 };
    elements.molten_salt.reactions.copper = { elem1:["sodium","chlorine"], charged:true, chance:0.0075 };
    elements.molten_salt.reactions.silver = { elem1:["sodium","chlorine"], charged:true, chance:0.0075 };
    elements.molten_salt.reactions.gold = { elem1:["sodium","chlorine"], charged:true, chance:0.0075 };
    elements.molten_salt.conduct = 0.7;

    elements.molten_potassium_salt.reactions = {};
    elements.molten_potassium_salt.reactions.aluminum = { elem1:["potassium","chlorine"], charged:true, chance:0.0025 };
    elements.molten_potassium_salt.reactions.zinc = { elem1:["potassium","chlorine"], charged:true, chance:0.015 };
    elements.molten_potassium_salt.reactions.steel = { elem1:["potassium","chlorine"], charged:true, chance:0.0125 };
    elements.molten_potassium_salt.reactions.iron = { elem1:["potassium","chlorine"], charged:true, chance:0.0125 };
    elements.molten_potassium_salt.reactions.tin = { elem1:["potassium","chlorine"], charged:true, chance:0.01 };
    elements.molten_potassium_salt.reactions.lead = { elem1:["potassium","chlorine"], charged:true, chance:0.01 };
    elements.molten_potassium_salt.reactions.brass = { elem1:["potassium","chlorine"], charged:true, chance:0.001 };
    elements.molten_potassium_salt.reactions.bronze = { elem1:["potassium","chlorine"], charged:true, chance:0.001 };
    elements.molten_potassium_salt.reactions.copper = { elem1:["potassium","chlorine"], charged:true, chance:0.0075 };
    elements.molten_potassium_salt.reactions.silver = { elem1:["potassium","chlorine"], charged:true, chance:0.0075 };
    elements.molten_potassium_salt.reactions.gold = { elem1:["potassium","chlorine"], charged:true, chance:0.0075 };
    elements.molten_potassium_salt.conduct = 0.7;
    delete elements.molten_potassium_salt.burn;
    delete elements.molten_potassium.burn;
});

elements.potassium_salt.hidden = false;


let defaultBaseReactions = {
	"grape": { "elem2":"juice", "color1":"#291824" },
	"sodium": { "elem1":"pop" },
	"meat": { "elem2":"rotten_meat", "elem1":null, "chance":0.5 },
}

let defaultBaseGasReactions = {
	"grape": { "elem2":"juice", "color1":"#291824" },
	"sodium": { "elem1":"pop" },
	"meat": { "elem2":"rotten_meat", "elem1":null, "chance":0.4 },
}

createAcid("francium_hydroxide",defaultBaseReactions,defaultBaseGasReactions,["#863bff","#4d00ca","#897b9e"],["#a46cff","#7a40d7","#a79cb6"],"hidden","hidden",100,100,0,1000,1010,1)

function acidNeutralize(base)
{
    for(let i = 0; i < trueAcids.length; i++)
    {
        elements[trueAcids[i]].reactions[base] = { "elem1":"neutral_acid", "elem2":null };
    }
    for(let i = 0; i < trueAcidGases.length; i++)
    {
        elements[trueAcidGases[i]].reactions[base] = { "elem1":"hydrogen", "elem2":null };
    }
}

elements.francium_hydroxide.breakInto = "francium_hydroxide";
elements.francium_hydroxide_gas.breakInto = "francium_hydroxide_gas";
delete elements.francium_hydroxide.burn;
delete elements.francium_hydroxide_gas.burn;
acidNeutralize("francium_hydroxide");
acidNeutralize("francium_hydroxide_gas");

createAcid("sodium_hydroxide",structuredClone(defaultBaseReactions),structuredClone(defaultBaseGasReactions),["#fc3bff","#c000ca","#9b7b9e"],["#f36cff","#be40d7","#b69cb6"],"liquids","hidden",100,100,0,1000,1010,1);
acidNeutralize("sodium_hydroxide");
acidNeutralize("sodium_hydroxide_gas");

createAcid("potassium_hydroxide",structuredClone(defaultBaseReactions),structuredClone(defaultBaseGasReactions),["#3bc4ff","#0062ca","#7b949e"],["#6eecff","#40c5d7","#9cb1b6"],"liquids","hidden",100,100,0,1000,1020,1);
acidNeutralize("potassium_hydroxide");
acidNeutralize("potassium_hydroxide_gas");

elements.salt_water.reactions["mercury"] = { elem1:["sodium_hydroxide","chlorine","hydrogen"], charged:true, chance:0.02 };
elements.sodium_hydroxide.ignore.push("mercury");
elements.potassium_hydroxide.ignore.push("salt_water");
elements.potassium_salt_water.reactions["mercury"] = { elem1:["potassium_hydroxide","chlorine","hydrogen"], charged:true, chance:0.02 };
elements.potassium_hydroxide.ignore.push("mercury");
elements.potassium_hydroxide.ignore.push("potassium_salt_water");


elements.bless.reactions["FOOF"] = {elem2: "oxygen"};
elements.bless.reactions["solid_FOOF"] = {elem2: "oxygen"};
elements.bless.reactions["fluorine"] = {elem2: null};
elements.bless.reactions["liquid_fluorine"] = {elem2: null};
elements.bless.reactions["fluorine_ice"] = {elem2: null};
elements.bless.reactions["hydrogen_fluoride"] = {elem2: "hydrogen"};
elements.bless.reactions["liquid_hydrogen_fluoride"] = {elem2: "hydrogen"};
elements.bless.reactions["hydrogen_fluoride_ice"] = {elem2: "hydrogen"};
elements.bless.reactions["hydrofluoric_acid"] = {elem2: "hydrogen"};
elements.bless.reactions["liquid_hydrofluoric_acid"] = {elem2: "hydrogen"};
elements.bless.reactions["hydrofluoric_acid_ice"] = {elem2: "hydrogen"};
elements.bless.reactions["francium"] = {elem2: null};
elements.bless.reactions["molten_francium"] = {elem2: null};
elements.bless.reactions["radon"] = {elem2: null};
elements.bless.reactions["polonium"] = {elem2: null};
elements.bless.reactions["molten_polonium"] = {elem2: null};
elements.bless.reactions["neutronium"] = {elem2: "neutron"};
elements.bless.reactions["liquid_neutronium"] = {elem2: "neutron"};
elements.bless.reactions["quark_matter"] = {elem2: ["neutron","proton"]};
elements.bless.reactions["gamma_ray_burst"] = {elem2: null};
elements.bless.reactions["nitrogen_dioxide"] = {elem2: "oxygen"};
elements.bless.reactions["liquid_nitrogen_dioxide"] = {elem2: "oxygen"};
elements.bless.reactions["sulfur_dioxide"] = {elem2: "oxygen"};
elements.bless.reactions["liquid_sulfur_dioxide"] = {elem2: "oxygen"};
elements.bless.reactions["sulfur_dioxide_ice"] = {elem2: "oxygen"};
elements.bless.reactions["hydrogen_sulfide"] = {elem2: "hydrogen"};
elements.bless.reactions["liquid_hydrogen_sulfide"] = {elem2: "hydrogen"};
} else {
	if(!enabledMods.includes(runAfterAutogenMod))	{ enabledMods.splice(enabledMods.indexOf(modName),0,runAfterAutogenMod) };
	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
	alert(`The "${runAfterAutogenMod}" is required and have been automatically inserted (reload for this to take effect).`);
};