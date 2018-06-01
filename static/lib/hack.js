var $$ = function(name, attr, value) {
  var $el = document.createElement(name)
  $el.setAttribute(attr, value)
  return $el
}

document.write(
  $$('script', 'src', '/static/lib/promise.js').outerHTML
)
