const request = require('request-promise')
const JSDOM = require("jsdom").JSDOM

class ProxySource {
  constructor(url = 'https://www.us-proxy.org/') {
    this.url = url
    this.proxys = []
    this.index = 0
    this.current
    this.jsdom
  }

  async loadPage(html) {
    if (!html) {
      this.html = await request(this.url)
      this.jsdom = new JSDOM(this.html)
    } else {
      this.html = html
      this.jsdom = new JSDOM(this.html)
    }

    const document = this.jsdom.window.document
    const pEl = document.querySelector("tbody")
    this.proxys = nodes2array(pEl.childNodes).map(tr => tr2proxy(tr))
    this.index = 0
    this.current = this.proxys[this.index]
  }

  async getProxy(forceUpdate = false) {
    if (forceUpdate || !this.current) {
      if (!this.proxys || this.proxys.length - 1 == this.index) {
        await this.loadPage()
        return this.current
      }
      this.index++
      this.current = this.proxys[this.index]
      return this.current
    }
    return this.current
  }
}

function tr2proxy(tr) {
  const [
    ip, port, code, country, anonymity, google, https, lastChecked
  ] = nodes2array(tr.childNodes).map(x => x.textContent)

  const isHttps = (https == 'yes')
  return {
    ip,
    port,
    code,
    country,
    anonymity,
    google,
    isHttps,
    lastChecked,
    url: isHttps ? `https://${ip}:${port}` : `http://${ip}:${port}`,
  }
}

function nodes2array(nodes) {
  let rtn = []
  for (let i = 0; i < nodes.length; i++) {
    rtn[i] = nodes[i]
  }
  return rtn
}

module.exports = ProxySource