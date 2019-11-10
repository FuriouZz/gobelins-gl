-- vertex
// attribute vec2 position;
// in vec2 position;

varying vec2 vPosition;
varying vec2 vUv;
// out vec2 vPosition;

void main() {
  vPosition = position.xy;
  vUv = uv;
  // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
  gl_Position = vec4(position, 1.0);
}

-- fragment
varying vec2 vPosition;
varying vec2 vUv;
// in vec2 vPosition;

uniform float uTime;
uniform float uResolutionRatio;
uniform sampler2D uNoise;

vec4 noise4D(in vec2 uv, in float time) {
  vec4 c;
  c.r = texture2D(uNoise, uv+vec2(time, 0.2)).r;
  c.g = texture2D(uNoise, uv+vec2(0.4, time*0.9)).r;
  c.b = texture2D(uNoise, uv+vec2(0.51, -time*0.9)).r;
  c.a = texture2D(uNoise, uv+vec2(vec2(-time*0.8765, 0.67))).r;
  return c;
}

void main() {
  vec2 pos = vPosition;
  pos.x *= uResolutionRatio;
  float d = length(pos);

  // d = smoothstep(0.0, 1.0, d);
  vec3 c0 = vec3(1.0, 0.0, 0.0);
  vec3 c1 = vec3(0.0, 0.0, 1.0);

  float noise = texture2D(uNoise, vUv+vec2(uTime*0.2)).r;

  vec3 color = mix(c0, c1, d * noise);
  float alpha = 1.0;

  // gl_FragColor = vec4(color, alpha);

  vec4 n = noise4D(vUv*10.0, uTime*0.2);
  noise = n.r + n.g + n.b + n.a;
  // noise /= 4.0;
  d += noise*0.09;
  d = smoothstep(0.49, 0.5, d) - smoothstep(0.5, 0.51, d);

  gl_FragColor = vec4(vec3(d), 1.0);
}