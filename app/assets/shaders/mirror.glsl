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

struct MirrorStruct {
  float repeatX;
  float offsetX;
  float repeatY;
  float offsetY;
};
uniform MirrorStruct uMirror;

{{ include('shaders/common.glsl') }}

// 0.0 -> offset -> 0.0
void mirror_x(inout vec2 v, in float offset) {
  v.x -= offset;
  v.x = offset-abs(v.x);
  v.x = min(v.x, offset);
}

// 0.0 -> offset -> 0.0
void mirror_y(inout vec2 v, in float offset) {
  v.y -= offset;
  v.y = offset-abs(v.y);
  v.y = min(v.y, offset);
}

// 0.0 -> offset -> 0.0
void mirror(inout float f, in float offset) {
  f -= offset;
  f = offset-abs(f);
  f = min(f, offset);
}

void mirror(inout float f, in float repeat, in float offset) {
  float c = cos(f * M_PI * repeat) * offset;
  c = abs(c);
  f = c;
}

void main() {
  vec2 pos = v_position;
  match_resolution(pos, uResolutionRatio);

  vec2 uv = v_uv;
  mirror(uv.x, uMirror.repeatX, uMirror.offsetX);
  mirror(uv.y, uMirror.repeatY, uMirror.offsetY);
  // mirror(uv.x, mirrorData.offset);
  // mirror(uv.y, mirrorData.offset);

  vec3 color = texture2D(uTex0, uv).rgb;
  gl_FragColor = vec4(color, 1.0);
}