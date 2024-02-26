let canvas = document.getElementById('webgl')
let gl = canvas.getContext('2d') //webgl 是3d，2d直接写2d

//webgl (3d)
gl.clearColor(0.0, 0.0, 0.0, 1.0) //RBG + Ahpha透明通道，0.0完全透明
gl.clear(gl.COLOR_BUFFER_BIT) //大写：常量 like Math.PI //this is 清空颜色

//webgl (2d)
//ctx.fillRect(0, 0, 400, 400)
gl.fillStyle = '#ffd4fb'
gl.fillRect(0, 0, 400, 400)