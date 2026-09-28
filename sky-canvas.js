/**
 * HUGHIE ERSKINE // SKY CANVAS ENGINE
 * High-Altitude Sunset, Cloud Deck, Twilight Starfield, and Cockpit HUD Overlay
 */

(function () {
  'use strict';

  const canvas = document.getElementById('sky-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Display state
  let width = 0;
  let height = 0;
  let dpr = 1;
  let showHud = true;

  // Aircraft Flight Telemetry State
  const flight = {
    pitch: 0,        // degrees (-15 to +15)
    roll: 0,         // degrees (-25 to +25)
    targetPitch: 0,
    targetRoll: 0,
    heading: 278,    // Flying into the sunset west
    altitude: 8500,  // ft MSL
    airspeed: 124,   // knots
    verticalSpeed: 0,
    time: 0,
  };

  // Starfield in upper atmosphere
  const stars = [];
  const NUM_STARS = 140;

  // Cloud layers (stratus deck at twilight)
  const clouds = [];
  const NUM_CLOUDS = 24;

  // User-created VFR Waypoints
  const waypoints = [
    { name: 'KSFO', xRatio: 0.22, yRatio: 0.58, nm: 28.4, brg: 262 },
    { name: 'WP-SUNSET', xRatio: 0.51, yRatio: 0.49, nm: 54.0, brg: 278 },
    { name: 'KMRY', xRatio: 0.78, yRatio: 0.62, nm: 36.8, brg: 148 },
  ];

  function initStars() {
    stars.length = 0;
    for (let i = 0; i < NUM_STARS; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random() * 0.48, // mostly upper stratosphere
        size: Math.random() * 1.5 + 0.6,
        alpha: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }
  }

  function initClouds() {
    clouds.length = 0;
    for (let i = 0; i < NUM_CLOUDS; i++) {
      clouds.push({
        x: Math.random() * 1.4 - 0.2,
        y: 0.65 + Math.random() * 0.28,
        radiusX: Math.random() * 140 + 80,
        radiusY: Math.random() * 40 + 20,
        speed: (Math.random() * 0.0003 + 0.00015),
        alpha: Math.random() * 0.35 + 0.2,
        tint: Math.random() > 0.4 ? 'sunset' : 'shadow',
      });
    }
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.scale(dpr, dpr);
  }

  window.addEventListener('resize', resize);
  resize();
  initStars();
  initClouds();

  // Mouse & Gyro Parallax (Cockpit Stick response)
  window.addEventListener('mousemove', (e) => {
    const normX = (e.clientX / width) - 0.5;
    const normY = (e.clientY / height) - 0.5;
    flight.targetRoll = normX * 18;      // Bank up to 18 deg
    flight.targetPitch = -normY * 12;    // Pitch up to 12 deg
  });

  // Click on canvas to drop a custom VFR Waypoint
  canvas.addEventListener('click', (e) => {
    // Only register waypoint clicks if clicking outside modal/center console
    const consoleEl = document.getElementById('pilot-console');
    if (consoleEl) {
      const rect = consoleEl.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        return; // Clicked on card, do not plot
      }
    }

    const clickXRatio = e.clientX / width;
    const clickYRatio = e.clientY / height;
    const wpIndex = waypoints.length + 1;
    const wpName = `WP${wpIndex < 10 ? '0' + wpIndex : wpIndex}`;
    const calculatedDist = (Math.hypot(clickXRatio - 0.5, clickYRatio - 0.5) * 80 + 10).toFixed(1);
    const calculatedBrg = Math.floor((Math.atan2(clickXRatio - 0.5, -(clickYRatio - 0.5)) * 180 / Math.PI + 360) % 360);

    waypoints.push({
      name: wpName,
      xRatio: clickXRatio,
      yRatio: clickYRatio,
      nm: parseFloat(calculatedDist),
      brg: calculatedBrg,
    });

    // Notify user
    showWaypointToast(`WAYPOINT ${wpName} PLOTTED // ${calculatedDist} NM • BRG ${calculatedBrg}°`);
  });

  function showWaypointToast(text) {
    const toast = document.getElementById('waypointToast');
    const msg = document.getElementById('toastMessage');
    if (toast && msg) {
      msg.textContent = text;
      toast.classList.add('active');
      clearTimeout(toast._timer);
      toast._timer = setTimeout(() => {
        toast.classList.remove('active');
      }, 3500);
    }
  }

  // Draw High-Altitude Sunset Sky Gradient
  function drawSky() {
    const horizonY = height * 0.56 + (flight.pitch * 3.5);
    
    // Multi-stop Twilight/Sunset atmospheric gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
    skyGrad.addColorStop(0.00, '#06020f'); // Deep stratosphere void
    skyGrad.addColorStop(0.22, '#180a2b'); // Night boundary
    skyGrad.addColorStop(0.42, '#3f1242'); // Twilight purple
    skyGrad.addColorStop(0.55, '#872138'); // Crimson dusk
    skyGrad.addColorStop(0.68, '#c8441c'); // Burning sunset ember
    skyGrad.addColorStop(0.80, '#f59e0b'); // Solar gold
    skyGrad.addColorStop(0.92, '#361324'); // Earth twilight shadow below horizon
    skyGrad.addColorStop(1.00, '#100516'); // Ground abyss

    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // Glowing Sunset Sun Orb at the horizon
    const sunX = width * 0.50 + Math.sin(flight.roll * Math.PI / 180) * 40;
    const sunY = horizonY - 12;

    // Outer Solar Corona / Atmospheric Scatter
    const coronaGrad = ctx.createRadialGradient(sunX, sunY, 10, sunX, sunY, 320);
    coronaGrad.addColorStop(0.0, 'rgba(254, 240, 138, 0.9)');
    coronaGrad.addColorStop(0.15, 'rgba(245, 158, 11, 0.65)');
    coronaGrad.addColorStop(0.35, 'rgba(234, 88, 12, 0.35)');
    coronaGrad.addColorStop(0.70, 'rgba(153, 27, 27, 0.12)');
    coronaGrad.addColorStop(1.0, 'rgba(120, 20, 40, 0)');

    ctx.fillStyle = coronaGrad;
    ctx.beginPath();
    ctx.arc(sunX, sunY, 320, 0, Math.PI * 2);
    ctx.fill();

    // Inner Sun Disk
    const sunCoreGrad = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, 38);
    sunCoreGrad.addColorStop(0.0, '#ffffff');
    sunCoreGrad.addColorStop(0.5, '#fef08a');
    sunCoreGrad.addColorStop(0.85, '#f59e0b');
    sunCoreGrad.addColorStop(1.0, 'rgba(234, 88, 12, 0)');

    ctx.fillStyle = sunCoreGrad;
    ctx.beginPath();
    ctx.arc(sunX, sunY, 38, 0, Math.PI * 2);
    ctx.fill();

    // Sinking Horizon Ray Beam (Sunset crepuscular glint)
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    const beamGrad = ctx.createLinearGradient(sunX - 350, sunY, sunX + 350, sunY);
    beamGrad.addColorStop(0.0, 'rgba(245, 158, 11, 0)');
    beamGrad.addColorStop(0.5, 'rgba(254, 240, 138, 0.3)');
    beamGrad.addColorStop(1.0, 'rgba(245, 158, 11, 0)');
    ctx.fillStyle = beamGrad;
    ctx.fillRect(sunX - 350, sunY - 4, 700, 8);
    ctx.restore();
  }

  // Draw twinkling high-altitude stars
  function drawStars() {
    ctx.save();
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      const twinkle = Math.sin(flight.time * 0.05 + s.twinklePhase) * 0.35 + 0.65;
      const alpha = s.alpha * twinkle;

      ctx.fillStyle = `rgba(248, 250, 252, ${alpha})`;
      ctx.beginPath();
      ctx.arc(s.x * width, s.y * height, s.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // Draw twilight cloud deck underneath the horizon
  function drawClouds() {
    ctx.save();
    for (let i = 0; i < clouds.length; i++) {
      const c = clouds[i];
      c.x += c.speed;
      if (c.x > 1.3) c.x = -0.3;

      const px = c.x * width;
      const py = c.y * height + (flight.pitch * 2.2);

      const grad = ctx.createRadialGradient(px, py, c.radiusY * 0.2, px, py, c.radiusX);
      if (c.tint === 'sunset') {
        grad.addColorStop(0.0, `rgba(249, 115, 22, ${c.alpha * 0.75})`);
        grad.addColorStop(0.5, `rgba(180, 40, 60, ${c.alpha * 0.45})`);
        grad.addColorStop(1.0, 'rgba(30, 10, 35, 0)');
      } else {
        grad.addColorStop(0.0, `rgba(60, 20, 65, ${c.alpha * 0.6})`);
        grad.addColorStop(0.6, `rgba(25, 8, 30, ${c.alpha * 0.3})`);
        grad.addColorStop(1.0, 'rgba(10, 4, 18, 0)');
      }

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(px, py, c.radiusX, c.radiusY, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // Draw VFR Waypoint Markers and Route Lines
  function drawWaypoints() {
    if (waypoints.length === 0) return;

    ctx.save();
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 6]);

    // Connect waypoints with flight route vector
    ctx.beginPath();
    for (let i = 0; i < waypoints.length; i++) {
      const wp = waypoints[i];
      const wx = wp.xRatio * width;
      const wy = wp.yRatio * height + (flight.pitch * 2.0);
      if (i === 0) ctx.moveTo(wx, wy);
      else ctx.lineTo(wx, wy);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw individual waypoint icons & labels
    for (let i = 0; i < waypoints.length; i++) {
      const wp = waypoints[i];
      const wx = wp.xRatio * width;
      const wy = wp.yRatio * height + (flight.pitch * 2.0);

      // Waypoint circle
      ctx.strokeStyle = '#38bdf8';
      ctx.fillStyle = 'rgba(56, 189, 248, 0.2)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(wx, wy, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Inner dot
      ctx.fillStyle = '#ffaa00';
      ctx.beginPath();
      ctx.arc(wx, wy, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Text label
      ctx.font = '600 11px "JetBrains Mono", monospace';
      ctx.fillStyle = '#f8fafc';
      ctx.shadowColor = '#000000';
      ctx.shadowBlur = 4;
      ctx.fillText(`${wp.name}`, wx + 11, wy - 3);

      ctx.font = '400 9px "JetBrains Mono", monospace';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`${wp.nm} NM // ${wp.brg}°`, wx + 11, wy + 9);
      ctx.shadowBlur = 0;
    }

    ctx.restore();
  }

  // Draw Aviation Head-Up Display (HUD)
  function drawHUD() {
    if (!showHud) return;

    ctx.save();
    const cx = width / 2;
    const cy = height / 2;

    ctx.translate(cx, cy);
    ctx.rotate((flight.roll * Math.PI) / 180);

    const hudColor = 'rgba(57, 255, 20, 0.65)'; // Phosphor green
    const hudAmber = 'rgba(255, 170, 0, 0.7)';
    ctx.strokeStyle = hudColor;
    ctx.fillStyle = hudColor;
    ctx.lineWidth = 1.25;

    // Center Boresight / Flight Path Vector Waterline [ — o — ]
    const pitchOffset = flight.pitch * 4.5;

    ctx.beginPath();
    ctx.arc(0, pitchOffset, 5, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    // Left wing
    ctx.moveTo(-24, pitchOffset);
    ctx.lineTo(-8, pitchOffset);
    // Right wing
    ctx.moveTo(8, pitchOffset);
    ctx.lineTo(24, pitchOffset);
    // Fin top
    ctx.moveTo(0, pitchOffset - 5);
    ctx.lineTo(0, pitchOffset - 12);
    ctx.stroke();

    // Pitch Ladder (-10, -5, +5, +10 deg)
    const pitchStep = 32; // px per 5 deg
    const ladderWidth = 44;

    for (let deg = -15; deg <= 15; deg += 5) {
      if (deg === 0) continue; // horizon is separate
      const y = pitchOffset - (deg / 5) * pitchStep;

      ctx.beginPath();
      if (deg > 0) {
        // Positive pitch: solid line with down-tick
        ctx.setLineDash([]);
        ctx.moveTo(-ladderWidth, y);
        ctx.lineTo(-ladderWidth * 0.35, y);
        ctx.moveTo(ladderWidth * 0.35, y);
        ctx.lineTo(ladderWidth, y);

        // Angle tick pointing down
        ctx.moveTo(-ladderWidth, y);
        ctx.lineTo(-ladderWidth, y + 5);
        ctx.moveTo(ladderWidth, y);
        ctx.lineTo(ladderWidth, y + 5);
      } else {
        // Negative pitch: dashed line
        ctx.setLineDash([4, 4]);
        ctx.moveTo(-ladderWidth, y);
        ctx.lineTo(-ladderWidth * 0.35, y);
        ctx.moveTo(ladderWidth * 0.35, y);
        ctx.lineTo(ladderWidth, y);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Pitch angle numerals
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.fillText(Math.abs(deg).toString(), -ladderWidth - 16, y + 3);
      ctx.fillText(Math.abs(deg).toString(), ladderWidth + 6, y + 3);
    }

    // Roll Angle Indicator arc at top
    ctx.beginPath();
    ctx.arc(0, 0, 140, -Math.PI * 0.75, -Math.PI * 0.25);
    ctx.stroke();

    // Roll tick marks at -30, -20, -10, 0, +10, +20, +30
    [-30, -20, -10, 0, 10, 20, 30].forEach((angle) => {
      const rad = ((angle - 90) * Math.PI) / 180;
      const r1 = 140;
      const r2 = angle === 0 ? 152 : 146;
      ctx.beginPath();
      ctx.moveTo(Math.cos(rad) * r1, Math.sin(rad) * r1);
      ctx.lineTo(Math.cos(rad) * r2, Math.sin(rad) * r2);
      ctx.stroke();
    });

    ctx.restore();

    // Heading Tape at Top (Non-rotated, stable horizontal compass)
    ctx.save();
    ctx.strokeStyle = hudAmber;
    ctx.fillStyle = hudAmber;
    ctx.lineWidth = 1.2;

    const hdgY = 70;
    const hdgW = 260;
    const hdgLeft = (width - hdgW) / 2;

    // Heading box border
    ctx.strokeRect(hdgLeft, hdgY - 18, hdgW, 26);

    // Current heading pointer triangle
    ctx.beginPath();
    ctx.moveTo(width / 2, hdgY + 12);
    ctx.lineTo(width / 2 - 5, hdgY + 18);
    ctx.lineTo(width / 2 + 5, hdgY + 18);
    ctx.closePath();
    ctx.fill();

    // Heading ticks
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';

    const currentHdg = flight.heading + (flight.roll * 0.2);
    for (let h = Math.floor(currentHdg - 25); h <= Math.ceil(currentHdg + 25); h++) {
      if (h % 5 === 0) {
        const offset = (h - currentHdg) * 5;
        const hx = width / 2 + offset;
        if (hx >= hdgLeft + 4 && hx <= hdgLeft + hdgW - 4) {
          ctx.beginPath();
          ctx.moveTo(hx, hdgY - 14);
          ctx.lineTo(hx, h % 10 === 0 ? hdgY - 4 : hdgY - 9);
          ctx.stroke();

          if (h % 10 === 0) {
            let label = ((h % 360) + 360) % 360;
            if (label === 0) label = 360;
            const str = label < 100 ? '0' + (label / 10) : (label / 10).toString();
            ctx.fillText(str, hx, hdgY + 5);
          }
        }
      }
    }

    ctx.restore();
  }

  // Animation Loop
  function animate() {
    flight.time += 1;

    // Smooth lerp to target pitch & roll
    flight.roll += (flight.targetRoll - flight.roll) * 0.05;
    flight.pitch += (flight.targetPitch - flight.pitch) * 0.05;

    ctx.clearRect(0, 0, width, height);

    drawSky();
    drawStars();
    drawClouds();
    drawWaypoints();
    drawHUD();

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);

  // External Controls Hook
  window.__toggleHud = function () {
    showHud = !showHud;
    return showHud;
  };

})();
