// Project SURGE — Data Layer & Geospatial Specifications
// Bay of Bengal & Coastal APAC Anticipatory Climate Action

export const PILOT_REGIONS = [
  {
    id: 'odisha-puri',
    name: 'Puri & Jagatsinghpur District',
    state: 'Odisha, India',
    country: 'India',
    center: [19.8135, 85.8312],
    zoom: 11,
    bounds: [
      [19.60, 85.65],
      [20.25, 86.45]
    ],
    populationAtRisk: '1,420,000',
    informalSettlementsPct: '34%',
    elderlyDependencyRatio: '14.2%',
    activeMetAgency: 'IMD (Bhubaneswar RMC)',
    defaultCyclone: 'cyclone-surge-24'
  },
  {
    id: 'bengal-sundarbans',
    name: 'Sundarbans Delta (South 24 Parganas)',
    state: 'West Bengal, India',
    country: 'India',
    center: [21.8500, 88.6000],
    zoom: 10,
    bounds: [
      [21.50, 88.10],
      [22.25, 89.10]
    ],
    populationAtRisk: '1,890,000',
    informalSettlementsPct: '48%',
    elderlyDependencyRatio: '16.5%',
    activeMetAgency: 'IMD (Kolkata RMC) & BMD',
    defaultCyclone: 'cyclone-amphan-backtest'
  },
  {
    id: 'bangladesh-coxsbazar',
    name: "Cox's Bazar & Teknaf Coast",
    state: 'Chittagong Division',
    country: 'Bangladesh',
    center: [21.4272, 92.0058],
    zoom: 11,
    bounds: [
      [20.80, 91.80],
      [21.75, 92.35]
    ],
    populationAtRisk: '2,150,000',
    informalSettlementsPct: '62%',
    elderlyDependencyRatio: '11.8%',
    activeMetAgency: 'BMD (Bangladesh Met Dept) & JTWC',
    defaultCyclone: 'cyclone-mocha-backtest'
  },
  {
    id: 'andhra-visakha',
    name: 'Visakhapatnam & Kakinada Coast',
    state: 'Andhra Pradesh, India',
    country: 'India',
    center: [17.6868, 83.2185],
    zoom: 11,
    bounds: [
      [17.40, 82.90],
      [18.10, 83.60]
    ],
    populationAtRisk: '1,680,000',
    informalSettlementsPct: '28%',
    elderlyDependencyRatio: '13.9%',
    activeMetAgency: 'IMD (Amaravati / JTWC)',
    defaultCyclone: 'cyclone-surge-24'
  }
];

