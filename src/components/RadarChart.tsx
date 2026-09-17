import React from 'react';

interface RadarItem {
  axis: string;
  key: string;
  value: number;
  description: string;
}

interface RadarChartProps {
  data: RadarItem[];
}

export const RadarChart: React.FC<RadarChartProps> = ({ data }) => {
  const size = 320;
  const center = size / 2;
  const radius = 100;
  const count = data.length; // 6
  const angleStep = (Math.PI * 2) / count;

  // Grid levels: 25%, 50%, 75%, 100%
  const levels = [0.25, 0.5, 0.75, 1.0];

  // Helper to calculate coordinates
  const getCoordinates = (index: number, valPercent: number) => {
    // Start from top (-PI / 2)
    const angle = -Math.PI / 2 + index * angleStep;
    const r = radius * (valPercent / 100);
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y, angle };
  };

  // Generate polygon points for a given scale (e.g. 1.0 or actual values)
  const getPolygonPoints = (scale: number) => {
    return data
      .map((_, i) => {
        const { x, y } = getCoordinates(i, scale * 100);
        return `${x},${y}`;
      })
      .join(' ');
  };

  // User data polygon points
  const userPoints = data
    .map((item, i) => {
      const { x, y } = getCoordinates(i, item.value);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="w-full bg-[#FFFFFF] rounded-[20px] p-5 border border-[#F2E4E8] shadow-[0_4px_20px_rgba(239,168,184,0.06)]">
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className="text-xs tracking-wider text-[#777077] uppercase font-mono">Functioning Profile</span>
          <h4 className="text-base font-medium text-[#292529] mt-0.5">六维关系功能雷达</h4>
        </div>
      </div>

      <p className="text-xs text-[#777077] leading-relaxed mb-4">
        分值高低仅体现你在关系中的功能侧重点与互动习惯，并不代表优劣好坏。
      </p>

      <div className="flex justify-center items-center select-none py-2">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full max-w-[320px] h-auto overflow-visible"
          role="img"
          aria-label="六维关系功能雷达图"
        >
          {/* Background concentric grid levels */}
          {levels.map((lvl) => (
            <polygon
              key={lvl}
              points={getPolygonPoints(lvl)}
              fill={lvl === 1.0 ? '#FFF7F8' : 'none'}
              stroke="#F2E4E8"
              strokeWidth="1"
              strokeDasharray={lvl === 1.0 ? 'none' : '3 3'}
            />
          ))}

          {/* Radiating axes */}
          {data.map((_, i) => {
            const { x, y } = getCoordinates(i, 100);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="#F2E4E8"
                strokeWidth="1"
              />
            );
          })}

          {/* User Score Filled Polygon */}
          <polygon
            points={userPoints}
            fill="#FFF1F4"
            fillOpacity="0.85"
            stroke="#EFA8B8"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Axis Labels and User Score Dots */}
          {data.map((item, i) => {
            const userCoord = getCoordinates(i, item.value);
            const labelCoord = getCoordinates(i, 126);

            // Determine text anchor based on X position
            let anchor: 'middle' | 'start' | 'end' = 'middle';
            if (labelCoord.x < center - 15) anchor = 'end';
            else if (labelCoord.x > center + 15) anchor = 'start';

            return (
              <g key={item.key}>
                {/* Score Dot */}
                <circle
                  cx={userCoord.x}
                  cy={userCoord.y}
                  r="4"
                  fill="#FFFFFF"
                  stroke="#EFA8B8"
                  strokeWidth="2"
                />

                {/* Dimension label */}
                <text
                  x={labelCoord.x}
                  y={labelCoord.y - 3}
                  textAnchor={anchor}
                  fontSize="11"
                  fontWeight="600"
                  fill="#292529"
                >
                  {item.axis}
                </text>

                {/* Score badge */}
                <text
                  x={labelCoord.x}
                  y={labelCoord.y + 11}
                  textAnchor={anchor}
                  fontSize="10"
                  fontWeight="500"
                  fill="#777077"
                >
                  {item.value}分
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Axis breakdown details */}
      <div className="mt-4 grid grid-cols-2 gap-2 pt-3 border-t border-[#F2E4E8]">
        {data.map((item) => (
          <div key={item.key} className="p-2.5 rounded-[12px] bg-[#FFF7F8] border border-[#F2E4E8]/60">
            <div className="flex justify-between items-center mb-0.5">
              <span className="text-xs font-medium text-[#292529]">{item.axis}</span>
              <span className="text-xs font-semibold text-[#EFA8B8]">{item.value}</span>
            </div>
            <p className="text-[11px] text-[#777077] line-clamp-2 leading-snug">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
