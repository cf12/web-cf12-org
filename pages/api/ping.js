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

  try {
    const icmpData = await ping.promise.probe(reqUrl, {
      timeout: 5
    })

    const ip = icmpData.numeric_host

    try {
      if (!ip)
        throw new Error()

      const fetchStart = now()
      const fetchRes = await fetch(`https://${ip}`, {
        timeout: 5000,
        mode: 'no-cors',
        referrerPolicy: 'no-referrer'
      })
      const fetchEnd = now()

      res.json({
        success: true,
        icmp: {
          alive: icmpData.alive,
          duration: icmpData.avg,
          host: icmpData.host,
          ip: icmpData.numeric_host
        },
        fetch: {
          status: fetchRes.status,
          duration: (fetchEnd - fetchStart).toFixed(2)
        }
      })
    } catch (err) {
      res.json({
        success: false,
        icmp: {
          alive: icmpData.alive,
          duration: icmpData.avg,
          host: icmpData.host,
          ip: icmpData.numeric_host
        },
        fetch: {
          status: null,
          duration: null
        }
      })
    }
  } catch (err) {
    res.json({ error: 'An unexpected error has occurred' })
    return
  }
}