export const CYCLONE_SCENARIOS = [
  {
    id: 'cyclone-surge-24',
    name: 'Cyclone SURGE (Active Forecast 2026)',
    category: 'Very Severe Cyclonic Storm (VSCS)',
    categoryCode: 'Cat 3 Equivalent',
    description: 'Active rapid intensification over Central Bay of Bengal moving NW towards Puri/Jagatsinghpur coastline.',
    landfallEstimate: 'Landfall projected in 26 hours near Astaranga / Devi River mouth.',
    isLive: true,
    stages: {
      '72h': {
        timestamp: 'T - 72 Hours',
        status: 'Depression stage over SE Bay of Bengal',
        centralPressure: 994,
        maxWindKmph: 75,
        forwardSpeedKmph: 18,
        surgePeakMeters: 0.8,
        rainfallForecastMm24h: 90,
        uncertaintyRadiusKm: 140,
        trackPoint: [16.80, 88.50],
        cone: [
          [15.5, 87.0], [17.2, 87.8], [18.4, 88.9], [19.8, 86.8], [19.2, 85.5], [17.5, 86.2], [16.0, 86.5]
        ],
        alertLevel: 'ADVISORY WATCH',
        evacuationPriority: 'Prepare multi-purpose cyclone shelters, inspect fuel reserves.',
        riskScorePuri: 42,
        riskScoreConfidence: '42 ± 9 (Moderate Uncertainty)'
      },
      '48h': {
        timestamp: 'T - 48 Hours',
        status: 'Severe Cyclonic Storm (Deep Convective Core)',
        centralPressure: 980,
        maxWindKmph: 125,
        forwardSpeedKmph: 16,
        surgePeakMeters: 1.9,
        rainfallForecastMm24h: 185,
        uncertaintyRadiusKm: 85,
        trackPoint: [18.10, 87.20],
        cone: [
          [16.8, 86.8], [18.2, 87.2], [19.4, 86.9], [20.1, 86.4], [19.7, 85.7], [18.8, 86.0], [17.6, 86.3]
        ],
        alertLevel: 'CYCLONE ALERT (YELLOW)',
        evacuationPriority: 'Order stage-1 pre-evacuation for kutcha huts within 2km of high-tide line.',
        riskScorePuri: 68,
        riskScoreConfidence: '68 ± 7 (High Confidence)'
      },
      '24h': {
        timestamp: 'T - 24 Hours',
        status: 'Very Severe Cyclonic Storm (Eye Formed)',
        centralPressure: 955,
        maxWindKmph: 165,
        forwardSpeedKmph: 14,
        surgePeakMeters: 3.4,
        rainfallForecastMm24h: 290,
        uncertaintyRadiusKm: 42,
        trackPoint: [19.15, 86.40],
        cone: [
          [18.4, 86.3], [19.1, 86.4], [19.8, 86.2], [20.0, 86.1], [19.7, 85.8], [19.2, 85.9], [18.6, 86.1]
        ],
        alertLevel: 'EVACUATION MANDATE (RED)',
        evacuationPriority: 'MANDATORY EVACUATION: 320,000 residents across Puri & Jagatsinghpur coastal belts.',
        riskScorePuri: 89,
        riskScoreConfidence: '89 ± 4 (Very High Confidence)'
      },
      '12h': {
        timestamp: 'T - 12 Hours',
        status: 'Landfall Imminent (Gale Force Outer Bands Engaging Shore)',
        centralPressure: 948,
        maxWindKmph: 180,
        forwardSpeedKmph: 15,
        surgePeakMeters: 4.2,
        rainfallForecastMm24h: 360,
        uncertaintyRadiusKm: 20,
        trackPoint: [19.55, 86.05],
        cone: [
          [19.2, 86.1], [19.5, 86.0], [19.9, 85.9], [19.8, 85.7], [19.4, 85.8]
        ],
        alertLevel: 'IMMEDIATE SHELTERING / CODE BLACK',
        evacuationPriority: 'All movement halted. Lock shelter gates. Utility grid controlled shut-off.',
        riskScorePuri: 96,
        riskScoreConfidence: '96 ± 2 (Extreme Precision)'
      }
    }
  },
  {
    id: 'cyclone-fani-backtest',
    name: 'Cyclone Fani (Historical Backtest May 2019)',
    category: 'Extremely Severe Cyclonic Storm (ESCS)',
    categoryCode: 'Cat 4-5 Peak',
    description: 'Historical benchmark backtest: Landfall south of Puri city with 215 km/h gusts. SURGE identifies Kushabhadra bridge isolation 38 hours earlier than standard IMD bulletins.',
    landfallEstimate: 'Landfall occurred May 3, 2019 near Puri at 08:00 IST.',
    isLive: false,
    stages: {
      '72h': {
        timestamp: 'Backtest T - 72h (April 30, 2019)',
        status: 'Intensifying over West-Central Bay',
        centralPressure: 978,
        maxWindKmph: 130,
        forwardSpeedKmph: 17,
        surgePeakMeters: 1.4,
        rainfallForecastMm24h: 120,
        uncertaintyRadiusKm: 120,
        trackPoint: [14.8, 85.2],
        cone: [[14.0, 84.5], [16.0, 85.0], [18.0, 85.5], [19.8, 85.8], [18.5, 84.8]],
        alertLevel: 'WATCH',
        evacuationPriority: 'SURGE AI flags 4 primary substations in Puri rural at flood risk.',
        riskScorePuri: 55,
        riskScoreConfidence: '55 ± 8'
      },
      '48h': {
        timestamp: 'Backtest T - 48h (May 1, 2019)',
        status: 'Extremely Severe Category Reached',
        centralPressure: 950,
        maxWindKmph: 185,
        forwardSpeedKmph: 15,
        surgePeakMeters: 3.1,
        rainfallForecastMm24h: 240,
        uncertaintyRadiusKm: 70,
        trackPoint: [16.9, 85.3],
        cone: [[16.0, 84.9], [17.5, 85.3], [19.2, 85.7], [20.0, 85.9], [18.5, 85.0]],
        alertLevel: 'RED WARNING',
        evacuationPriority: 'Infrastructure cascade algorithm flags Konark arterial highway submergence.',
        riskScorePuri: 84,
        riskScoreConfidence: '84 ± 5'
      },
      '24h': {
        timestamp: 'Backtest T - 24h (May 2, 2019)',
        status: 'Peak Intensity 205 km/h',
        centralPressure: 932,
        maxWindKmph: 215,
        forwardSpeedKmph: 16,
        surgePeakMeters: 4.8,
        rainfallForecastMm24h: 380,
        uncertaintyRadiusKm: 35,
        trackPoint: [18.6, 85.6],
        cone: [[18.0, 85.4], [19.0, 85.7], [19.8, 85.8], [19.5, 85.5]],
        alertLevel: 'CODE RED LANDFALL',
        evacuationPriority: 'Mass evacuation completed 14 hours ahead of actual storm impact.',
        riskScorePuri: 98,
        riskScoreConfidence: '98 ± 2'
      },
      '12h': {
        timestamp: 'Backtest T - 12h (May 3, 2019 02:00)',
        status: 'Coastline Impact',
        centralPressure: 935,
        maxWindKmph: 210,
        forwardSpeedKmph: 18,
        surgePeakMeters: 5.2,
        rainfallForecastMm24h: 420,
        uncertaintyRadiusKm: 15,
        trackPoint: [19.6, 85.8],
        cone: [[19.2, 85.7], [19.7, 85.8], [19.9, 85.9]],
        alertLevel: 'LANDFALL',
        evacuationPriority: 'Total shelter lockdown in effect.',
        riskScorePuri: 99,
        riskScoreConfidence: '99 ± 1'
      }
    }
  },
  {
    id: 'cyclone-amphan-backtest',
    name: 'Cyclone Amphan (Sundarbans Delta May 2020)',
    category: 'Super Cyclonic Storm (SuCS)',
    categoryCode: 'Super Cyclone',
    description: 'Historical backtest for West Bengal Sundarbans & South 24 Parganas delta islands. Demonstrates tidal embankment breach predictions.',
    landfallEstimate: 'Landfall May 20, 2020 over Sundarbans mangroves.',
    isLive: false,
    stages: {
      '72h': {
        timestamp: 'Backtest T - 72h (May 17, 2020)',
        status: 'Rapid intensification to Super Cyclone 260 km/h',
        centralPressure: 915,
        maxWindKmph: 240,
        forwardSpeedKmph: 12,
        surgePeakMeters: 2.2,
        rainfallForecastMm24h: 140,
        uncertaintyRadiusKm: 110,
        trackPoint: [13.4, 86.5],
        cone: [[13.0, 85.8], [16.0, 86.5], [19.5, 87.8], [21.8, 88.5]],
        alertLevel: 'WATCH',
        evacuationPriority: 'Boat-based island hamlets flagged for earliest evacuation.',
        riskScorePuri: 62,
        riskScoreConfidence: '62 ± 9'
      },
      '48h': {
        timestamp: 'Backtest T - 48h (May 18, 2020)',
        status: 'Extremely Severe Cyclonic Storm approaching North Bay',
        centralPressure: 930,
        maxWindKmph: 210,
        forwardSpeedKmph: 14,
        surgePeakMeters: 3.8,
        rainfallForecastMm24h: 260,
        uncertaintyRadiusKm: 65,
        trackPoint: [16.5, 86.9],
        cone: [[16.0, 86.5], [18.5, 87.2], [21.0, 88.2], [22.0, 88.6]],
        alertLevel: 'WARNING',
        evacuationPriority: 'Delta sluice gates and 14 earthen embankments prioritized for sandbagging.',
        riskScorePuri: 88,
        riskScoreConfidence: '88 ± 5'
      },
      '24h': {
        timestamp: 'Backtest T - 24h (May 19, 2020)',
        status: 'Weakening slightly but storm surge magnified by spring tide',
        centralPressure: 948,
        maxWindKmph: 175,
        forwardSpeedKmph: 18,
        surgePeakMeters: 5.0,
        rainfallForecastMm24h: 340,
        uncertaintyRadiusKm: 30,
        trackPoint: [19.8, 87.8],
        cone: [[19.2, 87.5], [20.8, 88.2], [21.9, 88.6]],
        alertLevel: 'EMERGENCY RED',
        evacuationPriority: 'Over 500,000 residents moved to elevated cyclone centers.',
        riskScorePuri: 97,
        riskScoreConfidence: '97 ± 3'
      },
      '12h': {
        timestamp: 'Backtest T - 12h (May 20, 2020)',
        status: 'Landfall near Bakkhali / Sagar Island',
        centralPressure: 955,
        maxWindKmph: 160,
        forwardSpeedKmph: 22,
        surgePeakMeters: 5.4,
        rainfallForecastMm24h: 390,
        uncertaintyRadiusKm: 12,
        trackPoint: [21.6, 88.4],
        cone: [[21.2, 88.2], [21.8, 88.5]],
        alertLevel: 'LANDFALL',
        evacuationPriority: 'Saline surge incursion inland up to 18 km.',
        riskScorePuri: 99,
        riskScoreConfidence: '99 ± 1'
      }
    }
  }
];

