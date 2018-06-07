export default {
  timer(np, fn, time) {
    let timer = window.timer = window.timer = {}
    if (!(_.isUndefined(timer[np]))) {
      window.clearTimeout(timer[np])
    }
    if (fn) {
      timer[np] = window.setTimeout(fn, time)
    }
  }
}
