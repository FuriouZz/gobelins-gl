-- vertex
varying vec2 v_position;
varying vec2 v_uv;
varying vec3 v_normal;

void main() {
  v_position = position.xy;
  v_uv = uv;
  v_normal = normal;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
-- fragment
precision highp float;

varying vec2 v_position;
varying vec2 v_uv;
varying vec3 v_normal;

uniform float uProgress;
uniform float uTime;
uniform sampler2D uNoise;
uniform vec3 uColor;

vec4 noise4D(in vec2 uv, in float time) {
  vec4 c;
  c.r = texture2D(uNoise, uv+vec2(time, 0.2)).r;
  c.g = texture2D(uNoise, uv+vec2(0.4, time*0.9)).r;
  c.b = texture2D(uNoise, uv+vec2(0.51, -time*0.9)).r;
  c.a = texture2D(uNoise, uv+vec2(vec2(-time*0.8765, 0.67))).r;
  return c;
}

void main() {
  float y = v_position.y;
  y *= 0.5;
  y += 0.5;

  vec4 noise = noise4D(v_uv, uTime * 0.2);
  float n0 = noise.r + noise.g + noise.b + noise.a;
  n0 *= 0.25;
  n0 -= (1.0 - uProgress);
  if (n0 < 0.0) { discard; }

  gl_FragColor = vec4(uColor, uColor.r);
}