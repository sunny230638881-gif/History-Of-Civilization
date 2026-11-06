import { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

type Civilization = {
  id: string;
  name: string;
  region: string;
  start: number;
  end: number;
  lat: number;
  lng: number;
  influence: number;
  summary: string;
  achievements: string[];
  color: string;
  eraLabel: string;
};

const civilizations: Civilization[] = [
  {
    id: 'mesopotamia',
    name: '美索不达米亚文明',
    region: '两河流域',
    start: -3500,
    end: -539,
    lat: 32.5,
    lng: 44.4,
    influence: 0.92,
    summary: '城市国家、文字、法制与灌溉文明的起源地。',
    achievements: ['楔形文字', '城邦制度', '大型灌溉网络'],
    color: '#f4d35e',
    eraLabel: '古代近东',
  },
  {
    id: 'egypt',
    name: '古埃及文明',
    region: '尼罗河流域',
    start: -3100,
    end: -30,
    lat: 26.8,
    lng: 30.8,
    influence: 0.88,
    summary: '尼罗河农业文明，建立集中国家和建造纪念性建筑。',
    achievements: ['金字塔', '天文学', '纸草书写'],
    color: '#7bdff2',
    eraLabel: '古代埃及',
  },
  {
    id: 'indus',
    name: '印度河文明',
    region: '南亚',
    start: -3300,
    end: -1300,
    lat: 28.6,
    lng: 77.2,
    influence: 0.73,
    summary: '城市规划成熟、贸易网络发达。',
    achievements: ['城市排水系统', '标准化砖制结构', '活跃贸易'],
    color: '#b8f2e6',
    eraLabel: '早期南亚',
  },
  {
    id: 'china',
    name: '中国文明',
    region: '黄河与长江流域',
    start: -1600,
    end: 2025,
    lat: 39.9,
    lng: 116.4,
    influence: 0.99,
    summary: '以王朝更替、科技创新与制度连续性著称。',
    achievements: ['青铜器文明', '造纸术', '科举制度'],
    color: '#ff9f1c',
    eraLabel: '华夏文明',
  },
  {
    id: 'greece',
    name: '希腊文明',
    region: '爱琴海',
    start: -800,
    end: -31,
    lat: 37.98,
    lng: 23.73,
    influence: 0.76,
    summary: '城邦政治、哲学与艺术开创了西方思想传统。',
    achievements: ['民主制度', '哲学', '奥林匹克'],
    color: '#c0c0c0',
    eraLabel: '古典世界',
  },
  {
    id: 'rome',
    name: '罗马文明',
    region: '地中海',
    start: -753,
    end: 476,
    lat: 41.9,
    lng: 12.5,
    influence: 0.84,
    summary: '法制、道路与城市治理扩展了帝国秩序。',
    achievements: ['罗马法', '道路网络', '工程技术'],
    color: '#d90429',
    eraLabel: '帝国时代',
  },
  {
    id: 'islamic',
    name: '伊斯兰文明',
    region: '阿拉伯世界',
    start: 622,
    end: 1500,
    lat: 24.7,
    lng: 46.7,
    influence: 0.9,
    summary: '知识传承、医学与数学在中世纪世界中占据中心地位。',
    achievements: ['代数', '医学体系', '图书馆文化'],
    color: '#6d597a',
    eraLabel: '中世纪世界',
  },
  {
    id: 'maya',
    name: '玛雅文明',
    region: '中美洲',
    start: -2000,
    end: 1697,
    lat: 17.0,
    lng: -89.1,
    influence: 0.7,
    summary: '复杂历法和城市文明在中美洲极为发达。',
    achievements: ['玛雅历法', '天文学', '城市神庙'],
    color: '#a0c4ff',
    eraLabel: '中美洲文明',
  },
  {
    id: 'aztec',
    name: '阿兹特克文明',
    region: '墨西哥高原',
    start: 1325,
    end: 1521,
    lat: 19.4,
    lng: -99.1,
    influence: 0.68,
    summary: '高度组织的城市国家与农业体系。',
    achievements: ['梯田农业', '城市规划', '宗教帝国'],
    color: '#f72585',
    eraLabel: '新世界帝国',
  },
  {
    id: 'inca',
    name: '印加文明',
    region: '安第斯山脉',
    start: 1438,
    end: 1533,
    lat: -13.5,
    lng: -71.9,
    influence: 0.67,
    summary: '山地城市和道路系统支撑了庞大帝国。',
    achievements: ['高山农业', '石制道路', '国家管理'],
    color: '#ffd166',
    eraLabel: '安第斯帝国',
  },
  {
    id: 'europe',
    name: '欧洲文明扩张',
    region: '西欧与地中海',
    start: 1000,
    end: 1800,
    lat: 47.5,
    lng: 2.2,
    influence: 0.81,
    summary: '海洋航海、殖民扩张与工业资本主义推动全球化。',
    achievements: ['工业革命', '海上贸易', '殖民网络'],
    color: '#70e000',
    eraLabel: '近代欧洲',
  },
];

const minYear = -3500;
const maxYear = 2000;

function formatYear(year: number) {
  const isBce = year < 0;
  const absolute = Math.abs(year);
  return `${absolute} ${isBce ? 'BCE' : 'CE'}`;
}

function latLonToVector3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function Earth({ activeCivilizations, activeId, onSelect }: {
  activeCivilizations: Civilization[];
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.18;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[2.6, 64, 64]} />
        <meshStandardMaterial
          color="#0f2542"
          emissive="#1d4a77"
          emissiveIntensity={0.25}
          metalness={0.15}
          roughness={0.9}
        />
      </mesh>

      <mesh scale={1.06}>
        <sphereGeometry args={[2.62, 32, 32]} />
        <meshStandardMaterial color="#77ccff" transparent opacity={0.12} />
      </mesh>

      {activeCivilizations.map((civilization) => {
        const pos = latLonToVector3(civilization.lat, civilization.lng, 2.9);
        const isActive = civilization.id === activeId;

        return (
          <group key={civilization.id} position={pos}>
            <mesh
              onClick={(event) => {
                event.stopPropagation();
                onSelect(civilization.id);
              }}
              castShadow
              receiveShadow
            >
              <sphereGeometry args={[isActive ? 0.11 : 0.075 + civilization.influence * 0.03, 18, 18]} />
              <meshStandardMaterial
                color={civilization.color}
                emissive={civilization.color}
                emissiveIntensity={isActive ? 1.2 : 0.7}
              />
            </mesh>

            {isActive && (
              <Html position={[0, 0.24, 0]} center>
                <div className="globe-tag">{civilization.name}</div>
              </Html>
            )}
          </group>
        );
      })}

      <Stars radius={60} depth={20} count={2000} factor={4} fade speed={1} />
      <OrbitControls enablePan={false} enableZoom={true} minDistance={5} maxDistance={12} />
    </group>
  );
}

