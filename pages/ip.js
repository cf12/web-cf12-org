import React, { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch';
import * as icons from 'react-icons/fa'

import Layout from 'components/Layout'

import styles from './ip.scss'

const Entry = (props) => {
  const Icon = (props.icon in icons)
    ? icons[props.icon]
    : icons['FaBeer']

  return (
    <div className={styles.entry}>
      <Icon />
      <div>
        <h5>{props.title}</h5>
        <p>{props.value}</p>
      </div>
    </div>
  )
}

const Ip = () => {
  const [ data, setData ] = useState()

  useEffect(() => {
    fetch('/api/ip')
      .then(res => res.json())
      .then(data => {
        setData({
          ip: data.ip,
          hostname: data.hostname,
          isp: data.isp,
          country: data.location.country
        })
      })
  }, [])

  if (!data)
    return null

  return (
    <Layout
      className={styles.body}
      seo={{
        title: 'IP Information - web.cf12.org',
        description: 'Shows your IP information'
      }}
    >
      <div className={styles.ip}>
        <h1>Your IPv4 Address is:</h1>
        <p>{data.ip}</p>
      </div>

      <div className={styles.info}>
        <div className={styles.left}>
          <Entry
            icon='FaSignal'
            title='IPv4 Address'
            value={data.ip}
          />
          <Entry
            icon='FaSignal'
            title='IPv6 Address'
            value='(WIP)'
          />
          <Entry
            icon='FaServer'
            title='Hostname'
            value={data.hostname}
          />
          <Entry
            icon='FaGlobeAmericas'
            title='Country'
            value={data.country}
          />
          <Entry
            icon='FaBuilding'
            title='Internet Service Provider (ISP)'
            value={data.isp}
          />
        </div>

        <div className={styles.right}>

        </div>
      </div>
    </Layout>
  )
}

export default Ip
