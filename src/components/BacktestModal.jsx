import React from 'react';
import { History, CheckCircle, ArrowRight, ShieldAlert } from 'lucide-react';
import { CYCLONE_SCENARIOS } from '../data/mockData';

export const BacktestModal = ({
  isOpen,
  onClose,
  currentScenarioId,
  onSelectScenario
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ background: '#eff6ff', padding: '6px', borderRadius: '8px' }}>
              <History size={18} color="#2563eb" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', color: '#0f172a', margin: 0 }}>
                Historical Cyclone Backtest &amp; Scenario Simulator
              </h3>
              <div style={{ fontSize: '11px', color: '#64748b' }}>
                PRD §9 Milestone 6 | Validate SURGE against landmark Bay of Bengal storms
              </div>
            </div>
          </div>
          <button className="btn btn-secondary" onClick={onClose} style={{ padding: '2px 8px' }}>✕</button>
        </div>

        <div className="modal-body">
          <p style={{ fontSize: '0.82rem', color: '#475569', margin: 0 }}>
            Select a benchmark scenario to load historical satellite observations, storm surge tracks, and cascade predictions:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {CYCLONE_SCENARIOS.map((sc) => {
              const isSelected = sc.id === currentScenarioId;

              return (
                <div
                  key={sc.id}
                  onClick={() => {
                    onSelectScenario(sc);
                    onClose();
                  }}
                  style={{
                    background: isSelected ? '#eff6ff' : '#ffffff',
                    border: `1px solid ${isSelected ? '#2563eb' : '#cbd5e1'}`,
                    borderRadius: '8px',
                    padding: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? '0 0 0 2px rgba(37, 99, 235, 0.2)' : 'var(--shadow-sm)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <strong style={{ color: isSelected ? '#1e40af' : '#0f172a', fontSize: '0.98rem' }}>
                        {sc.name}
                      </strong>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>{sc.category}</div>
                    </div>
                    {isSelected ? (
                      <span className="badge badge-blue">Active Scenario</span>
                    ) : (
                      <button className="btn btn-secondary" style={{ padding: '3px 8px', fontSize: '11px' }}>
                        Load Scenario <ArrowRight size={12} />
                      </button>
                    )}
                  </div>

                  <p style={{ color: '#334155', fontSize: '0.82rem', margin: '4px 0 0', lineHeight: 1.45 }}>
                    {sc.description}
                  </p>
                  <div style={{ fontSize: '11px', color: '#b45309', marginTop: '6px', fontWeight: 600 }}>
                    <b>Landfall Outcome:</b> {sc.landfallEstimate}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
