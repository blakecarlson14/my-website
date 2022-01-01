import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Label } from 'recharts';
import moment from 'moment'
import { Dropdown, Loader, Segment, Dimmer } from 'semantic-ui-react'

export default function CryptoCharts () {

  const [coinPrices, setCoinPrices] = React.useState([])
  const [yScale, setYScale] = React.useState('linear')
  const [coin, setCoin] = React.useState([])
  const [topCoins, setTopCoins] = React.useState([])

  React.useEffect(() => {
    async function getTopCoins () {
      const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc')
      const data = await res.json()

      setTopCoins(data)
      setCoin(data[0])
    }

    getTopCoins()
  }, [])

  React.useEffect(() => {
    async function getPrices () {
      const time = Math.floor(Date.now() / 1000)

      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart/range/?vs_currency=usd&from=946733027&to=${time}`)
      const data = await res.json()

      setCoinPrices(data.prices)
    }

    if (coin.symbol !== undefined) {
      getPrices()
    }
  }, [coin])

  if (coinPrices !== undefined && coin.symbol !== undefined) {
    let result = [];
    let yearTicks = []
    coinPrices.map(entry => {
      let day = new Date(entry[0])

      if (day.getDate() === 1 && day.getMonth() === 0) {
        yearTicks.push(day)
      }
      let obj = { date: entry[0], price: entry[1] }
      result.push(obj)
    })

    return (
      <div>
        <Dropdown text={ coin.symbol.toUpperCase() } pointing className='link item'>
          <Dropdown.Menu>
            { topCoins.slice(0, 20).map(topCoin => (
              <Dropdown.Item onClick={ () => setCoin(topCoin) }>{ topCoin.symbol.toUpperCase() }</Dropdown.Item>
            )) }
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown text={ yScale === 'linear' ? 'Linear' : 'Log' } pointing className='link item'>
          <Dropdown.Menu>
            <Dropdown.Item onClick={ () => setYScale('linear') }>Linear</Dropdown.Item>
            <Dropdown.Item onClick={ () => setYScale('log') }>Log</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <ResponsiveContainer height={ 600 }>
          <LineChart
            data={ result }
            margin={ { top: 50, right: 80, left: 80, bottom: 50 } }
          >
            <XAxis
              dataKey="date"
              type="number"
              ticks={ yearTicks }
              tickFormatter={ timeStr => moment(timeStr).format('YYYY') }
              domain={ ['auto', 'auto'] }
              scale={ 'time' }
            >
              <Label value="Date" offset={ 0 } position="bottom" />
            </XAxis>
            <YAxis
              scale={ yScale === 'linear' ? 'linear' : 'log' }
              domain={ ['auto', 'auto'] }
            >
              <Label value="Price (USD)" position="left" angle={ -90 } />
            </YAxis>
            <Line
              dataKey="price"
              stroke="#8884d8"
              dot={ false }
            />
            <Tooltip
              formatter={ (value) => `$${value.toFixed(2)}` }
              labelFormatter={ timeStr => moment(timeStr).format('MM/DD/YYYY') }
              cursor={ true }
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  } else {
    return (
      <Segment>
        <Dimmer active>
          <Loader />
        </Dimmer>
      </Segment>
    )
  }
}