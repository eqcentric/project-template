import axios from 'axios'

export default cachedEventHandler(async (event) => {

  // REPLACE
  const { data } = await axios.get('https://<apiDevicesUrl>', {
    headers: {
      //
    }
  })

  return data.results
}, {
  swr: true,
  maxAge: 60,
})
