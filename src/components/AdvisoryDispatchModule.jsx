import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Send,
  MessageSquare,
  Smartphone,
  Radio,
  PhoneCall,
  CheckCircle2,
  Lock,
  Volume2,
  VolumeX,
  FileEdit,
  Globe,
  ShieldCheck,
  RefreshCw,
  Copy,
  Check
} from 'lucide-react';
import { MULTILINGUAL_ADVISORIES } from '../data/mockData';
import { generateGeminiAdvisory } from '../services/geminiService';

export const AdvisoryDispatchModule = ({
  region,
  cyclone,
  stageKey,
  zones,
  selectedZone,
  activeRole,
  onLogDispatch,
  isOffline,
  onQueueOutbox
}) => {
  const [targetZone, setTargetZone] = useState(selectedZone || zones[0]);
  const [selectedLanguage, setSelectedLanguage] = useState('odia');
  const [selectedChannel, setSelectedChannel] = useState('whatsapp');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);

  // Advisory content state
  const [advisoryContent, setAdvisoryContent] = useState({
    title: '',
    sms: '',
    whatsapp: '',
    cellBroadcast: '',
    ivrScript: ''
  });

  // Approver metadata
  const [approverName, setApproverName] = useState('Dr. Suresh Mishra, IAS');
  const [approverRole, setApproverRole] = useState('District Disaster Management Officer');
  const [isDispatched, setIsDispatched] = useState(false);
  const [lastDispatchedHash, setLastDispatchedHash] = useState('');

  // Synchronize advisory when language, zone or stage changes
  useEffect(() => {
    handleGenerateAdvisory();
  }, [targetZone, selectedLanguage, stageKey]);

  const handleGenerateAdvisory = async () => {
    setIsGenerating(true);
    try {
      const generated = await generateGeminiAdvisory({
        cyclone,
        stageKey,
        zone: targetZone,
        language: selectedLanguage,
        urgencyLevel: stageKey === '24h' || stageKey === '12h' ? 'Mandatory Evacuation' : 'Advisory Alert'
      });
      setAdvisoryContent(generated);
      setIsDispatched(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Dispatch Action
  const handleDispatch = () => {
    const textToDispatch =
      selectedChannel === 'sms'
        ? advisoryContent.sms
        : selectedChannel === 'whatsapp'
        ? advisoryContent.whatsapp
        : selectedChannel === 'cellBroadcast'
        ? advisoryContent.cellBroadcast
        : advisoryContent.ivrScript;

    // Cryptographic hash simulation
    const randomHash = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    setLastDispatchedHash(randomHash);

    const logEntry = {
      id: `LOG-SURGE-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString(),
      cycloneId: cyclone.id,
      stage: stageKey,
      regionId: region.id,
      zoneId: targetZone.id,
      zoneName: targetZone.name,
      channel: selectedChannel.toUpperCase(),
      language: selectedLanguage.toUpperCase(),
      recipientsCount: targetZone.populationTotal,
      approverName,
      approverRole,
      signoffStatus: 'OFFICIALLY APPROVED & DISPATCHED',
      hashSha256: randomHash,
      status: isOffline ? 'Queued in Offline Outbox' : 'Dispatched (Gateway Confirmed)',
      preview: textToDispatch.slice(0, 80) + '...'
    };

    if (isOffline) {
      onQueueOutbox({
        id: `OUTBOX-${Date.now()}`,
        destination: targetZone.name,
        type: `${selectedChannel.toUpperCase()} Broadcast`,
        message: textToDispatch,
        queuedAt: new Date().toISOString(),
        status: 'Pending Reconnect'
      });
      alert(`SYSTEM OFFLINE: Advisory queued in Field Outbox. Will auto-dispatch when network reconnects.`);
    } else {
      onLogDispatch(logEntry);
      setIsDispatched(true);
    }
  };

  // Web Speech API for IVR Script Audio Playback
  const handleToggleVoice = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech Synthesis not supported by your browser.');
      return;
    }

    if (isPlayingVoice) {
      window.speechSynthesis.cancel();
      setIsPlayingVoice(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(advisoryContent.ivrScript);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsPlayingVoice(false);
      utterance.onerror = () => setIsPlayingVoice(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingVoice(true);
    }
  };

  const handleCopy = () => {
    const textToCopy =
      selectedChannel === 'sms'
        ? advisoryContent.sms
        : selectedChannel === 'whatsapp'
        ? advisoryContent.whatsapp
        : selectedChannel === 'cellBroadcast'
        ? advisoryContent.cellBroadcast
        : advisoryContent.ivrScript;

    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Banner */}
      <div className="surge-card" style={{ background: '#faf5ff', borderColor: '#e9d5ff' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4px' }}>
              <Sparkles size={20} color="#7c3aed" />
              <h2 style={{ fontSize: '1.2rem', color: '#5b21b6' }}>
                Gemini 3.7 Flash Multilingual Advisory Generator &amp; Dispatch Sandbox
              </h2>
              <span className="badge badge-purple">Human-in-the-Loop Sign-Off</span>
            </div>
            <p style={{ color: '#6b21a8', fontSize: '0.82rem', margin: 0 }}>
              Transforms high-dimensional storm surge, wind physics, and infrastructure vulnerability into culturally localized, low-literacy emergency dispatches.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <button
              className="btn btn-purple"
              onClick={handleGenerateAdvisory}
              disabled={isGenerating}
              style={{ fontSize: '0.82rem', padding: '0.55rem 0.95rem' }}
            >
              <RefreshCw size={14} className={isGenerating ? 'spin' : ''} />
              {isGenerating ? 'Gemini Reasoning...' : 'Regenerate Advisory'}
            </button>
          </div>
        </div>
      </div>

      {/* Control Strip: Zone & Language Selectors */}
      <div className="surge-card" style={{ padding: '1rem 1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          {/* Target Zone */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.82rem', color: '#475569', fontWeight: 700 }}>TARGET JURISDICTION:</span>
            <select
              className="select-input"
              value={targetZone.id}
              onChange={(e) => {
                const z = zones.find(item => item.id === e.target.value);
                if (z) setTargetZone(z);
              }}
            >
              {zones.map(z => (
                <option key={z.id} value={z.id}>
                  {z.name} (Pop: {z.populationTotal.toLocaleString()})
                </option>
              ))}
            </select>
          </div>

          {/* Regional Language Picker */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
            <Globe size={16} color="#2563eb" />
            <span style={{ fontSize: '0.82rem', color: '#475569', fontWeight: 700 }}>LANGUAGE:</span>
            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
              {[
                { id: 'odia', label: 'ଓଡ଼ିଆ (Odia)' },
                { id: 'bengali', label: 'বাংলা (Bengali)' },
                { id: 'english', label: 'English' },
                { id: 'telugu', label: 'తెలుగు (Telugu)' },
                { id: 'tamil', label: 'தமிழ் (Tamil)' },
                { id: 'hindi', label: 'हिंदी (Hindi)' }
              ].map(lang => (
                <button
                  key={lang.id}
                  className={`btn ${selectedLanguage === lang.id ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setSelectedLanguage(lang.id)}
                  style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem' }}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Channel Simulator, Right Human Approval & Dispatch */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
        {/* Left Column: Multi-Channel Live Sandboxes */}
        <div className="surge-card">
          {/* Channel Tabs */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            borderBottom: '1px solid var(--border-subtle)',
            paddingBottom: '0.75rem',
            marginBottom: '1rem',
            overflowX: 'auto'
          }}>
            <button
              className={`btn ${selectedChannel === 'whatsapp' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setSelectedChannel('whatsapp')}
              style={{ fontSize: '0.8rem', padding: '0.45rem 0.75rem' }}
            >
              <Smartphone size={15} />
              WhatsApp Sandbox
            </button>

            <button
              className={`btn ${selectedChannel === 'sms' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setSelectedChannel('sms')}
              style={{ fontSize: '0.8rem', padding: '0.45rem 0.75rem' }}
            >
              <MessageSquare size={15} />
              SMS (GSM-7)
            </button>

            <button
              className={`btn ${selectedChannel === 'cellBroadcast' ? 'btn-danger' : 'btn-secondary'}`}
              onClick={() => setSelectedChannel('cellBroadcast')}
              style={{ fontSize: '0.8rem', padding: '0.45rem 0.75rem' }}
            >
              <Radio size={15} />
              Cell Broadcast (CAP)
            </button>

            <button
              className={`btn ${selectedChannel === 'ivr' ? 'btn-purple' : 'btn-secondary'}`}
              onClick={() => setSelectedChannel('ivr')}
              style={{ fontSize: '0.8rem', padding: '0.45rem 0.75rem' }}
            >
              <PhoneCall size={15} />
              IVR Voice Script
            </button>
          </div>

          {/* WhatsApp Interactive Preview */}
          {selectedChannel === 'whatsapp' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="chat-preview-box" style={{ width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '10px', marginBottom: '12px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ShieldCheck size={20} color="#fff" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px', color: '#111827' }}>
                      Govt of Odisha Emergency Alert
                      <CheckCircle2 size={14} color="#059669" />
                    </div>
                    <div style={{ fontSize: '11px', color: '#6b7280' }}>Official Verified State Channel</div>
                  </div>
                </div>

                <div className="chat-bubble">
                  {advisoryContent.whatsapp}
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
                  <button className="btn btn-secondary" style={{ flex: 1, fontSize: '11px', padding: '6px 8px', background: '#ffffff', color: '#1d4ed8' }}>
                    📍 Open Shelter GPS Route
                  </button>
                  <button className="btn btn-secondary" style={{ flex: 1, fontSize: '11px', padding: '6px 8px', background: '#ffffff', color: '#dc2626' }}>
                    📞 Call 1077 Hotline
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SMS Broadcast Preview */}
          {selectedChannel === 'sms' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.78rem', color: '#475569' }}>
                <span>Sender ID: <b>SURGE-ODISHA</b></span>
                <span>Characters: <b style={{ color: '#2563eb' }}>{advisoryContent.sms.length}</b> / 160 (1 SMS Segment)</span>
              </div>
              <textarea
                className="text-input"
                style={{ width: '100%', minHeight: '140px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: 1.5, background: '#f8fafc' }}
                value={advisoryContent.sms}
                onChange={(e) => setAdvisoryContent({ ...advisoryContent, sms: e.target.value })}
              />
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '6px' }}>
                Complies with Telecom Regulatory Authority GSM-7 standard for low-bandwidth 2G feature phones.
              </div>
            </div>
          )}

          {/* Cell Broadcast Emergency Pop-up Preview */}
          {selectedChannel === 'cellBroadcast' && (
            <div className="cell-broadcast-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '10px' }}>
                <Radio size={24} color="#ffffff" className="spin" />
                <h3 style={{ fontSize: '1.15rem', margin: 0, fontWeight: 900 }}>
                  PRESIDENTIAL EMERGENCY CELL BROADCAST
                </h3>
              </div>
              <p style={{ fontSize: '0.98rem', fontWeight: 600, lineHeight: 1.5, margin: '8px 0' }}>
                {advisoryContent.cellBroadcast}
              </p>
              <div style={{ fontSize: '11px', background: 'rgba(0,0,0,0.25)', padding: '6px 10px', borderRadius: '4px', marginTop: '10px' }}>
                Broadcast Mode: CAP 1.2 Protocol over All Coastal Cellular Base Stations (4G/5G/2G)
              </div>
            </div>
          )}

          {/* IVR Voice Script Audio Visualizer */}
          {selectedChannel === 'ivr' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.85rem', color: '#334155', fontWeight: 600 }}>Automated Voice Call (IVR Outbound Blast):</span>
                <button
                  className={`btn ${isPlayingVoice ? 'btn-danger' : 'btn-purple'}`}
                  onClick={handleToggleVoice}
                  style={{ fontSize: '0.78rem', padding: '0.45rem 0.85rem' }}
                >
                  {isPlayingVoice ? <VolumeX size={15} /> : <Volume2 size={15} />}
                  {isPlayingVoice ? 'Stop Audio Broadcast' : 'Simulate Voice Readout'}
                </button>
              </div>

              <textarea
                className="text-input"
                style={{ width: '100%', minHeight: '130px', fontSize: '0.85rem', lineHeight: 1.5, background: '#f8fafc' }}
                value={advisoryContent.ivrScript}
                onChange={(e) => setAdvisoryContent({ ...advisoryContent, ivrScript: e.target.value })}
              />

              <div style={{ background: '#f1f5f9', padding: '0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: isPlayingVoice ? '#059669' : '#94a3b8' }}></div>
                <div style={{ fontSize: '0.78rem', color: '#475569' }}>
                  Targeting 14,000 feature phone landlines via BSNL / Jio automated telephony dialer.
                </div>
              </div>
            </div>
          )}

          {/* Utility copy button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <button className="btn btn-secondary" onClick={handleCopy} style={{ fontSize: '0.78rem', padding: '0.4rem 0.75rem' }}>
              {isCopied ? <Check size={14} color="#059669" /> : <Copy size={14} />}
              {isCopied ? 'Copied to Clipboard' : 'Copy Dispatch Text'}
            </button>
          </div>
        </div>

        {/* Right Column: Human-in-the-Loop Sign-Off & Official Dispatch */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="surge-card" style={{ borderColor: '#bfdbfe' }}>
            <div className="card-header">
              <span className="card-title">
                <Lock size={18} color="#2563eb" />
                Human-in-the-Loop Sign-Off &amp; Authorization
              </span>
              <span className="badge badge-blue">PRD §10 Guardrail</span>
            </div>

            <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.45, margin: 0 }}>
              Per regulatory framework, AI generates the advisory, but official dissemination requires human authorization credentials.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.78rem', color: '#334155', display: 'block', marginBottom: '3px', fontWeight: 600 }}>
                  AUTHORIZING OFFICIAL:
                </label>
                <input
                  type="text"
                  className="text-input"
                  style={{ width: '100%' }}
                  value={approverName}
                  onChange={(e) => setApproverName(e.target.value)}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: '#334155', display: 'block', marginBottom: '3px', fontWeight: 600 }}>
                  OFFICIAL DESIGNATION:
                </label>
                <input
                  type="text"
                  className="text-input"
                  style={{ width: '100%' }}
                  value={approverRole}
                  onChange={(e) => setApproverRole(e.target.value)}
                />
              </div>

              <div style={{ background: '#eff6ff', padding: '0.85rem', borderRadius: '8px', border: '1px solid #bfdbfe', fontSize: '0.8rem' }}>
                <div style={{ color: '#1e40af', fontWeight: 700, marginBottom: '2px' }}>
                  Target Population: {targetZone.populationTotal.toLocaleString()} residents
                </div>
                <div style={{ color: '#475569' }}>
                  Delivery Channel: <b>{selectedChannel.toUpperCase()}</b> via State Sandbox Gateway
                </div>
              </div>

              {/* Dispatch Button */}
              <button
                className="btn btn-primary"
                style={{ padding: '0.75rem', fontSize: '0.92rem', marginTop: '0.5rem' }}
                onClick={handleDispatch}
              >
                <Send size={16} />
                Authorize &amp; Dispatch Advisory
              </button>

              {/* Dispatch Confirmation Card */}
              {isDispatched && (
                <div style={{
                  background: '#ecfdf5',
                  border: '1px solid #a7f3d0',
                  borderRadius: '8px',
                  padding: '0.85rem',
                  fontSize: '0.8rem',
                  marginTop: '0.5rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#047857', fontWeight: 700, marginBottom: '4px' }}>
                    <CheckCircle2 size={16} />
                    TRANSMISSION SUCCESSFUL &amp; LOGGED
                  </div>
                  <div style={{ color: '#334155' }}>
                    Cryptographic Audit Hash generated and recorded in ledger:
                  </div>
                  <div className="mono" style={{ color: '#1d4ed8', fontSize: '10px', wordBreak: 'break-all', marginTop: '4px', background: '#ffffff', padding: '4px', borderRadius: '4px', border: '1px solid #bfdbfe' }}>
                    SHA-256: {lastDispatchedHash}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
