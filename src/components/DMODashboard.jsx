import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  Info,
  CheckCircle2,
  Navigation,
  Sparkles,
  Users,
  Home,
  Layers,
  ArrowRight,
  TrendingUp,
  FileText
} from 'lucide-react';
import { HazardMap } from './HazardMap';
import { TimelineScrubber } from './TimelineScrubber';
import { generateGeminiRationale } from '../services/geminiService';
import { ErrorBoundary } from './ErrorBoundary';

export const DMODashboard = ({
  region,
  cyclone,
  stageKey,
  onChangeStage,
  nodes,
  zones,
  selectedZone,
  setSelectedZone,
  onAuthorizeEvacuation,
  onNavigateToAdvisories
}) => {
  const [layerToggles, setLayerToggles] = useState({
    surge: true,
    cone: true,
    infra: true,
    roads: true,
    sar: true
  });

  const stage = cyclone.stages[stageKey] || cyclone.stages['24h'];
  const currentZone = selectedZone || zones[0];
  const rationale = generateGeminiRationale({
    cyclone,
    stageKey,
    zone: currentZone,
    cascadeNodes: nodes
  });

  const isolatedShelters = nodes.filter(n => n.type === 'shelter' && n.isolated);
  const breachedBridges = nodes.filter(n => n.type === 'bridge' && (n.status.includes('inundated') || n.status.includes('warning')));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* 72h / 48h / 24h Trajectory Timeline */}
      <TimelineScrubber
        stages={cyclone.stages}
        activeStageKey={stageKey}
        onChangeStage={onChangeStage}
      />

      {/* Main Grid: Left Map & Digital Twin, Right Decision Support & Gemini Rationale */}
      <div className="dashboard-grid">
        {/* Left Column: Digital Twin & Map Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="surge-card" style={{ padding: 0, overflow: 'hidden' }}>
            {/* Map Header with Layer Toggles */}
            <div style={{
              padding: '0.85rem 1.25rem',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#f8fafc',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <span className="pulse-dot blue"></span>
                <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>
                  Storm Digital Twin Hazard Surface — {region.name}
                </span>
                <span className="badge badge-gray">{stage.timestamp}</span>
              </div>

              {/* Layer Toggles */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', fontSize: '0.78rem', color: '#334155' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={layerToggles.surge}
                    onChange={(e) => setLayerToggles({ ...layerToggles, surge: e.target.checked })}
                    style={{ accentColor: '#dc2626' }}
                  />
                  <b>Surge Extent</b>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={layerToggles.cone}
                    onChange={(e) => setLayerToggles({ ...layerToggles, cone: e.target.checked })}
                    style={{ accentColor: '#2563eb' }}
                  />
                  <b>Track Cone</b>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={layerToggles.infra}
                    onChange={(e) => setLayerToggles({ ...layerToggles, infra: e.target.checked })}
                    style={{ accentColor: '#059669' }}
                  />
                  <b>Critical Nodes</b>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={layerToggles.roads}
                    onChange={(e) => setLayerToggles({ ...layerToggles, roads: e.target.checked })}
                    style={{ accentColor: '#d97706' }}
                  />
                  <b>Evacuation Roads</b>
                </label>
              </div>
            </div>

            {/* Map View with Basemap Switcher Built-in */}
            <ErrorBoundary>
              <HazardMap
                region={region}
                cyclone={cyclone}
                stageKey={stageKey}
                nodes={nodes}
                zones={zones}
                selectedZone={currentZone}
                onSelectZone={setSelectedZone}
                layerToggles={layerToggles}
              />
            </ErrorBoundary>
          </div>

          {/* Infrastructure Cascade Warning Banner */}
          <div className="surge-card" style={{ padding: '1rem 1.25rem', background: '#fef2f2', borderColor: '#fecaca' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <AlertTriangle size={20} color="#dc2626" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{ flex: 1, fontSize: '0.82rem' }}>
                <strong style={{ color: '#991b1b', display: 'block', marginBottom: '2px', fontSize: '0.88rem' }}>
                  INFRASTRUCTURE CASCADE ALARM — SECOND-ORDER ISOLATION DETECTED
                </strong>
                <p style={{ color: '#450a0a', margin: 0, lineHeight: 1.45 }}>
                  {isolatedShelters.length > 0
                    ? `SURGE Graph Engine flags that ${isolatedShelters.map(s => s.name).join(', ')} has become ISOLATED due to flood breach at Kushabhadra Bridge (NH-316). Terrestrial evacuation routes are cut off 14 hours ahead of landfall.`
                    : 'All secondary access corridors currently open. Model predicts bridge deck submergence at T-18h if surge exceeds 1.2m.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Explainable Risk Scoring & Gemini Reasoning */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Target Vulnerability Zone Selector */}
          <div className="surge-card">
            <div className="card-header">
              <span className="card-title">
                <Navigation size={18} color="#2563eb" />
                Vulnerability Assessment Zone
              </span>
              <span className="badge badge-blue">Priority #{currentZone.evacuationPriorityRank}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <select
                className="select-input"
                style={{ width: '100%', fontWeight: 600, fontSize: '0.88rem', padding: '0.55rem' }}
                value={currentZone.id}
                onChange={(e) => {
                  const z = zones.find(item => item.id === e.target.value);
                  if (z) setSelectedZone(z);
                }}
              >
                {zones.map(z => (
                  <option key={z.id} value={z.id}>
                    {z.name} (Risk: {z.compositeRiskScore}/100)
                  </option>
                ))}
              </select>

              {/* Composite Risk Score Metric Box */}
              <div className="score-display-box">
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#991b1b', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.04em' }}>
                    COMPOSITE RISK INDEX (H × V)
                  </div>
                  <div className="score-number">
                    {currentZone.compositeRiskScore}
                    <span style={{ fontSize: '1.2rem', color: '#991b1b', fontWeight: 600 }}>/100</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#dc2626', fontWeight: 700, marginTop: '2px' }}>
                    UNCERTAINTY BAND: {currentZone.confidenceBand}
                  </div>
                </div>

                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ fontSize: '0.72rem', color: '#991b1b', fontWeight: 600 }}>AT-RISK POPULATION</div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a' }}>
                    {currentZone.populationTotal.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#c2410c', fontWeight: 600 }}>
                    {currentZone.singleRoadAccess ? '⚠️ SINGLE ROAD ACCESS' : '✓ Multi-corridor'}
                  </div>
                </div>
              </div>

              {/* Demographic & Vulnerability Factor Breakdown */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', fontSize: '0.8rem' }}>
                <div style={{ background: '#fffbeb', padding: '0.75rem', borderRadius: '8px', border: '1px solid #fde68a' }}>
                  <div style={{ color: '#92400e', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                    <Home size={14} color="#d97706" /> Thatch / Kutcha Housing:
                  </div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#b45309', marginTop: '2px' }}>
                    {currentZone.informalHousingPct}%
                  </div>
                </div>

                <div style={{ background: '#eff6ff', padding: '0.75rem', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
                  <div style={{ color: '#1e40af', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                    <Users size={14} color="#2563eb" /> Elderly / Dependent:
                  </div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1d4ed8', marginTop: '2px' }}>
                    {currentZone.elderlyDisabledPct}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gemini 3.7 Flash Multimodal Reasoning & Explainable Rationale */}
          <div className="surge-card" style={{ borderColor: '#e9d5ff', background: '#faf5ff' }}>
            <div className="card-header" style={{ borderColor: '#e9d5ff' }}>
              <span className="card-title" style={{ color: '#6d28d9' }}>
                <Sparkles size={18} color="#7c3aed" />
                Gemini 3.7 Flash Explainable Rationale
              </span>
              <span className="badge badge-purple" style={{ fontSize: '10px' }}>AI Decision-Support</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.82rem', lineHeight: 1.5 }}>
              <div>
                <b style={{ color: '#1d4ed8' }}>Physical Hazard Driver:</b>
                <p style={{ color: '#334155', margin: '2px 0 0' }}>{rationale.physicsDriver}</p>
              </div>

              <div>
                <b style={{ color: '#b45309' }}>Social Equity Driver:</b>
                <p style={{ color: '#334155', margin: '2px 0 0' }}>{rationale.equityDriver}</p>
              </div>

              <div>
                <b style={{ color: '#b91c1c' }}>Infrastructure Bottleneck:</b>
                <p style={{ color: '#334155', margin: '2px 0 0' }}>{rationale.cascadeRisk}</p>
              </div>

              <div style={{
                background: '#ffffff',
                border: '1px solid #ddd6fe',
                borderRadius: '8px',
                padding: '0.85rem',
                marginTop: '4px',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <b style={{ color: '#5b21b6', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <FileText size={15} color="#7c3aed" /> Defensible Directive Recommendation:
                </b>
                <p style={{ color: '#1e1b4b', margin: '4px 0 0', fontWeight: 600 }}>
                  {rationale.defensibleDecision}
                </p>
              </div>
            </div>

            {/* DMO Action Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
              <button
                className="btn btn-danger"
                style={{ flex: 1, padding: '0.65rem 1rem' }}
                onClick={() => onAuthorizeEvacuation(currentZone)}
              >
                <ShieldAlert size={16} />
                Authorize Evacuation Directive
              </button>

              <button
                className="btn btn-primary"
                onClick={onNavigateToAdvisories}
                title="Draft & Dispatch Multilingual Advisories"
                style={{ padding: '0.65rem 1rem' }}
              >
                Draft Advisory
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
