/*

Provide default values for user session data. These are automatically added
via the `autoStoreData` middleware. Values will only be added to the
session if a value doesn't already exist. This may be useful for testing
journeys where users are returning or logging in to an existing application.

============================================================================

Example usage:

"full-name": "Sarah Philips",

"options-chosen": [ "foo", "bar" ]

============================================================================

*/

const fs = require("fs");
const { trim } = require("jquery");
const path = require("path");

var services = {
  layinghens: {
    name: "Laying hens",
    description: "This service is for laying hens",
    basefolder: "./app/views/layinghens/current/",
    baseurl: "/layinghens/current/",
    exclude: ["templates", "views"],
  },
  addingvalue: {
    name: "Adding value 2024",
    description: "This service is for adding value",
    basefolder: "./app/views/adding-value-2024/current/",
    baseurl: "/adding-value-2024/current/",
    exclude: ["templates", "views"],
  },
};

// Write a function called populateServicePageStructure that recursively looks into each file and folder inside the 'basefolder' for each service (listed in the services object), each loop should maintain an object called 'structure' that represents the structure of the service's pages. The structure object should have the following format: { type: 'folder || page', name: 'foldername [strip .html if needed]', url: [optional if there is an index.html file in the folder], children: [array of child objects] } or { type: 'file', name: 'filename', url: 'url' }

const populateServicePageStructure = (services) => {
  const serviceKeys = Object.keys(services);
  serviceKeys.forEach((serviceKey) => {
    const service = services[serviceKey];
    const basefolder = service.basefolder;
    const baseurl = service.baseurl;
    const excludedDirectories = service.exclude;
    service.structure = populateFolder(
      basefolder,
      baseurl,
      excludedDirectories
    );
  });
};

const populateFolder = (folderPath, baseurl, excludedDirectories) => {
  var excludedDirectories = excludedDirectories || [];
  const structure = [];
  const files = fs.readdirSync(folderPath);
  files.forEach((file) => {
    const fullPath = path.join(folderPath, file);
    const relativePath = path.relative(baseurl, fullPath);
    if (fs.statSync(fullPath).isDirectory()) {
      const directoryName = file;
      var isExcluded = false;
      excludedDirectories.forEach((excludedDirectory) => {
        if (directoryName === excludedDirectory) {
          isExcluded = true;
        }
      });
      const children = populateFolder(fullPath, baseurl);
      if (Object.keys(children).length !== 0 && !isExcluded) {
        structure.push({
          type: "folder",
          name: userFriendlyName(directoryName),
          slug: directoryName,
          children: children,
        });
      }
    } else if (file.endsWith(".html")) {
      structure.push({
        type: "page",
        name: userFriendlyName(file),
        slug: file.replace(".html", ""),
        url: trimStartOfString(relativePath, baseurl),
      });
    }
  });
  return structure;
};

const trimStartOfString = (fullString, matchString) => {
  const index = fullString.indexOf(matchString);
  if (index !== -1) {
    return fullString.substring(index);
  }
  return fullString;
};

const userFriendlyName = (name) => {
  const isElimination = name.includes("elim-");
  return (
    name
      .replace("elim-", "")
      .replace(".html", "")
      .replace(/-/g, " ")
      .replace(/^./, (l) => l.toUpperCase()) +
    (isElimination ? " - Elimination" : "")
  );
};

populateServicePageStructure(services);

const storeTypeCost = {
  aboveGroundSteelTank: {
    text: "Above-ground steel slurry store",
    value: 20250,
    formattedValue: "£20,250",
    hint: "Grant amount: £22 per cubic metre",
    unit: "£22",
  },
  aboveGroundConcreteTank: {
    text: "Precast circular concrete slurry store",
    value: 20250,
    formattedValue: "£20,250",
    hint: "Grant amount: £17 per cubic metre",
    unit: "£17",
  },
  insituConcreteStore: {
    text: "In situ cast-reinforced concrete slurry store",
    value: 10000,
    formattedValue: "£10,000",
    hint: "Grant amount: £15 per cubic metre",
    unit: "£15",
  },
  unlinedLagoon: {
    text: "Earth-bank lagoon with consolidated clay lining",
    value: 9000,
    formattedValue: "£9,000",
    hint: "Grant amount: £8 per cubic metre",
    unit: "£8",
  },
  linedLagoon: {
    text: "Earth-bank lagoon with internal liner",
    value: 2100,
    formattedValue: "£2,100",
    hint: "Grant amount: £12 per cubic metre",
    unit: "£12",
  },
  precastConcreteStore: {
    text: "Stores using pre-cast rectangular concrete panels",
    value: 8000,
    formattedValue: "£8,000",
    hint: "Grant amount: £14 per cubic metre",
    unit: "£14",
  },
  alligatorBags: {
    text: "Large-volume supported slurry bag (over 2,500 cubic metres)",
    value: 5010,
    formattedValue: "£5,010",
    hint: "Grant amount: £20 per cubic metre",
    unit: "£20",
  },
};

