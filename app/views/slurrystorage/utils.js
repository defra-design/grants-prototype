const storeTypeCost = {
  earthBankedLagoon: { text: 'Earth-banked lagoon', value: 9000, formattedValue: '£9,000', hint: 'Item cost: £9,000' },
  linedLagoon: { text: 'Lined lagoon', value: 2100, formattedValue: '£2,100', hint: 'Item cost: £2,100' },
  aboveGroundCyclindralTank: { text: 'Above-ground cyclindral tank', value: 20250, formattedValue: '£20,250', hint: 'Item cost: £20,250' },
  insituConcreteStore: { text: 'In situ concrete store', value: 10000, formattedValue: '£10,000', hint: 'Item cost: £10,000' },
  precastConcreteStore: { text: 'Precast concrete store', value: 8000, formattedValue: '£8,000', hint: 'Item cost: £8,000' },
  undefloorSlattedStore: { text: 'Underfloor slatted store', value: 21500, formattedValue: '£21,500', hint: 'Item cost: £21,500' },
  alligatorBags: { text: 'Alligator bags', value: 5010, formattedValue: '£5,010', hint: 'Item cost: £5,010' }
}

const coverTypeCost = {
  fixedCoverLid: { text: 'Fixed cover or lid', value: 1000, formattedValue: '£1,000', hint: 'Item cost: £1,000' },
  fixedFloatingPlastic: { text: 'Fixed-floating plastic membrane', value: 2100, formattedValue: '£2,100', hint: 'Item cost: £2,100' },
  freeFloatingPlastic: { text: 'Reception tanks/pits', value: 3250, formattedValue: '£3,250', hint: 'Item cost: £3,250' }
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
