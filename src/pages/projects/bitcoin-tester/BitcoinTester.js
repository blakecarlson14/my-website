import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment'
import dayjs from 'dayjs'
import { Dropdown } from 'semantic-ui-react'

export default function BitcoinTester() {
  const [btcPrice, setBtcPrice] = React.useState([])
  const [yScale, setYScale] = React.useState('linear')

  React.useEffect(() => {
      async function getPrices() {
          const res = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range/?vs_currency=usd&from=946733027&to=1640157827")
          const data = await res.json()
          
          setBtcPrice(data.prices)
      }
      getPrices()
  }, [])

  // const data = btcPrice.map((value) => value.map((nextValue) => ({nextValue})))

  // const data = btcPrice.map(([ time, price ]) => [ time, price ]);

  // console.table(btcPrice)

  let result = [];
  btcPrice.map(entry => {
    let newDate = dayjs(entry[0]).format("MM/DD/YYYY");
    let obj = {date: newDate, price: entry[1]}
    result.push(obj)
  })

  return(
    <div>
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