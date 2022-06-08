const axios = require('axios')
const { parse } = require('node-html-parser')

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

    const root = parse(html, {
      blockTextElements: {
        script: false,
        style: false
      },
      comment: false
    })

    const trsRaw = root.querySelectorAll('.proxy-list tbody tr')
    const trs = trsRaw.map(tr => tr.querySelectorAll('td'))

    return trs.map(tr2proxy)
  }
}

function tr2proxy(tr) {
  const ip = tr[0].text
  const port = tr[2].text
  const type = tr[8].text

  return {
    ip,
    port: parseInt(port, 10),
    country: tr[3].text.trim(),
    city: tr[4].text,
    speed: tr[5].text.trim(),
    latency: tr[6].text.trim(),
    uptime: tr[7].text.trim(),
    type,
    anonymity: tr[9].text,
    updated: tr[10].text,
    ...(type === 'http' || type === 'https') && { url: `${type}://${ip}:${port}` }
  }
}


module.exports = ProxySource