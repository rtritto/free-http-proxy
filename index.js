const axios = require('axios')
const JSDOM = require("jsdom").JSDOM

class ProxySource {
  constructor(url = 'https://www.free-proxy-list.com') {
    this.url = url
  }

  /**
   * 
   * @param {{
   *   page?: number
   *   country?: string
   *   port?: number From 0 to 65535
   *   type?: 'http'|'https'|'socks4/5'
   *   level?: 'none'|'anonymous'|'high-anonymous'
   *   speed?: 1|2|3
   *   connect_time?: 1|2|3
   *   up_time?: number From 0 to 100
   * }} query 
   * @returns 
   */
  async getProxys({ page, country, port, type, level, speed, connect_time, up_time }) {
    const html = await axios.get(this.url, {
      params: {
        ...page && { page },
        ...country && { 'country[]': country },
        ...port && { port },
        ...type && { 'type[]': type },
        ...level && { 'level[]': level },
        ...speed && { 'speed[]': speed },
        ...connect_time && { 'connect_time[]': connect_time },
        ...up_time && { up_time },
        ...port || type || up_time && { search: 'Search' }
      },
      responseType: 'text'
    }).then(res => res.data)
    let jsdom = new JSDOM(html)
    let { document } = jsdom.window
    let nodes = document.querySelectorAll('.proxy-list tbody tr')
    return [...nodes].map(x => tr2proxy(x))
  }
}

function tr2proxy(tr) {
  const [
    _0, _1, _2,
    ip, _3, _4, _5, port, _6, country, _7, city, _8, speed, _9,
    latency, _10, uptime, _11, type, _12, anonymity, _13, updated] =
    [...tr.childNodes].map(x => x.textContent.trim())
  return {
    ip, port, country, city, speed, latency, uptime, type, anonymity, updated,
    url: type === 'https' ? `https://${ip}:${port}` : `http://${ip}:${port}`,
  }
}


module.exports = ProxySource