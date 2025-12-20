"use client";
import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';
import { useEffect, useRef } from 'react';

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

// Optimierter Fragment-Shader
const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec3 uResolution;
uniform vec2 uFocal;
uniform vec2 uRotation;
uniform float uStarSpeed;
uniform float uDensity;
uniform float uHueShift;
uniform float uSpeed;
uniform vec2 uMouse;
uniform float uGlowIntensity;
uniform float uSaturation;
uniform bool uMouseRepulsion;
uniform float uTwinkleIntensity;
uniform float uRotationSpeed;
uniform float uRepulsionStrength;
uniform float uMouseActiveFactor;
uniform float uAutoCenterRepulsion;
uniform bool uTransparent;

varying vec2 vUv;

#define NUM_LAYER 2.0
#define STAR_COLOR_CUTOFF 0.2
#define MAT45 mat2(0.7071, -0.7071, 0.7071, 0.7071)
#define PERIOD 3.0

// Schnellere Hash-Funktion
float Hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

// Vereinfachte Tri-Funktion
float tri(float x) {
  return abs(fract(x) * 2.0 - 1.0);
}

float tris(float x) {
  float t = fract(x);
  return 1.0 - abs(2.0 * t - 1.0);
}

float trisn(float x) {
  float t = fract(x);
  return 2.0 * (1.0 - abs(2.0 * t - 1.0)) - 1.0;
}

// Optimierte HSV zu RGB ohne atan
vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

