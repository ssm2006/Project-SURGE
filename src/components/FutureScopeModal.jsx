import React from 'react';
import { Smartphone, ExternalLink, ShieldCheck, HeartHandshake, MapPin, Zap, ArrowRight, Lock } from 'lucide-react';

export const FutureScopeModal = ({
  isOpen,
  onClose,
  activeScopeType // 'citizen' or 'insurer'
}) => {
  if (!isOpen) return null;

  const isCitizen = activeScopeType === 'citizen';

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              background: isCitizen ? '#faf5ff' : '#eff6ff',
              padding: '6px',
              borderRadius: '8px'
            }}>
              {isCitizen ? <Smartphone size={20} color="#7c3aed" /> : <HeartHandshake size={20} color="#2563eb" />}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#0f172a', margin: 0 }}>
                  {isCitizen ? 'Citizen Direct Advisory & Shelter Portal' : 'NGO / Parametric Insurer Liquidity Trigger Engine'}
                </h3>
                <span className="badge badge-purple" style={{ fontSize: '9px' }}>FUTURE SCOPE</span>
              </div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>
                Designated Roadmap Milestone (Phase 2 Post-Hackathon Scope)
              </div>
            </div>
          </div>
          <button className="btn btn-secondary" onClick={onClose} style={{ padding: '2px 8px' }}>✕</button>
        </div>

        <div className="modal-body">
          <div className="future-scope-banner">
            <Lock size={16} style={{ flexShrink: 0 }} />
            <div>
              <b>Scheduled Feature Architecture:</b> This module is slated for post-hackathon national integration. The core Authority Decision-Support Engine, Surge Modeling Twin, and Cascade Dispatch infrastructure are currently live.
            </div>
          </div>

          {isCitizen ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.82rem', lineHeight: 1.5 }}>
              <div>
                <b style={{ color: '#6d28d9', fontSize: '0.95rem' }}>Citizen Module Blueprint (PRD §4 &amp; §6):</b>
                <p style={{ color: '#334155', marginTop: '4px' }}>
                  Enables direct citizen self-subscription without burdening understaffed municipal disaster desks. Tailored specifically for low-bandwidth, low-literacy coastal populations across the Bay of Bengal.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <b style={{ color: '#1d4ed8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Smartphone size={14} /> WhatsApp Self-Service Bot
                  </b>
                  <p style={{ color: '#475569', fontSize: '11px', margin: '4px 0 0' }}>
                    Citizens send a "HI" on WhatsApp or SMS 'SURGE &lt;Pincode&gt;' to receive instant hyper-localized shelter locations in Odia, Bengali, Tamil, or Telugu.
                  </p>
                </div>

                <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <b style={{ color: '#059669', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={14} /> Offline Turn-by-Turn Routing
                  </b>
                  <p style={{ color: '#475569', fontSize: '11px', margin: '4px 0 0' }}>
                    Cached PWA vector maps direct fleeing residents around flooded bridges (such as Kushabhadra Causeway) to the nearest concrete shelter with available capacity.
                  </p>
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <b style={{ color: '#b45309', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Zap size={14} /> Ground-Truth Photo Crowdsourcing
                </b>
                <p style={{ color: '#475569', fontSize: '11px', margin: '4px 0 0' }}>
                  Citizens can upload geo-tagged photos of high-water marks and breached embankments, feeding Gemini multimodal reasoning to recalibrate flood extents in real time.
                </p>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.82rem', lineHeight: 1.5 }}>
              <div>
                <b style={{ color: '#1d4ed8', fontSize: '0.95rem' }}>Parametric Insurance &amp; NGO Liquidity Engine (PRD §5.5 &amp; FR-6):</b>
                <p style={{ color: '#334155', marginTop: '4px' }}>
                  Replaces traditional post-disaster loss assessments (which take 4–6 months) with pre-landfall liquidity disbursed in 48 hours based on satellite and meteorological threshold breaches.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <b style={{ color: '#1d4ed8' }}>Objective Physical Triggers</b>
                  <p style={{ color: '#475569', fontSize: '11px', margin: '4px 0 0' }}>
                    Pre-agreed contracts trigger payouts when GEE SAR flood depth exceeds 2.0m or sustained wind surpasses 140 km/h, verified by tamper-evident cryptographic logs.
                  </p>
                </div>

                <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <b style={{ color: '#059669' }}>Outbound Webhook REST API</b>
                  <p style={{ color: '#475569', fontSize: '11px', margin: '4px 0 0' }}>
                    Secure REST endpoints deliver structured JSON payload triggers directly to humanitarian relief funds, Red Cross, and parametric underwriters (e.g. CCRIF / Swiss Re).
                  </p>
                </div>
              </div>

              <div style={{ background: '#f1f5f9', padding: '0.85rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#1e3a8a' }}>
                <span style={{ color: '#64748b' }}>// Sample Outbound Parametric Trigger Payload</span><br/>
                &#123;<br/>
                &nbsp;&nbsp;"event": "PARAMETRIC_SURGE_TRIGGER_BREACH",<br/>
                &nbsp;&nbsp;"cyclone": "CYCLONE-SURGE-2026",<br/>
                &nbsp;&nbsp;"jurisdiction": "Puri-Astaranga-Zone-A1",<br/>
                &nbsp;&nbsp;"measuredSurgeMeters": 3.4,<br/>
                &nbsp;&nbsp;"contractThresholdMeters": 2.0,<br/>
                &nbsp;&nbsp;"payoutAuthorizedUSD": 1250000,<br/>
                &nbsp;&nbsp;"auditHash": "9f8a3d7b82c1e405a69f0b12..."<br/>
                &#125;
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Back to Active Command Modules
          </button>
        </div>
      </div>
    </div>
  );
};
