-- vertex
attribute vec3 position;
attribute vec2 uv;

varying vec2 v_position;
varying vec2 v_uv;

void main() {
  v_position = position.xy;
  v_uv = uv;
  gl_Position = vec4(position, 1.0);
}

-- fragment
precision highp float;

varying vec2 v_position;
varying vec2 v_uv;

uniform float uTime;
uniform float uResolutionRatio;
uniform sampler2D uNoise;

{{ include('shaders/common.glsl') }}

vec4 noise4D(in vec2 uv, in float uTime) {
  vec4 c;
  c.r = texture2D(uNoise, uv+vec2(uTime, 0.2)).r;
  c.g = texture2D(uNoise, uv+vec2(0.4, uTime*0.9)).r;
  c.b = texture2D(uNoise, uv+vec2(0.51, -uTime*0.9)).r;
  c.a = texture2D(uNoise, uv+vec2(vec2(-uTime*0.8765, 0.67))).r;
  return c;
}

float expoOut(float t) {
  if (t == 1.0) {
      return t;
  }
  return 1.0 - pow(2.0, -10.0 * t);
}

void main() {
  vec2 pos = v_position;
  match_resolution(pos, uResolutionRatio);

  float radius = length(pos);

  // Compuse noise
  vec2 uv = v_uv;
  uv += uTime * 0.25;
  uv *= 0.75;

  vec4 noise = noise4D(uv, uTime*0.2);
  float n0 = (noise.r + noise.g + noise.b + noise.a);
  float n1 = n0;
  n0 -= 2.0;
  n0 *= 0.073;

  // Pythagore
  float diagonal = sqrt(uResolutionRatio*uResolutionRatio+1.0*1.0);

  // Compute circle
  float c = circle(radius+n0, diagonal*0.25, 0.0125+(noise.r*0.5));

  float b = cos(M_PI * 50.0 * (uTime*0.2+radius+((noise.r+nsoise.a)*0.12)));

  gl_FragColor = vec4(c*b, 0.0, 0.0, 1.0);
}