import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { TelemetryBar } from './components/TelemetryBar';
import { DMODashboard } from './components/DMODashboard';
import { HazardSurgeLab } from './components/HazardSurgeLab';
import { CascadeGraphView } from './components/CascadeGraphView';
import { AdvisoryDispatchModule } from './components/AdvisoryDispatchModule';
import { DispatchAuditLog } from './components/DispatchAuditLog';
import { GroundTruthFeedback } from './components/GroundTruthFeedback';
import { OfflineOutboxModal } from './components/OfflineOutboxModal';
import { BacktestModal } from './components/BacktestModal';
import { AdminSettingsModal } from './components/AdminSettingsModal';
import { FutureScopeModal } from './components/FutureScopeModal';

import {
  PILOT_REGIONS,
  CYCLONE_SCENARIOS,
  INFRASTRUCTURE_NODES,
  INFRASTRUCTURE_EDGES,
  VULNERABILITY_ZONES,
  SEED_AUDIT_LOGS,
  UTILITY_ASSET_MATRIX,
  INITIAL_OFFLINE_OUTBOX
} from './data/mockData';
import { evaluateCascadeFailures } from './services/cascadeEngine';

export function App() {
  // Navigation & Role State
  const [activeRole, setActiveRole] = useState('DMO');
  const [activeTab, setActiveTab] = useState('dmo');

  // Pilot Region & Weather Feed State
  const [selectedRegion, setSelectedRegion] = useState(PILOT_REGIONS[0]);
  const [currentCyclone, setCurrentCyclone] = useState(CYCLONE_SCENARIOS[0]);
  const [stageKey, setStageKey] = useState('24h');
  const [metAgency, setMetAgency] = useState('IMD');

  // Network Connectivity State (PWA Simulation)
  const [isOffline, setIsOffline] = useState(false);
  const [outboxItems, setOutboxItems] = useState(INITIAL_OFFLINE_OUTBOX);

  // Core Data State
  const [nodes, setNodes] = useState(INFRASTRUCTURE_NODES);
  const [zones, setZones] = useState(VULNERABILITY_ZONES);
  const [selectedZone, setSelectedZone] = useState(VULNERABILITY_ZONES[0]);
  const [auditLogs, setAuditLogs] = useState(SEED_AUDIT_LOGS);
  const [utilityMatrix, setUtilityMatrix] = useState(UTILITY_ASSET_MATRIX);

  // Modals
  const [isOutboxOpen, setIsOutboxOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isBacktestOpen, setIsBacktestOpen] = useState(false);
  const [futureScopeType, setFutureScopeType] = useState(null);

  // Evaluate Infrastructure Cascades when Cyclone Stage or Cyclone Scenario changes
  useEffect(() => {
    const stage = currentCyclone.stages[stageKey] || currentCyclone.stages['24h'];
    const updated = evaluateCascadeFailures(
      INFRASTRUCTURE_NODES,
      INFRASTRUCTURE_EDGES,
      stage.surgePeakMeters,
      stage.maxWindKmph
    );
    setNodes(updated);
  }, [stageKey, currentCyclone]);

  // Synchronize Tab with Role when Role changes
  const handleRoleChange = (role) => {
    setActiveRole(role);
    if (role === 'DMO') setActiveTab('dmo');
    if (role === 'DISPATCHER') setActiveTab('advisories');
    if (role === 'UTILITY') setActiveTab('cascade-graph');
    if (role === 'ADMIN') setIsSettingsOpen(true);
  };

  // Authorize Evacuation Directive from DMO Dashboard
  const handleAuthorizeEvacuation = (zone) => {
    const randomHash = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const newLog = {
      id: `LOG-SURGE-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString(),
      cycloneId: currentCyclone.id,
      stage: stageKey,
      regionId: selectedRegion.id,
      zoneId: zone.id,
      zoneName: zone.name,
      channel: 'STATE EVACUATION MANDATE',
      language: 'English + Regional',
      recipientsCount: zone.populationTotal,
      approverName: 'Dr. Suresh Mishra, IAS',
      approverRole: 'District Disaster Management Officer (DMO)',
      signoffStatus: 'OFFICIALLY APPROVED & DISPATCHED',
      hashSha256: randomHash,
      status: 'Mandatory Directive Promulgated',
      preview: `Official Evacuation Mandate issued for ${zone.name}. Population ${zone.populationTotal.toLocaleString()} designated for immediate transit to concrete shelters.`
    };

    setAuditLogs([newLog, ...auditLogs]);
    alert(`EVACUATION DIRECTIVE AUTHORIZED FOR ${zone.name.toUpperCase()}!\n\nAudit Entry: ${newLog.id}\nSHA-256 Hash: ${randomHash.slice(0, 24)}...\n\nNow redirecting to Municipal Dispatcher to customize multilingual citizen advisories.`);
    setActiveTab('advisories');
  };

  // Add Dispatch Log
  const handleLogDispatch = (logEntry) => {
    setAuditLogs([logEntry, ...auditLogs]);
  };

  // Queue into Offline Outbox
  const handleQueueOutbox = (outboxItem) => {
    setOutboxItems([outboxItem, ...outboxItems]);
  };

  // Sync All Offline Outbox Items
  const handleSyncAllOutbox = () => {
    const newLogs = outboxItems.map(item => ({
      id: `LOG-SURGE-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString(),
      cycloneId: currentCyclone.id,
      stage: stageKey,
      regionId: selectedRegion.id,
      zoneId: selectedZone.id,
      zoneName: item.destination,
      channel: item.type,
      language: 'Odia / English',
      recipientsCount: 25000,
      approverName: 'Field Mobile Unit 04',
      approverRole: 'Rapid Response Team',
      signoffStatus: 'OFFICIALLY APPROVED & DISPATCHED',
      hashSha256: Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      status: 'Transmitted On Reconnect',
      preview: item.message
    }));

    setAuditLogs([...newLogs, ...auditLogs]);
    setOutboxItems([]);
    setIsOffline(false);
    alert('Network Handshake Re-established! All queued offline outbox messages successfully delivered through State Gateway.');
  };

  const handleClearOutboxItem = (id) => {
    setOutboxItems(outboxItems.filter(item => item.id !== id));
  };

  return (
    <div className="app-container">
      {/* 1. Master Navbar */}
      <Navbar
        activeRole={activeRole}
        setActiveRole={handleRoleChange}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        metAgency={metAgency}
        setMetAgency={setMetAgency}
        isOffline={isOffline}
        setIsOffline={setIsOffline}
        outboxCount={outboxItems.length}
        onOpenOutbox={() => setIsOutboxOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenBacktest={() => setIsBacktestOpen(true)}
        onOpenFutureScope={(type) => setFutureScopeType(type)}
      />

      {/* 2. Telemetry Bar & Module Tabs */}
      <TelemetryBar
        cyclone={currentCyclone}
        stageKey={stageKey}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenFutureScope={(type) => setFutureScopeType(type)}
      />

      {/* 3. Main Dynamic Content */}
      <main className="main-content">
        {activeTab === 'dmo' && (
          <DMODashboard
            region={selectedRegion}
            cyclone={currentCyclone}
            stageKey={stageKey}
            onChangeStage={setStageKey}
            nodes={nodes}
            zones={zones}
            selectedZone={selectedZone}
            setSelectedZone={setSelectedZone}
            onAuthorizeEvacuation={handleAuthorizeEvacuation}
            onNavigateToAdvisories={() => setActiveTab('advisories')}
          />
        )}

        {activeTab === 'hazard-lab' && (
          <HazardSurgeLab
            region={selectedRegion}
            cyclone={currentCyclone}
            stageKey={stageKey}
            metAgency={metAgency}
          />
        )}

        {activeTab === 'cascade-graph' && (
          <CascadeGraphView
            nodes={nodes}
            edges={INFRASTRUCTURE_EDGES}
            stageKey={stageKey}
            cyclone={currentCyclone}
            utilityMatrix={utilityMatrix}
            onPrePositionCrew={() => {}}
          />
        )}

        {activeTab === 'advisories' && (
          <AdvisoryDispatchModule
            region={selectedRegion}
            cyclone={currentCyclone}
            stageKey={stageKey}
            zones={zones}
            selectedZone={selectedZone}
            activeRole={activeRole}
            onLogDispatch={handleLogDispatch}
            isOffline={isOffline}
            onQueueOutbox={handleQueueOutbox}
          />
        )}

        {activeTab === 'audit-logs' && (
          <DispatchAuditLog logs={auditLogs} />
        )}

        {activeTab === 'ground-truth' && (
          <GroundTruthFeedback />
        )}
      </main>

      {/* Modals & Dialogs */}
      <OfflineOutboxModal
        isOpen={isOutboxOpen}
        onClose={() => setIsOutboxOpen(false)}
        outboxItems={outboxItems}
        onSyncAll={handleSyncAllOutbox}
        onClearItem={handleClearOutboxItem}
        isOffline={isOffline}
      />

      <BacktestModal
        isOpen={isBacktestOpen}
        onClose={() => setIsBacktestOpen(false)}
        currentScenarioId={currentCyclone.id}
        onSelectScenario={(scenario) => {
          setCurrentCyclone(scenario);
          setStageKey('24h');
        }}
      />

      <AdminSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        metAgency={metAgency}
        setMetAgency={setMetAgency}
      />

      <FutureScopeModal
        isOpen={Boolean(futureScopeType)}
        onClose={() => setFutureScopeType(null)}
        activeScopeType={futureScopeType}
      />
    </div>
  );
}

export default App;
