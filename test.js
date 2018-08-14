const P = require('./index')

const t = new P();

(async ()=>{
  await t.loadPage()
  console.log(await t.getProxy())
  console.log(await t.getProxy(true))
  console.log(await t.getProxy(true))
  console.log(await t.getProxy(true))
  console.log(await t.getProxy())
  console.log(await t.getProxy())
})()



