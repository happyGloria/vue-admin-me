var SEPARATION = 50, AMOUNTX = 70, AMOUNTY = 70
var MaxX = AMOUNTX * SEPARATION * 0.5, MaxY = AMOUNTY * SEPARATION * 0.5
var PI2 = Math.PI * 2

function createPoints(scene) {
  var points = []
  var material = new THREE.SpriteCanvasMaterial({
    program: function(context) {
      context.beginPath()
      var radial = context.createRadialGradient(0, 0, 0, 0, 0, 0.4)
      radial.addColorStop(0, 'rgba(171, 246, 255, 1)')
      radial.addColorStop(0.6, 'rgba(134, 211, 222, 0.6)')
      radial.addColorStop(1, 'rgba(134, 211, 222, 0.0)')
      context.fillStyle = radial
      context.arc(0, 0, 0.4, 0, PI2, true)
      context.fill()
    }
  })
  function createPoint(x, y) {
    var point = new THREE.Sprite(material)
    point.position.x = x * SEPARATION - MaxX
    point.position.z = y * SEPARATION - MaxY
    scene.add(point)
    points.push(point)
  }
  for (var ix = 0; ix < AMOUNTX; ix++) {
    for (var iy = 0; iy < AMOUNTY; iy++) { createPoint(ix, iy) }
  }
  return points
}

function WaveBackground(container) {
  var enabled = true
  var _w = container.offsetWidth, _h = container.offsetHeight
  var windowHalfX = _w / 2, windowHalfY = _h / 2
  var mouseX = 0, mouseY = 0, count = 0

  var camera = new THREE.PerspectiveCamera(75, _w / _h, 1, 10000) // 正投影相机
  camera.position.z = 1000
  var scene = new THREE.Scene() // 创建场景
  var points = createPoints(scene)

  var renderer = new THREE.CanvasRenderer() // 渲染器
  // renderer.setClearColorHex(0xffffff, 0.0);  // 刷新画布的颜色
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(_w, _h) // 设置渲染器渲染的范围
  container.appendChild(renderer.domElement)

  function renderPoint(x, y) {
    var point = points[x * AMOUNTX + y]
    var v = Math.sin((x + count) * 0.3) + Math.sin((y + count) * 0.5)
    point.position.y = v * 80 - 300
    point.scale.x = point.scale.y = v * 4 + 8
  }

  function animate() {
    if (!enabled) return
    requestAnimationFrame(animate)
    // console.log("animate : ", ts, (new Date()).getTime());

    camera.position.x += (mouseX - camera.position.x) / 20
    camera.position.y += (-mouseY - camera.position.y) / 20
    camera.lookAt(scene.position)

    for (var ix = 0; ix < AMOUNTX; ix++) {
      for (var iy = 0; iy < AMOUNTY; iy++) {
        renderPoint(ix, iy)
      }
    }

    renderer.render(scene, camera) // 只有调用了该函数，渲染器才会开始工作，我们才能在页面上看到物体
    count += 0.1
  }
  function resize(w, h) {
    windowHalfX = w / 2
    windowHalfY = h / 2
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h)
  }

  animate()

  return {
    // enable : function(){
    // 	enabled = true;
    // 	animate();
    // },
    disable: function() { enabled = false },
    resize: resize,
    move: function(evt) {
      mouseX = evt.clientX - windowHalfX
      mouseY = evt.clientY - windowHalfY
    }
  }
}

module.exports = {
  init(id) {
    return new WaveBackground(document.querySelector(id))
  }
}
