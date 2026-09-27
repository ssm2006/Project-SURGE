import React, { useState } from 'react';
import { Sliders, ShieldCheck, Database, Globe, Key, AlertTriangle } from 'lucide-react';

export const AdminSettingsModal = ({
  isOpen,
  onClose,
  metAgency,
  setMetAgency
}) => {
  const [autonomousDispatch, setAutonomousDispatch] = useState(false);
  const [surgeThreshold, setSurgeThreshold] = useState(2.0);
  const [windThreshold, setWindThreshold] = useState(130);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ background: '#eff6ff', padding: '6px', borderRadius: '8px' }}>
              <Sliders size={18} color="#2563eb" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', color: '#0f172a', margin: 0 }}>
                System Administration &amp; Threshold Configuration
              </h3>
              <div style={{ fontSize: '11px', color: '#64748b' }}>
                FR-8 Authority Settings | Ingestion Adapters &amp; Guardrails
              </div>
            </div>
          </div>
          <button className="btn btn-secondary" onClick={onClose} style={{ padding: '2px 8px' }}>✕</button>
        </div>

        <div className="modal-body">
          {/* Data Feeds */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e40af', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Database size={15} color="#2563eb" /> Upstream Meteorological Ingestion Pipeline
            </span>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', fontSize: '0.82rem' }}>
              <div>
                <label style={{ fontSize: '11px', color: '#475569', display: 'block', marginBottom: '3px', fontWeight: 600 }}>
                  ACTIVE REGIONAL MET ADAPTER:
                </label>
                <select
                  className="select-input"
                  style={{ width: '100%' }}
                  value={metAgency}
                  onChange={(e) => setMetAgency(e.target.value)}
                >
                  <option value="IMD">IMD API (India Meteorological Department)</option>
                  <option value="JTWC">JTWC (Joint Typhoon Warning Center)</option>
                  <option value="ECMWF">ECMWF Integrated Forecast System</option>
                  <option value="GEE-SAR">GEE Sentinel-1 SAR Live Pipeline</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '11px', color: '#475569', display: 'block', marginBottom: '3px', fontWeight: 600 }}>
                  INGESTION CADENCE (MINUTES):
                </label>
                <select className="select-input" style={{ width: '100%' }} defaultValue="15">
                  <option value="5">5 Minutes (Emergency Cycle)</option>
                  <option value="15">15 Minutes (Standard Cycle)</option>
                  <option value="60">60 Minutes (Normal Watch)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Thresholds */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginTop: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#b45309', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Sliders size={15} color="#d97706" /> Emergency Evacuation &amp; Payout Thresholds
            </span>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', fontSize: '0.82rem' }}>
              <div>
                <label style={{ fontSize: '11px', color: '#475569', display: 'block', marginBottom: '3px', fontWeight: 600 }}>
                  STORM SURGE MANDATE TRIGGER (METERS):
                </label>
                <input
                  type="number"
                  step="0.1"
                  className="text-input"
                  style={{ width: '100%' }}
                  value={surgeThreshold}
                  onChange={(e) => setSurgeThreshold(parseFloat(e.target.value))}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', color: '#475569', display: 'block', marginBottom: '3px', fontWeight: 600 }}>
                  WIND SPEED MANDATE TRIGGER (KM/H):
                </label>
                <input
                  type="number"
                  className="text-input"
                  style={{ width: '100%' }}
                  value={windThreshold}
                  onChange={(e) => setWindThreshold(parseInt(e.target.value))}
                />
              </div>
            </div>
          </div>

          {/* Autonomous Dispatch Toggle Guardrail */}
          <div style={{
            background: autonomousDispatch ? '#fef2f2' : '#f8fafc',
            border: `1px solid ${autonomousDispatch ? '#fecaca' : '#cbd5e1'}`,
            borderRadius: '8px',
            padding: '0.85rem',
            marginTop: '0.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle size={16} color={autonomousDispatch ? '#dc2626' : '#64748b'} />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: autonomousDispatch ? '#b91c1c' : '#1e293b' }}>
                  Autonomous Advisory Dispatch (Bypass Human Sign-Off)
                </span>
              </div>
              <input
                type="checkbox"
                checked={autonomousDispatch}
                onChange={(e) => setAutonomousDispatch(e.target.checked)}
                style={{ accentColor: '#dc2626', width: '16px', height: '16px', cursor: 'pointer' }}
              />
            </div>
            <p style={{ color: '#475569', fontSize: '11px', margin: 0, lineHeight: 1.45 }}>
              <b>Statutory Guardrail (§2.5):</b> Disabling human review allows AI to directly blast advisories to telecom gateways when threshold is breached. Requires explicit cabinet-level ministerial waiver.
            </p>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            {isSaved ? '✓ Settings Saved' : 'Save System Configuration'}
          </button>
        </div>
      </div>
    </div>
  );
};