// Vereinfachte Star-Funktion
float Star(vec2 uv, float flare) {
  float d = length(uv);
  float m = (0.05 * uGlowIntensity) / (d + 0.01);
  
  // Nur eine Rays-Berechnung statt zwei
  float rays = max(0.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * flare * uGlowIntensity * 0.5;
  
  m *= smoothstep(1.0, 0.2, d);
  return m;
}

vec3 StarLayer(vec2 uv) {
  vec3 col = vec3(0.0);
  
  vec2 gv = fract(uv) - 0.5; 
  vec2 id = floor(uv);
  
  // Reduziert von 3x3 auf nur die zentrale Zelle + 4 Nachbarn (Kreuzform)
  vec2 offsets[5];
  offsets[0] = vec2(0.0, 0.0);   // Zentrum
  offsets[1] = vec2(1.0, 0.0);   // Rechts
  offsets[2] = vec2(-1.0, 0.0);  // Links
  offsets[3] = vec2(0.0, 1.0);   // Oben
  offsets[4] = vec2(0.0, -1.0);  // Unten
  
  for (int i = 0; i < 5; i++) {
    vec2 offset = offsets[i];
    vec2 si = id + offset;
    float seed = Hash21(si);
    float size = fract(seed * 345.32);
    
    // Vereinfachtes Twinkling
    float glossLocal = tri(uStarSpeed / (PERIOD * seed + 1.0));
    float flareSize = smoothstep(0.85, 1.0, size) * glossLocal;
    
    // Vereinfachte Farbberechnung ohne atan
    float hue = fract(seed + uHueShift / 360.0);
    float sat = 0.3 + seed * 0.5 * uSaturation;
    float val = 0.5 + size * 0.5;
    vec3 base = hsv2rgb(vec3(hue, sat, val));
    
    // Reduzierte Animation
    vec2 pad = vec2(
      tris(seed * 34.0 + uTime * uSpeed * 0.1),
      tris(seed * 38.0 + uTime * uSpeed * 0.033)
    ) - 0.5;
    
    float star = Star(gv - offset - pad, flareSize);
    
    // Vereinfachtes Twinkling
    float twinkle = mix(1.0, trisn(uTime * uSpeed + seed * 6.28) * 0.5 + 1.0, uTwinkleIntensity);
    star *= twinkle;
    
    col += star * size * base;
  }
  
  return col;
}

void main() {
  vec2 focalPx = uFocal * uResolution.xy;
  vec2 uv = (vUv * uResolution.xy - focalPx) / uResolution.y;
  
  // Mouse-Interaktion (nur wenn aktiv)
  if (uMouseActiveFactor > 0.01) {
    vec2 mouseNorm = uMouse - vec2(0.5);
    
    if (uAutoCenterRepulsion > 0.0) {
      float centerDist = length(uv);
      vec2 repulsion = normalize(uv) * (uAutoCenterRepulsion / (centerDist + 0.1));
      uv += repulsion * 0.05;
    } else if (uMouseRepulsion) {
      vec2 mousePosUV = (uMouse * uResolution.xy - focalPx) / uResolution.y;
      float mouseDist = length(uv - mousePosUV);
      vec2 repulsion = normalize(uv - mousePosUV) * (uRepulsionStrength / (mouseDist + 0.1));
      uv += repulsion * 0.05 * uMouseActiveFactor;
    } else {
      vec2 mouseOffset = mouseNorm * 0.1 * uMouseActiveFactor;
      uv += mouseOffset;
    }
  }
  
  // Rotation (vorberechnet in CPU wäre besser)
  float autoRotAngle = uTime * uRotationSpeed;
  float cosA = cos(autoRotAngle);
  float sinA = sin(autoRotAngle);
  uv = mat2(cosA, -sinA, sinA, cosA) * uv;
  uv = mat2(uRotation.x, -uRotation.y, uRotation.y, uRotation.x) * uv;
  
  vec3 col = vec3(0.0);
  
  // Reduziert von 4 auf 2 Layer
  for (float i = 0.0; i < 1.0; i += 1.0 / NUM_LAYER) {
    float depth = fract(i + uStarSpeed * uSpeed);
    float scale = mix(20.0 * uDensity, 0.5 * uDensity, depth);
    float fade = depth * smoothstep(1.0, 0.9, depth);
    col += StarLayer(uv * scale + i * 453.32) * fade;
  }
  
  if (uTransparent) {
    float alpha = length(col);
    alpha = smoothstep(0.0, 0.3, alpha);
    alpha = min(alpha, 1.0);
    gl_FragColor = vec4(col, alpha);
  } else {
    gl_FragColor = vec4(col, 1.0);
  }
}
`;

interface GalaxyProps {
  focal?: [number, number];
  rotation?: [number, number];
  starSpeed?: number;
  density?: number;
  hueShift?: number;
  disableAnimation?: boolean;
  speed?: number;
  mouseInteraction?: boolean;
  glowIntensity?: number;
  saturation?: number;
  mouseRepulsion?: boolean;
  twinkleIntensity?: number;
  rotationSpeed?: number;
  repulsionStrength?: number;
  autoCenterRepulsion?: number;
  transparent?: boolean;
}

export default function Galaxy({
  focal = [0.5, 0.5],
  rotation = [1.0, 0.0],
  starSpeed = 0.5,
  density = 1,
  hueShift = 140,
  disableAnimation = false,
  speed = 1.0,
  mouseInteraction = true,
  glowIntensity = 0.3,
  saturation = 0.0,
  mouseRepulsion = true,
  repulsionStrength = 2,
  twinkleIntensity = 0.3,
  rotationSpeed = 0.1,
  autoCenterRepulsion = 0,
  transparent = true,
  ...rest
}: GalaxyProps) {
  const ctnDom = useRef<HTMLDivElement>(null);
  const targetMousePos = useRef({ x: 0.5, y: 0.5 });
  const smoothMousePos = useRef({ x: 0.5, y: 0.5 });
  const targetMouseActive = useRef(0.0);
  const smoothMouseActive = useRef(0.0);

  useEffect(() => {
    if (!ctnDom.current) return;
    const ctn = ctnDom.current;
    const renderer = new Renderer({
      alpha: transparent,
      premultipliedAlpha: false,
      antialias: false // Deaktiviert für bessere Performance
    });
    const gl = renderer.gl;

    if (transparent) {
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.clearColor(0, 0, 0, 0);
    } else {
      gl.clearColor(0, 0, 0, 1);
    }

    let program: Program;

    function resize() {
      // Reduzierte Auflösung für bessere Performance
      const scale = Math.min(window.devicePixelRatio, 1.5);
      renderer.setSize(ctn.offsetWidth * scale, ctn.offsetHeight * scale);
      if (program) {
        program.uniforms.uResolution.value = new Color(
          gl.canvas.width,
          gl.canvas.height,
          gl.canvas.width / gl.canvas.height
        );
      }
    }
    window.addEventListener('resize', resize, false);
    resize();

    const geometry = new Triangle(gl);
    program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: {
          value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)
        },
        uFocal: { value: new Float32Array(focal) },
        uRotation: { value: new Float32Array(rotation) },
        uStarSpeed: { value: starSpeed },
        uDensity: { value: density },
        uHueShift: { value: hueShift },
        uSpeed: { value: speed },
        uMouse: {
          value: new Float32Array([smoothMousePos.current.x, smoothMousePos.current.y])
        },
        uGlowIntensity: { value: glowIntensity },
        uSaturation: { value: saturation },
        uMouseRepulsion: { value: mouseRepulsion },
        uTwinkleIntensity: { value: twinkleIntensity },
        uRotationSpeed: { value: rotationSpeed },
        uRepulsionStrength: { value: repulsionStrength },
        uMouseActiveFactor: { value: 0.0 },
        uAutoCenterRepulsion: { value: autoCenterRepulsion },
        uTransparent: { value: transparent }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });
    let animateId: number;
    let lastTime = 0;

    function update(t: number) {
      animateId = requestAnimationFrame(update);
      
      // Frame-Limiting für stabilere Performance
      const deltaTime = t - lastTime;
      if (deltaTime < 16.67) return; // Max 60 FPS
      lastTime = t;
      
      if (!disableAnimation) {
        program.uniforms.uTime.value = t * 0.001;
        program.uniforms.uStarSpeed.value = (t * 0.001 * starSpeed) / 10.0;
      }

      const lerpFactor = 0.05;
      smoothMousePos.current.x += (targetMousePos.current.x - smoothMousePos.current.x) * lerpFactor;
      smoothMousePos.current.y += (targetMousePos.current.y - smoothMousePos.current.y) * lerpFactor;

      smoothMouseActive.current += (targetMouseActive.current - smoothMouseActive.current) * lerpFactor;

      program.uniforms.uMouse.value[0] = smoothMousePos.current.x;
      program.uniforms.uMouse.value[1] = smoothMousePos.current.y;
      program.uniforms.uMouseActiveFactor.value = smoothMouseActive.current;

      renderer.render({ scene: mesh });
    }
    animateId = requestAnimationFrame(update);
    ctn.appendChild(gl.canvas);

    function handleMouseMove(e: MouseEvent) {
      const rect = ctn.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      targetMousePos.current = { x, y };
      targetMouseActive.current = 1.0;
    }

    function handleMouseLeave() {
      targetMouseActive.current = 0.0;
    }

    if (mouseInteraction) {
      ctn.addEventListener('mousemove', handleMouseMove);
      ctn.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      cancelAnimationFrame(animateId);
      window.removeEventListener('resize', resize);
      if (mouseInteraction) {
        ctn.removeEventListener('mousemove', handleMouseMove);
        ctn.removeEventListener('mouseleave', handleMouseLeave);
      }
      ctn.removeChild(gl.canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [
    focal,
    rotation,
    starSpeed,
    density,
    hueShift,
    disableAnimation,
    speed,
    mouseInteraction,
    glowIntensity,
    saturation,
    mouseRepulsion,
    twinkleIntensity,
    rotationSpeed,
    repulsionStrength,
    autoCenterRepulsion,
    transparent
  ]);

  return <div ref={ctnDom} className="w-full h-full relative" {...rest} />;
}