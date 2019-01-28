function dbFn1(db) {
  let docs = [{}, {}, {}]
  // 以下这种方式将是并发执行，也就是同时执行，而不是继发执行。应该采用for循环
  /* docs.forEach(async function(doc) {
    await db.post(doc)
  }) */
  for (let doc of docs) {
    await db.post(doc)
  }
}

// 如果确实希望多个请求并发执行，可以用Promise.all
async function dbFn2(db) {
  let docs = [{}, {}, {}]
  let promises = docs.map(doc => db.post(doc))
  let results = await Promise.all(promises)
  console.log(results)
}

async function dbFn3() {
  let docs = [{}, {}, {}]
  let promises = docs.map(doc => db.post(doc))
  let results = []
  for (let promise of promises) {
    results.push(await promise)
  }
  console.log(results)
}