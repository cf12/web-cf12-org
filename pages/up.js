import React, { useRef, useState } from 'react'
import { FaArrowRight, FaTimesCircle, FaCheckCircle } from 'react-icons/fa'
import { BeatLoader } from 'react-spinners'
import now from 'performance-now'

import Layout from 'components/Layout'

import styles from './up.scss'

const Up = () => {
  const inputRef = useRef()

  const [ clientData, setClientData ] = useState(null)
  const [ serverData, setServerData ] = useState(null)
  const [ loading, setLoading ] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    const url = inputRef.current.value.replace(/(^\w+:|^)\/\//, '')

    fetch(`/api/ping?url=${url}`)
      .then(res => res.json())
      .then(data => setServerData(data))


    try {
      const fetchStart = now()
      const fetchRes = await fetch('https://' + url, {
        mode: 'no-cors',
        referrerPolicy: 'no-referrer'
      })
      const fetchEnd = now()

      setClientData({
        success: true,
        fetch: {
          duration: (fetchEnd - fetchStart).toFixed(2)
        }
      })
    } catch (err) {
      setClientData({
        success: false,
        fetch: {
          duration: null
        }
      })
    }

    setLoading(false)
  }

  let bg = '#6F97FC'

  if (serverData && clientData) {
    if (serverData.success && clientData.success)
      bg = '#6DC881'
    else if (serverData.success || clientData.success)
      bg = '#DF9845'
    else
      bg = '#E3765E'
  }

  return (
    <Layout
      className={styles.body}
      style={{
        backgroundColor: bg
      }}
      seo={{
        title: 'Uptime checker - web.cf12.org',
        description: 'A web app that checks for host uptime using both client and server fetch methods and address resolution'
      }}
    >
      <h1>Uptime Checker</h1>
      <p>isitdownrightnow.com but better</p>

      <form className={styles.input} onSubmit={handleSubmit}>
        <input
          type='text'
          ref={inputRef}
          className={(loading ? styles.disabled : '')}
          disabled={loading}
        />
        { loading
          ? <BeatLoader color='white' size={8} />
          : <FaArrowRight onClick={handleSubmit} />
        }
      </form>

      { (serverData && clientData) ? <>
        <div className={styles.results}>
          <div className={styles.left}>
            <span>
              { (clientData.success)
                ? <FaCheckCircle className={styles.green} />
                : <FaTimesCircle className={styles.red} />
              }
              <h2>Client Side Connection</h2>
            </span>

            <p><b>Fetch Ping: </b>{clientData.fetch.duration}ms</p>
          </div>

          <div className={styles.right}>
            <span>
              { (serverData.success)
                ? <FaCheckCircle className={styles.green} />
                : <FaTimesCircle className={styles.red} />
              }
              <h2>Server Side Connection</h2>
            </span>

            <p><b>ICMP Ping: </b>{serverData.icmp.duration}ms</p>
            <p><b>Fetch Ping: </b>{serverData.fetch.duration}ms</p>
            <p><b>Status: </b>{serverData.fetch.status}</p>
            <p><b>IP Resolved: </b>{serverData.icmp.ip}</p>
          </div>
        </div>
      </> : <>
        <div className={styles.desc}>

        </div>
      </> }
    </Layout>
  )
}

export default Up