const url = require('url')
const dns = require('dns')
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
    const fetchStart = now()
    const fetchRes = await fetch(`https://${reqUrl}`, {
      timeout: 5000,
      mode: 'no-cors',
      referrerPolicy: 'no-referrer'
    })

    let toRet = {
      success: true,
      status: fetchRes.status,
      duration: (now() - fetchStart).toFixed(2)
    }

    dns.resolve(reqUrl, (err, addrs) => {
      if (!err && addrs.length)
        toRet.ip = addrs[0]

      res.json(toRet)
    })
  } catch (err) {
    res.json({
      success: false
    })
  }
}