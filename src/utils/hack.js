export function tooltips (e) {
  if (!e && $.isIE9()) {
    let list = this.$refs.tooltip
    setTimeout(() => {
      if ($.isArray(list)) {
        $.for(list, (item) => {
          item.doDestroy()
        })
      } else if (list) {
        list.doDestroy()
      }
    }, 0)
  }
}

export function isIE9 () {
  let isIE9 = !1
  let browser = $.browser
  if (browser.msie && browser.version < 10) {
    isIE9 = !0
  }
  return isIE9
}
