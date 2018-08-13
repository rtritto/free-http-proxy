const P = require('./index')

const t = new P(false);

(async ()=>{
  await t.loadPage(require('fs').readFileSync('test-html.txt',{encoding:'utf-8'}))
  console.log(await t.getProxy())
  console.log(await t.getProxy(true))
  console.log(await t.getProxy(true))
  console.log(await t.getProxy(true))
  console.log(await t.getProxy())
  console.log(await t.getProxy())
})()



