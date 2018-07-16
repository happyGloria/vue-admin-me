var SEPARATION = 100, AMOUNTX = 50, AMOUNTY = 50
var MaxX = AMOUNTX * SEPARATION * 0.5, MaxY = AMOUNTY * SEPARATION * 0.5
var PI2 = Math.PI * 2

function createParticles(scene) {
  // 创建一个粒子材质，向其传入颜色及粒子渲染函数
  var material = new THREE.ParticleCanvasMaterial({
    color: 0x0078de,
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

  var particles = [] // 储存粒子
  function createParticle(x, y) {
    var particle = new THREE.Particle(material)
    particle.position.x = x * SEPARATION - MaxX
    particle.position.z = y * SEPARATION - MaxY
    scene.add(particle)
    particles.push(particle)
  }
  for (var ix = 0; ix < AMOUNTX; ix++) {
    for (var iy = 0; iy < AMOUNTY; iy++) {
      createParticle(ix, iy)
    }
  }
  return particles
}

function WaveBackground(container) {
  var enabled = true
  var _w = window.innerWidth, _h = window.innerHeight
  var windowHalfX = _w / 2, windowHalfY = _h / 2
  var mouseX = 0,
    mouseY = 0,
    count = 0

  var scene = new THREE.Scene() // 1. 创建场景， 包含所有3D对象数据
  var particles = createParticles(scene) // 2. 创建物体，并添加至场景

  var camera = new THREE.PerspectiveCamera(75, _w / _h, 1, 10000) // 3. 创建相机，有位置posiiton, 旋转rotation, 视野field of view
  camera.position.z = 1000

  var renderer = new THREE.CanvasRenderer() // 4. 渲染器
  // renderer.setPixRatio(window.devicePixelRatio)
  renderer.setSize(_w, _h) // 设置渲染范围
  container.appendChild(renderer.domElement)
  renderer.render(scene, camera) // 奖场景添加到相机，渲染器开始工作

  function renderParticle(x, y, i) {
    var particle = particles[i++]
    particle.position.y = (Math.sin((x + count) * 0.3) * 50) + (Math.sin((y + count) * 0.5) * 50)
    particle.scale.x = particle.scale.y = (Math.sin((x + count) * 0.3) + 1) * 2 + (Math.sin((y + count) * 0.5) + 1) * 2
  }
  function render() {
    camera.position.x += (mouseX - camera.position.x) * 20
    camera.position.y += (-mouseY - camera.position.y) * 20
    camera.lookAt(scene.position)
    var i = 0
    for (var ix = 0; ix < AMOUNTX; ix++) {
      for (var iy = 0; iy < AMOUNTY; iy++) {
        renderParticle(ix, iy, i++)
      }
    }
    renderer.render(scene, camera)
    count += 0.1
  }
  function animate() {
    if (!enabled) return
    requestAnimationFrame(animate)
    render() // 渲染例子
  }

  function resize() {
    windowHalfX = _w / 2
    windowHalfY = _h / 2
    camera.aspect = _w / _h
    camera.updateProjectionMatrix()
    renderer.setSize(_w, _h)
  }

  animate()

  return {
    disable() { enabled = false },
    resize,
    move(evt) {
      mouseX = evt.clientX - windowHalfX
      mouseY = evt.clientY - windowHalfY
    }
  }
}
module.exports = {
  init(id) {
    var waveBg = new WaveBackground(document.querySelector(id))

    document.addEventListener('mousemove', waveBg.move, false)
    window.addEventListener('resize', waveBg.resize, false)

    return waveBg
  }
}
