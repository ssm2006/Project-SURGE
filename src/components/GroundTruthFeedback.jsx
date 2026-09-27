import React, { useState } from 'react';
import {
  Activity,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  Sliders,
  Image,
  TrendingUp,
  FileCheck,
  RotateCw
} from 'lucide-react';
import { GROUND_TRUTH_DATASET } from '../data/mockData';

export const GroundTruthFeedback = () => {
  const [reports, setReports] = useState(GROUND_TRUTH_DATASET);
  const [newLocation, setNewLocation] = useState('');
  const [newSurveyor, setNewSurveyor] = useState('');
  const [newActualSurge, setNewActualSurge] = useState('3.5');
  const [newNotes, setNewNotes] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  // Model calibration parameters
  const [roughnessCoeff, setRoughnessCoeff] = useState(0.032);
  const [vulnerabilityWeight, setVulnerabilityWeight] = useState(0.65);
  const [drainageLagHours, setDrainageLagHours] = useState(8);

  const handleAddReport = (e) => {
    e.preventDefault();
    if (!newLocation || !newSurveyor) return;

    const newRecord = {
      id: `GT-0${reports.length + 1}`,
      location: newLocation,
      reportedBy: newSurveyor,
      timeObserved: 'Landfall + 6 hours',
      predictedSurgeMeters: 3.4,
      actualSurgeMeters: parseFloat(newActualSurge),
      deltaMeters: `${(parseFloat(newActualSurge) - 3.4 >= 0 ? '+' : '')}${(parseFloat(newActualSurge) - 3.4).toFixed(1)}m`,
      predictedRoadCut: true,
      actualRoadCut: true,
      cascadeConfirmed: 'Confirmed by field revenue survey team.',
      notes: newNotes || 'Waterline mark surveyed on temple compound wall.',
      photoUrl: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=600&q=80'
    };

    setReports([newRecord, ...reports]);
    setNewLocation('');
    setNewSurveyor('');
    setNewNotes('');
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Banner */}
      <div className="surge-card" style={{ background: '#eff6ff', borderColor: '#bfdbfe' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4px' }}>
              <Activity size={20} color="#2563eb" />
              <h2 style={{ fontSize: '1.2rem', color: '#1e3a8a' }}>
                Post-Event Ground-Truth Fusion &amp; Model Recalibration Loop
              </h2>
              <span className="badge badge-blue">FR-7 Closed Loop</span>
            </div>
            <p style={{ color: '#334155', fontSize: '0.82rem', margin: 0 }}>
              Ingests post-cyclone ground-truth flood marks, infrastructure damage surveys, and citizen reports to measure prediction precision and recalibrate hydrodynamic parameters.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div className="telemetry-item" style={{ background: '#ffffff' }}>
              <span className="telemetry-label">SURGE ACCURACY:</span>
              <span className="telemetry-value" style={{ color: '#059669' }}>94.2%</span>
            </div>
            <div className="telemetry-item" style={{ background: '#ffffff' }}>
              <span className="telemetry-label">CASCADE RECALL:</span>
              <span className="telemetry-value" style={{ color: '#2563eb' }}>100% (2/2)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Left Field Ingestion & Records, Right Parameter Tuning */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1.5rem' }}>
        {/* Left Column: Field Reports List & Ingestion Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* New Report Form */}
          <div className="surge-card">
            <div className="card-header">
              <span className="card-title">
                <UploadCloud size={18} color="#2563eb" />
                Ingest Post-Event Ground-Truth Report
              </span>
              <span style={{ fontSize: '11px', color: '#64748b' }}>Field Inspector / Satellite Validation</span>
            </div>

            <form onSubmit={handleAddReport} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: '#475569', display: 'block', marginBottom: '3px', fontWeight: 600 }}>
                    OBSERVATION LOCATION:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Devi River Sluice Gate 4"
                    className="text-input"
                    style={{ width: '100%' }}
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', color: '#475569', display: 'block', marginBottom: '3px', fontWeight: 600 }}>
                    REPORTED BY (SURVEYOR):
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Er. P. K. Jena, Water Resources"
                    className="text-input"
                    style={{ width: '100%' }}
                    value={newSurveyor}
                    onChange={(e) => setNewSurveyor(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: '#475569', display: 'block', marginBottom: '3px', fontWeight: 600 }}>
                    SURVEYED ACTUAL SURGE DEPTH (METERS):
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    className="text-input"
                    style={{ width: '100%' }}
                    value={newActualSurge}
                    onChange={(e) => setNewActualSurge(e.target.value)}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', color: '#475569', display: 'block', marginBottom: '3px', fontWeight: 600 }}>
                    HIGH-WATER MARK NOTES:
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Silt line at 3.5m on embankment pillar"
                    className="text-input"
                    style={{ width: '100%' }}
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ fontSize: '11px', color: '#64748b' }}>
                  Ingested data triggers automatic Bayesian recalibration of roughness factors.
                </span>
                <button type="submit" className="btn btn-primary" style={{ fontSize: '0.82rem' }}>
                  <UploadCloud size={15} />
                  Ingest &amp; Cross-Check
                </button>
              </div>

              {isSaved && (
                <div style={{ color: '#059669', fontSize: '12px', fontWeight: 700, background: '#ecfdf5', padding: '6px 10px', borderRadius: '6px' }}>
                  ✓ Ground-truth report ingested successfully. Model calibration updated.
                </div>
              )}
            </form>
          </div>

          {/* Historical Field Verifications */}
          <div className="surge-card">
            <div className="card-header">
              <span className="card-title">
                <FileCheck size={18} color="#059669" />
                Verified Ground-Truth Benchmarks
              </span>
              <span className="badge badge-blue">{reports.length} Reports</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {reports.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '0.85rem',
                    fontSize: '0.82rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.45rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <strong style={{ color: '#1e40af', fontSize: '0.92rem' }}>{item.location}</strong>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>
                        Surveyed by: {item.reportedBy} ({item.timeObserved})
                      </div>
                    </div>
                    <span className="badge badge-amber">{item.id}</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', background: '#ffffff', padding: '8px 10px', borderRadius: '6px', fontSize: '11px', border: '1px solid #e2e8f0' }}>
                    <div>Predicted Surge: <b style={{ color: '#64748b' }}>{item.predictedSurgeMeters}m</b></div>
                    <div>Actual Measured: <b style={{ color: '#1d4ed8' }}>{item.actualSurgeMeters}m</b></div>
                    <div>Delta: <b style={{ color: '#b45309' }}>{item.deltaMeters}</b></div>
                  </div>

                  <div style={{ color: '#334155', fontSize: '0.8rem' }}>
                    <b>Cascade Validation:</b> {item.cascadeConfirmed}
                  </div>

                  <div style={{ color: '#64748b', fontSize: '0.78rem', fontStyle: 'italic' }}>
                    "{item.notes}"
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Model Recalibration Parameter Tuning */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="surge-card" style={{ borderColor: '#bfdbfe' }}>
            <div className="card-header">
              <span className="card-title">
                <Sliders size={18} color="#2563eb" />
                Hydrodynamic Calibration Tuning
              </span>
              <span className="badge badge-blue">Tuning Matrix</span>
            </div>

            <p style={{ fontSize: '0.82rem', color: '#475569', margin: 0, lineHeight: 1.45 }}>
              Adjust model calibration parameters based on post-event delta errors to fine-tune subsequent forecast cycles:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              {/* Manning's n Roughness */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                  <span>Manning's <i>n</i> Roughness Coefficient:</span>
                  <b style={{ color: '#1d4ed8' }}>{roughnessCoeff}</b>
                </div>
                <input
                  type="range"
                  min="0.020"
                  max="0.060"
                  step="0.002"
                  value={roughnessCoeff}
                  onChange={(e) => setRoughnessCoeff(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: '#2563eb' }}
                />
                <div style={{ fontSize: '11px', color: '#64748b' }}>Higher value reduces inland surge speed through vegetative friction.</div>
              </div>

              {/* Social Vulnerability Weight */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                  <span>Social Equity Weighting Ratio:</span>
                  <b style={{ color: '#b45309' }}>{(vulnerabilityWeight * 100).toFixed(0)}%</b>
                </div>
                <input
                  type="range"
                  min="0.3"
                  max="0.9"
                  step="0.05"
                  value={vulnerabilityWeight}
                  onChange={(e) => setVulnerabilityWeight(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: '#d97706' }}
                />
                <div style={{ fontSize: '11px', color: '#64748b' }}>Controls how heavily kutcha housing and disabled dependency elevate evacuation priority.</div>
              </div>

              {/* Drainage Lag */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                  <span>Estuarine Tidal Drainage Lag:</span>
                  <b style={{ color: '#047857' }}>{drainageLagHours} Hours</b>
                </div>
                <input
                  type="range"
                  min="2"
                  max="20"
                  step="1"
                  value={drainageLagHours}
                  onChange={(e) => setDrainageLagHours(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: '#059669' }}
                />
                <div style={{ fontSize: '11px', color: '#64748b' }}>Accounts for river mouth siltation delaying floodwater egress into Bay of Bengal.</div>
              </div>

              <button
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '0.5rem', padding: '0.65rem' }}
                onClick={() => alert(`Recalibrated parameters committed: n=${roughnessCoeff}, Weight=${vulnerabilityWeight}, Lag=${drainageLagHours}h. Applied to active model cycle.`)}
              >
                <RotateCw size={15} />
                Save &amp; Commit Parameter Calibration
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
