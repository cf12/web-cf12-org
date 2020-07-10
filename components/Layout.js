import React from 'react'
import { NextSeo } from 'next-seo'
import { FaArrowLeft } from 'react-icons/fa'

import Link from 'components/Link'

import styles from './Layout.scss'

const Layout = ({ seo, children, ...props }) => {
  return (
    <div {...props}>
      <NextSeo {...seo} />

      <span className={styles.header}>
        <FaArrowLeft />
        <Link href='/'>
          web.cf12.org
        </Link>
      </span>

      { children }

      <div className={styles.footer}>

      </div>
    </div>
  )
}

export default Layout