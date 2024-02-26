//Step3 封装成初始化的Shader 后面可以一直用
export default function initShaders(gl, vertexSource, fragmentSource) {
    let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource)
    let fragmentShader= createShader(gl, gl.FRAGMENT_SHADER, fragmentSource)
    
    let program = createProgram(gl, vertexShader, fragmentShader)

    if (program){
        gl.useProgram(program)
        //为了获得program的作用域，所有把他挂在gl对象上，as a 属性
        gl.program = program
        return true
    }
    else{
        console.log('failed to create program')
        return false
    }
}

console.log(gl.program)

//this is 容器
//let`s 封装
/**
 * create Shades Step1
 */
function createShader(gl, type, source){
    let shader = gl.createShader(type)
    gl.shaderSource(shader, source) 

    gl.compileShader(shader)

    //complie shader result 有可能失败//对于错误的处理
    let compiLe = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
    if (compiLe) {
        return shader
    }
    else {
        console.log('compile shader error' + error)
        gl.deleteShader(shader)
        return null
    }
}

//咁你就可以直接调用函数啦 //封装去function initShaders里面啦
// let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource)
// let fragmentShader= createShader(gl, gl.FRAGMENT_SHADER, fragmentSource)

//U dont need these anymore, they are in function now
// let vertexShader = gl.createShader(gl.VERTEX_SHADER)
// let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)

// gl.shaderSource(vertexShader, vertexSource) //this is 源代码
// gl.shaderSource(fragmentShader, fragmentSource)

// gl.compileShader(vertexShader)
// gl.compileShader(fragmentShader)

//program
/**
 * create Program Step2
 */
function createProgram(gl, vertexShader, fragmentShader){ //()内传入参数
    let program = gl.createProgram()
    if(!program) return null //d.h 创建的时候如果有问题会变成null

    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader) 
    
    gl.linkProgram(program)
    //link program result
    let linked = gl.getProgramParameter(program, gl.LINK_STATUS)
    if (linked) {
        // gl.useProgram(program) 封装去function initShaders里面啦 
        return program
    }
    else{
        let error = gl.getPrpgramInfoLog(program)
        console.log('link program error' + error)
        gl.deleteProgram(program)
        gl.deleteShader(vertexShader)
        gl.deleteShader(fragmentShader)
        return null
    }
    
}