const canvas = document.getElementById("canvas") as HTMLCanvasElement;

const gl = canvas.getContext("webgl");

if (!gl) {
  throw new Error("WebGL not supported");
}

