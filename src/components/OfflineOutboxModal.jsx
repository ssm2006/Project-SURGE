import React from 'react';
import { WifiOff, Send, CheckCircle2, Clock, Trash2, RotateCcw } from 'lucide-react';

export const OfflineOutboxModal = ({
  isOpen,
  onClose,
  outboxItems,
  onSyncAll,
  onClearItem,
  isOffline
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ background: '#fef2f2', padding: '6px', borderRadius: '8px' }}>
              <WifiOff size={18} color="#dc2626" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', color: '#0f172a', margin: 0 }}>
                Field Responder Offline Outbox (PWA Cache)
              </h3>
              <div style={{ fontSize: '11px', color: '#64748b' }}>
                FR-5.3 Low-Connectivity Queue | Auto-transmits upon network handshake
              </div>
            </div>
          </div>
          <button className="btn btn-secondary" onClick={onClose} style={{ padding: '2px 8px' }}>✕</button>
        </div>

        <div className="modal-body">
          <div style={{
            background: isOffline ? '#fef2f2' : '#ecfdf5',
            border: `1px solid ${isOffline ? '#fecaca' : '#a7f3d0'}`,
            borderRadius: '8px',
            padding: '0.75rem 1rem',
            fontSize: '0.82rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}>
            <div>
              <b>Network Connectivity:</b>{' '}
              <span style={{ color: isOffline ? '#dc2626' : '#059669', fontWeight: 700 }}>
                {isOffline ? 'OFFLINE (Local IndexedDB Cache Active)' : 'ONLINE (Direct Gateway Connected)'}
              </span>
            </div>
            <span className="badge badge-gray">{outboxItems.length} Messages Queued</span>
          </div>

          {outboxItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem', color: '#64748b' }}>
              <CheckCircle2 size={36} color="#059669" style={{ margin: '0 auto 8px' }} />
              <div style={{ fontWeight: 700, color: '#334155' }}>All Field Dispatches Synchronized</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>No messages pending transmission in local outbox queue.</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {outboxItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '0.85rem',
                    fontSize: '0.82rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <b style={{ color: '#1e40af' }}>{item.destination}</b>
                    <span className="badge badge-amber" style={{ fontSize: '9px' }}>
                      <Clock size={10} /> {item.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>
                    Channel: {item.type} | Queued: {item.queuedAt.slice(11, 19)} IST
                  </div>
                  <p style={{ color: '#334155', margin: 0, fontSize: '0.8rem' }}>
                    "{item.message}"
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
                    <button
                      className="btn btn-secondary"
                      onClick={() => onClearItem(item.id)}
                      style={{ padding: '2px 6px', fontSize: '10px', color: '#dc2626' }}
                    >
                      <Trash2 size={12} /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          {outboxItems.length > 0 && (
            <button className="btn btn-primary" onClick={onSyncAll}>
              <RotateCcw size={15} />
              Transmit All Queued Messages Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