const separatorTypeCost = {
  screenPress3: {
    text: "Screen press (3m3 of slurry per hour)",
    value: 5000,
    formattedValue: "£5,000",
    hint2: "Grant amount: £5,000 per square metre",
    unit: "£5,000",
  },
  screenPress10: {
    text: "Screen press (10m3 of slurry per hour)",
    value: 60000,
    formattedValue: "£60,000",
    hint2: "Grant amount: £60,000 per square metre",
    unit: "£60,000",
  },
  screwPress3: {
    text: "Screw press (3m3 of slurry per hour)",
    value: 5000,
    formattedValue: "£5,000",
    hint2: "Grant amount: £5,000 per square metre",
    unit: "£5,000",
  },
  screwPress10: {
    text: "Screen press (10m3 of slurry per hour)",
    value: 5000,
    formattedValue: "£5,000",
    hint2: "Grant amount: £5,000 per square metre",
    unit: "£5,000",
  },
};

const coverTypeCost = {
  fixedFlexibleCovers: {
    text: "Fixed flexible cover",
    value: 2100,
    formattedValue: "£2,100",
    hint: "Taut skin made from flexible or pliant sheet material such as reinforced plastic sheeting or strong canvas",
    hint2: "Grant amount: £4 per square metre",
    unit: "£4",
  },
  freeFloatingPlastic: {
    text: "Floating flexible cover",
    value: 3250,
    formattedValue: "£3,250",
    hint: "Flexible plastic sheet covers with some form of flotation or fixing to store sides to prevent movement",
    hint2: "Grant amount: £3 per square metre",
    unit: "£3",
  },
};

const projectItemsCost = {
  receptionPit: {
    text: "Reception pit",
    value: 30,
    formattedValue: "£30",
    hint: "Grant amount: £30 per cubic metre",
    measuringUnit: "cubic",
  },
  slurryTransferPump: {
    text: "Electric-powered slurry transfer pump",
    value: 1050,
    formattedValue: "£1,050",
    hint: "Grant amount: £1,050",
    measuringUnit: "unit",
  },
  powerPTOpump1: {
    text: "Powered take off (PTO) or hydraulically driven chopper pump",
    value: 950,
    formattedValue: "£950",
    hint: "Grant amount: £950",
    measuringUnit: "unit",
  },
  chopperPump: {
    text: "Centrifugal chopper pump",
    value: 2090,
    formattedValue: "£2,090",
    hint: "Grant amount: £2,090",
    measuringUnit: "unit",
  },
  powerPTOpump2: {
    text: "Powered take off (PTO) or hydraulically driven chopper pump",
    value: 1700,
    formattedValue: "£1,700",
    hint: "Grant amount: £1,700",
    measuringUnit: "unit",
  },
  steelPipework100: {
    text: "Galvanised steel pipework 100mm diameter",
    value: 14,
    formattedValue: "£14",
    hint: "Grant amount: £14 per metre",
    measuringUnit: "metre",
  },
  steelPipework150: {
    text: "Galvanised steel pipework 150mm diameter",
    value: 24,
    formattedValue: "£24",
    hint: "Grant amount: £24 per metre",
    measuringUnit: "metre",
  },
  polyPipework100: {
    text: "Polyethylene (PE) or equivalent pipework 100mm diameter",
    value: 8,
    formattedValue: "£8",
    hint: "Grant amount: £8 per metre",
    measuringUnit: "metre",
  },
  polyPipework150: {
    text: "Polyethylene (PE) or equivalent pipework 150mm diameter",
    value: 9,
    formattedValue: "£9",
    hint: "Grant amount: £9 per metre",
    measuringUnit: "metre",
  },
  transferChannels: {
    text: "Under-floor transfer channels",
    value: 25,
    formattedValue: "£25",
    hint: "Grant amount: £25 per metre",
    measuringUnit: "metre",
  },
  tankWallMixers1200: {
    text: "Slurry store wall mixers with store capacity up to 1,200 cubic metres",
    value: 350,
    formattedValue: "£350",
    hint: "Grant amount: £350",
    measuringUnit: "unit",
  },
  tankWallMixers8000: {
    text: "Slurry store wall mixers with store capacity up to 8,000 cubic metres",
    value: 1000,
    formattedValue: "£1,000",
    hint: "Grant amount: £1,000",
    measuringUnit: "unit",
  },
  inspectionSteelTanks: {
    text: "Inspection platform with ladder for above-ground concrete and steel slurry stores",
    value: 800,
    formattedValue: "£800",
    hint: "Grant amount: £800",
    measuringUnit: "unit",
  },
  safetyFencingStores: {
    text: "Safety fencing for stores constructed below ground level, earth-bank lagoons and slurry bags",
    value: 55,
    formattedValue: "£55",
    hint: "Grant amount: £55 per metre",
    measuringUnit: "metre",
  },
};

module.exports = {
  // Insert values here

  services: services,
  storeTypeCost,
  coverTypeCost,
  projectItemsCost,
  separatorTypeCost,
};
