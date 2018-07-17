var SEPARATION = 50, AMOUNTX = 70, AMOUNTY = 70
var MaxX = AMOUNTX * SEPARATION * 0.5, MaxY = AMOUNTY * SEPARATION * 0.5
var PI2 = Math.PI * 2
var animationFrameTimer = null

function createPoints(scene) {
  var points = []
  var material = new THREE.SpriteCanvasMaterial({
    program: function(context) {
      context.beginPath()
      var radial = context.createRadialGradient(0, 0, 0, 0, 0, 0.4)
      radial.addColorStop(0, 'rgba(171,246,255,1)')
      radial.addColorStop(0.6, 'rgba(134,211,222,0.6)')
      radial.addColorStop(1, 'rgba(134,211,222,0.0)')
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
  var _w = container.offsetWidth,
    _h = container.offsetHeight
  var windowHalfX = _w / 2,
    windowHalfY = _h / 2
  var mouseX = 0,
    mouseY = 0,
    count = 0

  var camera = new THREE.PerspectiveCamera(75, _w / _h, 1, 10000) // 1. 创建相机
  camera.position.z = 1000 // 将相机向后（屏幕外）移
  var scene = new THREE.Scene() // 2. 创建场景， 所有的3d Object data 都包含在此
  var points = createPoints(scene)
  // 3. 创建render  加入CanvasRenderer，由渲染器决定场景中的物体看起来如何，并将其画出 (CanvasRenderer创建了它自己的DOM元素，这是一个普通的2D canvas对象)
  var renderer = new THREE.CanvasRenderer()
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(_w, _h)
  container.appendChild(renderer.domElement) // 4. 将渲染器的canvas domElement加入到body中, 这样我们才能在浏览器中看到它

  function renderPoint(x, y) {
    var point = points[x * AMOUNTX + y]
    var v = Math.sin((x + count) * 0.3) + Math.sin((y + count) * 0.5)
    point.position.y = v * 80 - 300
    point.scale.x = point.scale.y = v * 4 + 8
  }

  function animate() {
    if (!enabled) {
      window.cancelAnimationFrame(animationFrameTimer)
      return
    }
    animationFrameTimer = requestAnimationFrame(animate)

    camera.position.x += (mouseX - camera.position.x) / 20
    camera.position.y += (-mouseY - camera.position.y) / 20
    camera.lookAt(scene.position)

    for (var ix = 0; ix < AMOUNTX; ix++) {
      for (var iy = 0; iy < AMOUNTY; iy++) {
        renderPoint(ix, iy)
      }
    }

    renderer.render(scene, camera)
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
    var waveBg = new WaveBackground(document.querySelector(id))

    document.addEventListener('mousemove', waveBg.move)
    window.addEventListener('resize', () => {
      if (!waveBg) return false
      waveBg.resize(window.innerWidth, window.innerHeight)
    })
    return waveBg
  }
}
