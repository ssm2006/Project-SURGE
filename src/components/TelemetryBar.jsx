import React, { useState, useEffect } from 'react';
import {
  Compass,
  Gauge,
  Wind,
  Waves,
  Clock,
  AlertTriangle,
  Radio,
  Share2,
  FileCheck2,
  Network,
  Activity,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const TelemetryBar = ({
  cyclone,
  stageKey,
  activeTab,
  setActiveTab,
  onOpenFutureScope
}) => {
  const [currentTime, setCurrentTime] = useState(new Date().toUTCString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toUTCString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const stage = cyclone.stages[stageKey] || cyclone.stages['24h'];

  return (
    <>
      {/* Live Telemetry Strip */}
      <div className="telemetry-bar">
        <div className="telemetry-inner">
          <div className="telemetry-items">
            <div className="telemetry-item" style={{ background: '#fef2f2', borderColor: '#fecaca' }}>
              <span className="pulse-dot red"></span>
              <span className="telemetry-label" style={{ color: '#991b1b' }}>ALERT LEVEL:</span>
              <span className="telemetry-value" style={{ color: '#b91c1c' }}>{stage.alertLevel}</span>
            </div>

            <div className="telemetry-item" style={{ background: '#eff6ff', borderColor: '#bfdbfe' }}>
              <span className="telemetry-label" style={{ color: '#1e40af' }}>CYCLONE:</span>
              <span className="telemetry-value" style={{ color: '#1d4ed8' }}>{cyclone.name}</span>
              <span className="badge badge-red" style={{ fontSize: '10px', padding: '1px 5px' }}>{cyclone.categoryCode}</span>
            </div>

            <div className="telemetry-item">
              <Wind size={15} color="#2563eb" />
              <span className="telemetry-label">SUSTAINED WIND:</span>
              <span className="telemetry-value">{stage.maxWindKmph} km/h ({(stage.maxWindKmph / 1.852).toFixed(0)} kts)</span>
            </div>

            <div className="telemetry-item">
              <Waves size={15} color="#ea580c" />
              <span className="telemetry-label">STORM SURGE:</span>
              <span className="telemetry-value" style={{ color: '#ea580c' }}>{stage.surgePeakMeters}m Inundation</span>
            </div>

            <div className="telemetry-item">
              <Gauge size={15} color="#475569" />
              <span className="telemetry-label">PRESSURE:</span>
              <span className="telemetry-value">{stage.centralPressure} hPa</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.78rem', color: '#64748b' }}>
            <Clock size={14} color="#64748b" />
            <span className="mono" style={{ fontWeight: 600, color: '#334155' }}>{currentTime.slice(17, 25)} UTC</span>
            <span className="badge badge-gray" style={{ fontWeight: 700 }}>LEAD-TIME: {stageKey.toUpperCase()}</span>
          </div>
        </div>
      </div>

      {/* Main Module Navigation Tabs */}
      <nav className="view-nav">
        <div className="view-nav-inner">
          <button
            className={`nav-tab-btn ${activeTab === 'dmo' ? 'active' : ''}`}
            onClick={() => setActiveTab('dmo')}
          >
            <Radio size={16} />
            DMO Commander Dashboard
          </button>

          <button
            className={`nav-tab-btn ${activeTab === 'hazard-lab' ? 'active' : ''}`}
            onClick={() => setActiveTab('hazard-lab')}
          >
            <Layers size={16} />
            Hazard &amp; GEE Surge Lab
          </button>

          <button
            className={`nav-tab-btn ${activeTab === 'cascade-graph' ? 'active' : ''}`}
            onClick={() => setActiveTab('cascade-graph')}
          >
            <Network size={16} />
            Infrastructure Cascade &amp; Utility Matrix
          </button>

          <button
            className={`nav-tab-btn ${activeTab === 'advisories' ? 'active' : ''}`}
            onClick={() => setActiveTab('advisories')}
          >
            <Sparkles size={16} />
            Multilingual AI Advisories &amp; Dispatch
          </button>

          <button
            className={`nav-tab-btn ${activeTab === 'audit-logs' ? 'active' : ''}`}
            onClick={() => setActiveTab('audit-logs')}
          >
            <FileCheck2 size={16} />
            Dispatch Audit Ledger
          </button>

          <button
            className={`nav-tab-btn ${activeTab === 'ground-truth' ? 'active' : ''}`}
            onClick={() => setActiveTab('ground-truth')}
          >
            <Activity size={16} />
            Ground-Truth &amp; Recalibration (FR-7)
          </button>

          {/* Future Scope Tabs as requested by User Prompt */}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <button
              className="nav-tab-btn future-scope-tab"
              onClick={() => onOpenFutureScope('citizen')}
              title="Citizen direct subscription module (Designated Future Scope)"
            >
              <Share2 size={14} />
              Citizen Portal (Future Scope)
            </button>

            <button
              className="nav-tab-btn future-scope-tab"
              onClick={() => onOpenFutureScope('insurer')}
              title="Parametric insurance early payout trigger engine (Designated Future Scope)"
            >
              <ExternalLink size={14} />
              NGO / Insurer Liquidity (Future Scope)
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};
