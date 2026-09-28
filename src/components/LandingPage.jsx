import React, { useState, useEffect } from 'react';
import {
  Waves,
  Zap,
  Shield,
  Globe,
  Activity,
  Radio,
  Map,
  Network,
  ChevronRight,
  AlertTriangle,
  Cpu,
  BarChart2,
  ArrowRight,
  Clock,
  Users,
  CheckCircle,
  Star
} from 'lucide-react';

const STATS = [
  { label: 'Lead-Time Window', value: '72', unit: 'hours', icon: Clock, color: '#0284c7' },
  { label: 'Population Coverage', value: '4.2', unit: 'million', icon: Users, color: '#059669' },
  { label: 'Forecast Accuracy', value: '94', unit: '%', icon: BarChart2, color: '#7c3aed' },
  { label: 'Risk Zones Mapped', value: '280', unit: 'zones', icon: Map, color: '#ea580c' }
];

const FEATURES = [
  {
    icon: Cpu,
    title: 'AI-Powered Hazard Engine',
    description: 'Gemini 3.7 Flash generates real-time multi-hazard risk rationales combining storm surge physics, wind models, and infrastructure vulnerability into human-readable defensible briefings.',
    color: '#7c3aed',
    bg: '#faf5ff',
    border: '#e9d5ff',
    badge: 'Gemini AI'
  },
  {
    icon: Map,
    title: 'Storm Digital Twin Map',
    description: 'Interactive geospatial command center with live cyclone track, surge depth contours, critical infrastructure overlays, and evacuation zone risk scoring.',
    color: '#0284c7',
    bg: '#f0f9ff',
    border: '#bae6fd',
    badge: 'Geospatial'
  },
  {
    icon: Network,
    title: 'Cascade Failure Modeling',
    description: 'Graph-based infrastructure failure propagation identifies second-order effects: shelter isolation, power trip chains, and road submergence windows.',
    color: '#ea580c',
    bg: '#fff7ed',
    border: '#fed7aa',
    badge: 'Infrastructure'
  },
  {
    icon: Radio,
    title: 'Multilingual Advisory Dispatch',
    description: 'One-click advisory generation in Odia, Bengali, Telugu, Tamil, Hindi & English with SMS, WhatsApp, Cell Broadcast CAP, and IVR voice channels.',
    color: '#059669',
    bg: '#ecfdf5',
    border: '#a7f3d0',
    badge: '6 Languages'
  },
  {
    icon: Shield,
    title: 'Human-in-the-Loop Guardrails',
    description: 'AI generates, humans authorize. Every dispatch requires official sign-off with SHA-256 cryptographic audit trail for full regulatory compliance.',
    color: '#2563eb',
    bg: '#eff6ff',
    border: '#bfdbfe',
    badge: 'PRD §10'
  },
  {
    icon: Activity,
    title: 'Ground-Truth Recalibration',
    description: 'Post-event feedback module ingests field reports to compare predicted vs. actual impacts, continuously improving model accuracy through quantitative recalibration.',
    color: '#d97706',
    bg: '#fffbeb',
    border: '#fde68a',
    badge: 'Post-Event'
  }
];

const PILOT_REGIONS = [
  { name: 'Puri & Jagatsinghpur', state: 'Odisha, India', flag: 'IN', risk: 'Extreme', riskColor: '#dc2626' },
  { name: 'South 24 Parganas', state: 'West Bengal, India', flag: 'IN', risk: 'Very High', riskColor: '#ea580c' },
  { name: 'Sundarbans Delta', state: 'Bangladesh', flag: 'BD', risk: 'Critical', riskColor: '#991b1b' },
  { name: 'Vizag Coastal Belt', state: 'Andhra Pradesh, India', flag: 'IN', risk: 'High', riskColor: '#d97706' }
];

const WORKFLOW_STEPS = [
  {
    number: '01',
    title: 'Ingest Multi-Source Forecast',
    description: 'IMD, ECMWF, INCOIS, and NASA data feeds are unified into a coherent storm digital twin.',
    icon: Globe
  },
  {
    number: '02',
    title: 'AI Risk Synthesis',
    description: 'Gemini 3.7 Flash evaluates compound hazards and generates explainable risk rationales.',
    icon: Cpu
  },
  {
    number: '03',
    title: 'Cascade Modeling',
    description: 'Infrastructure failure graphs propagate second-order risks across the response network.',
    icon: Network
  },
  {
    number: '04',
    title: 'Human-Authorized Dispatch',
    description: 'Authorized officials review AI advisories and dispatch to all channels with one click.',
    icon: Radio
  }
];

