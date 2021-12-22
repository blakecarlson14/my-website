import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment'
import dayjs from 'dayjs'
import { Dropdown } from 'semantic-ui-react'

export default function BitcoinTester() {
  const [coinPrice, setCoinPrice] = React.useState([])
  const [yScale, setYScale] = React.useState('linear')
  const [coin, setCoin] = React.useState('btc')

  React.useEffect(() => {
      async function getPrices() {
          let fetchCoin = 'bitcoin'
          switch(coin) {
            case 'eth':
              fetchCoin = 'ethereum'
              break;
            case 'dot':
              fetchCoin = 'polkadot'
              break;
            default:
              break;
          }
          const res = await fetch(`https://api.coingecko.com/api/v3/coins/${fetchCoin}/market_chart/range/?vs_currency=usd&from=946733027&to=1640157827`)
          const data = await res.json()
          
          setCoinPrice(data.prices)
          console.log(`coin ${coin}`)
      }
      getPrices()
  }, [coin])

  let result = [];
  coinPrice.map(entry => {
    let newDate = dayjs(entry[0]).format("MM/DD/YYYY");
    let obj = {date: newDate, price: entry[1]}
    result.push(obj)
  })

  let textLabel = 'BTC'
  switch(coin) {
    case 'eth':
      textLabel = 'ETH'
      break;
    case 'dot':
      textLabel = 'DOT'
      break;
    default:
      break;
  }

  return(
    <div>
      <Dropdown text={textLabel} pointing className='link item'>
        <Dropdown.Menu>
            <Dropdown.Item onClick={() => setCoin('btc')}>BTC</Dropdown.Item>
            <Dropdown.Item onClick={() => setCoin('eth')}>ETH</Dropdown.Item>
            <Dropdown.Item onClick={() => setCoin('dot')}>DOT</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown text={yScale === 'linear' ? 'Linear' : 'Log'} pointing className='link item'>
        <Dropdown.Menu>
            <Dropdown.Item onClick={() => setYScale('linear')}>Linear</Dropdown.Item>
            <Dropdown.Item onClick={() => setYScale('log')}>Log</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <ResponsiveContainer height={600}>
        <LineChart data={result}>
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