// Critical Infrastructure Node Map for Pilot Region (Puri / Odisha Coast)
export const INFRASTRUCTURE_NODES = [
  {
    id: 'SUB-PURI-01',
    name: 'Puri Grid Substation (132/33kV)',
    type: 'substation',
    coordinates: [19.8250, 85.8280],
    elevationMeters: 3.2,
    thresholdSurgeMeters: 1.8,
    status: 'at-risk',
    serves: ['WTP-01', 'TEL-TWR-01', 'HOSP-PURI-DIST'],
    replacementCost: '$3.4M',
    repairCrewAssigned: 'Crew Bravo (Staged at Khurda)',
    cascadeDescription: 'Failure cuts electricity to District Hospital and Central Water Pump.'
  },
  {
    id: 'SUB-KONARK-02',
    name: 'Konark Substation (33/11kV)',
    type: 'substation',
    coordinates: [19.8920, 86.0940],
    elevationMeters: 2.1,
    thresholdSurgeMeters: 1.4,
    status: 'critical-flooding',
    serves: ['SHELTER-KONARK-03', 'TEL-TWR-03'],
    replacementCost: '$1.2M',
    repairCrewAssigned: 'Crew Alpha (Pre-positioned Gop)',
    cascadeDescription: 'Submersion shuts down 4 secondary multi-purpose cyclone shelters.'
  },
  {
    id: 'BR-KUSHABHADRA',
    name: 'Kushabhadra River Causeway Bridge (NH-316)',
    type: 'bridge',
    coordinates: [19.8700, 85.9800],
    elevationMeters: 1.5,
    thresholdSurgeMeters: 1.2,
    status: 'inundated-breached',
    connects: ['SHELTER-ASTARANGA-04', 'SHELTER-KONARK-03'],
    cascadeDescription: 'CASCADE FAILURE: Bridge flooding isolates 3,800 coastal residents from District HQ.'
  },
  {
    id: 'BR-BHARGAVI-02',
    name: 'Bhargavi Siphon Road Culvert',
    type: 'bridge',
    coordinates: [19.8350, 85.8600],
    elevationMeters: 2.4,
    thresholdSurgeMeters: 2.0,
    status: 'warning',
    connects: ['SHELTER-PURI-01', 'SUB-PURI-01'],
    cascadeDescription: 'Emergency evacuation bottleneck if water level exceeds 2.0m.'
  },
  {
    id: 'SHELTER-PURI-01',
    name: 'Puri Town Multi-Purpose Cyclone Shelter',
    type: 'shelter',
    coordinates: [19.8050, 85.8150],
    capacity: 2500,
    currentOccupancy: 1820,
    generatorBackupHours: 72,
    status: 'operational',
    elevationMeters: 6.5,
    medicalStaff: '4 Doctors, 8 Paramedics',
    isolated: false
  },
  {
    id: 'SHELTER-KONARK-03',
    name: 'Chandrabhaga Beach Cyclone Shelter',
    type: 'shelter',
    coordinates: [19.8850, 86.1150],
    capacity: 1800,
    currentOccupancy: 1450,
    generatorBackupHours: 24,
    status: 'isolated',
    elevationMeters: 2.8,
    medicalStaff: '1 Doctor, 2 Nurses',
    isolated: true,
    isolationReason: 'Cut off by Kushabhadra Bridge inundation. Air-lift or amphibious boat required.'
  },
  {
    id: 'SHELTER-ASTARANGA-04',
    name: 'Astaranga Fishery Cyclone Shelter',
    type: 'shelter',
    coordinates: [19.9820, 86.2650],
    capacity: 2200,
    currentOccupancy: 2100,
    generatorBackupHours: 36,
    status: 'high-risk',
    elevationMeters: 3.1,
    medicalStaff: '2 Doctors, 4 Nurses',
    isolated: true,
    isolationReason: 'Devi River estuary surge cutting off approach road MDR-54.'
  },
  {
    id: 'HOSP-PURI-DIST',
    name: 'Puri District Headquarters Hospital',
    type: 'hospital',
    coordinates: [19.8150, 85.8220],
    capacity: 450,
    currentOccupancy: 380,
    generatorBackupHours: 96,
    status: 'operational-elevated',
    elevationMeters: 8.2,
    icuBeds: 28,
    isolated: false
  },
  {
    id: 'WTP-01',
    name: 'Mangala Water Treatment & Booster Plant',
    type: 'water',
    coordinates: [19.8320, 85.8450],
    capacityMld: 45,
    servesPopulation: 160000,
    elevationMeters: 2.3,
    status: 'warning',
    thresholdSurgeMeters: 1.5,
    cascadeDescription: 'Loss of power trips pumps; drinking water reserves limited to 18 hours.'
  },
  {
    id: 'TEL-TWR-01',
    name: 'BSNL / Airtel Coastal Microwave Tower 12',
    type: 'telecom',
    coordinates: [19.8600, 86.0200],
    windRatingKmph: 175,
    batteryHours: 18,
    status: 'warning',
    coverageRadiusKm: 14,
    cascadeDescription: 'If tower fails, Cell Broadcast delivery to 28 hamlets will drop to 0%.'
  }
];

