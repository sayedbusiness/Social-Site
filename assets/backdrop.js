/* The studio backdrop.
   A hand-painted canvas cloth, mottled in the Kova logo's two colours
   (#666464 grey, #3B2812 bronze), painted ONCE into a texture. Each frame then
   costs one draw call: sample the cloth with a slow drift, light it with a
   single copper key light that follows the portrait, the scroll and your
   pointer, add dust floating in the beam, grain and a vignette.
   Fails open: no WebGL, no highp, software rendering or reduced motion all
   leave the CSS room (or one still frame) in place. */

const VERT = `
attribute vec2 aPos;
void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }`;

const COMMON = `
precision highp float;
float hash(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i), b = hash(i + vec2(1.0, 0.0)), c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}`;

// The cloth. Domain-warped fbm: grey and bronze clouds on umber, faint brush.
const PAINT = COMMON + `
uniform vec2 uRes;
uniform float uUnit;
uniform vec2 uSeed;
float fbm(vec2 p){
  float s = 0.0, a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 6; i++){ s += a * noise(p); p = m * p + vec2(3.1, 1.7); a *= 0.5; }
  return s;
}
void main(){
  vec2 p = (gl_FragCoord.xy - vec2(uRes.x * 0.5, uRes.y)) / uUnit + uSeed;
  vec2 q = vec2(fbm(p), fbm(p + vec2(5.2, 1.3)));
  vec2 r = vec2(fbm(p + 2.1 * q + vec2(1.7, 9.2)), fbm(p + 2.1 * q + vec2(8.3, 2.8)));
  float f = fbm(p + 1.7 * r);
  vec3 umber  = vec3(0.090, 0.066, 0.047);
  vec3 bronze = vec3(0.231, 0.157, 0.071);
  vec3 grey   = vec3(0.400, 0.392, 0.392);
  vec3 c = mix(umber, bronze, smoothstep(0.30, 0.80, f));
  c = mix(c, grey * 0.58, smoothstep(0.52, 0.95, r.x) * 0.5);
  c *= 0.74 + 0.48 * smoothstep(0.18, 0.86, q.y);
  // hanging folds: slow vertical light and shade, the way a cloth falls from a stand
  float fold = noise(vec2(p.x * 1.9, p.y * 0.22) + vec2(4.0, 0.0));
  c *= 0.82 + 0.34 * smoothstep(0.15, 0.85, fold);
  // brushwork: short strokes in two directions, dry at the edges
  float b1 = noise(vec2(p.x * 9.0, p.y * 2.2) + r * 3.0);
  float b2 = noise(vec2(p.x * 2.4, p.y * 8.5) - q * 2.0);
  c *= 0.9 + 0.12 * b1 + 0.08 * b2;
  gl_FragColor = vec4(c, 1.0);
}`;

