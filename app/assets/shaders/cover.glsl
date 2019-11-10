-- vertex
varying vec2 vPosition;
varying vec2 vUv;

void main() {
  vPosition = position.xy;
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}

-- fragment
varying vec2 vPosition;
varying vec2 vUv;

uniform float uTime;
uniform float uResolutionRatio;
uniform float uImageRatio;
uniform sampler2D uNoise;
uniform sampler2D uCover;

{{ include('shaders/common.glsl') }}

void main() {
  vec2 pos = vPosition;
  pos.x *= uResolutionRatio;
  vec2 uv = vUv;
  uv.x *= uResolutionRatio / uImageRatio;
  uv.x -= (uResolutionRatio * 0.5 - uImageRatio * 0.5) * 0.5;

  vec3 color;
  vec3 color0 = color = texture2D(uCover, uv).rgb;

  float scale = 0.9;
  uv *= scale;

  vec3 color1 = color = texture2D(uCover, uv).rgb;

  float progress = abs(cos(uTime*0.5));
  float circ = smoothstep(0.2, 0.3, length(pos)*progress);
  color = mix(color1, color0, circ);

  gl_FragColor = vec4(color, 1.0);
}