// Infrastructure Graph Edges (Dependencies)
export const INFRASTRUCTURE_EDGES = [
  { from: 'SUB-PURI-01', to: 'WTP-01', type: 'powers', critical: true },
  { from: 'SUB-PURI-01', to: 'HOSP-PURI-DIST', type: 'powers', critical: true },
  { from: 'SUB-PURI-01', to: 'TEL-TWR-01', type: 'powers', critical: false },
  { from: 'SUB-KONARK-02', to: 'SHELTER-KONARK-03', type: 'powers', critical: true },
  { from: 'BR-KUSHABHADRA', to: 'SHELTER-KONARK-03', type: 'access-road', critical: true },
  { from: 'BR-KUSHABHADRA', to: 'SHELTER-ASTARANGA-04', type: 'access-road', critical: true },
  { from: 'BR-BHARGAVI-02', to: 'SHELTER-PURI-01', type: 'access-road', critical: false }
];

// Equity-Weighted Vulnerability Zones
export const VULNERABILITY_ZONES = [
  {
    id: 'ZONE-A1',
    name: 'Astaranga & Devi Estuary Fisherfolk Belt',
    coordinates: [19.98, 86.26],
    hazardSeverity: 94,
    socialVulnerability: 92,
    compositeRiskScore: 93,
    confidenceInterval: '93 ± 4',
    confidenceBand: 'High Confidence (89-97)',
    populationTotal: 48500,
    informalHousingPct: 76,
    elderlyDisabledPct: 18.4,
    singleRoadAccess: true,
    evacuationPriorityRank: 1,
    leadTimeHoursNeeded: 18,
    nearestShelter: 'SHELTER-ASTARANGA-04',
    rationale: 'Ranked Priority #1: Extreme hazard (3.8m surge + 165 km/h wind) overlaps with 76% thatch/mud kutcha dwellings and a single coastal road (MDR-54) that breaches 14 hours before landfall. Pre-evacuation must be authorized immediately.',
    advisoryTarget: 'All residents of Ward 1 to 8 in Astaranga block.'
  },
  {
    id: 'ZONE-B2',
    name: 'Chandrabhaga & Konark Coastal Strip',
    coordinates: [19.89, 86.10],
    hazardSeverity: 88,
    socialVulnerability: 85,
    compositeRiskScore: 87,
    confidenceInterval: '87 ± 5',
    confidenceBand: 'High Confidence (82-92)',
    populationTotal: 34200,
    informalHousingPct: 62,
    elderlyDisabledPct: 16.1,
    singleRoadAccess: true,
    evacuationPriorityRank: 2,
    leadTimeHoursNeeded: 14,
    nearestShelter: 'SHELTER-KONARK-03',
    rationale: 'Ranked Priority #2: Kushabhadra causeway flood will isolate this strip within 6 hours. Over 1,200 non-motorized fishing families require government transport support before road inundation reaches 0.5m.',
    advisoryTarget: 'Chandrabhaga Marine Drive fishing hamlets and eco-villages.'
  },
  {
    id: 'ZONE-C3',
    name: 'Puri Urban Lowlands & Baliapanda',
    coordinates: [19.80, 85.82],
    hazardSeverity: 82,
    socialVulnerability: 68,
    compositeRiskScore: 76,
    confidenceInterval: '76 ± 6',
    confidenceBand: 'Moderate Confidence (70-82)',
    populationTotal: 112000,
    informalHousingPct: 38,
    elderlyDisabledPct: 13.8,
    singleRoadAccess: false,
    evacuationPriorityRank: 3,
    leadTimeHoursNeeded: 10,
    nearestShelter: 'SHELTER-PURI-01',
    rationale: 'Ranked Priority #3: High population density and urban waterlogging risk. Multiple evacuation avenues exist via Grand Road and NH-316, but ground-floor kutcha tenements in Baliapanda must be cleared.',
    advisoryTarget: 'Baliapanda, Pentakota fish market, and Chakra Tirtha lowlands.'
  },
  {
    id: 'ZONE-D4',
    name: 'Brahmagiri & Chilika Northern Spit',
    coordinates: [19.78, 85.68],
    hazardSeverity: 74,
    socialVulnerability: 72,
    compositeRiskScore: 73,
    confidenceInterval: '73 ± 7',
    confidenceBand: 'Moderate Confidence (66-80)',
    populationTotal: 29800,
    informalHousingPct: 58,
    elderlyDisabledPct: 15.2,
    singleRoadAccess: true,
    evacuationPriorityRank: 4,
    leadTimeHoursNeeded: 12,
    nearestShelter: 'Brahmagiri Block Office Cyclone Center',
    rationale: 'Ranked Priority #4: Lagoon backwater inundation will submerge salt pans and prawn enclosures. Single access causeway at risk of tidal surge backflow.',
    advisoryTarget: 'Sipasarubali, Brahmagiri panchayat and Satapada feeder hamlets.'
  }
];

