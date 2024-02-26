let canvas = document.getElementById('webgl')
let gl = canvas.getContext('webgl') //webgl 是3d，2d直接写2d


//vertexShader, fragmentShader 组成program
let vertexSource = `
void main() {
    gl_Position = vec4 (0.0, 0.0, 0.0, 1.0); //center
    gl_PointSize = 10.0;
}
`
//glsl

//this is 像素点的颜色的信息
let fragmentSource = `
void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); //red
}
`

//this is 容器
//let`s 封装
/**
 * create Shades
 */
function createShader(gl, type, source){
    let shader = gl.createShader(type)
    gl.shaderSource(shader, source) 

    gl.compileShader(shader)

    //complie shader result 有可能失败
    let compiLe = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
    if (compiLe) {
        return shader
    }
    else {
        return null
    }
    return shader
}

//咁你就可以直接调用函数啦
let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource)
let fragmentShader= createShader(gl, gl.FRAGMENT_SHADER, vertexSource)
//U dont need these anymore, they are in function now
// let vertexShader = gl.createShader(gl.VERTEX_SHADER)
// let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)

// gl.shaderSource(vertexShader, vertexSource) //this is 源代码
// gl.shaderSource(fragmentShader, fragmentSource)

// gl.compileShader(vertexShader)
// gl.compileShader(fragmentShader)

//program
function createProgram(){

}
let program = gl.createProgram()
gl.attachShader(program, vertexShader)
gl.attachShader(program, fragmentShader) 
gl.linkProgram(program)
gl.useProgram(program)

//webgl (3d) //清空canvas画布
//gl.clearColor(0.5, 0.5, 0.5, 1.0)  //(0.0, 0.0, 0.0, 1.0)Black //RGB + Ahpha透明通道，0.0完全透明
//gl.clear(gl.COLOR_BUFFER_BIT) //大写：常量 like Math.PI //this is 清空颜色*(整个画布)

//ps if you wanna #ffd4fb，你可以将其转换为RGB值，然后将每个分量除以255.0来得到相应的浮点数。
// 将颜色#ffd4fb转换为浮点数
let r = 255 / 255.0;
let g = 212 / 255.0;
let b = 251 / 255.0;

// 设置清除颜色
gl.clearColor(r, g, b, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT) 

//画一个点
gl.drawArrays(gl.POINTS, 0,1)

//webgl (2d)
//ctx.fillRect(0, 0, 400, 400)
// gl.fillStyle = 'fuchsia'
// gl.fillRect(0, 0, 400, 400)