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
uniform sampler2D uTex0;

{{ include('shaders/common.glsl') }}

void main() {
  vec2 pos = v_position;
  match_resolution(pos, uResolutionRatio);

  vec2 uv = v_uv;
  uv.x -= 0.5;
  uv.x = 0.5-abs(uv.x);
  uv.y -= 0.5;
  uv.y = 0.5-abs(uv.y);

  vec3 color = texture2D(uTex0, uv).rgb;
  gl_FragColor = vec4(color, 1.0);
}