// Multilingual Advisory Templates Drafted by Gemini 3.7 Flash Engine
export const MULTILINGUAL_ADVISORIES = {
  'odisha-puri': {
    english: {
      title: 'URGENT: Pre-Landfall Evacuation Advisory for Coastal Puri',
      sms: 'SURGE ALERT: Severe Cyclone approaching Puri coast in 24h. Storm surge 3.4m predicted. Residents in kutcha houses move to Chandrabhaga/Astaranga Shelters NOW. Free food/medical aid ready. Call 1077 for emergency transport.',
      whatsapp: `🚨 *PROJECT SURGE — OFFICIAL CYCLONE EVACUATION ADVISORY*
*Target:* Coastal Puri & Jagatsinghpur Blocks (Wards 1-8)
*Threat:* Very Severe Cyclone 'SURGE' | Wind: 165 km/h | Surge: 3.4m
*Evacuation Window:* 06:00 IST to 14:00 IST Today

⚠️ *Immediate Action:*
1. All residents in thatched/kutcha dwellings must shift immediately to your assigned concrete shelter.
2. Nearest Shelter: *Chandrabhaga Cyclone Center* (Map: https://surge.gov/s/konark)
3. Kushabhadra Bridge will close due to flooding at 15:00 IST. Do NOT delay.
4. Keep emergency kit: Aadhaar/docs in plastic pouch, 3-day medicine, phone torch.

📞 District Control Room: *1077* | Odisha Disaster Rapid Action Force (ODRAF): *112*`,
      cellBroadcast: 'EMERGENCY ALERT: MANDATORY EVACUATION for Puri Coastal Belt. Storm surge hazard high. Proceed to nearest cyclone shelter before 14:00. Call 1077 for help. - Govt of Odisha',
      ivrScript: 'Attention, this is an urgent emergency cyclone bulletin from the District Disaster Management Authority. A severe cyclone will strike the Puri coastline within 24 hours with dangerous 3-meter sea waves. Please evacuate immediately to the nearest Cyclone Shelter. Transport buses are stationed at the Gram Panchayat office. Press 1 to request pickup assistance, or call 1077.'
    },
    odia: {
      title: 'ଜରୁରୀକାଳୀନ ସୂଚନା: ପୁରୀ ଉପକୂଳବାସୀଙ୍କ ପାଇଁ ବାତ୍ୟା ସ୍ଥାନାନ୍ତର ନିର୍ଦ୍ଦେଶନାମା',
      sms: 'ସର୍ଜ୍ ସତର୍କତା: ୨୪ ଘଣ୍ଟା ମଧ୍ୟରେ ପୁରୀ ଉପକୂଳରେ ଭୟଙ୍କର ବାତ୍ୟା ଓ ୩.୪ ମିଟର ଜୁଆର ଆଶଙ୍କା। କଚ୍ଚା ଘରେ ଥିବା ଲୋକେ ତୁରନ୍ତ ନିକଟସ୍ଥ ବାତ୍ୟା ଆଶ୍ରୟସ୍ଥଳୀକୁ ଯାଆନ୍ତୁ। ମାଗଣା ଖାଦ୍ୟ ଓ ଚିକିତ୍ସା ବ୍ୟବସ୍ଥା ଉପଲବ୍ଧ। ସାହାଯ୍ୟ ପାଇଁ ୧୦୭୭ ଡାଏଲ କରନ୍ତୁ।',
      whatsapp: `🚨 *ପ୍ରକଳ୍ପ ସର୍ଜ୍ (SURGE) — ସରକାରୀ ବାତ୍ୟା ସ୍ଥାନାନ୍ତରଣ ନିର୍ଦ୍ଦେଶନାମା*
*ଅଞ୍ଚଳ:* ପୁରୀ ଏବଂ ଜଗତସିଂହପୁର ଉପକୂଳ ପଞ୍ଚାୟତ
*ବିପଦ ସ୍ତର:* ଅତି ଭୀଷଣ ବାତ୍ୟା 'SURGE' | ପବନ: ୧୬୫ କିମି/ଘଣ୍ଟା | ସାମୁଦ୍ରିକ ଜୁଆର: ୩.୪ ମିଟର
*ସ୍ଥାନାନ୍ତର ସମୟସୀମା:* ଆଜି ଅପରାହ୍ନ ୨:୦୦ ଟା ପୂର୍ବରୁ

⚠️ *ଜରୁରୀ ପଦକ୍ଷେପ:*
୧. କଚ୍ଚା କିମ୍ବା ଆଜବେଷ୍ଟସ ଘରେ ରହୁଥିବା ସମସ୍ତ ପରିବାର ତୁରନ୍ତ ପକ୍କା ବାତ୍ୟା ଆଶ୍ରୟସ୍ଥଳୀକୁ ଯାଆନ୍ତୁ।
୨. ନିକଟସ୍ଥ ଆଶ୍ରୟସ୍ଥଳୀ: *ଚନ୍ଦ୍ରଭାଗା ଏବଂ ଅସ୍ତରଙ୍ଗ ବାତ୍ୟା ଆଶ୍ରୟ କେନ୍ଦ୍ର*।
୩. କୁଶଭଦ୍ରା ପୋଲ ପାଣିରେ ବୁଡ଼ିବା ଆଶଙ୍କା ଥିବାରୁ ଅପରାହ୍ନ ୩ଟା ପରେ ଯାତାୟାତ ବନ୍ଦ ରହିବ।
୪. ଆବଶ୍ୟକ ଔଷଧ, ଆଧାର କାର୍ଡ ଓ ଜରୁରୀ କାଗଜପତ୍ର ପଲିଥିନ ବ୍ୟାଗରେ ସାଙ୍ଗରେ ରଖନ୍ତୁ।

📞 ଜିଲ୍ଲା ଜରୁରୀକାଳୀନ କଣ୍ଟ୍ରୋଲ ରୁମ୍: *୧୦୭୭* | ଆମ୍ବୁଲାନ୍ସ / ପୋଲିସ: *୧୧୨*`,
      cellBroadcast: 'ଜରୁରୀ ଚେତାବନୀ: ପୁରୀ ଉପକୂଳ ପାଇଁ ବାଧ୍ୟତାମୂଳକ ସ୍ଥାନାନ୍ତର ନିର୍ଦ୍ଦେଶ। ୩.୪ ମିଟର ଜୁଆର ଆଶଙ୍କା। ତୁରନ୍ତ ବାତ୍ୟା ଆଶ୍ରୟସ୍ଥଳୀକୁ ଯାଆନ୍ତୁ। ହେଲ୍ପଲାଇନ: ୧୦୭୭ - ଓଡ଼ିଶା ସରକାର',
      ivrScript: 'ନମସ୍କାର, ଏହା ଜିଲ୍ଲା ବିପର୍ଯ୍ୟୟ ପରିଚାଳନା କର୍ତ୍ତୃପକ୍ଷଙ୍କ ତରଫରୁ ଏକ ଜରୁରୀ ବାତ୍ୟା ସତର୍କତା। ଆଗାମୀ ୨୪ ଘଣ୍ଟା ମଧ୍ୟରେ ପୁରୀ ଉପକୂଳରେ ଭୟଙ୍କର ବାତ୍ୟା ମାଡ଼ ହେବାକୁ ଯାଉଛି। ଦୟାକରି କୌଣସି ବିଳମ୍ବ ନକରି ନିକଟସ୍ଥ ବାତ୍ୟା ଆଶ୍ରୟସ୍ଥଳକୁ ଚାଲିଯାଆନ୍ତୁ। ସାହାଯ୍ୟ ଗାଡ଼ି ପାଇଁ ୧ ଦବାନ୍ତୁ କିମ୍ବା ୧୦୭୭ ରେ କଲ୍ କରନ୍ତୁ।'
    },
    bengali: {
      title: 'জরুরি সতর্কতা: উপকূলবর্তী পুরী ও সুন্দরবন অঞ্চলের জন্য ঘূর্ণিঝড় নির্দেশিকা',
      sms: 'সার্জ সতর্কতা: ২৪ ঘণ্টার মধ্যে উপকূলে আছড়ে পড়বে প্রবল ঘূর্ণিঝড়। ৩.৪ মিটার জলোচ্ছ্বাসের আশঙ্কা। মাটির বাড়ির বাসিন্দারা এখনই নিকটবর্তী সাইক্লোন শেল্টারে যান। বিনামূল্যে খাদ্য ও চিকিৎসার ব্যবস্থা আছে। ফোন: ১০৭৭।',
      whatsapp: `🚨 *প্রজেক্ট সার্জ (SURGE) — জরুরি ঘূর্ণিঝড় স্থানান্তর বিজ্ঞপ্তি*
*এলাকা:* পুরী ও উপকূলীয় অঞ্চল
*ঝড়ের তীব্রতা:* ১৬৫ কিমি/ঘণ্টা | জলোচ্ছ্বাস: ৩.৪ মিটার
*স্থানান্তরের সময়সীমা:* আজ দুপুর ২:০০ টার মধ্যে

⚠️ *করণীয়:*
১. কাঁচা ও টিনের বাড়ির বাসিন্দারা অবিলম্বে নিকটবর্তী পাকা সাইক্লোন সেন্টারে আশ্রয় নিন।
২. দুপুর ৩টার পর কুশভদ্রা ব্রিজ প্লাবিত হয়ে যোগাযোগ বিচ্ছিন্ন হতে পারে।
৩. জরুরি নথি, ওষুধ ও টর্চ সঙ্গে রাখুন।

📞 কন্ট্রোল রুম: *১০৭৭* | জরুরি হেল্পলাইন: *১১২*`,
      cellBroadcast: 'জরুরি সতর্কতা: উপকূলীয় এলাকার জন্য বাধ্যতামূলক স্থানান্তর নির্দেশ। ৩.৪ মিটার জলোচ্ছ্বাসের আশঙ্কা। অবিলম্বে শেল্টারে যান। হেল্পলাইন: ১০৭৭',
      ivrScript: 'নমস্কার, জেলা বিপর্যয় মোকাবিলা দপ্তরের পক্ষ থেকে জরুরি বার্তা। আগামী ২৪ ঘণ্টায় উপকূলে প্রবল ঘূর্ণিঝড় আঘাত হানবে। অনুগ্রহ করে এখনই নিকটস্থ বহুমুখী আশ্রয়কেন্দ্রে চলে যান। গাড়ির সুবিধার জন্য ১ টিপুন অথবা ১০৭৭ এ ফোন করুন।'
    },
    telugu: {
      title: 'అత్యవసర హెచ్చరిక: తీరప్రాంత ప్రజలకు ముందస్తు తుఫాను తరలింపు ఉత్తర్వులు',
      sms: 'సర్జ్ అలర్ట్: 24 గంటల్లో తీవ్ర తుఫాను తీరాన్ని తాకనుంది. 3.4 మీటర్ల ఎత్తులో సముద్రపు అలలు. పూరిళ్లు, రేకుల ఇళ్లలో ఉండేవారు వెంటనే సురక్షిత తుఫాను పునరావాస కేంద్రాలకు వెళ్లండి. ఉచిత ఆహారం, వైద్యం సిద్ధం. సహాయం కోసం 1077 కి కాల్ చేయండి.',
      whatsapp: `🚨 *ప్రాజెక్ట్ సర్జ్ (SURGE) — అధికారిక తుఫాను తరలింపు హెచ్చరిక*
*ప్రాంతం:* తీరప్రాంత మండలాలు
*తుఫాను తీవ్రత:* గంటకు 165 కి.మీ గాలులు | 3.4 మీటర్ల సముద్రపు ఉప్పెన
*తరలింపు గడువు:* ఈరోజు మధ్యాహ్నం 2:00 లోపు

⚠️ *చేయవలసిన పనులు:*
1. బలహీనమైన ఇళ్లలో ఉన్నవారు వెంటనే ప్రభుత్వం ఏర్పాటు చేసిన తుఫాను షెల్టర్లకు చేరండి.
2. రహదారులు నీటమునిగే ప్రమాదం ఉంది, ఆలస్యం చేయవద్దు.
3. ముఖ్యమైన పత్రాలు, మందులు మరియు తాగునీరు వెంట ఉంచుకోండి.

📞 జిల్లా కంట్రోల్ రూమ్: *1077* | టోల్ ఫ్రీ: *112*`,
      cellBroadcast: 'అత్యవసర హెచ్చరిక: తీరప్రాంతం ఖాళీ చేసి సురక్షిత ప్రాంతాలకు వెళ్లండి. 3.4 మీటర్ల అలల ప్రమాదం. హెల్ప్‌లైన్: 1077',
      ivrScript: 'నమస్కారం, ఇది విపత్తు నిర్వహణ శాఖ అత్యవసర హెచ్చరిక. రాబోయే 24 గంటల్లో తీవ్ర తుఫాను తీరాన్ని తాకనుంది. దయచేసి వెంటనే సమీపంలోని తుఫాను సహాయ కేంద్రానికి చేరుకోండి. రవాణా సహాయం కొరకు 1 నొక్కండి లేదా 1077 కు కాల్ చేయండి.'
    },
    tamil: {
      title: 'அவசர எச்சரிக்கை: கடலோர பகுதிகளுக்கான புயல் வெளியேற்ற உத்தரவு',
      sms: 'சர்ஜ் எச்சரிக்கை: 24 மணி நேரத்தில் அதிதீவிர புயல் கரையை கடக்கும். 3.4 மீட்டர் கடல் அலைகள் எழக்கூடும். உடனே பாதுகாப்பான புயல் நிவாரண முகாம்களுக்கு செல்லவும். உதவிக்கு 1077 அழைக்கவும்.',
      whatsapp: `🚨 *ப்ராஜெக்ட் சர்ஜ் (SURGE) — அவசர புயல் பாதுகாப்பு வழிகாட்டுதல்*
*காற்று வேகம்:* மணிக்கு 165 கி.மீ | கடல் சீற்றம்: 3.4 மீட்டர்
*வெளியேறும் நேரம்:* இன்று மதியம் 2:00 மணிக்குள்

⚠️ *முக்கிய அறிவுரைகள்:*
1. குடிசை மற்றும் பலவீனமான வீடுகளில் உள்ளவர்கள் உடனே புயல் பாதுகாப்பு மையங்களுக்கு செல்லவும்.
2. தேவையான மருந்துகள் மற்றும் முக்கிய ஆவணங்களை பாதுகாப்பாக எடுத்துச் செல்லவும்.

📞 அவசர கட்டுப்பாட்டு அறை: *1077* | அவசர எண்: *112*`,
      cellBroadcast: 'அவசர எச்சரிக்கை: உடனடியாக பாதுகாப்பான புயல் முகாம்களுக்கு செல்லவும். உதவி எண்: 1077',
      ivrScript: 'வணக்கம், இது பேரிடர் மேலாண்மை துறையின் அவசர செய்தி. அடுத்த 24 மணி நேரத்தில் புயல் கரையை கடக்க உள்ளதால் பொதுமக்கள் உடனே பாதுகாப்பு மையங்களுக்கு செல்லுமாறு கேட்டுக்கொள்ளப்படுகிறார்கள்.'
    },
    hindi: {
      title: 'अति आवश्यक चेतावनी: तटीय क्षेत्रों के लिए पूर्व-चक्रवात निकासी परामर्श',
      sms: 'सर्ज अलर्ट: अगले 24 घंटे में अत्यंत भीषण चक्रवात और 3.4 मीटर तूफानी लहरों का खतरा। कच्चे घरों के निवासी तुरंत नजदीकी चक्रवात आश्रय स्थल जाएं। भोजन व चिकित्सा व्यवस्था तैयार। मदद हेतु 1077 मिलाएं।',
      whatsapp: `🚨 *प्रोजेक्ट सर्ज (SURGE) — आधिकारिक चक्रवात निकासी निर्देश*
*क्षेत्र:* पुरी एवं तटीय ब्लॉक
*खतरा:* अति भीषण चक्रवात 'SURGE' | हवा: 165 किमी/घंटा | समुद्री लहरें: 3.4 मीटर
*निकासी समय:* आज दोपहर 2:00 बजे तक अनिवार्य

⚠️ *तत्काल निर्देश:*
1. कच्चे और कमजोर मकानों में रहने वाले लोग तुरंत पक्के चक्रवात शेल्टर में शरण लें।
2. 3 बजे के बाद कुशभद्रा पुल जलमग्न होने से संपर्क कट जाएगा।
3. जरूरी दवाइयां, दस्तावेज और टॉर्च साथ रखें।

📞 नियंत्रण कक्ष: *1077* | आपातकालीन सेवा: *112*`,
      cellBroadcast: 'आपातकालीन चेतावनी: तटीय इलाकों को तुरंत खाली कर शेल्टर में पहुंचे। 3.4 मीटर तूफानी लहरों का खतरा। हेल्पलाइन: 1077',
      ivrScript: 'नमस्कार, यह जिला आपदा प्रबंधन प्राधिकरण का आपातकालीन संदेश है। अगले 24 घंटों में भीषण चक्रवात आने की संभावना है। कृपया तुरंत अपने नजदीकी चक्रवात आश्रय स्थल पहुंचें। वाहन सहायता के लिए 1 दबाएं या 1077 पर संपर्क करें।'
    }
  }
};