// The light. One copper key light on the cloth, dust in its beam.
const FRAME = COMMON + `
uniform sampler2D uPaint;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uLight;
uniform float uRadius;
uniform float uPower;
uniform float uPar;
uniform float uExtra;
uniform float uEnd;
uniform float uDust;
uniform float uGrain;
uniform vec4 uMap;
uniform float uGain;
uniform vec2 uBeamFrom;
uniform float uCalm;

float dust(vec2 fc, float t){
  float acc = 0.0;
  for (int L = 0; L < 3; L++){
    float fl = float(L);
    float cell = (20.0 + fl * 16.0) * uGrain;
    vec2 g = (fc - vec2(sin(t * 0.07 + fl) * 9.0, t * (4.0 + fl * 2.5)) * uGrain) / cell;
    vec2 id = floor(g), f = fract(g);
    float h = hash(id + fl * 31.7);
    if (h < 0.58){
      vec2 pos = 0.28 + 0.44 * vec2(hash(id + 0.37), hash(id + 1.93));
      pos += 0.1 * vec2(sin(t * 0.45 + h * 21.0), cos(t * 0.38 + h * 17.0));
      float rad = (0.035 + 0.05 * hash(id + 4.1)) * (1.0 + fl * 0.45);
      float m = smoothstep(rad, rad * 0.15, length(f - pos));
      acc += m * (1.0 - fl * 0.25);
    }
  }
  return acc;
}

// the beam: a soft cone from the lamp (upper camera-left) to the light's spot
float beam(vec2 fc){
  vec2 ab = uLight - uBeamFrom;
  float t = clamp(dot(fc - uBeamFrom, ab) / dot(ab, ab), 0.0, 1.0);
  float d = length(fc - (uBeamFrom + ab * t));
  float w = mix(0.035, 0.24, t) * uRadius;
  return smoothstep(w, w * 0.3, d) * smoothstep(0.05, 0.35, t) * (1.0 - smoothstep(0.82, 1.0, t));
}

void main(){
  vec2 fc = gl_FragCoord.xy;
  vec2 uv = fc / uRes;
  // the cloth hangs taller than the room; scrolling lowers the camera a little
  float v = (uv.y + uExtra) / (1.0 + uExtra) - uPar;
  vec2 w = vec2(noise(uv * vec2(1.8, 2.6) + uTime * 0.035), noise(uv * vec2(1.8, 2.6) + 9.1 - uTime * 0.03)) - 0.5;
  vec2 tuv = vec2(uv.x, v) + w * vec2(0.012, 0.009) * (1.0 - 0.8 * uCalm);
  vec3 albedo = texture2D(uPaint, tuv * uMap.xy + uMap.zw).rgb * uGain;

  vec2 d = (fc - uLight) / uRadius;
  d.y *= 1.08;
  float r2 = dot(d, d);
  float key = exp(-r2 * 1.15);
  float core = exp(-r2 * 4.2);
  vec3 lightCol = vec3(1.0, 0.75, 0.49);
  // the cloth behind the head is painted lighter, as studio backdrops are
  albedo = max(albedo, vec3(0.20, 0.14, 0.075) * core);
  vec3 col = albedo * (vec3(0.30, 0.27, 0.24) + lightCol * (key * 1.25 + core * 0.62) * uPower);
  col += lightCol * (key * 0.045 + core * 0.11) * uPower;

  // a warm floor light rises at the very end of the page
  float floorG = exp(-pow(uv.y / 0.42, 2.0) - pow((uv.x - 0.5) / 0.62, 2.0)) * uEnd;
  col += albedo * lightCol * floorG * 1.7;

  float bm = beam(fc);
  col += lightCol * bm * 0.06 * uPower * uDust;
  col += lightCol * dust(fc, uTime) * bm * (0.55 + key * 0.6) * uPower * 0.6 * uDust;

  vec2 vv = (uv - 0.5) * vec2(uRes.x / uRes.y, 1.0);
  float vig = smoothstep(1.1, 0.18, length(vv * vec2(0.82, 1.0)));
  col *= mix(0.32, 1.0, vig);

  col += (hash(floor(fc / uGrain) + 0.5) - 0.5) * 0.026;
  gl_FragColor = vec4(col, 1.0);
}`;

