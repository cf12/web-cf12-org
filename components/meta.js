import Head from 'next/head'

export default (props) => {
  return (
    <div>
      <Head>
        <title>{props.title}</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />

        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="normalize.css"/>

        <link href="https://fonts.googleapis.com/css?family=Rubik:400,500,700&display=swap" rel="stylesheet"></link>
      </Head>
    </div>
  )
}