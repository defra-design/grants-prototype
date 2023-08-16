const storeTypeCost = {
  aboveGroundSteelTank: { text: 'Above-ground steel slurry store', value: 20250, formattedValue: '£20,250', hint: 'Grant amount: £22 per cubic metre', unit: '£22' },
  aboveGroundConcreteTank: { text: 'Precast circular concrete slurry store', value: 20250, formattedValue: '£20,250', hint: 'Grant amount: £17 per cubic metre', unit: '£17' },
  insituConcreteStore: { text: 'In situ cast-reinforced concrete slurry store', value: 10000, formattedValue: '£10,000', hint: 'Grant amount: £15 per cubic metre', unit: '£15' },
  unlinedLagoon: { text: 'Earth-bank lagoon with consolidated clay lining', value: 9000, formattedValue: '£9,000', hint: 'Grant amount: £8 per cubic metre', unit: '£8' },
  linedLagoon: { text: 'Earth-bank lagoon with internal liner', value: 2100, formattedValue: '£2,100', hint: 'Grant amount: £12 per cubic metre', unit: '£12' },
  precastConcreteStore: { text: 'Stores using pre-cast rectangular concrete panels', value: 8000, formattedValue: '£8,000', hint: 'Grant amount: £14 per cubic metre', unit: '£14' },
  alligatorBags: { text: 'Large-volume supported slurry bag (over 2,500 cubic metres)', value: 5010, formattedValue: '£5,010', hint: 'Grant amount: £20 per cubic metre', unit: '£20' }

}

const separatorTypeCost = {
  screenPress3: { text: 'Screen press (3m3 of slurry per hour)', value: 5000, formattedValue: '£5,000', hint2: 'Grant amount: £5,000 per square metre', unit: '£5,000'},
  screenPress10: { text: 'Screen press (10m3 of slurry per hour)', value: 60000, formattedValue: '£60,000', hint2: 'Grant amount: £60,000 per square metre', unit: '£60,000'},
  screwPress3: { text: 'Screw press (3m3 of slurry per hour)', value: 5000, formattedValue: '£5,000', hint2: 'Grant amount: £5,000 per square metre', unit: '£5,000'},
  screwPress10: { text: 'Screen press (10m3 of slurry per hour)', value: 5000, formattedValue: '£5,000', hint2: 'Grant amount: £5,000 per square metre', unit: '£5,000'}
}

const coverTypeCost = {
  fixedFlexibleCovers: { text: 'Fixed flexible cover', value: 2100, formattedValue: '£2,100', hint: 'Taut skin made from flexible or pliant sheet material such as reinforced plastic sheeting or strong canvas', hint2: 'Grant amount: £4 per square metre', unit: '£4' },
  freeFloatingPlastic: { text: 'Floating flexible cover', value: 3250, formattedValue: '£3,250', hint: 'Flexible plastic sheet covers with some form of flotation or fixing to store sides to prevent movement', hint2: 'Grant amount: £3 per square metre', unit: '£3' }
}

const projectItemsCost = {
  receptionPit: { text: 'Reception pit', value: 30, formattedValue: '£30', hint: 'Grant amount: £30 per cubic metre',  measuringUnit: 'cubic' },
  slurryTransferPump: { text: 'Electric-powered slurry transfer pump', value: 1050, formattedValue: '£1,050', hint: 'Grant amount: £1,050', measuringUnit: 'unit' },
  powerPTOpump1: { text: 'Powered take off (PTO) or hydraulically driven chopper pump', value: 950, formattedValue: '£950', hint: 'Grant amount: £950', measuringUnit: 'unit' },
  chopperPump: { text: 'Centrifugal chopper pump', value: 2090, formattedValue: '£2,090', hint: 'Grant amount: £2,090', measuringUnit: 'unit' },
  powerPTOpump2: { text: 'Powered take off (PTO) or hydraulically driven chopper pump', value: 1700, formattedValue: '£1,700', hint: 'Grant amount: £1,700', measuringUnit: 'unit' },
  steelPipework100: { text: 'Galvanised steel pipework 100mm diameter', value: 14, formattedValue: '£14', hint: 'Grant amount: £14 per metre',  measuringUnit: 'metre' },
  steelPipework150: { text: 'Galvanised steel pipework 150mm diameter', value: 24, formattedValue: '£24', hint: 'Grant amount: £24 per metre',  measuringUnit: 'metre' },
  polyPipework100: { text: 'Polyethylene (PE) or equivalent pipework 100mm diameter', value: 8, formattedValue: '£8', hint: 'Grant amount: £8 per metre',  measuringUnit: 'metre' },
  polyPipework150: { text: 'Polyethylene (PE) or equivalent pipework 150mm diameter', value: 9, formattedValue: '£9', hint: 'Grant amount: £9 per metre',  measuringUnit: 'metre' },
  transferChannels: { text: 'Under-floor transfer channels', value: 25, formattedValue: '£25', hint: 'Grant amount: £25 per metre',  measuringUnit: 'metre' },
  tankWallMixers1200: { text: 'Slurry store wall mixers with store capacity up to 1,200 cubic metres', value: 350, formattedValue: '£350', hint: 'Grant amount: £350',  measuringUnit: 'unit' },
  tankWallMixers8000: { text: 'Slurry store wall mixers with store capacity up to 8,000 cubic metres', value: 1000, formattedValue: '£1,000', hint: 'Grant amount: £1,000',  measuringUnit: 'unit' },
  inspectionSteelTanks: { text: 'Inspection platform with ladder for above-ground concrete and steel slurry stores', value: 800, formattedValue: '£800', hint: 'Grant amount: £800',  measuringUnit: 'unit' },
  safetyFencingStores: { text: 'Safety fencing for stores constructed below ground level, earth-bank lagoons and slurry bags', value: 55, formattedValue: '£55', hint: 'Grant amount: £55 per metre',  measuringUnit: 'metre' },
  aeration: { text: 'Aeration equipment', value: 800, formattedValue: '£800', hint: 'Grant amount: £800',  measuringUnit: 'unit' }


}

module.exports = { storeTypeCost, coverTypeCost, projectItemsCost, separatorTypeCost }
