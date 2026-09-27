import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Layers, Map as MapIcon, Globe } from 'lucide-react';

export const HazardMap = ({
  region,
  cyclone,
  stageKey,
  nodes = [],
  zones = [],
  selectedZone,
  onSelectZone,
  layerToggles = {
    surge: true,
    cone: true,
    infra: true,
    roads: true,
    sar: true
  }
}) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layersGroupRef = useRef(null);
  const tileLayerRef = useRef(null);

  // Map Basemap state: 'satellite' | 'street' | 'topo'
  const [baseMapType, setBaseMapType] = useState('satellite');

  // Tile layer URLs (100% Free, Public, NO API KEY REQUIRED)
  const TILE_PROVIDERS = {
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles &copy; Esri, Maxar, Earthstar Geographics',
      maxZoom: 18
    },
    street: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles &copy; Esri, HERE, DeLorme, USGS, Intermap',
      maxZoom: 19
    },
    topo: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles &copy; Esri, HERE, Garmin, Intermap',
      maxZoom: 19
    }
  };

  // Initialize Map safely
  useEffect(() => {
    if (!mapContainerRef.current) return;

    let map = mapInstanceRef.current;

    if (!map) {
      try {
        const center = region?.center || [19.8135, 85.8312];
        const zoom = region?.zoom || 11;

        map = L.map(mapContainerRef.current, {
          center,
          zoom,
          zoomControl: true,
          attributionControl: false
        });

        // Default Basemap: Esri World Imagery (Satellite)
        const provider = TILE_PROVIDERS[baseMapType] || TILE_PROVIDERS.satellite;
        tileLayerRef.current = L.tileLayer(provider.url, {
          maxZoom: provider.maxZoom,
          attribution: provider.attribution
        }).addTo(map);

        layersGroupRef.current = L.layerGroup().addTo(map);
        mapInstanceRef.current = map;

        setTimeout(() => {
          if (mapInstanceRef.current) {
            mapInstanceRef.current.invalidateSize();
          }
        }, 300);
      } catch (err) {
        console.warn('Map initialization error:', err);
      }
    }

    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (e) {
          console.warn('Map removal error:', e);
        }
        mapInstanceRef.current = null;
        layersGroupRef.current = null;
        tileLayerRef.current = null;
      }
    };
  }, []);

  // Update Basemap when baseMapType changes
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;

    try {
      const provider = TILE_PROVIDERS[baseMapType];
      mapInstanceRef.current.removeLayer(tileLayerRef.current);

      tileLayerRef.current = L.tileLayer(provider.url, {
        maxZoom: provider.maxZoom,
        attribution: provider.attribution
      }).addTo(mapInstanceRef.current);

      if (layersGroupRef.current) {
        layersGroupRef.current.bringToFront();
      }
    } catch (err) {
      console.warn('Basemap update error:', err);
    }
  }, [baseMapType]);

  // Update map view when region changes
  useEffect(() => {
    if (mapInstanceRef.current && region?.center) {
      try {
        mapInstanceRef.current.setView(region.center, region.zoom || 11, { animate: true });
        setTimeout(() => {
          if (mapInstanceRef.current) {
            mapInstanceRef.current.invalidateSize();
          }
        }, 200);
      } catch (err) {
        console.warn('SetView error:', err);
      }
    }
  }, [region]);

  // Redraw layers when data or stage changes
  useEffect(() => {
    if (!mapInstanceRef.current || !layersGroupRef.current) return;

    try {
      const layerGroup = layersGroupRef.current;
      layerGroup.clearLayers();

      const stage = cyclone?.stages?.[stageKey] || cyclone?.stages?.['24h'] || {};
      const regCenter = region?.center || [19.8135, 85.8312];

      // 1. Draw GEE SAR Satellite Water / Storm Surge Contours (FR-1.1 & FR-2.1)
      if (layerToggles?.surge && stage.surgePeakMeters > 0) {
        const surgeCoords = [
          [regCenter[0] - 0.25, regCenter[1] - 0.20],
          [regCenter[0] - 0.05, regCenter[1] + 0.15],
          [regCenter[0] + 0.18, regCenter[1] + 0.45],
          [regCenter[0] + 0.22, regCenter[1] + 0.40],
          [regCenter[0] + 0.05, regCenter[1] + 0.05],
          [regCenter[0] - 0.15, regCenter[1] - 0.15]
        ];

        const surgeColor = stage.surgePeakMeters > 3.0 ? '#dc2626' : stage.surgePeakMeters > 2.0 ? '#ea580c' : '#0284c7';

        const surgePolygon = L.polygon(surgeCoords, {
          color: surgeColor,
          weight: 3,
          fillColor: surgeColor,
          fillOpacity: 0.42,
          dashArray: '5, 5'
        }).bindTooltip(`<b>Storm Surge Hazard Extent</b><br/>Peak Surge: ${stage.surgePeakMeters}m<br/>Inundation Depth: 1.2m - 3.8m ASL`, {
          sticky: true
        });
        layerGroup.addLayer(surgePolygon);
      }

      // 2. Draw Uncertainty Cone (FR-3.4)
      if (layerToggles?.cone && stage.cone) {
        const conePolygon = L.polygon(stage.cone, {
          color: '#2563eb',
          weight: 2,
          fillColor: '#3b82f6',
          fillOpacity: 0.22,
          dashArray: '6, 6'
        }).bindTooltip(`<b>Track Uncertainty Cone (68% CI)</b><br/>Radius: ±${stage.uncertaintyRadiusKm} km`, {
          sticky: true
        });
        layerGroup.addLayer(conePolygon);
      }

      // 3. Draw Cyclone Center / Eye
      if (stage.trackPoint) {
        const cycloneIcon = L.divIcon({
          className: 'custom-cyclone-icon',
          html: `
            <div style="position: relative; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center;">
              <div style="position: absolute; width: 48px; height: 48px; border: 3px dashed #ef4444; border-radius: 50%; animation: radar-sweep 4s linear infinite;"></div>
              <div style="position: absolute; width: 26px; height: 26px; background: rgba(220, 38, 38, 0.4); border-radius: 50%; box-shadow: 0 0 15px #dc2626;"></div>
              <div style="width: 12px; height: 12px; background: #ffffff; border: 2px solid #b91c1c; border-radius: 50%;"></div>
            </div>
          `,
          iconSize: [48, 48],
          iconAnchor: [24, 24]
        });

        const eyeMarker = L.marker(stage.trackPoint, { icon: cycloneIcon })
          .bindPopup(`
            <div style="font-family: -apple-system, sans-serif; color: #0f172a; padding: 6px;">
              <strong style="color: #dc2626; font-size: 14px;">${cyclone?.name || 'Active Cyclone'}</strong><br/>
              <b>Intensity:</b> ${cyclone?.category || 'Severe Storm'}<br/>
              <b>Central Pressure:</b> ${stage.centralPressure} hPa<br/>
              <b>Max Sustained Wind:</b> ${stage.maxWindKmph} km/h (${(stage.maxWindKmph / 1.852).toFixed(0)} kts)<br/>
              <b>Peak Surge:</b> ${stage.surgePeakMeters}m<br/>
              <b>Stage:</b> ${stage.timestamp}
            </div>
          `);
        layerGroup.addLayer(eyeMarker);
      }

      // 4. Draw Arterial Evacuation Roads (FR-3.1)
      if (layerToggles?.roads) {
        const roadCoords = [
          [19.8135, 85.8312],
          [19.8350, 85.8600],
          [19.8700, 85.9800],
          [19.8920, 86.0940],
          [19.9820, 86.2650]
        ];

        const roadPolyline = L.polyline(roadCoords, {
          color: '#d97706',
          weight: 4,
          opacity: 0.95
        }).bindTooltip('<b>Arterial Evacuation Corridor (NH-316 / Marine Drive)</b><br/>Status: Kushabhadra Causeway Cut-off Point', {
          sticky: true
        });
        layerGroup.addLayer(roadPolyline);
      }

      // 5. Draw Critical Infrastructure Nodes & Cascade Status (FR-3.1 & FR-3.2)
      if (layerToggles?.infra && Array.isArray(nodes)) {
        nodes.forEach(node => {
          let iconBg = '#059669';
          let iconSymbol = '📍';
          let borderGlow = '0 2px 6px rgba(0,0,0,0.3)';

          if (node.status === 'inundated-breached' || node.status === 'structural-failure') {
            iconBg = '#dc2626';
            iconSymbol = '⚠️';
            borderGlow = '0 0 10px rgba(220, 38, 38, 0.7)';
          } else if (node.status === 'critical-flooding' || node.isolated) {
            iconBg = '#ea580c';
            iconSymbol = '⛔';
            borderGlow = '0 0 8px rgba(234, 88, 12, 0.6)';
          } else if (node.status === 'warning' || node.powerLost) {
            iconBg = '#d97706';
            iconSymbol = '⚡';
            borderGlow = '0 0 6px rgba(217, 119, 6, 0.6)';
          }

          if (node.type === 'shelter') iconSymbol = '🏠';
          if (node.type === 'substation') iconSymbol = '⚡';
          if (node.type === 'bridge') iconSymbol = '🌉';
          if (node.type === 'hospital') iconSymbol = '🏥';
          if (node.type === 'water') iconSymbol = '💧';

          const customIcon = L.divIcon({
            className: 'custom-node-icon',
            html: `
              <div style="
                width: 32px;
                height: 32px;
                background: ${iconBg};
                border: 2px solid #ffffff;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: ${borderGlow};
                font-size: 14px;
                color: #fff;
                cursor: pointer;
              ">
                ${iconSymbol}
              </div>
            `,
            iconSize: [32, 32],
            iconAnchor: [16, 16]
          });

          const marker = L.marker(node.coordinates, { icon: customIcon })
            .bindPopup(`
              <div style="font-family: -apple-system, sans-serif; color: #0f172a; min-width: 230px; padding: 4px;">
                <strong style="color: #1e40af; font-size: 14px;">${node.name}</strong><br/>
                <div style="margin: 4px 0; padding: 2px 8px; background: ${iconBg}; color: #fff; font-size: 10px; font-weight: bold; border-radius: 4px; display: inline-block;">
                  STATUS: ${node.status?.toUpperCase() || 'NORMAL'}
                </div><br/>
                ${node.isolated ? `<p style="color: #dc2626; font-size: 12px; margin: 4px 0;"><strong>${node.isolationReason || 'Cut off from road network'}</strong></p>` : ''}
                ${node.cascadeDescription ? `<p style="font-size: 12px; color: #475569; margin: 4px 0;">${node.cascadeDescription}</p>` : ''}
                ${node.capacity ? `<b>Shelter Capacity:</b> ${node.capacity} persons<br/><b>Current Occupancy:</b> ${node.currentOccupancy}<br/>` : ''}
                ${node.elevationMeters ? `<b>Elevation:</b> ${node.elevationMeters}m ASL<br/>` : ''}
                ${node.repairCrewAssigned ? `<b>Assigned Crew:</b> ${node.repairCrewAssigned}` : ''}
              </div>
            `);
          layerGroup.addLayer(marker);
        });
      }

      // 6. Draw Vulnerability Zones
      if (Array.isArray(zones)) {
        zones.forEach(zone => {
          const isSelected = selectedZone && selectedZone.id === zone.id;
          const zoneCircle = L.circle(zone.coordinates, {
            radius: 3500,
            color: isSelected ? '#2563eb' : zone.compositeRiskScore > 85 ? '#dc2626' : '#d97706',
            weight: isSelected ? 3 : 2,
            fillColor: zone.compositeRiskScore > 85 ? '#dc2626' : '#d97706',
            fillOpacity: isSelected ? 0.35 : 0.20
          }).on('click', () => {
            if (onSelectZone) onSelectZone(zone);
          }).bindTooltip(`<b>${zone.name}</b><br/>Composite Risk: <b>${zone.compositeRiskScore}/100</b> (${zone.confidenceBand})<br/>Population: ${zone.populationTotal.toLocaleString()}`, {
            sticky: true
          });

          layerGroup.addLayer(zoneCircle);
        });
      }

    } catch (err) {
      console.warn('Layer rendering error caught:', err);
    }

  }, [region, cyclone, stageKey, nodes, zones, selectedZone, layerToggles]);

  return (
    <div className="map-wrapper" style={{ position: 'relative', width: '100%', minHeight: '480px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-medium)' }}>
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%', minHeight: '480px' }} />

      {/* Map Basemap Switcher (Satellite vs Streets vs Topo) */}
      <div className="map-basemap-controls" style={{
        position: 'absolute',
        top: '12px',
        left: '12px',
        zIndex: 500,
        background: '#ffffff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        borderRadius: '8px',
        padding: '4px',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        border: '1px solid #cbd5e1'
      }}>
        <button
          className={`btn-basemap ${baseMapType === 'satellite' ? 'active' : ''}`}
          onClick={() => setBaseMapType('satellite')}
          title="Satellite Imagery (Esri World Imagery - No API key needed)"
        >
          <Globe size={13} />
          <span>Satellite</span>
        </button>

        <button
          className={`btn-basemap ${baseMapType === 'street' ? 'active' : ''}`}
          onClick={() => setBaseMapType('street')}
          title="Street Map (Esri World Street Map - No API key needed)"
        >
          <MapIcon size={13} />
          <span>Street</span>
        </button>

        <button
          className={`btn-basemap ${baseMapType === 'topo' ? 'active' : ''}`}
          onClick={() => setBaseMapType('topo')}
          title="Topographic Relief (Esri World Topo - No API key needed)"
        >
          <Layers size={13} />
          <span>Terrain</span>
        </button>
      </div>

      {/* Map HUD Legend */}
      <div className="map-hud-overlay" style={{
        position: 'absolute',
        bottom: '12px',
        left: '12px',
        zIndex: 500,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        border: '1px solid #cbd5e1',
        borderRadius: '8px',
        padding: '8px 12px',
        fontSize: '11px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        maxWidth: '300px'
      }}>
        <div style={{ fontWeight: 700, color: '#1e40af', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span>STORM DIGITAL TWIN</span>
          <span style={{ fontSize: '10px', color: '#64748b' }}>NO API KEY REQ</span>
        </div>
        <div style={{ fontSize: '11px', color: '#334155', lineHeight: '1.4' }}>
          <div>🔴 <b>Red Zones:</b> High Risk &gt;85 | Kutcha &gt;60%</div>
          <div>⛔ <b>Bridges/Shelters:</b> Inundation / Isolated</div>
          <div>⚡ <b>Substations:</b> Flood &amp; Wind trip vulnerability</div>
        </div>
      </div>
    </div>
  );
};
