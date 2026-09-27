import React from 'react';
import {
  Waves,
  ShieldAlert,
  Radio,
  Zap,
  Sliders,
  Wifi,
  WifiOff,
  CloudRain,
  History,
  Send,
  Building,
  Users,
  BadgeAlert,
  MapPin
} from 'lucide-react';
import { PILOT_REGIONS } from '../data/mockData';

export const Navbar = ({
  activeRole,
  setActiveRole,
  selectedRegion,
  setSelectedRegion,
  metAgency,
  setMetAgency,
  isOffline,
  setIsOffline,
  outboxCount,
  onOpenOutbox,
  onOpenSettings,
  onOpenBacktest,
  onOpenFutureScope
}) => {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Brand Identity */}
        <div className="nav-brand">
          <div className="nav-logo-icon">
            <Waves size={22} />
          </div>
          <div className="brand-text">
            <h1>
              Project SURGE
              <span className="badge badge-blue" style={{ fontSize: '10px', padding: '1px 6px' }}>v1.0 Production</span>
            </h1>
            <div className="brand-subtitle">
              Storm Understanding &amp; Resilience Guidance Engine | Anticipatory Action
            </div>
          </div>
        </div>

        {/* Center Controls: Region & Upstream Met Feed */}
        <div className="nav-controls">
          {/* Region Selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 700, letterSpacing: '0.04em' }}>PILOT JURISDICTION</span>
            <select
              className="select-input"
              value={selectedRegion.id}
              onChange={(e) => {
                const reg = PILOT_REGIONS.find(r => r.id === e.target.value);
                if (reg) setSelectedRegion(reg);
              }}
            >
              {PILOT_REGIONS.map(reg => (
                <option key={reg.id} value={reg.id}>
                  📍 {reg.name} ({reg.state})
                </option>
              ))}
            </select>
          </div>

          {/* Upstream Met Ingestion Feed */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 700, letterSpacing: '0.04em' }}>MET INGESTION FEED</span>
            <select
              className="select-input"
              value={metAgency}
              onChange={(e) => setMetAgency(e.target.value)}
            >
              <option value="IMD">IMD (India Met Dept — Pune/RMC)</option>
              <option value="JTWC">JTWC (Joint Typhoon Warning Center)</option>
              <option value="ECMWF">ECMWF Integrated Forecast System</option>
              <option value="GEE-SAR">GEE Sentinel-1 SAR Multi-orbit</option>
            </select>
          </div>

          {/* Role Switcher */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 700, letterSpacing: '0.04em' }}>OPERATIONAL ROLE</span>
            <select
              className="select-input"
              style={{ fontWeight: 600, color: '#1d4ed8', borderColor: '#bfdbfe', background: '#eff6ff' }}
              value={activeRole}
              onChange={(e) => setActiveRole(e.target.value)}
            >
              <option value="DMO">🛡️ Disaster Management Officer</option>
              <option value="DISPATCHER">📢 Municipal Dispatcher</option>
              <option value="UTILITY">⚡ Power &amp; Road Utility Operator</option>
              <option value="ADMIN">⚙️ System Administrator</option>
            </select>
          </div>

          {/* Historical Backtest Quick Switch */}
          <button
            className="btn btn-secondary"
            onClick={onOpenBacktest}
            title="Backtest against historical cyclones (Fani, Amphan, Mocha)"
            style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem', marginTop: '14px' }}
          >
            <History size={14} />
            Backtest Scenarios
          </button>

          {/* Offline PWA Toggle */}
          <button
            className={`btn ${isOffline ? 'btn-danger' : 'btn-secondary'}`}
            onClick={() => setIsOffline(!isOffline)}
            title="Simulate low-connectivity field responder offline mode"
            style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem', marginTop: '14px' }}
          >
            {isOffline ? <WifiOff size={14} /> : <Wifi size={14} />}
            {isOffline ? 'Offline Active' : 'Live Online'}
          </button>

          {/* Outbox Badge */}
          <button
            className="btn btn-secondary"
            onClick={onOpenOutbox}
            style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem', position: 'relative', marginTop: '14px' }}
          >
            <Send size={14} />
            Outbox
            {outboxCount > 0 && (
              <span style={{
                background: '#dc2626',
                color: '#fff',
                borderRadius: '9999px',
                padding: '1px 6px',
                fontSize: '10px',
                fontWeight: 800
              }}>
                {outboxCount}
              </span>
            )}
          </button>

          {/* Settings */}
          <button
            className="btn btn-secondary"
            onClick={onOpenSettings}
            title="System & Model Calibration Settings"
            style={{ padding: '0.45rem 0.65rem', marginTop: '14px' }}
          >
            <Sliders size={16} />
          </button>
        </div>
      </div>
    </header>
  );
};