// Dispatch Audit Log (Tamper-Evident History)
export const SEED_AUDIT_LOGS = [
  {
    id: 'LOG-SURGE-9081',
    timestamp: '2026-09-26T22:15:30+05:30',
    cycloneId: 'cyclone-surge-24',
    stage: 'T-24h',
    regionId: 'odisha-puri',
    zoneId: 'ZONE-A1',
    zoneName: 'Astaranga & Devi Estuary Fisherfolk Belt',
    channel: 'WhatsApp Sandbox + SMS Gateway',
    language: 'Odia (ଓଡ଼ିଆ)',
    recipientsCount: 48500,
    approverName: 'Dr. Suresh Mishra, IAS',
    approverRole: 'District Disaster Management Officer (DMO), Puri',
    signoffStatus: 'OFFICIALLY APPROVED & DISPATCHED',
    hashSha256: '9f8a3d7b82c1e405a69f0b12c8e39210ad749e312bc90a41d08e923e1fca9401',
    status: 'Delivered (98.4% confirmation)',
    preview: 'ସର୍ଜ୍ ସତର୍କତା: ୨୪ ଘଣ୍ଟା ମଧ୍ୟରେ ପୁରୀ ଉପକୂଳରେ ଭୟଙ୍କର ବାତ୍ୟା ଓ ୩.୪ ମିଟର ଜୁଆର ଆଶଙ୍କା...'
  },
  {
    id: 'LOG-SURGE-9079',
    timestamp: '2026-09-26T21:40:12+05:30',
    cycloneId: 'cyclone-surge-24',
    stage: 'T-24h',
    regionId: 'odisha-puri',
    zoneId: 'ZONE-B2',
    zoneName: 'Chandrabhaga & Konark Coastal Strip',
    channel: 'Cell Broadcast Alert (National Protocol)',
    language: 'English + Odia',
    recipientsCount: 34200,
    approverName: 'R. K. Patnaik, OAS',
    approverRole: 'Municipal Commissioner & Dispatcher',
    signoffStatus: 'OFFICIALLY APPROVED & DISPATCHED',
    hashSha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    status: 'Broadcast Acknowledged by 14 Towers',
    preview: 'EMERGENCY ALERT: MANDATORY EVACUATION for Puri Coastal Belt. Storm surge hazard high...'
  }
];

