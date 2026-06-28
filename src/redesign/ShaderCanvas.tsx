import { useEffect, useRef } from 'react';

/* ════════════════════════════════════════════════════════════════
   WebGL ShaderCanvas — ported from the design handoff (effects.jsx).
   Brand-aware palette via 4 vec3 uniforms (u_c1..u_c4).
   ════════════════════════════════════════════════════════════════ */

const VS = `attribute vec2 p; void main(){ gl_Position = vec4(p,0.,1.); }`;

// Shader 1 — flowing simplex-noise gradient (hero / stats backgrounds)
const SHADER_FLOW = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec3 u_c1, u_c2, u_c3, u_c4;

vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec2 mod289(vec2 x){return x-floor(x*(1./289.))*289.;}
vec3 permute(vec3 x){return mod289(((x*34.)+1.)*x);}
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865,0.366025403,-0.577350269,0.024390243);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x>x0.y) ? vec2(1.,0.) : vec2(0.,1.);
  vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.);
  m = m*m; m = m*m;
  vec3 x = 2.*fract(p*C.www)-1.;
  vec3 h = abs(x)-0.5;
  vec3 ox = floor(x+0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291-0.85373472*(a0*a0+h*h);
  vec3 g;
  g.x = a0.x*x0.x + h.x*x0.y;
  g.yz = a0.yz*x12.xz + h.yz*x12.yw;
  return 130.*dot(m,g);
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 p = uv * 2.0 - 1.0;
  p.x *= u_res.x/u_res.y;
  float t = u_time * 0.18;

  float n1 = snoise(p*1.2 + vec2(t, t*0.6));
  float n2 = snoise(p*1.8 - vec2(t*0.8, -t*0.4));
  float n3 = snoise(p*0.6 + vec2(-t*0.5, t*0.9));

  float w1 = smoothstep(-0.2, 0.6, n1);
  float w2 = smoothstep(-0.3, 0.5, n2);
  float w3 = smoothstep(-0.4, 0.6, n3);

  vec3 col = u_c4;
  col = mix(col, u_c1, w1*0.35);
  col = mix(col, u_c2, w2*0.30);
  col = mix(col, u_c3, w3*0.18);

  float vig = smoothstep(1.4, 0.4, length(p));
  col = mix(u_c4, col, vig);

  gl_FragColor = vec4(col, 1.0);
}
`;

// Shader 2 — liquid metaballs (rich, for dedicated shader sections)
const SHADER_LIQUID = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec3 u_c1, u_c2, u_c3, u_c4;

float ball(vec2 uv, vec2 c, float r){ return r/length(uv-c); }

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5*u_res.xy) / u_res.y;
  float t = u_time * 0.35;

  float v = 0.0;
  v += ball(uv, vec2(sin(t)*0.6, cos(t*0.8)*0.4), 0.32);
  v += ball(uv, vec2(cos(t*0.7)*0.7, sin(t*1.1)*0.5), 0.28);
  v += ball(uv, vec2(sin(t*1.3+1.0)*0.5, cos(t*0.6+2.0)*0.45), 0.30);
  v += ball(uv, vec2(cos(t*0.9-1.0)*0.65, sin(t*0.5-0.5)*0.55), 0.26);
  v += ball(uv, vec2(sin(t*0.4+2.5)*0.35, cos(t*1.2+1.5)*0.6), 0.22);

  float m = smoothstep(1.8, 2.6, v);
  float rim = smoothstep(1.5, 1.8, v) - smoothstep(1.8, 2.0, v);

  vec3 bg = mix(u_c1*0.15, u_c1*0.35, uv.y*0.5+0.5);
  vec3 inside = mix(u_c2, u_c3, sin(t+uv.x*3.0)*0.5+0.5);

  vec3 col = mix(bg, inside, m);
  col += rim * u_c4 * 0.4;

  float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898,78.233)))*43758.5453) - 0.5;
  col += grain * 0.015;

  gl_FragColor = vec4(col, 1.0);
}
`;

// Shader 3 — subtle aurora
const SHADER_AURORA = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec3 u_c1, u_c2, u_c3, u_c4;

