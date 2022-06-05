const storeTypeCost = {
  aboveGroundSteelTank: { text: 'Above-ground steel tank', value: 20250, formattedValue: '£20,250', hint: 'Item cost: £22 per cubic metre' },
  aboveGroundConcreteTank: { text: 'Above-ground concrete tank', value: 20250, formattedValue: '£20,250', hint: 'Item cost: £17 per cubic metre' },
  insituConcreteStore: { text: 'Below-ground in-situ cast-reinforced concrete tank', value: 10000, formattedValue: '£10,000', hint: 'Item cost: £15 per cubic metre' },
  unlinedLagoon: { text: 'Earth-banked lagoon (unlined)', value: 9000, formattedValue: '£9,000', hint: 'Item cost: £8 per cubic metre' },
  linedLagoon: { text: 'Earth-bank lagoon (lined)', value: 2100, formattedValue: '£2,100', hint: 'Item cost: £12 per cubic metre' },
  precastConcreteStore: { text: 'Stores using pre-cast rectangular concrete panels', value: 8000, formattedValue: '£8,000', hint: 'Item cost: £14 per cubic metre' },
  alligatorBags: { text: 'Large-volume supported slurry bag', value: 5010, formattedValue: '£5,010', hint: 'Item cost: £20 per cubic metre' },
  slattedFloorStores: { text: 'Slatted-floor stores', value: 21500, formattedValue: '£21,500', hint: 'Item cost: £14 per cubic metre' }

}

const coverTypeCost = {
  rigidCoversConcreteStores: { text: 'Rigid covers for above-ground steel or concrete stores', value: 1000, formattedValue: '£1,000', hint: 'Item cost: £8 per square metre' },
  fixedFlexibleCovers: { text: 'Fixed flexible covers for above-ground steel and concrete stores and earth-bank lagoons', value: 2100, formattedValue: '£2,100', hint: 'Item cost: £4 per square metre' },
  freeFloatingPlastic: { text: 'Free-floating plastic cover', value: 3250, formattedValue: '£3,250', hint: 'Item cost: £3 per square metre' }
}

const projectItemsCost = {
  plasticGRP: { text: 'Glass-reinforced plastic (GRP) reception pit', value: 1000, formattedValue: '£1,000', hint: 'Item cost: £25 per cubic metre' },
  plasticReceptionPit: { text: 'Plastic reception pit', value: 2100, formattedValue: '£2,100', hint: 'Item cost: £26 per cubic metre' },
  concreteReceptionPits: { text: 'Pre-cast concrete reception pit', value: 3250, formattedValue: '£3,250', hint: 'Item cost: £27 per cubic metre' },
  insituConcreteReceptionPits: { text: 'In-situ cast-concrete reception pit', value: 4550, formattedValue: '£4,550', hint: 'Item cost: £30 per cubic metre' },
  slurryTransferPump: { text: 'Electric-powered slurry transfer pump', value: 1050, formattedValue: '£1,050', hint: 'Item cost: £1,050' },
  chopperPump: { text: 'Centrifugal chopper pump', value: 2090, formattedValue: '£2,090', hint: 'Item cost: £2,090' },
  steelPipework100: { text: 'Galvanised steel pipework 100mm diametre', value: 1100, formattedValue: '£1,100', hint: 'Item cost: £14 per metre' },
  steelPipework150: { text: 'Galvanised steel pipework 150mm diametre', value: 2300, formattedValue: '£2,300', hint: 'Item cost: £24 per metre' },
  transferChannels: { text: 'Under-floor transfer channels', value: 2650, formattedValue: '£2,650', hint: 'Item cost: £25 per metre' },
  tankWallMixers1200: { text: 'Tank wall mixers with tank capacity up to 1,200 cubic metre', value: 350, formattedValue: '£350', hint: 'Item cost: £350' },
  tankWallMixers8000: { text: 'Tank wall mixers with tank capacity up to 8,000 cubic metre', value: 1000, formattedValue: '£1,000', hint: 'Item cost: £1,000' },
  inspectionSteelTanks: { text: 'Inspection platform with ladder above-ground concrete and steel tanks', value: 800, formattedValue: '£800', hint: 'Item cost: £800' },
  safetyFencingStores: { text: 'Safety fencing for below-ground stores, earth-bank lagoons and slurry bags', value: 2400, formattedValue: '£2,400', hint: 'Item cost: £55 per metre' }

}

module.exports = { storeTypeCost, coverTypeCost, projectItemsCost }
