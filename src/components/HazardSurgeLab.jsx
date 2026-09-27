import React, { useState } from 'react';
import {
  Layers,
  Satellite,
  Waves,
  Wind,
  Compass,
  BarChart2,
  TrendingDown,
  Info,
  Maximize2,
  Sliders
} from 'lucide-react';

export const HazardSurgeLab = ({
  region,
  cyclone,
  stageKey,
  metAgency
}) => {
  const [sarBand, setSarBand] = useState('VV-VH-Ratio');
  const [demWaterLevel, setDemWaterLevel] = useState(3.4);
  const [modelCompare, setModelCompare] = useState('IMD');

  const stage = cyclone.stages[stageKey] || cyclone.stages['24h'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Banner: GEE Fusion Header */}
      <div className="surge-card" style={{ background: '#eff6ff', borderColor: '#bfdbfe' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4px' }}>
              <Satellite size={20} color="#2563eb" />
              <h2 style={{ fontSize: '1.2rem', color: '#1e3a8a' }}>
                Google Earth Engine (GEE) &amp; Hydrodynamic Surge Lab
              </h2>
              <span className="badge badge-blue">Active Satellite Pipeline</span>
            </div>
            <p style={{ color: '#475569', fontSize: '0.82rem', margin: 0 }}>
              Cloud-penetrating Synthetic Aperture Radar (Sentinel-1 SAR) + High-Resolution Coastal DEM + Upstream Multi-Model Met Feeds.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div className="telemetry-item" style={{ background: '#ffffff' }}>
              <span className="telemetry-label">SAR LATENCY:</span>
              <span className="telemetry-value" style={{ color: '#2563eb' }}>42 min (Pre-landfall orbit)</span>
            </div>
            <div className="telemetry-item" style={{ background: '#ffffff' }}>
              <span className="telemetry-label">BATHYMETRY RESOLUTION:</span>
              <span className="telemetry-value">30m GEE DEM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: 2x2 Panels */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
        {/* Panel 1: Digital Elevation Model (DEM) & Surge Inundation Cross-Section */}
        <div className="surge-card">
          <div className="card-header">
            <span className="card-title">
              <Waves size={18} color="#2563eb" />
              Coastal Bathymetry &amp; Surge Penetration Profile
            </span>
            <span className="badge badge-red">Surge: {demWaterLevel}m</span>
          </div>

          <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1rem' }}>
            Simulate surge water level breach across coastal sand dunes, embankment berms, and low-elevation inland villages.
          </p>

          {/* Interactive Water Level Slider */}
          <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.85rem' }}>
              <span style={{ color: '#475569', fontWeight: 600 }}>Surge Inundation Depth Simulator:</span>
              <span style={{ fontWeight: 800, color: '#1d4ed8' }}>{demWaterLevel} meters ASL</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="6.0"
              step="0.1"
              value={demWaterLevel}
              onChange={(e) => setDemWaterLevel(parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: '#2563eb', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748b', marginTop: '4px' }}>
              <span>0.5m (High Tide)</span>
              <span>2.0m (Warning Threshold)</span>
              <span>4.0m (Catastrophic Breach)</span>
              <span>6.0m (Super Cyclone)</span>
            </div>
          </div>

          {/* Graphical Elevation Cross Section */}
          <div style={{
            position: 'relative',
            height: '180px',
            background: 'linear-gradient(180deg, #e0f2fe 0%, #f0fdf4 100%)',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid #cbd5e1',
            padding: '10px'
          }}>
            {/* Water layer */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: `${Math.min(95, demWaterLevel * 18)}%`,
              height: `${Math.min(90, demWaterLevel * 20)}px`,
              background: 'linear-gradient(180deg, rgba(37, 99, 235, 0.6) 0%, rgba(29, 78, 216, 0.85) 100%)',
              transition: 'all 0.3s ease',
              borderTop: '3px solid #1d4ed8',
              boxShadow: '0 0 15px rgba(37, 99, 235, 0.3)'
            }}>
              <div style={{ position: 'absolute', top: '-24px', right: '10px', fontSize: '11px', color: '#1e40af', fontWeight: 700, background: '#ffffff', padding: '1px 6px', borderRadius: '4px', border: '1px solid #bfdbfe' }}>
                Surge Crest: {demWaterLevel}m
              </div>
            </div>

            {/* Terrain Silhouette */}
            <svg style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '140px' }} preserveAspectRatio="none" viewBox="0 0 500 150">
              <path
                d="M0,150 L50,140 L120,110 L160,85 L220,95 L280,120 L350,110 L420,70 L500,60 L500,150 Z"
                fill="#475569"
                stroke="#334155"
                strokeWidth="2"
              />
            </svg>

            {/* Labels on Terrain */}
            <div style={{ position: 'absolute', bottom: '15px', left: '15px', fontSize: '11px', color: '#ffffff', fontWeight: 600 }}>
              🌊 Deep Ocean
            </div>
            <div style={{ position: 'absolute', bottom: '70px', left: '145px', fontSize: '11px', color: '#fef3c7', fontWeight: 700 }}>
              🏖️ Dune Barrier (2.8m)
            </div>
            <div style={{ position: 'absolute', bottom: '40px', left: '260px', fontSize: '11px', color: '#fee2e2', fontWeight: 700 }}>
              🏘️ Fishing Settlement (1.6m)
            </div>
            <div style={{ position: 'absolute', bottom: '85px', right: '30px', fontSize: '11px', color: '#d1fae5', fontWeight: 700 }}>
              🏠 Elevated Shelter (6.5m)
            </div>
          </div>

          <div style={{ marginTop: '0.85rem', fontSize: '0.82rem', color: demWaterLevel >= 2.8 ? '#dc2626' : '#059669', fontWeight: 700 }}>
            {demWaterLevel >= 2.8
              ? '⚠️ CRITICAL: Dune barrier breached! Unobstructed saline inundation penetrates 3.2km inland.'
              : '✓ Dune barrier holding. Localized estuarine creek overflow only.'}
          </div>
        </div>

        {/* Panel 2: Synthetic Aperture Radar (SAR) Inundation Viewer */}
        <div className="surge-card">
          <div className="card-header">
            <span className="card-title">
              <Satellite size={18} color="#2563eb" />
              Sentinel-1 SAR Flood Inversion Map
            </span>
            <div style={{ display: 'flex', gap: '4px' }}>
              {['VV-VH-Ratio', 'Coherence-Delta', 'Optical-RGB'].map(mode => (
                <button
                  key={mode}
                  className={`btn ${sarBand === mode ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setSarBand(mode)}
                  style={{ padding: '0.25rem 0.55rem', fontSize: '11px' }}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div style={{
            height: '220px',
            background: '#f8fafc',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              width: '180px',
              height: '180px',
              border: '2px solid rgba(37, 99, 235, 0.3)',
              borderRadius: '50%',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div className="radar-ring" style={{ width: '100%', height: '100%', position: 'absolute', borderTop: '3px solid #2563eb' }}></div>
              <div style={{ textAlign: 'center', zIndex: 1 }}>
                <span style={{ fontSize: '11px', color: '#1d4ed8', fontWeight: 700 }}>SAR SPECULAR REFLECTION</span>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a' }}>
                  {(stage.surgePeakMeters * 38.4).toFixed(1)} km²
                </div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Detected Standing Water Extent</div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '0.85rem', fontSize: '0.8rem', color: '#475569', lineHeight: 1.45 }}>
            <b>GEE SAR Analysis:</b> Active C-band radar pulses penetrate dense clouds, differentiating calm standing floodwaters (specular black backscatter &lt;-22dB) from vegetated land.
          </div>
        </div>

        {/* Panel 3: Upstream Multi-Model Met Agency Convergence */}
        <div className="surge-card">
          <div className="card-header">
            <span className="card-title">
              <Compass size={18} color="#d97706" />
              Multi-Agency Track &amp; Intensity Convergence
            </span>
            <span className="badge badge-amber">Ensemble Spread</span>
          </div>

          <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.75rem' }}>
            SURGE ingests and cross-calibrates official bulletins to isolate forecast consensus and standard deviation:
          </p>

          <table className="surge-table">
            <thead>
              <tr>
                <th>Met Agency</th>
                <th>Landfall Estimate</th>
                <th>Wind (km/h)</th>
                <th>Peak Surge</th>
                <th>Confidence</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><b style={{ color: '#1d4ed8' }}>IMD (Official India)</b></td>
                <td>Puri coast (26h)</td>
                <td>165 km/h</td>
                <td>3.4m</td>
                <td><span className="badge badge-blue">Very High</span></td>
              </tr>
              <tr>
                <td><b style={{ color: '#7c3aed' }}>JTWC (US Navy)</b></td>
                <td>Puri / Jagatsinghpur (24h)</td>
                <td>175 km/h</td>
                <td>3.8m</td>
                <td><span className="badge badge-purple">High</span></td>
              </tr>
              <tr>
                <td><b style={{ color: '#ea580c' }}>ECMWF (IFS 0.1°)</b></td>
                <td>Astaranga Estuary (27h)</td>
                <td>160 km/h</td>
                <td>3.2m</td>
                <td><span className="badge badge-orange">High</span></td>
              </tr>
              <tr>
                <td><b style={{ color: '#059669' }}>SURGE Ensemble Blend</b></td>
                <td><b>Puri-Astaranga (25.5h)</b></td>
                <td><b>168 km/h</b></td>
                <td><b>3.5m</b></td>
                <td><span className="badge badge-red">Fused</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Panel 4: Rainfall-Runoff & River Drainage Pathway */}
        <div className="surge-card">
          <div className="card-header">
            <span className="card-title">
              <BarChart2 size={18} color="#059669" />
              Precipitation Runoff &amp; River Basin Drainage
            </span>
            <span className="badge badge-blue">{stage.rainfallForecastMm24h} mm / 24h</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.82rem' }}>
            <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ color: '#475569', fontWeight: 600 }}>Mahanadi / Kushabhadra River Basin Saturation:</span>
                <span style={{ color: '#dc2626', fontWeight: 700 }}>88% (High Antecedent Moisture)</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '88%', height: '100%', background: 'linear-gradient(90deg, #d97706, #dc2626)' }}></div>
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ color: '#475569', fontWeight: 600 }}>Tidal Surge Backwater Damming Effect:</span>
                <span style={{ color: '#ea580c', fontWeight: 700 }}>+1.4m River Surcharge</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '74%', height: '100%', background: 'linear-gradient(90deg, #2563eb, #ea580c)' }}></div>
              </div>
            </div>

            <p style={{ color: '#475569', fontSize: '0.8rem', margin: 0, lineHeight: 1.45 }}>
              <b>Hydrological Insight:</b> High tide and ocean storm surge prevent upstream river discharge into the Bay of Bengal, causing inland freshwater pooling 12-18 hours before marine waves reach land.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
