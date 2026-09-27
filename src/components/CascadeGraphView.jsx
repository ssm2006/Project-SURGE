import React, { useState } from 'react';
import {
  Network,
  Zap,
  AlertTriangle,
  Truck,
  Shield,
  LifeBuoy,
  CheckCircle,
  Building,
  Droplet,
  Radio,
  Sliders,
  ArrowRight
} from 'lucide-react';
import { generateCrewRecommendations } from '../services/cascadeEngine';

export const CascadeGraphView = ({
  nodes,
  edges,
  stageKey,
  cyclone,
  utilityMatrix,
  onPrePositionCrew
}) => {
  const [selectedAsset, setSelectedAsset] = useState(nodes[0]);

  const stage = cyclone.stages[stageKey] || cyclone.stages['24h'];
  const recommendations = generateCrewRecommendations(nodes, stageKey);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Banner: Utility Operator Command Header */}
      <div className="surge-card" style={{ background: '#fffbeb', borderColor: '#fde68a' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4px' }}>
              <Network size={20} color="#d97706" />
              <h2 style={{ fontSize: '1.2rem', color: '#92400e' }}>
                Infrastructure Cascade Failure Graph &amp; Utility Logistics Matrix
              </h2>
              <span className="badge badge-amber">FR-3.2 Interdependency Engine</span>
            </div>
            <p style={{ color: '#78350f', fontSize: '0.82rem', margin: 0 }}>
              Models power grid, arterial roads, telecom nodes, and medical shelters as a connected topological graph to flag second-order downstream failures.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="badge badge-red">
              <AlertTriangle size={12} />
              2 Critical Cascade Breaches Active
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Graph Visualization & Asset Matrix */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '1.5rem' }}>
        {/* Left: Interactive Topological Graph Canvas */}
        <div className="surge-card">
          <div className="card-header">
            <span className="card-title">
              <Network size={18} color="#2563eb" />
              Topological Interdependency Graph
            </span>
            <span style={{ fontSize: '11px', color: '#64748b' }}>Click any node to inspect cascade chain</span>
          </div>

          {/* Graphical Node Canvas */}
          <div style={{
            position: 'relative',
            height: '380px',
            background: '#f8fafc',
            backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            borderRadius: '10px',
            border: '1px solid #cbd5e1',
            overflow: 'hidden',
            padding: '1.5rem'
          }}>
            {/* SVG Connecting Edges */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
              {/* Edge: Substation Puri -> WTP */}
              <line x1="120" y1="90" x2="310" y2="90" stroke="#d97706" strokeWidth="2.5" strokeDasharray="4,4" />
              <text x="200" y="80" fill="#92400e" fontSize="10" fontWeight="bold">powers (33kV)</text>

              {/* Edge: Substation Puri -> District Hospital */}
              <line x1="120" y1="90" x2="120" y2="280" stroke="#059669" strokeWidth="2.5" />
              <text x="125" y="190" fill="#047857" fontSize="10" fontWeight="bold">aux backup</text>

              {/* Edge: Bridge Kushabhadra -> Shelter Konark */}
              <line x1="280" y1="280" x2="440" y2="280" stroke="#dc2626" strokeWidth="3.5" strokeDasharray="6,4" />
              <text x="320" y="270" fill="#b91c1c" fontSize="10" fontWeight="900">CUT-OFF BY SURGE</text>

              {/* Edge: Substation Konark -> Shelter Konark */}
              <line x1="440" y1="120" x2="440" y2="280" stroke="#ea580c" strokeWidth="2" strokeDasharray="3,3" />
              <text x="445" y="200" fill="#c2410c" fontSize="10" fontWeight="bold">tripped</text>
            </svg>

            {/* Node 1: Substation Puri */}
            <div
              onClick={() => setSelectedAsset(nodes.find(n => n.id === 'SUB-PURI-01') || nodes[0])}
              style={{
                position: 'absolute',
                left: '70px',
                top: '65px',
                background: '#ffffff',
                border: '2px solid #2563eb',
                borderRadius: '8px',
                padding: '8px 12px',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(37, 99, 235, 0.2)',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#1e3a8a' }}>⚡ SUB-PURI-01</div>
              <div style={{ fontSize: '10px', color: '#2563eb', fontWeight: 600 }}>132kV Main Grid</div>
            </div>

            {/* Node 2: Mangala WTP */}
            <div
              onClick={() => setSelectedAsset(nodes.find(n => n.id === 'WTP-01') || nodes[0])}
              style={{
                position: 'absolute',
                left: '270px',
                top: '65px',
                background: '#ffffff',
                border: '2px solid #d97706',
                borderRadius: '8px',
                padding: '8px 12px',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(217, 119, 6, 0.2)',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#92400e' }}>💧 WTP-01 (Mangala)</div>
              <div style={{ fontSize: '10px', color: '#b45309', fontWeight: 600 }}>Serves 160k Citizens</div>
            </div>

            {/* Node 3: District Hospital */}
            <div
              onClick={() => setSelectedAsset(nodes.find(n => n.id === 'HOSP-PURI-DIST') || nodes[0])}
              style={{
                position: 'absolute',
                left: '60px',
                top: '260px',
                background: '#ffffff',
                border: '2px solid #059669',
                borderRadius: '8px',
                padding: '8px 12px',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(5, 150, 105, 0.2)',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#065f46' }}>🏥 Puri Dist Hospital</div>
              <div style={{ fontSize: '10px', color: '#059669', fontWeight: 600 }}>Elevated (8.2m ASL)</div>
            </div>

            {/* Node 4: Kushabhadra Bridge (BREACHED) */}
            <div
              onClick={() => setSelectedAsset(nodes.find(n => n.id === 'BR-KUSHABHADRA') || nodes[0])}
              style={{
                position: 'absolute',
                left: '230px',
                top: '255px',
                background: '#fef2f2',
                border: '2px solid #dc2626',
                borderRadius: '8px',
                padding: '8px 12px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(220, 38, 38, 0.25)',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#991b1b' }}>🌉 BR-KUSHABHADRA</div>
              <div style={{ fontSize: '10px', color: '#dc2626', fontWeight: 900 }}>⚠️ INUNDATED (1.9m)</div>
            </div>

            {/* Node 5: Shelter Konark (ISOLATED) */}
            <div
              onClick={() => setSelectedAsset(nodes.find(n => n.id === 'SHELTER-KONARK-03') || nodes[0])}
              style={{
                position: 'absolute',
                right: '40px',
                top: '255px',
                background: '#fff7ed',
                border: '2px dashed #ea580c',
                borderRadius: '8px',
                padding: '8px 12px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(234, 88, 12, 0.2)',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#9a3412' }}>🏠 SHELTER-KONARK-03</div>
              <div style={{ fontSize: '10px', color: '#ea580c', fontWeight: 800 }}>⛔ CUT OFF &amp; ISOLATED</div>
            </div>

            {/* Node 6: Substation Konark */}
            <div
              onClick={() => setSelectedAsset(nodes.find(n => n.id === 'SUB-KONARK-02') || nodes[0])}
              style={{
                position: 'absolute',
                right: '40px',
                top: '80px',
                background: '#ffffff',
                border: '2px solid #ea580c',
                borderRadius: '8px',
                padding: '8px 12px',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(234, 88, 12, 0.2)',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#9a3412' }}>⚡ SUB-KONARK-02</div>
              <div style={{ fontSize: '10px', color: '#ea580c', fontWeight: 600 }}>Critical Flooding</div>
            </div>
          </div>

          {/* Selected Node Details Box */}
          {selectedAsset && (
            <div style={{
              marginTop: '1rem',
              background: '#f8fafc',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              padding: '0.85rem 1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <strong style={{ color: '#1e3a8a', fontSize: '0.95rem' }}>{selectedAsset.name}</strong>
                <span className="badge badge-amber">{selectedAsset.type.toUpperCase()}</span>
              </div>
              <div style={{ fontSize: '0.82rem', color: '#334155', lineHeight: 1.45 }}>
                <div><b>Failure State:</b> <span style={{ color: '#dc2626', fontWeight: 700 }}>{selectedAsset.status.toUpperCase()}</span></div>
                {selectedAsset.cascadeDescription && <div><b>Cascade Impact:</b> {selectedAsset.cascadeDescription}</div>}
                {selectedAsset.isolationReason && <div style={{ color: '#ea580c', fontWeight: 600 }}><b>Isolation Reason:</b> {selectedAsset.isolationReason}</div>}
                {selectedAsset.repairCrewAssigned && <div><b>Assigned Contingent:</b> {selectedAsset.repairCrewAssigned}</div>}
              </div>
            </div>
          )}
        </div>

        {/* Right: Pre-Positioning Recommendations & Dispatch Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Repair Crew Pre-Positioning Logistics */}
          <div className="surge-card">
            <div className="card-header">
              <span className="card-title">
                <Truck size={18} color="#059669" />
                Crew Pre-Positioning Directives
              </span>
              <span className="badge badge-blue">{recommendations.length} Directives</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {recommendations.map((rec, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '0.85rem',
                    fontSize: '0.82rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <b style={{ color: '#1e3a8a' }}>{rec.unit}</b>
                    <span className="badge badge-red" style={{ fontSize: '9px' }}>{rec.priority}</span>
                  </div>
                  <div style={{ color: '#b45309', fontSize: '0.78rem', fontWeight: 700 }}>
                    Target: {rec.target} ({rec.timeline})
                  </div>
                  <p style={{ color: '#334155', margin: '4px 0 0', lineHeight: 1.45 }}>
                    {rec.action}
                  </p>
                </div>
              ))}

              <button
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '0.5rem', padding: '0.65rem' }}
                onClick={() => alert('Logistics order transmitted to ODRAF Command Depot and Grid Operations Base.')}
              >
                <Truck size={16} />
                Transmit Pre-Positioning Orders
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Table: Utility Operator Ranked Asset Matrix */}
      <div className="surge-card">
        <div className="card-header">
          <span className="card-title">
            <Shield size={18} color="#d97706" />
            Ranked Critical Infrastructure Vulnerability Matrix (Top Priority Assets)
          </span>
          <span style={{ fontSize: '11px', color: '#64748b' }}>Sorted by Downstream Disruption Severity</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="surge-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Asset Identifier</th>
                <th>Infrastructure Class</th>
                <th>Vulnerability</th>
                <th>Surge Inundation Depth</th>
                <th>Downstream Population Affected</th>
                <th>Current Crew Staging</th>
              </tr>
            </thead>
            <tbody>
              {utilityMatrix.map(asset => (
                <tr key={asset.rank}>
                  <td><b style={{ color: '#dc2626' }}>#{asset.rank}</b></td>
                  <td><b>{asset.assetName}</b></td>
                  <td><span className="badge badge-gray">{asset.type}</span></td>
                  <td><b style={{ color: '#b45309' }}>{asset.vulnerabilityScore}/100</b></td>
                  <td style={{ color: '#b91c1c', fontWeight: 600 }}>{asset.surgeDepthRisk}</td>
                  <td style={{ color: '#334155' }}>{asset.downstreamImpact}</td>
                  <td><span className="badge badge-blue">{asset.crewStatus}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
