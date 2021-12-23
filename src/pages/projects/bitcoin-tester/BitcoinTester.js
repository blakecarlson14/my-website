import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment'
import dayjs from 'dayjs'
import { Dropdown } from 'semantic-ui-react'

export default function BitcoinTester() {

  const lookupTable  = [
    {symbol: 'btc', id: 'bitcoin'},
    {symbol: 'eth', id: 'ethereum'},
    {symbol: 'ada', id: 'cardano'},
    {symbol: 'dot', id: 'polkadot'},
    {symbol: 'ltc', id: 'litecoin'},
  ]

  const [coinPrices, setCoinPrices] = React.useState([])
  const [yScale, setYScale] = React.useState('linear')
  const [coin, setCoin] = React.useState('btc')

  React.useEffect(() => {
    async function getPrices() {
      const time = Math.floor(Date.now() / 1000)

      const coinId = lookupTable.filter(item => item.symbol === coin).map(item => item.id)

      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart/range/?vs_currency=usd&from=946733027&to=${time}`)
      const data = await res.json()
      
      setCoinPrices(data.prices)
    }
    getPrices()
  }, [coin])

  let result = [];
  coinPrices.map(entry => {
    let newDate = dayjs(entry[0]).format("MM/DD/YYYY");
    let obj = {date: newDate, price: entry[1]}
    result.push(obj)
  })

  return(

      <div>
        <Dropdown text={coin.toUpperCase()} pointing className='link item'>
          <Dropdown.Menu>
            {lookupTable.map(lookupCoin => (
              <Dropdown.Item onClick={() => setCoin(`${lookupCoin.symbol}`)}>{lookupCoin.symbol.toUpperCase()}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown text={yScale === 'linear' ? 'Linear' : 'Log'} pointing className='link item'>
          <Dropdown.Menu>
              <Dropdown.Item onClick={() => setYScale('linear')}>Linear</Dropdown.Item>
              <Dropdown.Item onClick={() => setYScale('log')}>Log</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <ResponsiveContainer height={600}>
          <LineChart 
            data={result} 
            margin={{ top: 10, right: 20, left: 20, bottom: 5 }}
          >
            <XAxis 
              dataKey="date"
            />
            <YAxis
              scale={yScale === 'linear' ? 'linear' : 'log'}
              domain={['auto', 'auto']}
            />
            <Line  
              dataKey="price"
              stroke="#8884d8"
              dot={false}
            />
            <Tooltip 
              formatter={value => `$${value.toFixed(2)}`}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
  )
}