let canvas = document.getElementById('webgl')
let gl = canvas.getContext('webgl') //webgl 是3d，2d直接写2d


//vertexShader, fragmentShader 组成program
let vertexSource = `
void main() {
    gl_Position = vec4 (0.0, 0.0, 0.0, 1.0);
    gl_PointSize = 10.0;
}
`
//glsl

//this is 像素点的颜色的信息
let fragmentSource = `
void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
`;

//this is 容器
let vertexShader = gl.createShader(gl.VERTEX_SHADER)
let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)

gl.shaderSource(vertexShader, vertexSource)
gl.shaderSource(fragmentShader, fragmentSource)

gl.compileShader(vertexShader)
gl.compileShader(fragmentShader)

//program
let program = gl.createProgram()
gl.attachShader(program, vertexShader)
gl.attachShader(program, fragmentShader) 
gl.linkProgram(program)
gl.useProgram(program)

//webgl (3d)
gl.clearColor(0.5, 0.5, 0.5, 1.0)  //(0.0, 0.0, 0.0, 1.0)Black //RGB + Ahpha透明通道，0.0完全透明
gl.clear(gl.COLOR_BUFFER_BIT) //大写：常量 like Math.PI //this is 清空颜色*(整个画布)

//webgl (2d)
//ctx.fillRect(0, 0, 400, 400)
// gl.fillStyle = 'fuchsia'
// gl.fillRect(0, 0, 400, 400)