uniform float time;
uniform float offset;
uniform vec3 color;
varying vec2 vUv;

void main()	{
  float o = fract(time + offset / 10.);
  float length = 0.2;

  if (abs(vUv.x - o) > length && abs(vUv.x - o + 1.) > length && abs(vUv.x - o - 1.) > length) {
    discard;
  }

	gl_FragColor = vec4(color * 0.4, 1.);

  if (gl_FrontFacing) {
	  gl_FragColor = vec4(color, 1.);
  }
}