async function chainAnimationsPromise (ele, animations) {
  let ret = null
  try {
    for (let anim of animations) {
      ret = await anim(elem)
    }
  } catch (err) {
    console.log(err)
  }
  return rest
}
