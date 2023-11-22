export function createWebGLShader(config: { gl: WebGLRenderingContext, shaderSource: string, shaderType: "vertex" | "fragment" }): WebGLShader {
    const { gl, shaderSource, shaderType } = config;

    const webGLShader = gl.createShader(shaderType === "vertex" ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER);
    if (!webGLShader) throw new Error(`failed to create ${shaderType} shader}`);

    gl.shaderSource(webGLShader, shaderSource);
    gl.compileShader(webGLShader);
    if (!gl.getShaderParameter(webGLShader, gl.COMPILE_STATUS)) {
        gl.deleteShader(webGLShader);
        throw new Error(`failed to compile ${shaderType} shader}`);
    }

    return webGLShader;
}

export function createWebGLProgram(config: { gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader }): WebGLProgram {
    const { gl, vertexShader, fragmentShader } = config;

    const webGLProgram = gl.createProgram();
    if (!webGLProgram) throw new Error(`failed to create webGLProgram`);

    gl.attachShader(webGLProgram, vertexShader);
    gl.attachShader(webGLProgram, fragmentShader);
    gl.linkProgram(webGLProgram);
    if (!gl.getProgramParameter(webGLProgram, gl.LINK_STATUS)) {
        gl.deleteProgram(webGLProgram);
        throw new Error(`failed to link webGLProgram`);
    }

    return webGLProgram;
}