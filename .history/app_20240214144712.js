let canvas = document.getElementById('webgl')
let gl = canvas.getContext('webgl')

gl.clearColor(0.0, 0.0, 0.0, 1.0) //RBG + Ahpha透明通道，0.0不完全透明
gl.clear(gl.COLOR_BUFFER_BIT) //大写：常量 like Math.PI //this is 清空颜色