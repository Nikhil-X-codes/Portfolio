import { useRef, useEffect } from 'react';
import './Lightning.css';

const Lightning = ({ hue = 230, xOffset = 0, speed = 1, intensity = 1, size = 1 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const vertexShaderSource = `
      attribute vec2 aPosition;
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform float uHue;
      uniform float uXOffset;
      uniform float uSpeed;
      uniform float uIntensity;
      uniform float uSize;
      
      #define OCTAVE_COUNT 8

      vec3 hsv2rgb(vec3 c) {
          vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0,4.0,2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
          return c.z * mix(vec3(1.0), rgb, c.y);
      }

      float hash12(vec2 p) {
          vec3 p3 = fract(vec3(p.xyx) * .1031);
          p3 += dot(p3, p3.yzx + 33.33);
          return fract((p3.x + p3.y) * p3.z);
      }

      mat2 rotate2d(float theta) {
          float c = cos(theta); float s = sin(theta);
          return mat2(c, -s, s, c);
      }

      float noise(vec2 p) {
          vec2 ip = floor(p); vec2 fp = fract(p);
          float a = hash12(ip);
          float b = hash12(ip + vec2(1.0, 0.0));
          float c = hash12(ip + vec2(0.0, 1.0));
          float d = hash12(ip + vec2(1.0, 1.0));
          vec2 t = smoothstep(0.0, 1.0, fp);
          return mix(mix(a, b, t.x), mix(c, d, t.x), t.y);
      }

      float fbm(vec2 p) {
          float value = 0.0; float amplitude = 0.5;
          for (int i = 0; i < OCTAVE_COUNT; ++i) {
              value += amplitude * noise(p);
              p *= rotate2d(0.45); p *= 2.0; amplitude *= 0.5;
          }
          return value;
      }

      // Helper to create a single bolt
      vec3 createBolt(vec2 uv, float offset, vec3 color, float time, float speed, float boltSize) {
          vec2 p = uv;
          p.x += offset;
          // Distortion
          p += 1.8 * fbm(p * boltSize + 0.5 * time * speed) - 1.0;
          float dist = abs(p.x);
          return color * (0.02 / dist) * uIntensity;
      }

      void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
          vec2 uv = (fragCoord / iResolution.xy) * 2.0 - 1.0;
          uv.x *= iResolution.x / iResolution.y;
          
          float t = iTime * uSpeed;
          vec3 finalCol = vec3(0.0);

          // 1. Red Bolt (Left Side)
          finalCol += createBolt(uv, 1.2, vec3(0.8, 0.1, 0.1), t, 1.1, uSize);

          // 2. Blue Bolt (Middle Left)
          finalCol += createBolt(uv, 0.4, vec3(0.1, 0.1, 0.9), t, 0.9, uSize * 1.1);

          // 3. Cyan/Default Bolt (Middle Right)
          vec3 cyanColor = hsv2rgb(vec3(mod(uHue/360.0 + t*0.05, 1.0), 0.7, 0.9));
          finalCol += createBolt(uv, -0.3, cyanColor, t, 1.0, uSize);

          // 4. Green Bolt (Right Side)
          finalCol += createBolt(uv, -1.1, vec3(0.1, 0.8, 0.2), t, 1.2, uSize * 0.9);

          // Add a slight glow/bloom effect
          finalCol = pow(finalCol, vec3(0.9));
          fragColor = vec4(finalCol, 1.0);
      }

      void main() {
          mainImage(gl_FragColor, gl_FragCoord.xy);
      }
    `;

    const compileShader = (source, type) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const program = gl.createProgram();
    gl.attachShader(program, compileShader(vertexShaderSource, gl.VERTEX_SHADER));
    gl.attachShader(program, compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER));
    gl.linkProgram(program);
    gl.useProgram(program);

    const vertices = new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const iResLoc = gl.getUniformLocation(program, 'iResolution');
    const iTimeLoc = gl.getUniformLocation(program, 'iTime');
    const uHueLoc = gl.getUniformLocation(program, 'uHue');
    const uSpeedLoc = gl.getUniformLocation(program, 'uSpeed');
    const uIntLoc = gl.getUniformLocation(program, 'uIntensity');
    const uSizeLoc = gl.getUniformLocation(program, 'uSize');

    const startTime = performance.now();
    let frameId;

    const render = () => {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(iResLoc, canvas.width, canvas.height);
      gl.uniform1f(iTimeLoc, (performance.now() - startTime) / 1000.0);
      gl.uniform1f(uHueLoc, hue);
      gl.uniform1f(uSpeedLoc, speed);
      gl.uniform1f(uIntLoc, intensity);
      gl.uniform1f(uSizeLoc, size);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      frameId = requestAnimationFrame(render);
    };
    
    frameId = requestAnimationFrame(render);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(frameId);
    };
  }, [hue, speed, intensity, size]);

  return <canvas ref={canvasRef} className="lightning-container" />;
};

export default Lightning;