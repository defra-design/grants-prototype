const storeTypeCost = {
  aboveGroundSteelTank: { text: 'Above-ground steel tank', value: 20250, formattedValue: '£20,250', hint: 'Item cost: £22 per m<sup>3</sup>' },
  aboveGroundConcreteTank: { text: 'Above-ground concrete tank', value: 20250, formattedValue: '£20,250', hint: 'Item cost: £17 per m<sup>3</sup>' },
  insituConcreteStore: { text: 'Below-ground in-situ cast-reinforced concrete tank', value: 10000, formattedValue: '£10,000', hint: 'Item cost: £15 per m<sup>3</sup>' },
  earthBankedLagoon: { text: 'Earth-banked lagoon', value: 9000, formattedValue: '£9,000', hint: 'Item cost: £8 per m<sup>3</sup>' },
  linedLagoon: { text: 'Earth-bank lagoon (lined)', value: 2100, formattedValue: '£2,100', hint: 'Item cost: £12 per m<sup>3</sup>' },
  precastConcreteStore: { text: 'Stores using pre-cast rectangular concrete panels', value: 8000, formattedValue: '£8,000', hint: 'Item cost: £14 per m<sup>3</sup>' },
  alligatorBags: { text: 'Large-volume supported slurry bag', value: 5010, formattedValue: '£5,010', hint: 'Item cost: £20 per m<sup>3</sup>' },
  slattedFloorStores: { text: 'Slatted-floor stores', value: 21500, formattedValue: '£21,500', hint: 'Item cost: £14 per m<sup>3</sup>' }

}

const coverTypeCost = {
  rigidCoversConcreteStores: { text: 'Rigid covers for above-ground steel or concrete stores', value: 1000, formattedValue: '£1,000', hint: 'Item cost: £8 per m<sup>2</sup>' },
  fixedFlexibleCovers: { text: 'Fixed flexible covers for above-ground steel and concrete stores and earth-bank lagoons', value: 2100, formattedValue: '£2,100', hint: 'Item cost: £4 per m<sup>2</sup>' },
  freeFloatingPlastic: { text: 'Free-floating plastic cover', value: 3250, formattedValue: '£3,250', hint: 'Item cost: £3 per m<sup>2</sup>' }
}

const projectItemsCost = {
  agitator: { text: 'Agitator', value: 1000, formattedValue: '£1,000', hint: 'Item cost: £1,000' },
  underFloorStorage: { text: 'Under-floor storage and transfer channels', value: 2100, formattedValue: '£2,100', hint: 'Item cost: £2,100' },
  receptionTanksPits: { text: 'Reception tanks/pits', value: 3250, formattedValue: '£3,250', hint: 'Item cost: £3,250' },
  laddersPlatforms: { text: 'Ladders and platforms', value: 4550, formattedValue: '£4,550', hint: 'Item cost: £4,550' },
  agitatorPlatform: { text: 'Agitator platform', value: 3190, formattedValue: '£3,190', hint: 'Item cost: £3,190' },
  healthSafetyFeatures: { text: 'Health and safety features', value: 2440, formattedValue: '£2,440', hint: 'For example, gas monitor, tyre ladders<br/>Item cost: £2,440' }
}

module.exports = { storeTypeCost, coverTypeCost, projectItemsCost }