export default function App() {
  const [selectedYear, setSelectedYear] = useState(-3000);
  const [activeId, setActiveId] = useState<string | null>('mesopotamia');

  const activeCivilizations = useMemo(
    () => civilizations.filter((civilization) => selectedYear >= civilization.start && selectedYear <= civilization.end),
    [selectedYear],
  );

  const activeCivilization =
    civilizations.find((civilization) => civilization.id === activeId) ??
    activeCivilizations[0] ??
    civilizations[0];

  const timelineStops = useMemo(() => {
    const points: number[] = [];
    for (let year = minYear; year <= maxYear; year += 250) {
      points.push(year);
    }
    return points;
  }, []);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">CIVILIZATION TIMELINE</p>
          <h1>History of Civilization</h1>
        </div>
        <div className="header-pill">Interactive World Atlas</div>
      </header>

      <main className="main-layout">
        <section className="globe-panel">
          <div className="panel-head">
            <div>
              <span className="label">Current Year</span>
              <h2>{formatYear(selectedYear)}</h2>
            </div>
            <div className="legend">
              <span className="dot dot-gold" />
              <span>influence</span>
            </div>
          </div>

          <div className="canvas-wrap">
            <Canvas camera={{ position: [0, 0, 8], fov: 42 }}>
              <ambientLight intensity={0.7} />
              <directionalLight position={[5, 3, 5]} intensity={1.4} color="#ffffff" />
              <Earth
                activeCivilizations={activeCivilizations}
                activeId={activeId}
                onSelect={setActiveId}
              />
            </Canvas>
          </div>
        </section>

        <aside className="info-panel">
          <div className="timeline-block">
            <div className="slider-header">
              <span className="label">Timeline</span>
              <strong>{formatYear(selectedYear)}</strong>
            </div>
            <input
              type="range"
              min={minYear}
              max={maxYear}
              step={10}
              value={selectedYear}
              onChange={(event) => setSelectedYear(Number(event.target.value))}
            />
            <div className="timeline-marks">
              {timelineStops.map((year) => (
                <span key={year} className={selectedYear === year ? 'mark selected' : 'mark'}>
                  {year < 0 ? `${Math.abs(year)} BCE` : `${year} CE`}
                </span>
              ))}
            </div>
          </div>

          <div className="civilization-card">
            <div className="card-topline">
              <span className="era">{activeCivilization.eraLabel}</span>
              <span className="region">{activeCivilization.region}</span>
            </div>
            <h3>{activeCivilization.name}</h3>
            <p>{activeCivilization.summary}</p>

            <div className="stat-grid">
              <div>
                <span>Start</span>
                <strong>{formatYear(activeCivilization.start)}</strong>
              </div>
              <div>
                <span>End</span>
                <strong>{formatYear(activeCivilization.end)}</strong>
              </div>
              <div>
                <span>Influence</span>
                <strong>{Math.round(activeCivilization.influence * 100)}%</strong>
              </div>
            </div>

            <ul className="achievement-list">
              {activeCivilization.achievements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="active-list">
            <h4>At this time</h4>
            {activeCivilizations.length > 0 ? (
              <ul>
                {activeCivilizations.map((civilization) => (
                  <li key={civilization.id}>
                    <button className={civilization.id === activeId ? 'active' : ''} onClick={() => setActiveId(civilization.id)}>
                      <span className="nav-dot" style={{ backgroundColor: civilization.color }} />
                      {civilization.name}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty-state">No major civilization known at this date yet.</p>
            )}
          </div>
        </aside>
      </main>
    </div>
  );
}
