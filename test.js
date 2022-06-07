const P = require('./index')

const t = new P()

(async () => {
  console.log(await t.getProxys({ page: 1 }))
  console.log(await t.getProxys({ page: 2 }))
  console.log(await t.getProxys({ page: 3 }))
})()