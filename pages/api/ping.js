const url = require('url')
const ping = require('ping')
const ipValidator = require('is-my-ip-valid')
const validUrl = require('valid-url')
const fetch = require('node-fetch')
const now = require('performance-now')

export default async function handle (req, res) {
  let { url: reqUrl } = req.query

  if (validUrl.isWebUri(reqUrl)) {
    reqUrl = url.parse(reqUrl).host
  } else if (!ipValidator(reqUrl)) {
    res.json({ error: 'Invalid URL / IP' })
    return
  }

  let toRet = {
    success: false,
    icmp: {
      alive: null,
      duration: null,
      host: null,
      ip: null
    },
    fetch: {
      status: null,
      duration: null
    }
  }

  try {
    const icmpRes = await ping.promise.probe(reqUrl, {
      timeout: 5
    })

    console.log(icmpRes)

    if (icmpRes.alive) {
      toRet.success = true
      toRet.icmp = {
        alive: icmpRes.alive,
        duration: icmpRes.avg,
        host: icmpRes.host,
        ip: icmpRes.numeric_host
      }
    }
  } catch (err) { }

  try {
    const fetchStart = now()
    const fetchRes = await fetch(`https://${reqUrl}`, {
      timeout: 5000,
      mode: 'no-cors',
      referrerPolicy: 'no-referrer'
    })

    toRet.success = true
    toRet.fetch = {
      status: fetchRes.status,
      duration: (now() - fetchStart).toFixed(2)
    }
  } catch (err) { }

  res.json(toRet)
}