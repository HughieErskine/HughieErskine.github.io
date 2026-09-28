# Hughie Erskine // Personal Terminal & Flight Deck

> Indie Hacker • Aeronautics • Quantitative Finance • Building VectorVFR

An immersive single-page website crafted with a high-altitude sunset atmospheric aesthetic, retro-futuristic cockpit HUD, procedural twilight canvas, and tactile avionics controls.

---

## ✈️ Key Features & Interactive Elements

1. **High-Altitude Sunset Canvas (`sky-canvas.js`)**:
   - Dynamic atmospheric color gradient (stratospheric indigo &rarr; twilight magenta &rarr; solar ember &rarr; horizon gold).
   - Sinking sunset sun with coronal scattering and horizon beam glints.
   - Low-deck twilight clouds drifting gently with airspeed vector.
   - High-altitude twinkling starfield.
   - **Interactive Flight Stick Simulation**: Cursor movement gently banks and pitches the artificial horizon.
   - **Clickable VFR Waypoint Plotter**: Click anywhere on the horizon to drop interactive navigation waypoints (`WP01`, `WP02`, etc.) with calculated nautical miles and magnetic bearing.

2. **Aviation Head-Up Display (HUD)**:
   - Authentic collimated flight director: waterline boresight, pitch ladder with negative dashed bars, roll indicator arc, and top heading tape.
   - Toggle on/off at any time with the `HUD` button in the top telemetry bar (or press `H`).

3. **Retro Space & Tech Aesthetics**:
   - Authentic CRT scanlines and RGB shadow mask filter (toggleable with `CRT` button or `C`).
   - Radar sweep avatar animation with live beacon status.
   - Phosphor amber, cyan, and emerald glowing telemetry indicators.

4. **Web Audio Cockpit Synthesizer (`app.js`)**:
   - Zero audio file downloads: 100% synthesized through the Web Audio API.
   - Subtle, warm low-frequency cockpit air rumble + 400Hz aerospace transformer AC hum.
   - Tactile mechanical switch click sounds and aviation dual-tone chimes.
   - Toggle sound anytime via the `AMB` button in the telemetry bar.

5. **Aeronautical & Finance Content Panels**:
   - **VectorVFR Flight Planner**: Features an interactive in-browser VFR mini-calculator (calculates Wind Correction Angle [WCA], Groundspeed [GS], and Estimated Time Enroute [ETE] from TAS and winds aloft).
   - **Finance & Quantitative Notes**: Deep dives into capital runway vs. Point of No Return (PNR), market microstructures, and asymmetric payoff geometry for bootstrapped makers.
   - **Aeronautics & Systems Hangar**: Avionics design philosophy, METAR/TAF weather parsing pipelines, and WebGL flight decks.
   - **Transmission / Contact**: One-click radio frequency copy with tactile feedback.
   - **Direct 𝕏 / Twitter link**: Connects to `@hughie_erskine`.

---

## 🚀 Running & Previewing Locally

Because this project is built entirely with modern vanilla HTML5, CSS3, and JavaScript, **no build step, bundler, or dependencies are required**.

### Option 1: Direct File Open
Double-click `index.html` in your file finder or open it directly in Safari, Chrome, Edge, or Firefox.

### Option 2: Local HTTP Server (Recommended)
From this directory, run:
```bash
python3 -m http.server 8080
```
Then visit [http://localhost:8080](http://localhost:8080) in your web browser.

---

## 🛠️ File Structure
```
├── index.html        # Semantic single-page layout & modal overlays
├── style.css         # Glassmorphism, CRT scanlines, sunset palette & responsive styles
├── sky-canvas.js     # 60 FPS interactive sunset canvas & collimated HUD engine
├── app.js            # Telemetry clock, Web Audio synthesizer & VFR calculator
└── README.md         # Documentation & guide
```
