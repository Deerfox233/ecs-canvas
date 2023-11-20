#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;

float v_speed = 1.0;

vec4 azure() {
    return vec4(0.2588, 0.7529, 1.0, abs(tan(u_time * v_speed)));
}

void main() {
    gl_FragColor = azure();
}