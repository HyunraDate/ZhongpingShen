//js往shader里传数据
import initShaders from './initShaders.js'

let canvas = document.getElementById('webgl')
let gl = canvas.getContext('webgl') //webgl 是3d，2d直接写2d


//vertexShader, fragmentShader 组成program


//后面要独立出来 因为these are all 字符串
//if you wanna use JS get data, like point

let vertexShader = `
attribute vec2 a_position;
void main() {
    gl_Position = vec4(a_position, 0.0, 1.0); 
    gl_PointSize = 20.0;
}
`
//glsl

//this is 像素点的颜色的信息
let fragmentShader = `
void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); 
}
`
//vec4是四维的向量
//对于三维空间的变换举证，必须要四维works, depends on 线性代数。一般为了简化运算是1.0 bzw.vec4(1.0, 0.0, 0.0, 1.0); 
//usually float like:float size = 20.0; gl_PointSize = size;



initShaders(gl, vertexShader, fragmentShader) //执行函数
//==================in initShaders.js=========================================
// //Step3 封装成初始化的Shader 后面可以一直用
// function initShaders(gl, vertexSource, fragmentSource) {
//     let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource)
//     let fragmentShader= createShader(gl, gl.FRAGMENT_SHADER, fragmentSource)
    
//     let program = createProgram(gl, vertexShader, fragmentShader)

//     if (program){
//         gl.useProgram(program)
//         //为了获得program的作用域，所有把他挂在gl对象上，as a 属性
//         gl.program = program
//         return true
//     }
//     else{
//         console.log('failed to create program')
//         return false
//     }
// }

// console.log(gl.program)

// //this is 容器
// //let`s 封装
// /**
//  * create Shades Step1
//  */
// function createShader(gl, type, source){
//     let shader = gl.createShader(type)
//     gl.shaderSource(shader, source) 

//     gl.compileShader(shader)

//     //complie shader result 有可能失败//对于错误的处理
//     let compiLe = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
//     if (compiLe) {
//         return shader
//     }
//     else {
//         console.log('compile shader error' + error)
//         gl.deleteShader(shader)
//         return null
//     }
// }

// //咁你就可以直接调用函数啦 //封装去function initShaders里面啦
// // let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource)
// // let fragmentShader= createShader(gl, gl.FRAGMENT_SHADER, fragmentSource)

// //U dont need these anymore, they are in function now
// // let vertexShader = gl.createShader(gl.VERTEX_SHADER)
// // let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)

// // gl.shaderSource(vertexShader, vertexSource) //this is 源代码
// // gl.shaderSource(fragmentShader, fragmentSource)

// // gl.compileShader(vertexShader)
// // gl.compileShader(fragmentShader)

// //program
// /**
//  * create Program Step2
//  */
// function createProgram(gl, vertexShader, fragmentShader){ //()内传入参数
//     let program = gl.createProgram()
//     if(!program) return null //d.h 创建的时候如果有问题会变成null

//     gl.attachShader(program, vertexShader)
//     gl.attachShader(program, fragmentShader) 
    
//     gl.linkProgram(program)
//     //link program result
//     let linked = gl.getProgramParameter(program, gl.LINK_STATUS)
//     if (linked) {
//         // gl.useProgram(program) 封装去function initShaders里面啦 
//         return program
//     }
//     else{
//         let error = gl.getPrpgramInfoLog(program)
//         console.log('link program error' + error)
//         gl.deleteProgram(program)
//         gl.deleteShader(vertexShader)
//         gl.deleteShader(fragmentShader)
//         return null
//     }
    
// }

// 你也要封装去function initShaders里面啦
// createProgram(gl, vertexShader, fragmentShader)

//==================in initShaders.js=========================================

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

//let position = [0.6, 0.0] //in this way 我们改东西只需要在js中改

let x = 0.5
let y = 0

let location = gl.getAttribLocation(gl.program, 'a_position') //传参：我们WebGL的名称：program
console.log(location) //获取成功是0，失败是-1

//写法1
//gl.vertexAttrib1f(location, 0.6, 0.0)
//1f float, 2f 2D, 3f 3D, 这段代码传到上面的 let vertexShader中。

//写法2
gl.vertexAttrib2f(location, ...position) //ES6写法
//gl.vertexAttrib2fv(location, new Float32Array(position)) //both ok *这里2fv 有v



//画一个点
gl.drawArrays(gl.POINTS, 0,1)

//webgl (2d)
//ctx.fillRect(0, 0, 400, 400)
// gl.fillStyle = 'fuchsia'
// gl.fillRect(0, 0, 400, 400)

console.log(gl.program)
//因为后面画东西的时候会用到gl.program