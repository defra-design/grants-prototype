const storeTypeCost = {
  aboveGroundSteelTank: { text: 'Above-ground steel tank', value: 20250, formattedValue: '£20,250', hint: 'Grant amount: £22 per cubic metre', unit: '£22' },
  aboveGroundConcreteTank: { text: 'Above-ground concrete tank', value: 20250, formattedValue: '£20,250', hint: 'Grant amount: £17 per cubic metre', unit: '£17' },
  insituConcreteStore: { text: 'Below-ground in-situ cast-reinforced concrete tank', value: 10000, formattedValue: '£10,000', hint: 'Grant amount: £15 per cubic metre', unit: '£15' },
  unlinedLagoon: { text: 'Earth-banked lagoon (unlined)', value: 9000, formattedValue: '£9,000', hint: 'Grant amount: £8 per cubic metre', unit: '£8' },
  linedLagoon: { text: 'Earth-bank lagoon (lined)', value: 2100, formattedValue: '£2,100', hint: 'Grant amount: £12 per cubic metre', unit: '£12' },
  precastConcreteStore: { text: 'Stores using pre-cast rectangular concrete panels', value: 8000, formattedValue: '£8,000', hint: 'Grant amount: £14 per cubic metre', unit: '£14' },
  alligatorBags: { text: 'Large-volume supported slurry bag', value: 5010, formattedValue: '£5,010', hint: 'Grant amount: £20 per cubic metre', unit: '£20' }

}

const coverTypeCost = {
  rigidCoversConcreteStores: { text: 'Rigid cover for above-ground steel or concrete stores', value: 1000, formattedValue: '£1,000', hint: 'Solid roof or lid with a flat deck or conical shape made from inflexible material such as fibreglass panels or polyester sheets', hint2:'Grant amount: £8 per square metre', unit: '£8' },
  fixedFlexibleCovers: { text: 'Fixed flexible cover for above-ground steel and concrete stores and earth-bank lagoons', value: 2100, formattedValue: '£2,100', hint: 'Taut skin made from flexible or pliant sheet material such as reinforced plastic sheeting or strong canvas', hint2: 'Grant amount: £4 per square metre', unit: '£4' },
  freeFloatingPlastic: { text: 'Free-floating plastic cover', value: 3250, formattedValue: '£3,250', hint: 'Flexible plastic sheet covers with some form of flotation or fixing to store sides to prevent movement', hint2: 'Grant amount: £3 per square metre', unit: '£3' }
}

const projectItemsCost = {
  plasticGRP: { text: 'Glass-reinforced plastic (GRP) reception pit', value: 1100, formattedValue: '£1,100', hint: 'Grant amount: £25 per cubic metre',  measuringUnit: 'cubic' },
  plasticReceptionPit: { text: 'Plastic reception pit', value: 1200, formattedValue: '£1,200', hint: 'Grant amount: £26 per cubic metre', measuringUnit: 'cubic' },
  concreteReceptionPits: { text: 'Pre-cast concrete reception pit', value: 1050, formattedValue: '£1,050', hint: 'Grant amount: £27 per cubic metre', measuringUnit: 'cubic' },
  insituConcreteReceptionPits: { text: 'In-situ cast-concrete reception pit', value: 1200, formattedValue: '£1,200', hint: 'Grant amount: £30 per cubic metre', quantity: '1', measuringUnit: 'cubic' },
  slurryTransferPump: { text: 'Electric-powered slurry transfer pump', value: 800, formattedValue: '£800', hint: 'Grant amount: £1,050', measuringUnit: 'unit' },
  chopperPump: { text: 'Centrifugal chopper pump', value: 2090, formattedValue: '£790', hint: 'Grant amount: £790', measuringUnit: 'unit' },
  steelPipework100: { text: 'Galvanised steel pipework 100mm diameter', value: 1100, formattedValue: '£1,100', hint: 'Grant amount: £14 per metre',  measuringUnit: 'metre' },
  steelPipework150: { text: 'Galvanised steel pipework 150mm diameter', value: 1300, formattedValue: '£1,300', hint: 'Grant amount: £24 per metre',  measuringUnit: 'metre' },
  transferChannels: { text: 'Under-floor transfer channels', value: 1650, formattedValue: '£1,650', hint: 'Grant amount: £25 per metre',  measuringUnit: 'metre' },
  tankWallMixers1200: { text: 'Tank wall mixers with tank capacity up to 1,200 cubic metre', value: 350, formattedValue: '£350', hint: 'Grant amount: £350',  measuringUnit: 'unit' },
  tankWallMixers8000: { text: 'Tank wall mixers with tank capacity up to 8,000 cubic metre', value: 1000, formattedValue: '£1,000', hint: 'Grant amount: £1,000',  measuringUnit: 'unit' },
  inspectionSteelTanks: { text: 'Inspection platform with ladder above-ground concrete and steel tanks', value: 800, formattedValue: '£800', hint: 'Grant amount: £800',  measuringUnit: 'unit' },
  safetyFencingStores: { text: 'Safety fencing for below-ground stores, earth-bank lagoons and slurry bags', value: 55, formattedValue: '£55', hint: 'Grant amount: £55 per metre',  measuringUnit: 'metre' }

}

module.exports = { storeTypeCost, coverTypeCost, projectItemsCost }
