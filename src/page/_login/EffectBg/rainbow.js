var ctx = null
var w = 0,
  h = 0
const PI2 = Math.PI * 2
var opts = {
    lineCount: 100,
    starCount: 30,

    radVel: 0.01,
    lineBaseVel: 0.1,
    lineAddedVel: 0.1,
    lineVelTilt: Math.PI / 2,
    lineBaseLife: 400,
    lineAddedLife: 20,

    starBaseLife: 10,
    starAddedLife: 10,

    ellipseTilt: -0.3,
    ellipseBaseRadius: 200,
    ellipseAddedRadius: 40,
    ellipseAxisMultiplierX: 2,
    ellipseAxisMultiplierY: 1,
    ellipseCX: w / 2,
    ellipseCY: h / 2,

    repaintAlpha: 0.015
  },
  lines = [],
  stars = [],
  tick = 0,
  first = true

function init () {
  lines.length = stars.length = 0
  ctx.globalCompositeOperation = 'source-over'
  ctx.fillStyle = '#333'
  ctx.fillRect(0, 0, w, h)

  if (first) {
    loop()
    first = false
  }
}

function loop () {
  window.requestAnimationFrame(loop)
  step()
  draw()
}

function step () {
  tick += 0.5

  if (lines.length < opts.lineCount && Math.random() < 0.5) {
    lines.push(new Line())
  }

  if (stars.length < opts.starCount) {
    stars.push(new Star())
  }

  lines.map(function (line) {
    line.step()
  })
  stars.map(function (star) {
    star.step()
  })
}

function draw () {
  ctx.shadowBlur = 0
  ctx.globalCompositeOperation = 'source-over'
  ctx.fillStyle = 'rgba(0,0,0,alp)'.replace('alp', opts.repaintAlpha)
  ctx.fillRect(0, 0, w, h)

  ctx.globalCompositeOperation = 'lighter'

  ctx.translate(opts.ellipseCX, opts.ellipseCY)
  ctx.rotate(opts.ellipseTilt)
  ctx.scale(opts.ellipseAxisMultiplierX, opts.ellipseAxisMultiplierY)

  // ctx.shadowBlur here almost does nothing
  lines.map(function (line) {
    line.draw()
  })

  ctx.scale(1 / opts.ellipseAxisMultiplierX, 1 / opts.ellipseAxisMultiplierY)
  ctx.rotate(-opts.ellipseTilt)
  ctx.translate(-opts.ellipseCX, -opts.ellipseCY)

  stars.map(function (star) {
    star.draw()
  })
}

function Line () {
  this.reset()
}
Line.prototype.reset = function () {
  this.rad = Math.random() * PI2
  this.len = opts.ellipseBaseRadius + Math.random() * opts.ellipseAddedRadius
  this.lenVel = opts.lineBaseVel + Math.random() * opts.lineAddedVel

  this.x = this.px = Math.cos(this.rad) * this.len
  this.y = this.py = Math.sin(this.rad) * this.len

  this.life = this.originalLife = opts.lineBaseLife + Math.random() * opts.lineAddedLife

  this.alpha = 0.2 + Math.random() * 0.8
}
Line.prototype.step = function () {
  --this.life
  // var ratio = 1 - 0.1 * this.life / this.originalLife
  this.px = this.x
  this.py = this.y

  this.rad += opts.radVel
  this.len -= this.lenVel

  this.x = Math.cos(this.rad) * this.len
  this.y = Math.sin(this.rad) * this.len

  if (this.life <= 0) {
    this.reset()
  }
}
Line.prototype.draw = function () {
  var ratio = Math.abs(this.life / this.originalLife - 1 / 2)

  ctx.lineWidth = ratio * 5
  ctx.strokeStyle = ctx.shadowColor = 'hsla(hue, 80%, light%, alp)'
    .replace('hue', tick + this.x / (opts.ellipseBaseRadius + opts.ellipseAddedRadius) * 100)
    .replace('light', 75 - ratio * 150)
    .replace('alp', this.alpha)
  ctx.beginPath()
  ctx.moveTo(this.px, this.py)
  ctx.lineTo(this.x, this.y)

  ctx.stroke()
}

function Star () {
  this.reset()
}
Star.prototype.reset = function () {
  this.x = Math.random() * w
  this.y = Math.random() * h
  this.life = opts.starBaseLife + Math.random() * opts.starAddedLife
}
Star.prototype.step = function () {
  --this.life

  if (this.life <= 0) {
    this.reset()
  }
}
Star.prototype.draw = function () {
  ctx.fillStyle = ctx.shadowColor = 'hsla(hue, 80%, 50%, .2)'
    .replace('hue', tick + this.x / w * 100)
  ctx.shadowBlur = this.life
  ctx.fillRect(this.x, this.y, 1, 1)
}

module.exports = {
  init (id) {
    var wrapper = document.querySelector(id)
    var c = document.createElement('canvas')
    wrapper.appendChild(c)
    w = c.width = window.innerWidth
    h = c.height = window.innerHeight
    ctx = c.getContext('2d')
    opts.ellipseCX = w / 2
    opts.ellipseCY = h / 2
    init()
  },
  resize () {
    opts.ellipseCX = window.innerWidth / 2
    opts.ellipseCY = window.innerHeight / 2
  }
}
