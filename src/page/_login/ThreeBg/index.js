var SEPARATION = 100,
  AMOUNTX = 50,
  AMOUNTY = 50

var container, camera, scene, renderer

var particles, particle, count = 0

var mouseX = 0,
  mouseY = 0

var windowHalfX = window.innerWidth / 2
var windowHalfY = window.innerHeight / 2

function onWindowResize() {
  windowHalfX = window.innerWidth / 2
  windowHalfY = window.innerHeight / 2

  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
}
//
function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX
  mouseY = event.clientY - windowHalfY
}

/* function onDocumentTouchStart(event) {
  if (event.touches.length === 1) {
    event.preventDefault()
    mouseX = event.touches[0].pageX - windowHalfX
    mouseY = event.touches[0].pageY - windowHalfY
  }
}

function onDocumentTouchMove(event) {
  if (event.touches.length === 1) {
    event.preventDefault()
    mouseX = event.touches[0].pageX - windowHalfX
    mouseY = event.touches[0].pageY - windowHalfY
  }
} */

function animate() {
  requestAnimationFrame(animate)
  render()
}

function render() {
  camera.position.x += (mouseX - camera.position.x) * 0.05
  camera.position.y += (-mouseY - camera.position.y) * 0.05
  camera.lookAt(scene.position)
  var i = 0
  for (var ix = 0; ix < AMOUNTX; ix++) {
    for (var iy = 0; iy < AMOUNTY; iy++) {
      particle = particles[i++]
      particle.position.y = (Math.sin((ix + count) * 0.3) * 50) + (Math.sin((iy + count) * 0.5) * 50)
      particle.scale.x = particle.scale.y = (Math.sin((ix + count) * 0.3) + 1) * 2 + (Math.sin((iy + count) * 0.5) + 1) * 2
    }
  }
  renderer.render(scene, camera)
  count += 0.1
}

/* function WaveBackground(container) {
   var enabled = true
  var _w = container.offsetWidth, _h = container.offsetHeight
  var windowHalfW = _w / 2, windowHalfH = _h / 2
  var mouseX = 0, mouseY = 0, count = 0
}*/

module.exports = {
  init(id) {
    container = document.querySelector(id)
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000) // 正投影照相机
    camera.position.z = 1000
    scene = new THREE.Scene() // 场景
    particles = []
    var PI2 = Math.PI * 2
    var material = new THREE.ParticleCanvasMaterial({
      color: 0x0078de,
      program: function(context) {
        /* context.beginPath()
        context.arc(0, 0, 1, 0, PI2, true)
        context.fill() */
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
    var i = 0
    for (var ix = 0; ix < AMOUNTX; ix++) {
      for (var iy = 0; iy < AMOUNTY; iy++) {
        particle = particles[i++] = new THREE.Particle(material)
        particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2)
        particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2)
        scene.add(particle)
      }
    }
    renderer = new THREE.CanvasRenderer() // 渲染器
    renderer.setSize(window.innerWidth, window.innerHeight) // 设置渲染器渲染的范

    container.appendChild(renderer.domElement)

    document.addEventListener('mousemove', onDocumentMouseMove, false)
    window.addEventListener('resize', onWindowResize, false)
    animate()
  }
}