// Utility Operator Matrix (At-Risk Assets Ranking)
export const UTILITY_ASSET_MATRIX = [
  {
    rank: 1,
    assetId: 'BR-KUSHABHADRA',
    assetName: 'Kushabhadra River Causeway Bridge (NH-316)',
    type: 'Bridge & Arterial Highway',
    vulnerabilityScore: 98,
    surgeDepthRisk: '1.9m above bridge deck at high tide',
    downstreamImpact: 'Isolates 3,800 residents in Konark Zone B2 & Shelter-03',
    recommendedAction: 'Pre-position ODRAF rescue boats and amphibious vehicles at Gop depot prior to T-20h.',
    crewStatus: 'Crew Alpha Staged (4 Boats, 12 Personnel)'
  },
  {
    rank: 2,
    assetId: 'SUB-KONARK-02',
    assetName: 'Konark Substation (33/11kV)',
    type: 'Power Distribution Substation',
    vulnerabilityScore: 94,
    surgeDepthRisk: 'Inundation risk 1.4m inside switchyard',
    downstreamImpact: 'Loss of power to Chandrabhaga water lift pumps and telecom tower',
    recommendedAction: 'Execute safe de-energization at T-10h. Elevate mobile 250kVA diesel gen-sets on plinths.',
    crewStatus: 'Power Crew 02 Deployed with sandbags'
  },
  {
    rank: 3,
    assetId: 'SUB-PURI-01',
    assetName: 'Puri Grid Substation (132/33kV)',
    type: 'Transmission Substation',
    vulnerabilityScore: 86,
    surgeDepthRisk: 'Saline spray flashover and drainage backflow (0.8m)',
    downstreamImpact: 'Risk of district hospital switching to emergency generator',
    recommendedAction: 'Inspect silicon insulators; ensure 4,000L diesel fuel reserves locked at District Hospital.',
    crewStatus: 'Standby at Khurda Grid HQ'
  },
  {
    rank: 4,
    assetId: 'WTP-01',
    assetName: 'Mangala Water Treatment & Booster Plant',
    type: 'Potable Water Infrastructure',
    vulnerabilityScore: 82,
    surgeDepthRisk: 'Brackish water contamination of intake well if surge reaches 2.1m',
    downstreamImpact: 'Potable water shortage for 160,000 citizens in Puri town',
    recommendedAction: 'Fill elevated balancing reservoirs to 100% capacity before T-16h.',
    crewStatus: 'PHEO Engineering Team on 24h vigil'
  }
];

