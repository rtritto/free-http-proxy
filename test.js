const P = require('./index')

const t = new P();

(async () => {
  console.log(await t.getProxys(1))
  console.log(await t.getProxys(2))
  console.log(await t.getProxys(3))
})()



