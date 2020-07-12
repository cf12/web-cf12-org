import React, { useState, useEffect } from 'react'
import { BeatLoader } from 'react-spinners'
import { Element, Link } from 'react-scroll'
import * as icons from 'react-icons/fa'

import Layout from 'components/Layout'
import Map from 'components/Map'

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
      .then(setData)
  }, [])

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
        <p>{ (data) ? data.ip : <BeatLoader color='white' /> }</p>

        <Link
          className={styles.indicator}
          to='body'
          duration={300}
          smooth
        >
          <p>More Info</p>
          <icons.FaChevronDown />
        </Link>
      </div>

      <Element name='body' />

      <div className={styles.info}>
        {
          data ? (
            <>
              <div className={styles.left}>
                { data.location.coords ?
                  <Map
                    lat={data.location.coords[0]}
                    lon={data.location.coords[1]}
                  /> : <Map />
                }
              </div>

              <div className={styles.right}>
                <Entry
                  icon='FaSignal'
                  title='IPv4 Address'
                  value={data.ip || '[Unknown]'}
                />
                <Entry
                  icon='FaServer'
                  title='Hostname'
                  value={data.hostname || '[Unknown]'}
                />
                <Entry
                  icon='FaCity'
                  title='City'
                  value={data.location.city || '[Unknown]'}
                />
                <Entry
                  icon='FaGlobeAmericas'
                  title='Country'
                  value={data.location.country || '[Unknown]'}
                />
                <Entry
                  icon='FaGlobeAmericas'
                  title='Region'
                  value={data.location.region || '[Unknown]'}
                />
              </div>
            </>
          ) : (
            <BeatLoader color='white' />
          )
        }
      </div>
    </Layout>
  )
}

export default Ip
