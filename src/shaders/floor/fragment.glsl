
varying vec2 vUv;

uniform float worldSize;

$common
$fog_pars_fragment

void main() {
  float p = smoothstep(0.01, 0.04, length(fract(worldSize * vUv) - 0.5));
  vec3 col = mix(vec3(1.0, 1.0, 1.0), vec3(0.0, 0.0, 0.0), vec3(p));

  gl_FragColor = vec4(col, 1.0);

  $fog_fragment
}
