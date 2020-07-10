import React from 'react'

import Link from '../components/Link'

import styles from './index.scss'

const Home = () => {


  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <h1>web.cf12.org</h1>
        <p>Web tools for all your web needs</p>
      </div>

      <div className={styles.buttons}>
        <Link href='/ip'>
          <h2>IP Tools</h2>
        </Link>

        <Link href='/up'>
          <h2>Uptime Checker</h2>
        </Link>
      </div>
    </div>
  )
}

export default Home