void main(){
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  float t = u_time * 0.25;
  float bands = sin(uv.y*8.0 + sin(uv.x*4.0+t)*1.5 + t*1.2)*0.5+0.5;
  float bands2 = sin(uv.y*5.0 - sin(uv.x*3.0-t*0.7)*1.8 - t)*0.5+0.5;
  vec3 col = mix(u_c1, u_c2, bands);
  col = mix(col, u_c3, bands2*0.5);
  col *= smoothstep(0.0, 0.5, uv.y) * smoothstep(1.0, 0.7, uv.y);
  gl_FragColor = vec4(col, 1.0);
}
`;

// Map a preset id → fragment source. site.tsx passes the id ("flow"/"liquid")
// rather than the GLSL string so it never has to statically import this module —
// that keeps the heavy WebGL component in its own lazily-loaded chunk.
const SHADERS: Record<string, string> = {
  flow: SHADER_FLOW,
  liquid: SHADER_LIQUID,
  aurora: SHADER_AURORA,
};

function hexToVec(h: string): [number, number, number] {
  const n = parseInt(h.replace('#', ''), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

interface Props {
  shader: string;
  /** 4 hex colors — maps to u_c1..u_c4 */
  palette: [string, string, string, string];
  /** CSS opacity of the canvas wrapper. */
  opacity?: number;
  className?: string;
}

export default function ShaderCanvas({ shader, palette, opacity = 1, className }: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { premultipliedAlpha: false, antialias: true });
    if (!gl) return;

    const compile = (type: number, src: string): WebGLShader | null => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        // eslint-disable-next-line no-console
        console.error('Shader compile error:', gl.getShaderInfoLog(s));
        return null;
      }
      return s;
    };

    const vsh = compile(gl.VERTEX_SHADER, VS);
    const fsh = compile(gl.FRAGMENT_SHADER, SHADERS[shader] ?? shader);
    if (!vsh || !fsh) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vsh);
    gl.attachShader(prog, fsh);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      // eslint-disable-next-line no-console
      console.error('Program link error:', gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const pLoc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(pLoc);
    gl.vertexAttribPointer(pLoc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'u_res');
    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uC1 = gl.getUniformLocation(prog, 'u_c1');
    const uC2 = gl.getUniformLocation(prog, 'u_c2');
    const uC3 = gl.getUniformLocation(prog, 'u_c3');
    const uC4 = gl.getUniformLocation(prog, 'u_c4');

    const c1 = hexToVec(palette[0]);
    const c2 = hexToVec(palette[1]);
    const c3 = hexToVec(palette[2]);
    const c4 = hexToVec(palette[3]);

    // Render a single static frame (no animation loop) when motion is unwanted or
    // the device can't afford it. A continuous WebGL rAF dominates the main thread
    // on phone-class / CPU-throttled devices — it was ~38s of main-thread "Other"
    // and a 31s TBT on Lighthouse mobile, even with the DPR + fps caps. The
    // gradient still renders everywhere; it just doesn't animate on phones or when
    // the user asked to save data. Desktop keeps the full animation. (Deliberately
    // NOT gating on deviceMemory/hardwareConcurrency — capable laptops routinely
    // report 4, which would wrongly freeze them.)
    const saveData =
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData ?? false;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const smallScreen = window.matchMedia('(max-width: 900px)').matches;
    const staticFrame = reducedMotion || smallScreen || saveData;

    let raf = 0;
    let running = true;
    const t0 = performance.now();
    let frozenT = 0;
    let lastDraw = 0;
    const minFrameMs = 1000 / 30; // ~30fps cap — fewer frames = less main-thread time / TBT

    const resize = () => {
      // Cap DPR low — a soft background gradient doesn't need retina, and fewer
      // pixels keeps each frame short (under the 50ms long-task threshold).
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const cw = Math.max(1, Math.floor(w * dpr));
      const ch = Math.max(1, Math.floor(h * dpr));
      if (canvas.width !== cw || canvas.height !== ch) {
        canvas.width = cw;
        canvas.height = ch;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };

    const render = (now = performance.now()) => {
      if (!running) return;
      if (!staticFrame) raf = requestAnimationFrame(render);
      if (now - lastDraw < minFrameMs) return; // throttle draws to the fps cap
      lastDraw = now;
      resize();
      const t = staticFrame ? frozenT : (now - t0) / 1000;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      if (uC1) gl.uniform3fv(uC1, c1);
      if (uC2) gl.uniform3fv(uC2, c2);
      if (uC3) gl.uniform3fv(uC3, c3);
      if (uC4) gl.uniform3fv(uC4, c4);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    // Pause when off-screen for perf
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          if (!running) {
            running = true;
            render();
          }
        } else {
          running = false;
          cancelAnimationFrame(raf);
        }
      });
    });
    io.observe(canvas);

    render();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [shader, palette]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={className}
      style={{ width: '100%', height: '100%', display: 'block', opacity, pointerEvents: 'none' }}
    />
  );
}
