require('dotenv').config()

const dns = require('dns')
const geoip = require('geoip-lite')

export default async function handle (req, res) {
  try {
    const ip = (req.headers['x-forwarded-for'] || '').split(',').pop() ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress

    const data = geoip.lookup(ip)

    if (!data) {
      res.json({
        ip: ip,
        hostname: '[Unknown]',
        location: {
          country: null,
          region: null,
          timezone: null,
          city: null,
          coords: null
        }
      })

      return
    }

    dns.reverse(ip, (err, hostnames) => {
      res.json({
        ip: ip,
        hostname: (!err) ? hostnames[0] : '[Unknown]',
        location: {
          country: data.country,
          region: data.region,
          timezone: data.timezone,
          city: data.city,
          coords: data.ll
        }
      })
    })
  } catch (err) {
    console.error(err)
    res.json({ error: 'An unexpected error has occurred' })
  }
}