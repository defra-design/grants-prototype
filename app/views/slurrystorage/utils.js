const storeTypeCost = {
  earthBankedLagoon: { text: 'Earth-banked lagoon', value: 9000, hint: 'Item cost: £9,000' },
  linedLagoon: { text: 'Lined lagoon', value: 2100, hint: 'Item cost: £2,100' },
  aboveGroundCyclindralTank: { text: 'Above-ground cyclindral tank', value: 20250, hint: 'Item cost: £20,250' },
  insituConcreteStore: { text: 'In situ concrete store', value: 10000, hint: 'Item cost: £10,000' },
  precastConcreteStore: { text: 'Precast concrete store', value: 8000, hint: 'Item cost: £8,000' },
  undefloorSlattedStore: { text: 'Underfloor slatted store', value: 21500, hint: 'Item cost: £21,500' },
  alligatorBags: { text: 'AlligatorBags', value: 5010, hint: 'Item cost: £5,010' }
}

const coverTypeCost = {
  fixedCoverLid: { text: 'Fixed cover or lid', value: 1000, hint: 'Item cost: £1,000' },
  fixedFloatingPlastic: { text: 'Fixed-floating plastic membrane', value: 2100, hint: 'Item cost: £2,100' },
  freeFloatingPlastic: { text: 'Reception tanks/pits', value: 3250, hint: 'Item cost: £3,250' }
}

const projectItemsCost = {
  agitator: { text: 'Agitator', value: 1000, hint: 'Item cost: £1,000' },
  underFloorStorage: { text: 'Under-floor storage and transfer channels', value: 2100, hint: 'Item cost: £2,100' },
  receptionTanksPits: { text: 'Reception tanks/pits', value: 3250, hint: 'Item cost: £3,250' },
  laddersPlatforms: { text: 'Ladders and platforms', value: 4550, hint: 'Item cost: £4,550' },
  agitatorPlatform: { text: 'Agitator platform', value: 3190, hint: 'Item cost: £3,190' },
  healthSafetyFeatures: { text: 'Health and safety features', value: 2440, hint: 'For example, gas monitor, tyre ladders<br/>Item cost: £2,440' }
}

module.exports = { storeTypeCost, coverTypeCost, projectItemsCost }
