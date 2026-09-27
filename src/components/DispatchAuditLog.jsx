import React, { useState } from 'react';
import {
  FileCheck2,
  Search,
  Download,
  ShieldCheck,
  ExternalLink,
  Filter,
  CheckCircle2,
  Hash
} from 'lucide-react';

export const DispatchAuditLog = ({ logs }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLog, setSelectedLog] = useState(null);

  const filteredLogs = logs.filter(log =>
    log.zoneName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.approverName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.channel?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.hashSha256?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportCSV = () => {
    const headers = ['Log ID', 'Timestamp', 'Cyclone', 'Stage', 'Target Zone', 'Channel', 'Language', 'Recipients', 'Approver', 'SHA-256 Hash', 'Status'];
    const rows = filteredLogs.map(l => [
      l.id,
      l.timestamp,
      l.cycloneId,
      l.stage,
      `"${l.zoneName}"`,
      l.channel,
      l.language,
      l.recipientsCount,
      `"${l.approverName}"`,
      l.hashSha256,
      l.status
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SURGE_Dispatch_Audit_Log_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Banner */}
      <div className="surge-card" style={{ background: '#ecfdf5', borderColor: '#a7f3d0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4px' }}>
              <ShieldCheck size={20} color="#059669" />
              <h2 style={{ fontSize: '1.2rem', color: '#065f46' }}>
                Tamper-Evident Dispatch &amp; Action Audit Ledger
              </h2>
              <span className="badge badge-emerald">SRS §5.4 Regulatory Compliant</span>
            </div>
            <p style={{ color: '#047857', fontSize: '0.82rem', margin: 0 }}>
              Immutable chronological record of every warning bulletin, evacuation directive, approving official, and delivery verification hash.
            </p>
          </div>

          <button className="btn btn-secondary" onClick={handleExportCSV} style={{ fontSize: '0.82rem' }}>
            <Download size={14} />
            Export Audit Ledger (CSV)
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="surge-card" style={{ padding: '0.85rem 1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, maxWidth: '440px' }}>
            <Search size={16} color="#64748b" />
            <input
              type="text"
              placeholder="Search by officer name, target zone, channel, or hash..."
              className="text-input"
              style={{ width: '100%' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
            Showing <b>{filteredLogs.length}</b> verified dispatch transactions
          </div>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="surge-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="surge-table">
            <thead>
              <tr>
                <th>Audit Log ID</th>
                <th>Timestamp (ISO/IST)</th>
                <th>Stage</th>
                <th>Target Population / Zone</th>
                <th>Channel</th>
                <th>Authorizing Officer</th>
                <th>SHA-256 Verification Hash</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map(log => (
                <tr key={log.id}>
                  <td><b style={{ color: '#1d4ed8' }}>{log.id}</b></td>
                  <td className="mono" style={{ fontSize: '11px', color: '#475569' }}>
                    {log.timestamp.slice(0, 19).replace('T', ' ')}
                  </td>
                  <td><span className="badge badge-gray">{log.stage}</span></td>
                  <td>
                    <b>{log.zoneName}</b>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>Pop: {log.recipientsCount?.toLocaleString()}</div>
                  </td>
                  <td><span className="badge badge-blue">{log.channel}</span></td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{log.approverName}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>{log.approverRole}</div>
                  </td>
                  <td>
                    <div className="mono" style={{ fontSize: '10px', color: '#7c3aed', maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={log.hashSha256}>
                      <Hash size={11} style={{ display: 'inline', verticalAlign: 'middle' }} />
                      {log.hashSha256}
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-amber" style={{ fontSize: '10px' }}>
                      <CheckCircle2 size={11} /> {log.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      style={{ padding: '0.25rem 0.6rem', fontSize: '11px' }}
                      onClick={() => setSelectedLog(log)}
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Log Inspector Modal */}
      {selectedLog && (
        <div className="modal-backdrop" onClick={() => setSelectedLog(null)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span className="card-title">
                <FileCheck2 size={18} color="#059669" />
                Audit Transaction Certificate — {selectedLog.id}
              </span>
              <button className="btn btn-secondary" onClick={() => setSelectedLog(null)} style={{ padding: '2px 8px' }}>✕</button>
            </div>
            <div className="modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.82rem' }}>
                <div><b>Timestamp:</b> {selectedLog.timestamp}</div>
                <div><b>Channel:</b> {selectedLog.channel}</div>
                <div><b>Target Jurisdiction:</b> {selectedLog.zoneName}</div>
                <div><b>Recipient Reach:</b> {selectedLog.recipientsCount?.toLocaleString()} citizens</div>
                <div><b>Approving Authority:</b> {selectedLog.approverName}</div>
                <div><b>Role:</b> {selectedLog.approverRole}</div>
              </div>

              <div style={{ marginTop: '0.75rem' }}>
                <b style={{ fontSize: '0.82rem', color: '#1d4ed8' }}>Transmitted Advisory Payload:</b>
                <div style={{
                  background: '#f8fafc',
                  padding: '0.85rem',
                  borderRadius: '6px',
                  color: '#0f172a',
                  fontSize: '0.82rem',
                  marginTop: '4px',
                  whiteSpace: 'pre-wrap',
                  border: '1px solid #cbd5e1'
                }}>
                  {selectedLog.preview}
                </div>
              </div>

              <div style={{ marginTop: '0.75rem' }}>
                <b style={{ fontSize: '0.82rem', color: '#7c3aed' }}>SHA-256 Tamper-Proof Cryptographic Hash:</b>
                <div className="mono" style={{
                  background: '#faf5ff',
                  border: '1px solid #e9d5ff',
                  padding: '0.65rem',
                  borderRadius: '6px',
                  fontSize: '11px',
                  color: '#6d28d9',
                  wordBreak: 'break-all',
                  marginTop: '4px'
                }}>
                  {selectedLog.hashSha256}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setSelectedLog(null)}>
                Close Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
