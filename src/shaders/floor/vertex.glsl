varying vec2 vUv;

$common
$fog_pars_vertex

void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

  vUv = uv;

  gl_Position = projectionMatrix * vec4(mvPosition);

  $fog_vertex
}