// Post-Event Ground Truth Calibration Dataset (FR-7)
export const GROUND_TRUTH_DATASET = [
  {
    id: 'GT-01',
    location: 'Astaranga Fishing Harbor',
    reportedBy: 'Field Inspector Das, Revenue Dept',
    timeObserved: 'Landfall + 4 hours',
    predictedSurgeMeters: 3.4,
    actualSurgeMeters: 3.6,
    deltaMeters: '+0.2m (Model Underestimated by 5.8%)',
    predictedRoadCut: true,
    actualRoadCut: true,
    cascadeConfirmed: 'Bridge flooded at T-8h as predicted. Shelter isolated.',
    notes: 'Saline inundation reached 850m inland. GEE SAR calibration recommended roughness factor +0.02.',
    photoUrl: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'GT-02',
    location: 'Konark Sun Temple Buffer Basin',
    reportedBy: 'ODRAF Rescue Unit 4',
    timeObserved: 'Landfall + 2 hours',
    predictedSurgeMeters: 2.1,
    actualSurgeMeters: 1.9,
    deltaMeters: '-0.2m (Model Overestimated by 9.5%)',
    predictedRoadCut: true,
    actualRoadCut: true,
    cascadeConfirmed: 'Substation-02 switchyard water ingress managed with sandbags.',
    notes: 'Sand dunes acted as natural barrier; update coastal elevation bathymetry.',
    photoUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=600&q=80'
  }
];

// Offline Outbox Queue (Field PWA)
export const INITIAL_OFFLINE_OUTBOX = [
  {
    id: 'OUTBOX-01',
    destination: 'Gram Panchayat Sipasarubali',
    recipientPhone: '+91 94370 12890',
    type: 'SMS Queue',
    message: 'SURGE ALERT: Bus 04 en route to hamlet for elderly evacuation. Stand by at school ground.',
    queuedAt: '2026-09-26T23:10:00+05:30',
    status: 'Pending Reconnect'
  },
  {
    id: 'OUTBOX-02',
    destination: 'Astaranga Jetty Fishermen Union',
    recipientPhone: '+91 98610 55432',
    type: 'WhatsApp Queue',
    message: 'Tidal surge rising rapidly near river mouth. Pull all remaining fiber boats 200m past high watermark immediately.',
    queuedAt: '2026-09-26T23:18:00+05:30',
    status: 'Pending Reconnect'
  }
];
