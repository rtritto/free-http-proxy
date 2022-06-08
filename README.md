# free-http-proxy

by default, proxy come from https://www.free-proxy-list.com

# usage


```
const P = require('free-http-proxy')

const t = new P();

(async ()=>{
  console.log(await t.getProxys({ page: 1 })) // note: page starts from 1
  //  console.log(await t.getProxys({ page: 2 }) // for page 2
  /**
   * t.getProxys now support more query params, thanks to rtritto https://github.com/rtritto
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
   * 
   */
})()

/*
[
  {
    ip: '110.139.19.149',
    port: '8080',
    country: 'Indonesia',
    city: 'Tangerang',
    speed: '111',
    latency: '0.2997s',
    uptime: '23.08',
    type: 'http',
    anonymity: 'High Anonymous',
    updated: '2 hours 28 mins',
    url: 'http://110.139.19.149:8080'
  },
  {
    ip: '119.235.27.118',
    port: '8080',
    country: 'Indonesia',
    city: 'Bogor',
    speed: '172',
    latency: '1.3107s',
    uptime: '15.00',
    type: 'https',
    anonymity: 'High Anonymous',
    updated: '2 hours 28 mins',
    url: 'https://119.235.27.118:8080'
  },
  {
    ip: '125.167.51.33',
    port: '8080',
    country: 'Indonesia',
    city: 'Kediri',
    speed: '205',
    latency: '0.2691s',
    uptime: '38.46',
    type: 'https',
    anonymity: 'High Anonymous',
    updated: '4 hours 28 mins',
    url: 'https://125.167.51.33:8080'
  }
]
*/

```