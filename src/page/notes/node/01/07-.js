const fs = require('fs')
const readFilePromise = filename => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if (err) {
        reject(err)
        return
      }
      resolve(data)
    })
  })
}

async function main () {
  const txt = await readFilePromise('./mock.txt')
  console.log(txt.toString())
}

main()