export function start({ reduce = false } = {}) {
  const host = document.querySelector('.backdrop');
  if (!host || host.querySelector('canvas')) return;
  const doc = document.documentElement;
  const force = /[?&]forcegl\b/.test(location.search);
  const canvas = document.createElement('canvas');
  const attrs = {
    alpha: false, antialias: false, depth: false, stencil: false,
    premultipliedAlpha: false, preserveDrawingBuffer: false,
    powerPreference: 'low-power', failIfMajorPerformanceCaveat: !force,
  };
  let gl = canvas.getContext('webgl', attrs) || canvas.getContext('experimental-webgl', attrs);
  if (!gl) return;
  const hp = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT);
  if (!hp || hp.precision < 16) return;

  const EXTRA = 0.38;           // the cloth is 38% taller than the room
  const fig = document.querySelector('.figure');
  const hero = document.querySelector('.hero');
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

  let progPaint; let progFrame; let buf; let tex; let fbo;
  let W = 0; let H = 0; let cssW = 0; let cssH = 0; let scale = 1;
  let cloth = null;   // optional photographed cloth: <div class="backdrop" data-cloth="/assets/img/cloth.jpg">
  let U = {};

  function compile(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || 'shader');
    return s;
  }
  function program(fs) {
    const p = gl.createProgram();
    gl.attachShader(p, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(p, compile(gl.FRAGMENT_SHADER, fs));
    gl.bindAttribLocation(p, 0, 'aPos');
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p) || 'link');
    return p;
  }
  function uniforms(p, names) {
    const o = {};
    names.forEach((n) => { o[n] = gl.getUniformLocation(p, n); });
    return o;
  }

  function init() {
    progPaint = program(PAINT);
    progFrame = program(FRAME);
    U.paint = uniforms(progPaint, ['uRes', 'uUnit', 'uSeed']);
    U.frame = uniforms(progFrame, ['uPaint', 'uRes', 'uTime', 'uLight', 'uRadius', 'uPower', 'uPar', 'uExtra', 'uEnd', 'uDust', 'uGrain', 'uMap', 'uGain', 'uBeamFrom', 'uCalm']);
    buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  }

  let quality = 1;
  function size() {
    const r = host.getBoundingClientRect();
    cssW = Math.max(1, r.width);
    cssH = Math.max(1, r.height);
    // keep the per-frame pixel count small: the cloth and light are soft
    const budget = 340000 * quality;
    scale = Math.min(1, Math.max(0.34, Math.sqrt(budget / (cssW * cssH))));
    W = Math.max(2, Math.round(cssW * scale));
    H = Math.max(2, Math.round(cssH * scale));
    canvas.width = W;
    canvas.height = H;
    paint();
  }

  function paint() {
    const PW = W;
    const PH = Math.round(H * (1 + EXTRA));
    if (tex) gl.deleteTexture(tex);
    if (fbo) gl.deleteFramebuffer(fbo);
    tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, PW, PH, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    gl.viewport(0, 0, PW, PH);
    gl.useProgram(progPaint);
    gl.uniform2f(U.paint.uRes, PW, PH);
    // blob size follows the room, so a phone and a desktop see the same cloth
    gl.uniform1f(U.paint.uUnit, Math.max(360, Math.min(980, Math.max(cssW, cssH) * 0.55)) * scale);
    gl.uniform2f(U.paint.uSeed, 7.3, 2.1);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }


  // Optional: a photographed, evenly lit painted cloth replaces the procedural
  // one. The page still lights it; its average brightness is normalised to the
  // painted cloth's so the room keeps its exposure whatever the photo.
  function coverMap() {
    const room = W / (H * (1 + EXTRA));
    const img = cloth.w / cloth.h;
    const sx = img > room ? room / img : 1;
    const sy = img > room ? 1 : img / room;
    return [sx, sy, 0.5 - 0.5 * sx, 0.5 - 0.5 * sy];
  }
  function loadCloth(src) {
    const im = new Image();
    im.decoding = 'async';
    im.onload = () => {
      try {
        const probe = document.createElement('canvas');
        probe.width = 24; probe.height = 24;
        const c2 = probe.getContext('2d');
        c2.drawImage(im, 0, 0, 24, 24);
        const d = c2.getImageData(0, 0, 24, 24).data;
        let sum = 0;
        for (let i = 0; i < d.length; i += 4) sum += (0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2]) / 255;
        const avg = Math.max(0.02, sum / (d.length / 4));
        const t2 = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, t2);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, im);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        cloth = { tex: t2, w: im.naturalWidth, h: im.naturalHeight, gain: 0.155 / avg };
        if (reduce || !raf) still();
      } catch (_) { cloth = null; }
    };
    im.src = src;
  }

  // ── geometry the light follows ──────────────────────────────────────────
  let head = { x: innerWidth / 2, y: innerHeight * 0.3, h: 400 };
  let heroH = innerHeight;
  let docH = doc.scrollHeight;
  function measure() {
    if (!fig) return;
    const r = fig.getBoundingClientRect();
    head = { x: r.left + r.width * 0.6, y: r.top + scrollY + r.height * 0.2, h: r.height };
    heroH = hero ? hero.offsetHeight : innerHeight;
    docH = doc.scrollHeight;
  }

  // ── springs (critically damped, frame-rate independent) ─────────────────
  const spring = (s, target, dt, response) => {
    const w = (2 * Math.PI) / response;
    const d = s.x - target;
    const e = Math.exp(-w * dt);
    s.x = target + (d + (s.v + w * d) * dt) * e;
    s.v = (s.v - w * (s.v + w * d) * dt) * e;
  };
  const lx = { x: head.x, v: 0 };
  const ly = { x: head.y, v: 0 };
  const lp = { x: 0.2, v: 0 };
  const pointer = { x: 0, y: 0, on: false, until: 0 };

  if (fine) {
    addEventListener('pointermove', (e) => { pointer.x = e.clientX; pointer.y = e.clientY; pointer.on = true; }, { passive: true });
    doc.addEventListener('pointerleave', () => { pointer.on = false; });
  } else {
    addEventListener('pointerdown', (e) => {
      pointer.x = e.clientX; pointer.y = e.clientY; pointer.on = true; pointer.until = performance.now() + 1400;
    }, { passive: true });
  }

  let t = 0;
  let last = performance.now();
  let raf = 0;
  let born = 0;
  let lastSy = -1;
  let idleSince = performance.now();
  let frames = 0;
  let slow = 0;
  let skip = false;

  function draw(sy) {
    const vw = innerWidth;
    const vh = innerHeight;
    const k = scale;
    gl.viewport(0, 0, W, H);
    gl.useProgram(progFrame);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, cloth ? cloth.tex : tex);
    gl.uniform1i(U.frame.uPaint, 0);
    const map = cloth ? coverMap() : [1, 1, 0, 0];
    gl.uniform4f(U.frame.uMap, map[0], map[1], map[2], map[3]);
    gl.uniform1f(U.frame.uGain, cloth ? cloth.gain : 1);
    gl.uniform2f(U.frame.uRes, W, H);
    gl.uniform1f(U.frame.uTime, t);
    // canvas y is up; the light lives in CSS px with y down
    gl.uniform2f(U.frame.uLight, lx.x * k, (cssH - ly.x) * k);
    const e = Math.min(1, Math.max(0, sy / (heroH * 0.85)));
    const radius = (0.5 * Math.min(vw, vh) + 0.2 * Math.max(vw, vh)) * (1 + 0.3 * e);
    gl.uniform1f(U.frame.uRadius, radius * k);
    gl.uniform1f(U.frame.uPower, lp.x);
    gl.uniform1f(U.frame.uPar, reduce ? 0 : Math.min(EXTRA / (1 + EXTRA), (sy / vh) * 0.06));
    gl.uniform1f(U.frame.uExtra, EXTRA);
    const end = Math.min(1, Math.max(0, (sy + vh - (docH - vh * 0.9)) / (vh * 0.9)));
    gl.uniform1f(U.frame.uEnd, end * end * 0.7);
    // dust belongs to the portrait; once reading starts, nothing moves behind the copy
    gl.uniform1f(U.frame.uDust, reduce ? 0 : 1 - Math.min(1, Math.max(0, (e - 0.2) / 0.4)));
    gl.uniform1f(U.frame.uCalm, e);
    gl.uniform2f(U.frame.uBeamFrom, -0.12 * vw * k, (cssH + 0.18 * vh) * k);
    gl.uniform1f(U.frame.uGrain, Math.max(1, 1.6 * k));
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  function step(now) {
    raf = requestAnimationFrame(step);
    const dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
    last = now;
    if (doc.classList.contains('sheet-open')) return;

    const sy = scrollY;
    if (sy !== lastSy) { idleSince = now; lastSy = sy; }
    if (pointer.on && fine) idleSince = Math.max(idleSince, now - 2000);
    const idle = now - idleSince > 3500;
    skip = idle ? !skip : false;
    if (skip) return;           // idle: 30fps is indistinguishable for slow drift

    t += idle ? dt * 2 : dt;
    const vw = innerWidth;
    const vh = innerHeight;
    const e0 = Math.min(1, Math.max(0, sy / (heroH * 0.85)));
    const e = e0 * e0 * (3 - 2 * e0);

    let tx = head.x + (vw * 0.5 - head.x) * e;
    let ty = (head.y - sy - head.h * 0.04) * (1 - e) + vh * 0.36 * e;
    const touching = pointer.on && (fine || now < pointer.until);
    if (touching) {
      const pull = fine ? 0.24 * (1 - 0.5 * e) : 0.12;
      tx += (pointer.x - tx) * pull;
      ty += (pointer.y - ty) * pull;
    } else if (!fine) {
      pointer.on = false;
    }
    tx += Math.sin(t * 0.23) * vw * 0.012;
    ty += Math.cos(t * 0.19) * vh * 0.01;

    const warm = Math.min(1, (now - born) / 1800);
    const ease = 1 - Math.pow(1 - warm, 3);
    const power = (1 - 0.4 * e) * (0.35 + 0.65 * ease) * (1 + 0.03 * (1 - e) * Math.sin(t * 0.45));
    spring(lx, tx, dt, 0.9);
    spring(ly, ty, dt, 0.9);
    spring(lp, power, dt, 0.5);

    draw(sy);

    // adaptive quality: if the device cannot hold ~40fps, halve the pixels
    frames += 1;
    if (frames > 30 && frames < 150) {
      if (dt > 0.026) slow += 1;
      if (frames === 149 && slow > 70) {
        if (quality > 0.5) { quality = 0.5; size(); frames = 0; slow = 0; } else { stop(); still(); }
      }
    }
  }

  function still() {
    cancelAnimationFrame(raf);
    raf = 0;
    lp.x = 1;
    lx.x = head.x;
    ly.x = head.y - scrollY - head.h * 0.04;
    draw(scrollY);
  }
  function stop() {
    cancelAnimationFrame(raf);
    raf = 0;
  }

  try {
    init();
    host.appendChild(canvas);
    measure();
    size();
  } catch (_) {
    canvas.remove();
    return;
  }

  if (host.dataset.cloth) loadCloth(host.dataset.cloth);
  born = performance.now();
  lx.x = head.x;
  ly.x = head.y - scrollY - head.h * 0.04;
  if (reduce) {
    still();
  } else {
    raf = requestAnimationFrame(step);
  }
  // reveal the canvas only once a real frame exists
  requestAnimationFrame(() => doc.classList.add('gl'));

  let lastW = cssW;
  let lastH = cssH;
  const ro = new ResizeObserver(() => {
    const r = host.getBoundingClientRect();
    measure();
    if (Math.abs(r.width - lastW) > 1 || Math.abs(r.height - lastH) > lastH * 0.12) {
      lastW = r.width;
      lastH = r.height;
      size();
      if (reduce) still();
    }
  });
  ro.observe(host);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  setTimeout(measure, 1400);   // after the entrance settles
  addEventListener('resize', measure, { passive: true });

  canvas.addEventListener('webglcontextlost', (ev) => {
    ev.preventDefault();
    stop();
    doc.classList.remove('gl');
  });
  canvas.addEventListener('webglcontextrestored', () => {
    try {
      init();
      size();
      doc.classList.add('gl');
      if (reduce) still(); else raf = requestAnimationFrame(step);
    } catch (_) { canvas.remove(); }
  });
}
