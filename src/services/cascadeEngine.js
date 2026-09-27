// Infrastructure Cascade Graph & Failure Propagation Engine
// Simulates secondary order failures (e.g. road submergence -> shelter isolation, power trip -> water pump failure)

export const evaluateCascadeFailures = (nodes, edges, currentSurgeMeters, currentWindKmph) => {
  const updatedNodes = nodes.map(node => {
    const updated = { ...node, directDamage: false, cascadeIsolated: false, powerLost: false };

    // Direct surge inundation check
    if (node.thresholdSurgeMeters && currentSurgeMeters >= node.thresholdSurgeMeters) {
      updated.directDamage = true;
      if (node.type === 'bridge') {
        updated.status = 'inundated-breached';
        updated.waterDepthOverDeck = (currentSurgeMeters - node.thresholdSurgeMeters + 0.3).toFixed(1);
      } else if (node.type === 'substation') {
        updated.status = 'critical-flooding';
      } else if (node.type === 'water') {
        updated.status = 'contaminated-inundated';
      }
    } else if (node.thresholdSurgeMeters && currentSurgeMeters >= node.thresholdSurgeMeters * 0.75) {
      updated.status = 'warning';
    } else {
      if (node.status !== 'isolated') {
        updated.status = 'operational';
      }
    }

    // Direct wind check
    if (node.windRatingKmph && currentWindKmph >= node.windRatingKmph) {
      updated.directDamage = true;
      updated.status = 'structural-failure';
    }

    return updated;
  });

  // Evaluate Graph Dependencies
  const nodeMap = new Map(updatedNodes.map(n => [n.id, n]));

  // 1. Power Dependency Propagation
  edges.filter(e => e.type === 'powers').forEach(edge => {
    const source = nodeMap.get(edge.from);
    const target = nodeMap.get(edge.to);
    if (source && target) {
      if (source.status === 'critical-flooding' || source.status === 'structural-failure') {
        target.powerLost = true;
        if (target.type === 'water') {
          target.status = 'power-cut-halted';
          target.cascadeDescription = `CASCADE: Tripped due to failure at parent substation ${source.name}. Pumps disabled.`;
        } else if (target.type === 'telecom') {
          target.status = 'running-on-battery';
          target.cascadeDescription = `Operating on auxiliary battery (${target.batteryHours}h remaining) after ${source.name} failure.`;
        }
      }
    }
  });

  // 2. Road Access & Isolation Propagation
  edges.filter(e => e.type === 'access-road').forEach(edge => {
    const sourceBridge = nodeMap.get(edge.from);
    const targetShelter = nodeMap.get(edge.to);
    if (sourceBridge && targetShelter) {
      if (sourceBridge.status === 'inundated-breached') {
        targetShelter.cascadeIsolated = true;
        targetShelter.isolated = true;
        targetShelter.status = 'isolated';
        targetShelter.isolationReason = `CASCADE ISOLATION: Arterial bridge ${sourceBridge.name} submerged by ${sourceBridge.waterDepthOverDeck || '1.2'}m surge. Terrestrial rescue vehicles cannot cross.`;
      }
    }
  });

  return Array.from(nodeMap.values());
};

// Generates Crew Pre-Positioning Recommendations
export const generateCrewRecommendations = (nodes, stageKey) => {
  const recommendations = [];

  const damagedBridges = nodes.filter(n => n.type === 'bridge' && (n.status === 'inundated-breached' || n.status === 'warning'));
  if (damagedBridges.length > 0) {
    recommendations.push({
      priority: 'CRITICAL',
      unit: 'ODRAF / Disaster Rapid Response Amphibious Crew',
      target: damagedBridges.map(b => b.name).join(', '),
      timeline: `${stageKey === '72h' ? 'Deploy by T-36h' : 'Deploy IMMEDIATELY'}`,
      action: 'Pre-position 4 motorized inflatable rescue boats and satellite comms on high-ground depot north of the causeway.'
    });
  }

  const atRiskSubstations = nodes.filter(n => n.type === 'substation' && (n.status === 'critical-flooding' || n.status === 'warning'));
  if (atRiskSubstations.length > 0) {
    recommendations.push({
      priority: 'HIGH',
      unit: 'Grid Energy Rapid Restoration Team',
      target: atRiskSubstations.map(s => s.name).join(', '),
      timeline: 'Complete sandbagging perimeter within 6 hours',
      action: 'Elevate mobile step-down transformers; stage dewatering diesel pumps on elevated masonry.'
    });
  }

  const atRiskWater = nodes.filter(n => n.type === 'water' && (n.powerLost || n.status === 'warning'));
  if (atRiskWater.length > 0) {
    recommendations.push({
      priority: 'HIGH',
      unit: 'Public Health Engineering Dept (PHEO)',
      target: atRiskWater.map(w => w.name).join(', '),
      timeline: 'Before T-12h',
      action: 'Dispatch 12 mobile water tankers to staging grounds in adjacent elevated talukas.'
    });
  }

  return recommendations;
};
