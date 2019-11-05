#define M_PI 3.1415926535897932384626433832795

float circle(in vec2 point, in float radius, in float weight) {
  float ln = length(point);
  float c0 = smoothstep(radius-weight, radius, ln);
  float c1 = smoothstep(radius, radius+weight, ln);
  return c0 - c1;
}

float circle(in float ln, in float radius, in float weight) {
  float c0 = smoothstep(radius-weight, radius, ln);
  float c1 = smoothstep(radius, radius+weight, ln);
  return c0 - c1;
}

void match_resolution(inout vec2 point, float ratio) {
  point.x *= ratio;
}