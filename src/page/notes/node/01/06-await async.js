async function func () {
  return 2
}

func().then(console.log)

const getPosts = () => {
  return new Promise((resolve, reject) => {
    resolve([
      { name: 'a' },
      { name: 'b' },
      { name: 'c' },
      { name: 'd' }
    ])
  })
}

async function func2 () {
  try {
    const posts = await getPosts()
    const num = await func()
    console.log('func2: ', num)
    console.log('posts: ', posts)
  } catch (err) {
    console.log(err)
  }
}

func2()
