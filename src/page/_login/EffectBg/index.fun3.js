// 全局变量
// three的三要素
var camera, scene, renderer
// 跟踪鼠标位置
var mouseX = 0,
  mouseY = 0,
  // 一个数组，用于存储我们的粒子
  particles = []
const PI2 = Math.PI * 2
// 初始化
function init (container) {
  // 照相机的参数
  camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 4000)
  // 将相机屏幕外移动
  camera.position.z = 1000

  scene = new THREE.Scene()
  scene.add(camera)
  // 渲染器
  renderer = new THREE.CanvasRenderer()
  // 设置2Dcanvas的大小
  renderer.setSize(window.innerWidth, window.innerHeight)
  // 将渲染器的canvas domElement加入到body中
  container.appendChild(renderer.domElement)
  makeParticles()
  // 设置鼠标移动监听
  document.addEventListener('mousemove', onMouseMove, false)

  // 每秒渲染30次
  setInterval(update, 1000 / 10)
}

function update () {
  // 作用是将粒子向前移动
  updateParticles()
  // 从相机的视角渲染场景
  renderer.render(scene, camera)
}

function makeParticles () {
  var particle, material // 创建粒子和材质
  for (var zpos = -1000; zpos < 1000; zpos += 20) {
    // 创建材质
    material = new THREE.ParticleCanvasMaterial({
      color: getRandomColor(),
      // color: 0xffffff,
      program: particleRender

    })
    // 创建粒子
    particle = new THREE.Particle(material)
    particle.position.x = Math.random() * 1000 - 500
    particle.position.y = Math.random() * 1000 - 500
    particle.position.z = zpos
    // 将其放大一点
    particle.scale.x = particle.scale.y = 10
    // 放入到场景中
    scene.add(particle)
    // 将粒子加入到particles数组中
    particles.push(particle)
  }
}

function particleRender (context) {
  context.beginPath()
  var radial = context.createRadialGradient(0, 0, 0, 0, 0, 0.4)
  radial.addColorStop(0, 'rgba(171,246,255,1)')
  radial.addColorStop(0.6, 'rgba(134,211,222,0.6)')
  radial.addColorStop(1, 'rgba(134,211,222,0.0)')
  context.fillStyle = radial
  context.arc(0, 0, 0.4, 0, PI2, true)
  context.fill()
}

function getRandomColor () {
  var r = 255 * Math.random() | 0,
    g = 255 * Math.random() | 0,
    b = 255 * Math.random() | 0
  // console.log( parseInt(r, 16) );
  return '0x' + parseInt(r, 16) + parseInt(g, 16) + parseInt(b, 16)
}

function updateParticles () {
  for (var i = 0; i < particles.length; i++) {
    var particle = particles[i]
    particle.position.z += mouseY * 0.1
    if (particle.position.z > 1000) {
      particle.position.z -= 2000
    }
  }
}

function onMouseMove (event) {
  mouseX = event.cilentX
  mouseY = event.clientY
}

module.exports = {
  init (id) {
    init(document.querySelector(id))
  },
  stop () {}
}
