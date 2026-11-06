:root {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #edf4ff;
  background:
    radial-gradient(circle at top, rgba(83, 134, 255, 0.22), transparent 35%),
    linear-gradient(180deg, #061320 0%, #0b1a2a 100%);
  line-height: 1.5;
  font-weight: 400;
  color-scheme: dark;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

html, body, #root {
  margin: 0;
  width: 100%;
  min-height: 100%;
  min-height: 100vh;
}

body {
  min-height: 100vh;
}

button, input {
  font: inherit;
}

.app-shell {
  padding: 32px 32px 48px;
  min-height: 100vh;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 20px;
}

.eyebrow {
  margin: 0 0 8px;
  font-size: 0.7rem;
  letter-spacing: 0.16em;
  color: #9bb5d8;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  font-size: clamp(2rem, 3vw, 3rem);
  letter-spacing: -0.04em;
}

.header-pill {
  padding: 10px 16px;
  border-radius: 999px;
  background: rgba(103, 166, 255, 0.16);
  border: 1px solid rgba(155, 197, 255, 0.3);
  color: #dfefff;
  font-size: 0.85rem;
}

.main-layout {
  display: grid;
  grid-template-columns: minmax(520px, 1.6fr) minmax(320px, 0.9fr);
  gap: 24px;
}

.globe-panel,
.info-panel {
  border: 1px solid rgba(142, 181, 255, 0.22);
  background: rgba(8, 17, 29, 0.65);
  border-radius: 22px;
  box-shadow: 0 18px 40px rgba(2, 10, 18, 0.35);
}

.globe-panel {
  padding: 20px;
}

.panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.label {
  display: inline-block;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #8fa8c8;
}

h2 {
  margin: 6px 0 0;
  font-size: clamp(1.4rem, 2vw, 2.3rem);
}

.legend {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
  color: #aac4e3;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.dot-gold {
  background: linear-gradient(135deg, #f4d35e, #ff9f1c);
}

.canvas-wrap {
  width: 100%;
  height: 680px;
  border-radius: 18px;
  overflow: hidden;
  background: radial-gradient(circle at center, rgba(19, 77, 129, 0.28), rgba(4, 12, 19, 0.9));
  border: 1px solid rgba(155, 197, 255, 0.18);
}

.info-panel {
  padding: 18px 18px 20px;
}

.timeline-block {
  background: rgba(14, 23, 36, 0.8);
  border: 1px solid rgba(142, 181, 255, 0.18);
  border-radius: 18px;
  padding: 14px 14px 10px;
}

.slider-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

input[type='range'] {
  width: 100%;
  accent-color: #7ec8ff;
}

.timeline-marks {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 10px;
  max-height: 110px;
  overflow: hidden;
}

.mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 58px;
  padding: 4px 7px;
  border-radius: 999px;
  font-size: 0.62rem;
  background: rgba(143, 163, 186, 0.09);
  color: #b9d0ee;
  border: 1px solid transparent;
}

.mark.selected {
  border-color: rgba(126, 200, 255, 0.7);
  background: rgba(126, 200, 255, 0.12);
}

.civilization-card {
  margin-top: 18px;
  padding: 18px 16px;
  border-radius: 18px;
  border: 1px solid rgba(142, 181, 255, 0.18);
  background: rgba(12, 19, 31, 0.8);
}

.card-topline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: #a9c1dd;
  font-size: 0.74rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.civilization-card h3 {
  margin: 12px 0 8px;
  font-size: clamp(1.4rem, 2vw, 2rem);
}

.civilization-card p {
  margin: 0;
  color: #cfe2ff;
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-top: 18px;
}

.stat-grid > div {
  padding: 12px 10px;
  border-radius: 12px;
  background: rgba(116, 150, 192, 0.08);
  border: 1px solid rgba(118, 144, 185, 0.15);
}

.stat-grid span {
  display: block;
  font-size: 0.7rem;
  color: #a5bad8;
}

.stat-grid strong {
  display: block;
  margin-top: 6px;
  font-size: 1rem;
}

.achievement-list {
  margin: 18px 0 0;
  padding-left: 18px;
  color: #e5efff;
}

.achievement-list li + li {
  margin-top: 8px;
}

.active-list {
  margin-top: 18px;
  padding: 16px;
  border-radius: 18px;
  border: 1px solid rgba(142, 181, 255, 0.18);
  background: rgba(12, 19, 31, 0.8);
}

.active-list h4 {
  margin: 0 0 12px;
  font-size: 1rem;
}

.active-list ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.active-list li + li {
  margin-top: 8px;
}

.active-list button {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid transparent;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.02);
  color: #edf4ff;
  padding: 10px 12px;
  cursor: pointer;
  text-align: left;
  transition: 0.2s ease;
}

.active-list button:hover,
.active-list button.active {
  background: rgba(125, 166, 255, 0.12);
  border-color: rgba(125, 166, 255, 0.25);
}

.nav-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.empty-state {
  margin: 0;
  color: #b6c9e6;
}

.globe-tag {
  background: rgba(12, 22, 36, 0.84);
  border: 1px solid rgba(150, 193, 255, 0.4);
  border-radius: 999px;
  padding: 5px 8px;
  color: #eef7ff;
  font-size: 11px;
  letter-spacing: 0.02em;
  white-space: nowrap;
  transform: translateY(-10px);
}

@media (max-width: 980px) {
  .app-shell {
    padding: 20px 18px 26px;
  }

  .main-layout {
    grid-template-columns: 1fr;
  }

  .canvas-wrap {
    height: 500px;
  }
}