// Animated counter hook
function useCounter(target, duration = 1400) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const isFloat = String(target).includes('.');
    const numTarget = parseFloat(target);
    if (isNaN(numTarget)) return;
    const steps = 60;
    const increment = numTarget / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numTarget) {
        setCount(numTarget);
        clearInterval(timer);
      } else {
        setCount(isFloat ? parseFloat(current.toFixed(1)) : Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

const StatCard = ({ stat, index }) => {
  const count = useCounter(parseFloat(stat.value));
  const Icon = stat.icon;
  return (
    <div className="landing-stat-card" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="landing-stat-icon" style={{ background: stat.color + '18', color: stat.color }}>
        <Icon size={22} />
      </div>
      <div className="landing-stat-value" style={{ color: stat.color }}>
        {count}
        <span className="landing-stat-unit">{stat.unit}</span>
      </div>
      <div className="landing-stat-label">{stat.label}</div>
    </div>
  );
};

export const LandingPage = ({ onEnter }) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="landing-hero">
        <div className="landing-hero-grid" aria-hidden="true" />

        {/* Left: Text content */}
        <div className={`landing-hero-left ${isVisible ? 'fade-in-up' : ''}`}>
          {/* Government badge */}
          <div className="landing-gov-badge">
            <Shield size={13} />
            <span>Ministry of Earth Sciences &amp; NDMA — Government of India Prototype</span>
            <span className="badge badge-green" style={{ fontSize: '10px', marginLeft: '4px' }}>ACTIVE PILOT</span>
          </div>

          {/* Logo + Title */}
          <div className="landing-logo-mark">
            <div className="landing-logo-icon">
              <Waves size={28} color="#ffffff" />
            </div>
            <div>
              <div className="landing-logo-text">PROJECT SURGE</div>
              <div className="landing-logo-sub">Storm Understanding &amp; Resilience Guidance Engine</div>
            </div>
          </div>

          <h1 className="landing-headline">
            72-Hour Anticipatory<br />
            <span className="landing-headline-accent">Climate Action</span><br />
            for Coastal Communities
          </h1>

          <p className="landing-subheadline">
            AI-powered cyclone preparedness for the Bay of Bengal — transforming storm physics
            into defensible, multilingual emergency directives with up to 72-hour lead-time windows.
          </p>

          <div className="landing-hero-actions">
            <button id="enter-command-center" className="landing-cta-primary" onClick={onEnter}>
              <Zap size={17} />
              Enter Command Center
              <ArrowRight size={15} />
            </button>
            <button className="landing-cta-secondary" onClick={onEnter}>
              <BarChart2 size={15} />
              View Live Demo
            </button>
          </div>

          <div className="landing-trust-badges">
            {['IMD Integrated', 'ECMWF Feed', 'Offline-First PWA', 'SHA-256 Audit Trail'].map(badge => (
              <span key={badge} className="landing-trust-badge">
                <CheckCircle size={11} />
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Hero Image */}
        <div className={`landing-hero-right ${isVisible ? 'fade-in-right' : ''}`}>
          <div className="landing-hero-image-wrap">
            <img
              src="/surge_hero.jpg"
              alt="Project SURGE Storm Digital Twin Visualization"
              className="landing-hero-img"
            />
            <div className="landing-hero-img-overlay">
              <div className="landing-live-badge">
                <span className="landing-live-dot" />
                LIVE SIMULATION ACTIVE
              </div>
              <div className="landing-hero-chips">
                <div className="landing-chip landing-chip-red">
                  <AlertTriangle size={11} />
                  Cat. 4 — 185 km/h
                </div>
                <div className="landing-chip landing-chip-blue">
                  <Waves size={11} />
                  Surge: 4.2m
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="landing-stats">
        {STATS.map((stat, i) => <StatCard key={stat.label} stat={stat} index={i} />)}
      </section>

      {/* Pilot Regions Ribbon */}
      <section className="landing-regions">
        <div className="landing-section-inner">
          <div className="landing-regions-label">
            <Globe size={14} />
            Active Pilot Regions — Bay of Bengal Cyclone Corridor
          </div>
          <div className="landing-regions-list">
            {PILOT_REGIONS.map(r => (
              <div key={r.name} className="landing-region-chip">
                <div className="landing-region-flag">
                  <Globe size={14} color="#2563eb" />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '13px', color: '#0f172a' }}>{r.name}</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>{r.state}</div>
                </div>
                <span className="badge" style={{ background: r.riskColor + '18', color: r.riskColor, borderColor: r.riskColor + '44', fontSize: '10px' }}>
                  {r.risk}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="landing-features">
        <div className="landing-section-inner">
          <div className="landing-section-eyebrow">
            <Star size={13} />
            Platform Capabilities
          </div>
          <h2 className="landing-section-title">
            Every Tool for<br />
            <span className="landing-headline-accent">Anticipatory Action</span>
          </h2>
          <p className="landing-section-subtitle">
            Purpose-built modules for Disaster Management Officers, Municipal Dispatchers, and Utility Operators.
          </p>
          <div className="landing-features-grid">
            {FEATURES.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="landing-feature-card"
                  style={{ background: feat.bg, borderColor: feat.border, animationDelay: `${i * 0.07}s` }}
                >
                  <div className="landing-feature-header">
                    <div className="landing-feature-icon" style={{ background: feat.color + '18', color: feat.color }}>
                      <Icon size={19} />
                    </div>
                    <span className="badge" style={{ background: feat.color + '18', color: feat.color, borderColor: feat.color + '44', fontSize: '10px' }}>
                      {feat.badge}
                    </span>
                  </div>
                  <h3 className="landing-feature-title" style={{ color: feat.color }}>{feat.title}</h3>
                  <p className="landing-feature-desc">{feat.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="landing-workflow">
        <div className="landing-section-inner">
          <div className="landing-section-eyebrow">
            <Activity size={13} />
            Response Workflow
          </div>
          <h2 className="landing-section-title">
            Forecast to Field Action<br />
            in <span className="landing-headline-accent">4 Intelligent Steps</span>
          </h2>
          <div className="landing-workflow-steps">
            {WORKFLOW_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <React.Fragment key={step.number}>
                  <div className="landing-workflow-step">
                    <div className="landing-workflow-num">{step.number}</div>
                    <div className="landing-workflow-icon">
                      <Icon size={20} color="#2563eb" />
                    </div>
                    <div className="landing-workflow-title">{step.title}</div>
                    <div className="landing-workflow-desc">{step.description}</div>
                  </div>
                  {i < WORKFLOW_STEPS.length - 1 && (
                    <div className="landing-workflow-arrow" aria-hidden="true">
                      <ChevronRight size={22} color="#cbd5e1" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="landing-cta-section">
        <div className="landing-cta-inner">
          <div className="landing-section-eyebrow" style={{ justifyContent: 'center', color: '#93c5fd', marginBottom: '1rem' }}>
            <Waves size={13} />
            Ready to Activate
          </div>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem', lineHeight: 1.25 }}>
            Command Center Ready.<br />
            <span style={{ color: '#38bdf8' }}>Storm season is active.</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto 1.75rem', lineHeight: 1.6 }}>
            Project SURGE is live with real cyclone simulation data. Explore the full command center — no login required.
          </p>
          <button
            className="landing-cta-primary"
            style={{ fontSize: '1rem', padding: '0.85rem 1.75rem' }}
            onClick={onEnter}
          >
            <Zap size={18} />
            Launch SURGE Command Center
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-section-inner">
          <div className="landing-footer-inner">
            <div className="landing-footer-brand">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '6px' }}>
                <div style={{ width: '26px', height: '26px', borderRadius: '6px', background: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Waves size={14} color="#fff" />
                </div>
                <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a', fontFamily: 'var(--font-display)' }}>PROJECT SURGE</span>
              </div>
              <div style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.5 }}>
                Storm Understanding &amp; Resilience Guidance Engine<br />
                Bay of Bengal Anticipatory Climate Action Platform
              </div>
            </div>
            <div style={{ fontSize: '11px', color: '#94a3b8', textAlign: 'right' }}>
              <div style={{ marginBottom: '4px', color: '#475569', fontWeight: 600 }}>Integrated Agencies</div>
              <div>IMD · ECMWF · INCOIS · NASA GPM · GEE</div>
              <div style={{ marginTop: '8px' }}>© 2024 Project SURGE — Government Prototype</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
