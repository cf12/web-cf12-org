import React from 'react'
import fetch from 'isomorphic-unfetch';
import * as icons from 'react-icons/fa'

import Meta from '../components/meta'
import Footer from '../components/footer'


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

class Ip extends React.Component {
  constructor (props) {
    super(props)

    this.state = {}

    fetch('/api/ip')
      .then(res => res.json())
      .then(data => {
        this.setState({
          ip: data.ip,
          hostname: data.hostname,
          isp: data.isp,
          country: data.location.country
        })
      })
  }

  render () {
    return (
      <div className={styles.body}>
        <Meta title='IP - cf12.org' />

        <div className={styles.ip}>
          <h1>Your IPv4 Address is:</h1>
          <h3>{this.state.ip}</h3>
        </div>

        <div className={styles.info}>
          <div className={styles.left}>
            <Entry
              icon='FaWifi'
              title='IPv4 Address'
              value={this.state.ip}
            />
            <Entry
              icon='FaWifi'
              title='IPv6 Address'
              value='(WIP)'
            />
            <Entry
              icon='FaGlobe'
              title='Hostname'
              value={this.state.hostname}
            />
            <Entry
              icon='FaGlobe'
              title='ISP'
              value={this.state.isp}
            />
            <Entry
              icon='FaGlobe'
              title='Country'
              value={this.state.country}
            />
          </div>

          <div className={styles.right}>

          </div>
        </div>

        <Footer />
      </div>
    )
  }
}

export default Ip
