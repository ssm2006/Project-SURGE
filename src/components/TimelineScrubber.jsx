import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, AlertOctagon, TrendingUp } from 'lucide-react';

export const TimelineScrubber = ({
  stages,
  activeStageKey,
  onChangeStage
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const stageKeys = ['72h', '48h', '24h', '12h'];

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        const currentIndex = stageKeys.indexOf(activeStageKey);
        const nextIndex = (currentIndex + 1) % stageKeys.length;
        onChangeStage(stageKeys[nextIndex]);
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeStageKey]);

  return (
    <div className="timeline-scrubber">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
        <button
          className={`btn ${isPlaying ? 'btn-danger' : 'btn-primary'}`}
          onClick={() => setIsPlaying(!isPlaying)}
          style={{ padding: '0.5rem 0.85rem' }}
          title={isPlaying ? 'Pause auto trajectory playback' : 'Play 72h to Landfall trajectory simulation'}
        >
          {isPlaying ? <Pause size={15} /> : <Play size={15} />}
          {isPlaying ? 'Pause Playback' : 'Simulate Trajectory'}
        </button>

        <button
          className="btn btn-secondary"
          onClick={() => onChangeStage('72h')}
          title="Reset to T-72h Inception"
          style={{ padding: '0.5rem 0.65rem' }}
        >
          <RotateCcw size={14} />
        </button>
      </div>

      {/* Trajectory Timeline Stages */}
      <div className="timeline-stages">
        {stageKeys.map((key) => {
          const stage = stages[key] || {};
          const isActive = activeStageKey === key;
          const isRed = key === '24h' || key === '12h';

          return (
            <button
              key={key}
              className={`stage-btn ${isActive ? 'active' : ''}`}
              onClick={() => {
                setIsPlaying(false);
                onChangeStage(key);
              }}
            >
              <div className="stage-time">
                <span>{stage.timestamp || `T - ${key}`}</span>
                {isRed && (
                  <span className="badge badge-red" style={{ fontSize: '9px', padding: '1px 4px' }}>
                    HIGH THREAT
                  </span>
                )}
              </div>
              <div className="stage-details">
                <b>Wind:</b> {stage.maxWindKmph || 0} km/h | <b>Surge:</b> {stage.surgePeakMeters || 0}m
              </div>
              <div style={{ fontSize: '10px', color: isActive ? '#38bdf8' : '#64748b', marginTop: '2px' }}>
                {stage.alertLevel}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
